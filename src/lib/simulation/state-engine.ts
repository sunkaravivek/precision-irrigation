export interface SimulationInput {
  cropType: string;
  cropStage: string;
  soilType: string;
  soilMoisture: number; // percentage
  temperature: number;
  humidity: number;
  rainfall: number;
  evapotranspiration: number;
  rainForecast: boolean;
  irrigationMethod: string;
}

export interface SimulationOutput {
  currentState: string;
  nextState: string;
  irrigationRequired: boolean;
  recommendedWater: number; // mm
  efficiencyScore: number; // 0-100
  riskLevel: 'Safe' | 'Warning' | 'Critical';
  explanation: string;
}

// Static thresholds reflecting standard generic agronomic knowledge
const MOISTURE_THRESHOLDS = {
  Sandy: { low: 10, optimal: 15, high: 20 },
  Loamy: { low: 15, optimal: 25, high: 30 },
  Clay: { low: 25, optimal: 35, high: 40 },
  Silt: { low: 20, optimal: 30, high: 35 },
};

/**
 * Estimates soil moisture deterministically based on agronomic inputs.
 * Result is a percentage, safely clamped between 5% and 50%.
 */
export function estimateSoilMoisture(
  soilType: string,
  temperature: number,
  humidity: number,
  rainfall: number,
  evapotranspiration: number
): number {
  // Base field capacity based on soil type
  const baseMoisture: Record<string, number> = {
    Sandy: 15,
    Loamy: 25,
    Clay: 35,
    Silt: 30,
    'Black Cotton': 40,
    Alluvial: 28,
    'Red Soil': 20,
  };
  
  const base = baseMoisture[soilType] || 25;

  // Temperature effect: Higher temp decreases surface moisture faster
  const tempFactor = temperature > 30 ? -2.5 : temperature < 20 ? +1.0 : 0;
  
  // Humidity effect: Higher humidity preserves moisture slightly better
  const humFactor = humidity > 70 ? +1.5 : humidity < 40 ? -1.5 : 0;
  
  // Recent Rainfall boosts moisture significantly
  // 1mm of rain adds ~0.5% moisture temporarily
  const rainFactor = Math.min(rainfall, 50) * 0.5; 
  
  // Evapotranspiration drains moisture steadily
  const etFactor = -(evapotranspiration * 0.8);

  const estimated = base + tempFactor + humFactor + rainFactor + etFactor;

  // Bound it to realistic percentages
  return Math.max(5, Math.min(50, Math.round(estimated * 10) / 10));
}

/**
 * A pure, deterministic State-Transition model for calculating irrigation needs.
 */
export function runSimulation(input: SimulationInput): SimulationOutput {
  const { cropStage, soilType, soilMoisture, rainForecast, evapotranspiration, rainfall, irrigationMethod, temperature } = input;
  
  // 1. Determine Discretized State
  const soilThresholds = MOISTURE_THRESHOLDS[soilType as keyof typeof MOISTURE_THRESHOLDS] || MOISTURE_THRESHOLDS.Loamy;
  
  let moistureState = 'Optimal';
  if (soilMoisture <= soilThresholds.low) moistureState = 'Low';
  else if (soilMoisture >= soilThresholds.high) moistureState = 'High';

  const tempState = temperature > 30 ? 'Hot' : temperature < 15 ? 'Cool' : 'Warm';
  const rainState = rainForecast ? 'RainExpected' : 'NoRain';
  
  // Build the composite discrete state
  const currentState = `Moisture${moistureState}_${tempState}_${rainState}_${cropStage}`;

  // 2. Base Transition Logic (Haskell pattern matching conceptual equivalent)
  let irrigationRequired = false;
  let recommendedWater = 0;
  let nextState = '';
  let explanation = '';
  let riskLevel: 'Safe' | 'Warning' | 'Critical' = 'Safe';
  let efficiencyScore = 100;

  if (moistureState === 'Low') {
    if (rainForecast) {
      irrigationRequired = false;
      recommendedWater = 0;
      nextState = 'DelayIrrigation_Recovering';
      explanation = `Soil moisture is low, but upcoming rain will provide natural irrigation. Skipping irrigation to save water.`;
      riskLevel = 'Warning';
      efficiencyScore = 95;
    } else {
      irrigationRequired = true;
      recommendedWater = (soilThresholds.optimal - soilMoisture) * 1.5;
      nextState = 'Irrigating_Optimal';
      explanation = `Soil moisture is critically low and no rain is expected. Immediate irrigation is required to reach optimal capacity.`;
      riskLevel = soilMoisture < (soilThresholds.low - 5) ? 'Critical' : 'Warning';
      efficiencyScore = 85; 
    }
  } else if (moistureState === 'Optimal') {
    if (rainForecast) {
      irrigationRequired = false;
      nextState = 'Optimal_Monitoring';
      explanation = `Soil moisture is at optimal levels and rain is expected. No action needed.`;
      riskLevel = 'Safe';
      efficiencyScore = 98;
    } else {
      if (evapotranspiration > 5.0 || tempState === 'Hot') {
        irrigationRequired = true;
        recommendedWater = evapotranspiration * 1.2;
        nextState = 'PreemptiveIrrigation';
        explanation = `Soil is currently optimal, but high evapotranspiration and hot conditions warrant a light preemptive irrigation to maintain levels.`;
        riskLevel = 'Warning';
        efficiencyScore = 90;
      } else {
        irrigationRequired = false;
        nextState = 'Optimal_Monitoring';
        explanation = `Soil moisture is optimal and environmental conditions are stable. No irrigation needed.`;
        riskLevel = 'Safe';
        efficiencyScore = 100;
      }
    }
  } else if (moistureState === 'High') {
    irrigationRequired = false;
    nextState = 'Saturated_Drying';
    explanation = `Soil is saturated. Irrigation skipped to prevent waterlogging and root rot.`;
    riskLevel = rainForecast ? 'Critical' : 'Safe'; 
    efficiencyScore = 100;
  }

  // 3. Modifiers

  // Modifiers: Crop Stage Sensitivity
  if (cropStage === 'Flowering') {
    if (irrigationRequired) {
      recommendedWater *= 1.25; 
      explanation += ' Recommended amount increased by 25% due to the highly sensitive Flowering growth stage.';
    } else if (moistureState === 'Low') {
       riskLevel = 'Critical';
    }
  }

  // Modifiers: Efficient Irrigation Methods
  const methodEfficiency = {
    'Drip': 0.95,
    'Sprinkler': 0.75,
    'Surface': 0.60,
    'Flood': 0.50
  };
  const eff = methodEfficiency[irrigationMethod as keyof typeof methodEfficiency] || 0.7;
  
  if (irrigationRequired && recommendedWater > 0) {
      // Increase volume to account for method losses
      recommendedWater = recommendedWater / eff;
      // Adjust efficiency score visually
      efficiencyScore = Math.floor(efficiencyScore * eff);
      explanation += ` Water requirement adjusted for ${Math.round(eff * 100)}% efficiency of ${irrigationMethod} irrigation.`;
  }

  if (!irrigationRequired && rainfall > 0) {
    explanation += ` Recent rainfall of ${rainfall}mm has contributed slightly to soil moisture saturation.`;
  }

  explanation += ` (Note: Initial soil moisture of ${soilMoisture}% was deterministically estimated based on ${soilType} field capacity, adjusted for current ET, temperature, humidity, and rainfall).`;

  return {
    currentState,
    nextState,
    irrigationRequired,
    recommendedWater: Math.max(0, Math.round(recommendedWater * 10) / 10),
    efficiencyScore,
    riskLevel,
    explanation
  };
}

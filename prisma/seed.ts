import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // 1. Create a demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      name: 'Demo Farmer',
      email: 'demo@example.com',
      password: 'password123', // In a real app, hash this!
    },
  })
  console.log(`Created user with id: ${user.id}`)

  // 2. Create demo farms
  const farm1 = await prisma.farm.create({
    data: {
      userId: user.id,
      name: 'North Valley Field',
      location: 'California, Region 1',
      area: 45.5,
      cropType: 'Wheat',
      soilType: 'Loamy',
      irrigationMethod: 'Sprinkler',
    },
  })

  const farm2 = await prisma.farm.create({
    data: {
      userId: user.id,
      name: 'East Greenhouse',
      location: 'California, Region 2',
      area: 12.0,
      cropType: 'Tomato',
      soilType: 'Sandy',
      irrigationMethod: 'Drip',
    },
  })
  console.log('Created demo farms.')

  // 3. Create datasets
  const crops = [
    { crop: 'Rice', growthStage: 'Vegetative', kcValue: 1.05, rootDepth: 0.6, waterRequirement: 6.0 },
    { crop: 'Wheat', growthStage: 'Flowering', kcValue: 1.15, rootDepth: 1.0, waterRequirement: 4.5 },
    { crop: 'Maize', growthStage: 'Vegetative', kcValue: 0.9, rootDepth: 0.8, waterRequirement: 5.0 },
    { crop: 'Cotton', growthStage: 'Maturity', kcValue: 0.75, rootDepth: 1.2, waterRequirement: 3.0 },
    { crop: 'Tomato', growthStage: 'Flowering', kcValue: 1.1, rootDepth: 0.5, waterRequirement: 4.0 },
    { crop: 'Sugarcane', growthStage: 'Vegetative', kcValue: 1.0, rootDepth: 1.5, waterRequirement: 7.0 },
  ]
  for (const c of crops) {
    await prisma.cropDataset.create({ data: c })
  }

  const soils = [
    { soilType: 'Sandy', fieldCapacity: 15.0, wiltingPoint: 7.0, infiltrationRate: 30.0 },
    { soilType: 'Loamy', fieldCapacity: 25.0, wiltingPoint: 12.0, infiltrationRate: 15.0 },
    { soilType: 'Clay', fieldCapacity: 35.0, wiltingPoint: 20.0, infiltrationRate: 5.0 },
    { soilType: 'Silt', fieldCapacity: 30.0, wiltingPoint: 15.0, infiltrationRate: 10.0 },
  ]
  for (const s of soils) {
    await prisma.soilDataset.create({ data: s })
  }

  const weather = [
    { date: new Date('2026-03-24'), temperature: 28.5, humidity: 45, rainfall: 0, evapotranspiration: 5.2 },
    { date: new Date('2026-03-25'), temperature: 30.1, humidity: 40, rainfall: 0, evapotranspiration: 6.0 },
    { date: new Date('2026-03-26'), temperature: 25.0, humidity: 65, rainfall: 12.5, evapotranspiration: 3.1 },
    { date: new Date('2026-03-27'), temperature: 26.5, humidity: 55, rainfall: 2.0, evapotranspiration: 4.5 },
  ]
  for (const w of weather) {
    await prisma.weatherDataset.create({ data: w })
  }

  const irrigation = [
    { irrigationMethod: 'Drip', waterApplied: 2.5, irrigationInterval: 1, moistureThreshold: 20.0 },
    { irrigationMethod: 'Sprinkler', waterApplied: 8.0, irrigationInterval: 3, moistureThreshold: 15.0 },
    { irrigationMethod: 'Surface', waterApplied: 15.0, irrigationInterval: 7, moistureThreshold: 10.0 },
    { irrigationMethod: 'Flood', waterApplied: 25.0, irrigationInterval: 14, moistureThreshold: 5.0 },
  ]
  for (const i of irrigation) {
    await prisma.irrigationDataset.create({ data: i })
  }
  console.log('Created datasets.')

  // 4. Create sample simulations
  await prisma.simulation.create({
    data: {
      userId: user.id,
      farmId: farm1.id,
      cropType: 'Wheat',
      cropStage: 'Flowering',
      soilType: 'Loamy',
      soilMoisture: 18.5,
      temperature: 30.1,
      humidity: 40.0,
      rainfall: 0.0,
      evapotranspiration: 6.0,
      rainForecast: false,
      currentState: 'MoistureLow_TempHigh_Flowering',
      nextState: 'Irrigating_Optimal',
      irrigationRequired: true,
      recommendedWater: 15.5,
      efficiencyScore: 88.5,
      riskLevel: 'Warning',
      explanation: 'Soil moisture is approaching wilting point for Loamy soil during the critical Flowering stage. High evapotranspiration and no rain forecast require immediate irrigation.',
    }
  })

  await prisma.simulation.create({
    data: {
      userId: user.id,
      farmId: farm2.id,
      cropType: 'Tomato',
      cropStage: 'Vegetative',
      soilType: 'Sandy',
      soilMoisture: 14.0,
      temperature: 25.0,
      humidity: 65.0,
      rainfall: 12.5,
      evapotranspiration: 3.1,
      rainForecast: true,
      currentState: 'MoistureModerate_RainExpected_Vegetative',
      nextState: 'DelayIrrigation_Optimal',
      irrigationRequired: false,
      recommendedWater: 0.0,
      efficiencyScore: 95.0,
      riskLevel: 'Safe',
      explanation: 'Soil moisture is moderate but recent rainfall and expected rain will naturally replenish the soil. Irrigation skipped to maximize water-use efficiency.',
    }
  })
  console.log('Created sample simulations.')

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

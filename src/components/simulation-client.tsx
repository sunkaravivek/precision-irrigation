"use client"
import { useState, useEffect } from "react"
import { executeSimulation } from "@/actions/simulation"
import { fetchFarmWeather } from "@/actions/weather"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Droplet, Activity, Database, AlertCircle, ArrowRightCircle } from "lucide-react"
import { toast } from "sonner"
import { estimateSoilMoisture, type SimulationOutput } from "@/lib/simulation/state-engine"

export function SimulationClient({ farms, crops, soils }: { farms: any[], crops: any[], soils: any[] }) {
  const [loading, setLoading] = useState(false)
  const [fetchingWeather, setFetchingWeather] = useState(false)
  const [result, setResult] = useState<SimulationOutput | null>(null)

  const [farmId, setFarmId] = useState(farms[0]?.id || '')
  
  // Controlled fields mapped dynamically
  const [cropType, setCropType] = useState(farms[0]?.cropType || 'Wheat')
  const [cropStage, setCropStage] = useState('Vegetative')
  const [soilType, setSoilType] = useState(farms[0]?.soilType || 'Loamy')
  const [irrigationMethod, setMethod] = useState(farms[0]?.irrigationMethod || 'Drip')

  // Real-time weather states
  const [temperature, setTemp] = useState(28.0)
  const [humidity, setHumidity] = useState(55)
  const [rainfall, setRainfall] = useState(0)
  const [et, setEt] = useState(4.5)
  const [rainForecast, setRainForecast] = useState('no')

  const estimatedMoisture = estimateSoilMoisture(soilType, temperature, humidity, rainfall, et)

  // Auto-select the first farm if it populates dynamically (e.g. after adding the first farm)
  useEffect(() => {
    if (!farmId && farms.length > 0) {
      setFarmId(farms[0].id)
    }
  }, [farms, farmId])

  // Sync Form when Farm changes
  useEffect(() => {
    const selectedFarm = farms.find(f => f.id === farmId)
    if (selectedFarm) {
      setCropType(selectedFarm.cropType)
      setSoilType(selectedFarm.soilType)
      setMethod(selectedFarm.irrigationMethod)
    }
  }, [farmId, farms])

  async function handleSimulate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    if (!farmId) {
      toast.error("Please select a target farm from the dropdown.")
      setLoading(false)
      return
    }

    const formData = new FormData(e.currentTarget)
    const input = {
      cropType,
      cropStage,
      soilType,
      irrigationMethod,
      soilMoisture: parseFloat(formData.get('soilMoisture') as string),
      temperature: parseFloat(formData.get('temperature') as string),
      humidity: parseFloat(formData.get('humidity') as string),
      rainfall: parseFloat(formData.get('rainfall') as string),
      evapotranspiration: parseFloat(formData.get('evapotranspiration') as string),
      rainForecast: formData.get('rainForecast') === 'yes'
    }

    const res = await executeSimulation(input, farmId)
    setLoading(false)

    if (res.error) {
      toast.error(res.error)
    } else {
      toast.success("Simulation computed successfully")
      if (res.result) setResult(res.result)
    }
  }

  async function handleFetchIMD() {
    if (!farmId) {
      toast.error("Please select a farm to pinpoint weather coordinates.")
      return;
    }
    const farm = farms.find(f => f.id === farmId)
    if (!farm) return;

    setFetchingWeather(true)
    const res = await fetchFarmWeather(farm.location)
    setFetchingWeather(false)

    if (res.error) {
      toast.error(res.error)
    } else if (res.data) {
      setTemp(res.data.temperature)
      setHumidity(res.data.humidity)
      setRainfall(res.data.rainfall)
      setEt(res.data.evapotranspiration)
      setRainForecast(res.data.rainForecast ? 'yes' : 'no')
      toast.success(`Live telemetry loaded for ${res.resolvedLocationContext}`)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-lg border-primary/10 relative overflow-hidden">
        {farms.length === 0 && (
          <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <AlertCircle className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">No Farms Registered</h3>
            <p className="text-muted-foreground mb-4">You must register an agricultural zone before running the deterministic simulation engine.</p>
          </div>
        )}
        <form onSubmit={handleSimulate}>
          <CardHeader className="bg-muted/30">
            <CardTitle className="text-xl flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" /> Input Parameters
            </CardTitle>
            <CardDescription>Configure the state context</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label>Target Farm</Label>
              <Select value={farmId} onValueChange={(val) => setFarmId(val || '')}>
                <SelectTrigger><SelectValue placeholder="Select farm..." /></SelectTrigger>
                <SelectContent>
                  {farms.map(f => <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Crop Type</Label>
                <Select value={cropType} onValueChange={(val) => setCropType(val || '')}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    {['Wheat', 'Paddy (Rice)', 'Millet', 'Sugarcane', 'Cotton', 'Tomato', 'Maize'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Growth Stage</Label>
                <Select value={cropStage} onValueChange={(val) => setCropStage(val || '')}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    {['Germination', 'Vegetative', 'Flowering', 'Maturity'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Soil Type</Label>
                <Select value={soilType} onValueChange={(val) => setSoilType(val || '')}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    {['Loamy', 'Black Cotton', 'Alluvial', 'Red Soil', 'Sandy', 'Clay', 'Silt'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
               <div className="space-y-2">
                <Label>Irrigation Method</Label>
                <Select value={irrigationMethod} onValueChange={(val) => setMethod(val || '')}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    {['Drip', 'Sprinkler', 'Surface', 'Flood'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between items-center mb-1">
                  <Label>Soil Moisture (%)</Label>
                  <span className="text-[10px] font-mono text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded">AUTO-ESTIMATED</span>
                </div>
                <Input name="soilMoisture" type="number" step="0.1" value={estimatedMoisture} readOnly className="bg-muted/50 focus-visible:ring-0 opacity-80 border-blue-500/20" />
                <p className="text-[10px] text-muted-foreground mt-1 leading-tight">
                  Formula: {soilType} Capacity + Rainfall - ET
                </p>
              </div>
              <div className="space-y-2">
                <Label>Evapotranspiration (mm/d)</Label>
                <Input name="evapotranspiration" type="number" step="0.1" value={et} onChange={e => setEt(parseFloat(e.target.value) || 0)} required />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Temp (°C)</Label>
                <Input name="temperature" type="number" step="0.1" value={temperature} onChange={e => setTemp(parseFloat(e.target.value) || 0)} required />
              </div>
               <div className="space-y-2">
                <Label>Humidity (%)</Label>
                <Input name="humidity" type="number" step="0.1" value={humidity} onChange={e => setHumidity(parseFloat(e.target.value) || 0)} required />
              </div>
               <div className="space-y-2">
                <Label>Rainfall (mm)</Label>
                <Input name="rainfall" type="number" step="0.1" value={rainfall} onChange={e => setRainfall(parseFloat(e.target.value) || 0)} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Rain Forecast Expected (24h)</Label>
              <Select name="rainForecast" value={rainForecast} onValueChange={(val) => setRainForecast(val || 'no')}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </CardContent>
          <CardFooter className="bg-muted/30 pt-4 flex gap-4">
             <Button type="button" variant="outline" onClick={handleFetchIMD} className="w-1/2" disabled={fetchingWeather || farms.length === 0}>
                {fetchingWeather ? "Syncing..." : "📡 Fetch Live Weather"}
             </Button>
             <Button type="submit" disabled={loading || farms.length === 0} className="w-1/2">
               {loading ? "Computing..." : "Run Simulation"}
             </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Results Panel */}
      <div className="space-y-6">
        {result ? (
          <>
            <Card className={`border-l-4 shadow-xl ${result.riskLevel === 'Critical' ? 'border-l-destructive' : result.riskLevel === 'Warning' ? 'border-l-orange-500' : 'border-l-primary'}`}>
              <CardHeader className="bg-muted/10 pb-4">
                <CardTitle className="flex justify-between items-center text-xl">
                  <span>Decision Output</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${result.riskLevel === 'Critical' ? 'bg-destructive/20 text-destructive' : result.riskLevel === 'Warning' ? 'bg-orange-500/20 text-orange-600' : 'bg-primary/20 text-primary'}`}>
                    Risk: {result.riskLevel}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                 
                 <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-lg border border-border/50">
                    <div className="p-3 bg-primary/10 rounded-full">
                       <Droplet className={`w-8 h-8 ${result.irrigationRequired ? 'text-blue-500' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                       <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Action</p>
                       <p className="text-2xl font-bold">
                         {result.irrigationRequired ? `Irrigate ${result.recommendedWater} mm` : 'No Irrigation Required'}
                       </p>
                    </div>
                 </div>

                 <div className="space-y-3">
                   <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wide border-b pb-2">State Transition Model</h4>
                   <div className="flex flex-col gap-2 p-4 bg-black/5 dark:bg-white/5 rounded-md font-mono text-xs">
                      <div className="text-muted-foreground">Current State:</div>
                      <div className="text-primary font-bold overflow-hidden text-ellipsis">{result.currentState}</div>
                      <div className="flex justify-center my-1"><ArrowRightCircle className="w-4 h-4 text-muted-foreground" /></div>
                      <div className="text-muted-foreground">Computed Next State:</div>
                      <div className="text-blue-500 font-bold overflow-hidden text-ellipsis">{result.nextState}</div>
                   </div>
                 </div>

                 <div className="space-y-2">
                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wide border-b pb-2">Diagnostic Explanation</h4>
                    <div className="space-y-3 p-3 bg-muted/20 rounded border border-border/30">
                       <p className="text-sm leading-relaxed text-foreground/90">
                          {result.explanation}
                       </p>
                       {result.irrigationRequired && (
                         <div className="pt-3 mt-2 border-t border-border/50 text-sm text-muted-foreground space-y-1.5">
                           <p><strong className="text-foreground">Optimal Irrigation Time:</strong> {temperature > 28 ? "6:00 AM or 8:00 PM (prevents excessive solar evaporation)" : "Before 10:00 AM"}</p>
                           <p><strong className="text-foreground">Estimated Pump Duration:</strong> ~{Math.max(15, Math.round(result.recommendedWater * 4.2))} minutes <span className="text-xs opacity-70">(Assumes standard 15 L/s inflow per hectare)</span></p>
                         </div>
                       )}
                    </div>
                 </div>

                 <div className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <div className="flex items-center gap-2">
                       <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                       <span className="font-semibold text-emerald-800 dark:text-emerald-300">Est. Water Efficiency</span>
                    </div>
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{result.efficiencyScore}%</span>
                 </div>

              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="h-full flex items-center justify-center bg-muted/10 border-dashed border-2">
             <div className="text-center p-8 opacity-50 space-y-4">
                <Database className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-medium">Awaiting Execution</h3>
                <p>Fill out the agronomic parameters and run the simulation engine to generate state-transition output.</p>
             </div>
          </Card>
        )}
      </div>
    </div>
  )
}

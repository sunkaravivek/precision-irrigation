"use client"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { ArrowRight, CloudRain, Droplet, Sun, Leaf } from "lucide-react"

export default function StateExplorerPage() {
  const transitions = [
    {
      current: "MoistureLow_NoRain_Vegetative",
      descCurrent: "Critically drying soil with no anticipated precipitation during growth.",
      action: "Irrigating_Optimal",
      descAction: "Execute aggressive irrigation schedule to prevent yield loss.",
      risk: "Critical"
    },
    {
      current: "MoistureOptimal_RainExpected_Vegetative",
      descCurrent: "Healthy moisture balance with upcoming weather contribution.",
      action: "Optimal_Monitoring",
      descAction: "Do nothing to maximize resource efficiency.",
      risk: "Safe"
    },
    {
      current: "MoistureLow_NoRain_Flowering",
      descCurrent: "Flowering stage is highly sensitive to water stress.",
      action: "Irrigating_Optimal (+25% Volume)",
      descAction: "Priority irrigation event with surplus volume for safety margin.",
      risk: "Critical"
    },
    {
      current: "MoistureOptimal_Hot_NoRain_Any",
      descCurrent: "Good moisture but high ET risks rapid depletion.",
      action: "PreemptiveIrrigation",
      descAction: "Light application to counter evaporation rate.",
      risk: "Warning"
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">State Transition Rules</h2>
        <p className="text-muted-foreground mt-2">Explore the deterministic formal rules mapping inputs to irrigation states.</p>
      </div>

      <div className="grid gap-6">
        {transitions.map((t, idx) => (
           <Card key={idx} className="border-l-4 border-l-primary overflow-hidden">
             <div className="md:flex">
                <CardHeader className="bg-muted/30 md:w-1/2 p-6">
                   <CardDescription className="uppercase tracking-widest font-bold text-xs mb-2">Pre-Transition State</CardDescription>
                   <CardTitle className="text-lg font-mono text-primary mb-2">{t.current}</CardTitle>
                   <p className="text-sm text-muted-foreground leading-relaxed">{t.descCurrent}</p>
                </CardHeader>
                <div className="hidden md:flex items-center justify-center p-4 bg-muted/10 w-16">
                   <ArrowRight className="text-muted-foreground" />
                </div>
                <CardContent className="md:w-1/2 p-6 flex flex-col justify-center">
                   <CardDescription className="uppercase tracking-widest font-bold text-xs mb-2">Computed Next State</CardDescription>
                   <CardTitle className="text-lg font-mono text-blue-500 mb-2">{t.action}</CardTitle>
                   <p className="text-sm text-muted-foreground leading-relaxed">{t.descAction}</p>
                </CardContent>
             </div>
           </Card>
        ))}
      </div>
    </div>
  )
}

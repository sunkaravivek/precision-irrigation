"use client"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Code, BookOpen, Layers, CheckCircle, Globe2, ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
           <div className="text-center">
              <h1 className="text-4xl font-black tracking-tight mb-4 text-primary">State-Transition Model for Precision Irrigation</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Bridging theoretical Functional Programming and practical agronomy for resource-constrained environments.</p>
           </div>

           <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-lg border-primary/10">
                 <CardHeader>
                    <CardTitle className="flex gap-2 items-center text-xl"><BookOpen className="text-primary"/> The Core Motivation</CardTitle>
                 </CardHeader>
                 <CardContent className="text-foreground/80 leading-relaxed space-y-4">
                    <p>Agriculture consumes approximately 70% of global freshwater. Traditional irrigation schedules rely overwhelmingly on static timers or manual intuition.</p>
                    <p>This approach fails to account for dynamic changes like unexpected rainfall, sudden heatwaves, or variable crop growth stages, leading to severe water wastage or unrecoverable crop stress.</p>
                 </CardContent>
              </Card>

              <Card className="shadow-lg border-primary/10">
                 <CardHeader>
                    <CardTitle className="flex gap-2 items-center text-xl"><Layers className="text-primary"/> Abstract Architecture</CardTitle>
                 </CardHeader>
                 <CardContent className="text-foreground/80 leading-relaxed">
                    The platform evaluates dynamic environmental constraints: soil composition (e.g., wilting thresholds), plant phenological stages (Kc curves), meteorological forecasts, and evapotranspiration (ET).
                    <br/><br/>
                    It groups continuous, infinite inputs into finite categorical states (e.g. <code>MoistureLow</code> verses <code>MoistureOptimal</code>), vastly simplifying computational overhead.
                 </CardContent>
              </Card>

              <Card className="md:col-span-2 shadow-xl border-emerald-500/30 overflow-hidden relative">
                 <div className="absolute top-0 right-0 p-16 bg-emerald-500/5 blur-3xl -z-10 rounded-full" />
                 <CardHeader>
                    <CardTitle className="flex gap-2 items-center text-2xl text-emerald-600 dark:text-emerald-400"><Code className="w-8 h-8"/> The Haskell Inspiration: Pure Functions</CardTitle>
                 </CardHeader>
                 <CardContent className="text-foreground/90 leading-relaxed space-y-6">
                    <p className="text-lg">
                       By leveraging functional programming paradigms—specifically <strong>deterministic state-transition functions</strong> natively found in languages like Haskell—the system avoids the unintended side effects prevalent in complex heuristic logic trees.
                    </p>
                    
                    <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg font-mono text-sm border border-border/50">
                       <span className="text-blue-500">evaluateIrrigation</span> :: State <span className="text-muted-foreground">-&gt;</span> Inputs <span className="text-muted-foreground">-&gt;</span> (Action, NewState)
                    </div>

                    <ul className="space-y-4 ml-2 list-none text-foreground/80">
                       <li className="flex gap-3 items-start">
                         <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" /> 
                         <div>
                           <strong className="text-foreground block mb-1">Deterministic Output</strong> 
                           Given State <em>A</em> and Input conditions <em>X</em>, the identical Output <em>Y</em> and ensuing State <em>B</em> are mathematically guaranteed every single time.
                         </div>
                       </li>
                       <li className="flex gap-3 items-start">
                         <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" /> 
                         <div>
                           <strong className="text-foreground block mb-1">Safety Constraints</strong> 
                           Critical bounds (such as falling below the Permanent Wilting Point) trigger immutable override rules, preventing the machine from ever entering a "Crop Dead" state silently.
                         </div>
                       </li>
                       <li className="flex gap-3 items-start">
                         <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" /> 
                         <div>
                           <strong className="text-foreground block mb-1">Auditability & Transparency</strong> 
                           Every computational decision is securely logged tracking the precise pre-transition and post-transition state identifiers. This black-box-free transparency is critical for farming adoption.
                         </div>
                       </li>
                    </ul>
                 </CardContent>
              </Card>

              <Card className="md:col-span-2 shadow-xl border-orange-500/30">
                 <CardHeader className="bg-orange-500/5">
                    <CardTitle className="flex gap-2 items-center text-2xl text-orange-600 dark:text-orange-400"><Globe2 className="w-8 h-8"/> Implementation Viability in India</CardTitle>
                    <CardDescription className="text-base text-orange-700/70 dark:text-orange-200/50">Addressing regional climatic and resource challenges.</CardDescription>
                 </CardHeader>
                 <CardContent className="text-foreground/90 leading-relaxed space-y-6 pt-6">
                    <p>
                       The Indian agricultural landscape is uniquely challenged by unpredictable monsoons and rapidly depleting groundwater tables, particularly in regions like Punjab, Haryana, and Maharashtra. A deterministic model is exceptionally effective here:
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                       <div className="bg-muted/30 p-5 rounded-lg border border-border/50">
                          <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">Monsoon Integration <ArrowRight className="w-4 h-4 text-orange-500"/></h4>
                          <p className="text-sm text-muted-foreground">The model's native `rainForecast` state naturally accommodates the Indian Meteorological Department's (IMD) predictive telemetry, pausing irrigation when localized summer rains are imminent.</p>
                       </div>
                       <div className="bg-muted/30 p-5 rounded-lg border border-border/50">
                          <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">Native Soil Profiles <ArrowRight className="w-4 h-4 text-orange-500"/></h4>
                          <p className="text-sm text-muted-foreground">The architecture inherently supports India's diverse typography. Black Cotton soils of the Deccan trap retain moisture highly efficiently, while Sandy plains require frequent pulsing. The State Engine inherently categorizes these thresholds.</p>
                       </div>
                       <div className="bg-muted/30 p-5 rounded-lg border border-border/50">
                          <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">Cost Accessibility <ArrowRight className="w-4 h-4 text-orange-500"/></h4>
                          <p className="text-sm text-muted-foreground">Unlike complex IoT-heavy logic loops requiring expensive hardware, a mathematically minimal deterministic state machine can run effectively on low-end hardware or cloud endpoints accessible via simple SMS/Web integrations for rural farmers.</p>
                       </div>
                    </div>
                 </CardContent>
              </Card>
           </div>
        </div>
      </main>
    </div>
  )
}

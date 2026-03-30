"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Droplets, Leaf, Activity, ArrowRight, BarChart3, CloudRain } from 'lucide-react';
import { Navbar } from '@/components/navbar';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32">
          {/* Background Decorative Gradients */}
          <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 bg-gradient-to-r from-primary to-blue-500 blur-3xl pointer-events-none rounded-full" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-primary via-green-500 to-teal-400">
                Precision Irrigation <br className="hidden md:block" />
                Scheduling System
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                A State-Transition Model for optimizing water-use efficiency. 
                Simulate and automate irrigation decisions based on discrete agronomic state evaluation.
              </p>
              
              <div className="flex justify-center gap-4 flex-col sm:flex-row">
                <Link href="/login">
                  <Button size="lg" className="w-full sm:w-auto font-semibold">
                    Explore Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Research Motivation
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { title: 'Water-Use Efficiency', icon: Droplets, desc: 'Optimized conservation ensuring zero wastage and maximal crop yield.' },
                { title: 'State-Based Logic', icon: Activity, desc: 'Deterministic Haskell-inspired state modelling for rigorous decision making.' },
                { title: 'Crop-Soil Integration', icon: Leaf, desc: 'Analyzes moisture capacity, ET, and crop growth stages simultaneously.' },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="border-none shadow-md bg-card/60 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <item.icon className="h-10 w-10 text-primary mb-4" />
                      <CardTitle>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{item.desc}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How The Simulation Works</h2>
              <p className="text-muted-foreground text-lg">A 4-step discrete mathematical state progression</p>
            </div>

            <div className="space-y-12">
              {[
                { step: '01', title: 'Data Aggregation (Context)', desc: 'Farm conditions, current weather, soil parameters, and crop data are aggregated into the initial state vector.', icon: CloudRain },
                { step: '02', title: 'State Classification', desc: 'Continuous variables are mapped to discrete abstract states (e.g., MoistureLow, RainExpected, Vegetative Stage).', icon: BarChart3 },
                { step: '03', title: 'Transition Logic Application', desc: 'Pre-defined rules and transition constraints determine if the system should shift to an Irrigating State or a Delay State.', icon: Activity },
                { step: '04', title: 'Action & Recommendation', desc: 'The system computes the exact water volume needed considering irrigation method efficiency (e.g. Drip 95%).', icon: Droplets },
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl border border-primary/20">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 flex items-center gap-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed shadow-sm">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/10">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
          <Leaf className="h-8 w-8 text-primary mb-6 opacity-80" />
          <p className="text-muted-foreground font-medium">Precision Irrigation Scheduling System</p>
          <p className="text-sm text-muted-foreground mt-2">Final Year Project Presentation / Demo</p>
          <div className="flex gap-4 mt-8 opacity-70">
            <span className="text-xs border px-2 py-1 rounded">Next.js</span>
            <span className="text-xs border px-2 py-1 rounded">Prisma</span>
            <span className="text-xs border px-2 py-1 rounded">Haskell Concept</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

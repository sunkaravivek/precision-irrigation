import { db } from "@/lib/db"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { SimulationClient } from "@/components/simulation-client"

export default async function SimulationPage() {
  const session = await getSession()
  if (!session) redirect("/login")
  
  const farms = await db.farm.findMany({ where: { userId: session.userId as string } })
  
  // Datasets for dropdowns
  const crops = await db.cropDataset.findMany()
  const soils = await db.soilDataset.findMany()

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Run Simulation</h2>
        <p className="text-muted-foreground mt-2">
          Enter current field conditions to trigger the state-transition evaluation engine.
        </p>
      </div>
      
      <SimulationClient farms={farms} crops={crops} soils={soils} />
    </div>
  )
}

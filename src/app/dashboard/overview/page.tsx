import { db } from "@/lib/db"
import { getSession } from "@/lib/auth"
import type { Simulation } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EfficiencyChart, MoistureChart } from "@/components/dashboard-charts"
import { Droplet, Activity, MapPin, AlertCircle } from "lucide-react"
import { redirect } from "next/navigation"

export default async function OverviewPage() {
  const session = await getSession()
  if (!session) redirect("/login")
  
  const userId = session.userId as string

  const farmsCount = await db.farm.count({ where: { userId } })
  const simCount = await db.simulation.count({ where: { userId } })
  
  const recentSims = await db.simulation.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 10
  })

  const avgEfficiency = recentSims.length > 0
    ? (recentSims.reduce((acc: number, curr: Simulation) => acc + curr.efficiencyScore, 0) / recentSims.length).toFixed(1)
    : "0"

  const criticalIssues = recentSims.filter((s: Simulation) => s.riskLevel === 'Critical').length

  // Generate chart data
  const effData = recentSims.map((s: Simulation, i: number) => ({
    name: `Sim ${recentSims.length - i}`,
    efficiency: s.efficiencyScore
  })).reverse() // chronological

  const moistData = recentSims.map((s: Simulation, i: number) => ({
    name: `Sim ${recentSims.length - i}`,
    moisture: s.soilMoisture
  })).reverse() // Chronological tracking

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Overview</h2>
        <p className="text-muted-foreground mt-2">Monitor agricultural health and irrigation optimization.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Simulations</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{simCount}</div>
            <p className="text-xs text-muted-foreground">Historical actions</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Water Efficiency</CardTitle>
            <Droplet className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgEfficiency}%</div>
            <p className="text-xs text-muted-foreground">Past 10 simulations</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Farms</CardTitle>
            <MapPin className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmsCount}</div>
            <p className="text-xs text-muted-foreground">Managed locations</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{criticalIssues}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Water-Use Efficiency Trend</CardTitle>
            <CardDescription>Efficiency over the last 10 simulation phases</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <EfficiencyChart data={effData.length > 0 ? effData : [{name:'Demo', efficiency: 90}]} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Soil Moisture Snapshot</CardTitle>
            <CardDescription>Soil moisture tracking across recent simulations</CardDescription>
          </CardHeader>
          <CardContent>
             <MoistureChart data={moistData.length > 0 ? moistData : [{name:'F1', moisture: 25}]} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { db } from "@/lib/db"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function HistoryPage() {
   const session = await getSession();
   if (!session) redirect("/login");

   const simulations = await db.simulation.findMany({
      where: { userId: session.userId as string },
      include: { farm: true },
      orderBy: { createdAt: 'desc' },
      take: 50
   });

   return (
      <div className="space-y-6">
         <div>
            <h2 className="text-3xl font-bold tracking-tight">Simulation Logs</h2>
            <p className="text-muted-foreground mt-2">Historical archive of evaluated states and recommendations.</p>
         </div>

         <Card className="overflow-hidden border-primary/10 shadow-lg">
            <CardContent className="p-0">
               <Table>
                  <TableHeader>
                     <TableRow className="bg-muted/50">
                        <TableHead>Date</TableHead>
                        <TableHead>Farm</TableHead>
                        <TableHead>Crop</TableHead>
                        <TableHead>Soil Moist.</TableHead>
                        <TableHead>Decision</TableHead>
                        <TableHead>Efficiency</TableHead>
                        <TableHead>Risk</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {simulations.map((sim) => (
                        <TableRow key={sim.id}>
                           <TableCell className="whitespace-nowrap">{new Date(sim.createdAt).toLocaleDateString()}</TableCell>
                           <TableCell className="font-medium">{sim.farm.name}</TableCell>
                           <TableCell>{sim.cropType}</TableCell>
                           <TableCell>{sim.soilMoisture}%</TableCell>
                           <TableCell>
                              {sim.irrigationRequired ? (
                                 <span className="text-blue-500 font-semibold">{sim.recommendedWater} mm</span>
                              ) : (
                                 <span className="text-muted-foreground">None</span>
                              )}
                           </TableCell>
                           <TableCell>{sim.efficiencyScore}%</TableCell>
                           <TableCell>
                              <Badge variant="outline" className={
                                 sim.riskLevel === 'Critical' ? 'border-destructive text-destructive' 
                                 : sim.riskLevel === 'Warning' ? 'border-orange-500 text-orange-500' 
                                 : 'border-primary text-primary'
                              }>
                                 {sim.riskLevel}
                              </Badge>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </CardContent>
         </Card>
      </div>
   )
}

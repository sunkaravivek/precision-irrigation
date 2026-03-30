import { db } from "@/lib/db"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database } from "lucide-react"

export default async function DatasetsPage() {
   const session = await getSession();
   if (!session) redirect("/login");

   const crops = await db.cropDataset.findMany();
   const soils = await db.soilDataset.findMany();

   return (
      <div className="space-y-6 max-w-6xl mx-auto">
         <div>
            <h2 className="text-3xl font-bold tracking-tight">Public Reference Datasets</h2>
            <p className="text-muted-foreground mt-2">Agronomic data constants used by the Simulation Engine.</p>
         </div>

         <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-md border-primary/20">
               <CardHeader className="bg-muted/30">
                  <CardTitle className="text-lg flex items-center gap-2">
                     <Database className="w-5 h-5 text-primary"/> Crop Parameters
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-0 overflow-hidden rounded-b-lg">
                  <Table>
                     <TableHeader>
                        <TableRow className="bg-muted/50">
                           <TableHead>Crop</TableHead>
                           <TableHead>Stage</TableHead>
                           <TableHead>Kc Value</TableHead>
                           <TableHead>Req (mm)</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {crops.map((c) => (
                           <TableRow key={c.id}>
                              <TableCell className="font-medium text-emerald-600 dark:text-emerald-400">{c.crop}</TableCell>
                              <TableCell>{c.growthStage}</TableCell>
                              <TableCell>{c.kcValue}</TableCell>
                              <TableCell>{c.waterRequirement}</TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </CardContent>
            </Card>

            <Card className="shadow-md border-blue-500/20">
               <CardHeader className="bg-muted/30">
                  <CardTitle className="text-lg flex items-center gap-2">
                     <Database className="w-5 h-5 text-blue-500"/> Soil Capacities
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-0 overflow-hidden rounded-b-lg">
                  <Table>
                     <TableHeader>
                        <TableRow className="bg-muted/50">
                           <TableHead>Type</TableHead>
                           <TableHead>Capacity (%)</TableHead>
                           <TableHead>Wilting Pt. (%)</TableHead>
                           <TableHead>Infil (mm/hr)</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {soils.map((s) => (
                           <TableRow key={s.id}>
                              <TableCell className="font-medium text-blue-600 dark:text-blue-400">{s.soilType}</TableCell>
                              <TableCell>{s.fieldCapacity}</TableCell>
                              <TableCell>{s.wiltingPoint}</TableCell>
                              <TableCell>{s.infiltrationRate}</TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}

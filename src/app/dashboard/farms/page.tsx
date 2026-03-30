import { db } from "@/lib/db"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { AddFarmDialog } from "@/components/add-farm-dialog"

export default async function FarmsPage() {
  const session = await getSession()
  if (!session) redirect("/login")
  
  const farms = await db.farm.findMany({ where: { userId: session.userId as string } })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Farm Management</h2>
          <p className="text-muted-foreground mt-2">Manage your active irrigation fields and zones.</p>
        </div>
        <AddFarmDialog />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {farms.map(farm => (
           <Card key={farm.id} className="hover:shadow-lg transition-all border-primary/10">
              <CardHeader className="bg-muted/20">
                 <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" /> {farm.name}
                 </CardTitle>
                 <CardDescription>{farm.location}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-2">
                 <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Area</span>
                    <span className="font-medium">{farm.area} hectares</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Crop</span>
                    <span className="font-medium">{farm.cropType}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Soil Type</span>
                    <span className="font-medium">{farm.soilType}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Method</span>
                    <span className="font-medium">{farm.irrigationMethod}</span>
                 </div>
              </CardContent>
           </Card>
        ))}
        {farms.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
            No farms found. Add one to get started.
          </div>
        )}
      </div>
    </div>
  )
}

"use client"
import { useState } from "react"
import { createFarm } from "@/actions/farm"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { toast } from "sonner"

export function AddFarmDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const res = await createFarm(formData)
    
    setLoading(false)
    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success("Farm added successfully!")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
        <Plus className="w-4 h-4 mr-2"/> Add New Farm
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register New Farm</DialogTitle>
          <DialogDescription>
            Enter the details of your agricultural zone for simulation tracking.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" name="name" className="col-span-3" placeholder="e.g. North Zone Plot A" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">Location</Label>
            <Input id="location" name="location" className="col-span-3" placeholder="e.g. Punjab, India" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right">Area (ha)</Label>
            <Input id="area" name="area" type="number" step="0.1" className="col-span-3" placeholder="0.0" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cropType" className="text-right">Main Crop</Label>
            <Select name="cropType" defaultValue="Paddy (Rice)">
              <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Paddy (Rice)">Paddy (Rice)</SelectItem>
                <SelectItem value="Wheat">Wheat</SelectItem>
                <SelectItem value="Millet">Millet</SelectItem>
                <SelectItem value="Sugarcane">Sugarcane</SelectItem>
                <SelectItem value="Cotton">Cotton</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="soilType" className="text-right">Soil Profile</Label>
            <Select name="soilType" defaultValue="Black Cotton">
              <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Black Cotton">Black Cotton Soil</SelectItem>
                <SelectItem value="Alluvial">Alluvial Soil</SelectItem>
                <SelectItem value="Red Soil">Red Soil</SelectItem>
                <SelectItem value="Loamy">Loamy</SelectItem>
              </SelectContent>
            </Select>
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="irrigationMethod" className="text-right">Method</Label>
            <Select name="irrigationMethod" defaultValue="Drip">
              <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Drip">Drip Irrigation</SelectItem>
                <SelectItem value="Sprinkler">Sprinkler</SelectItem>
                <SelectItem value="Surface">Surface / Border</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Registering..." : "Save Farm"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"
import { useState } from "react"
import { register } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    // Server action register
    const res = await register(formData)
    
    if (res?.error) {
      toast.error(res.error)
      setLoading(false)
    } else {
      toast.success("Registration successful")
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <Card className="w-full max-w-md shadow-2xl border-primary/20 bg-background/90 backdrop-blur">
      <CardHeader className="space-y-1 text-center pb-6 border-b border-primary/10">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-primary/10 ring-1 ring-primary/30">
             <Leaf className="w-8 h-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Create Account</CardTitle>
        <CardDescription>
          Setup your precision irrigation portal
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" type="text" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="john@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full text-md font-semibold" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </Button>
          <div className="text-sm text-center text-muted-foreground w-full">
            Already have an account? <a href="/login" className="text-primary hover:underline font-medium">Log in</a>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}

"use client"
import { useState } from "react"
import { login } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    // Server action login
    const res = await login(formData)
    
    if (res?.error) {
      toast.error(res.error)
      setLoading(false)
    } else {
      toast.success("Login successful")
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <Card className="w-full max-w-md shadow-2xl border-primary/20 bg-background/90 backdrop-blur">
      <CardHeader className="space-y-1 text-center pb-8 border-b border-primary/10">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-primary/10 ring-1 ring-primary/30">
             <Leaf className="w-8 h-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back</CardTitle>
        <CardDescription>
          Enter your credentials to access the simulation dashboard
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="demo@example.com" required defaultValue="demo@example.com" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <span className="text-xs text-muted-foreground">(password123)</span>
            </div>
            <Input id="password" name="password" type="password" required defaultValue="password123" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full text-md font-semibold" type="submit" disabled={loading}>
            {loading ? "Authenticating..." : "Sign In"}
          </Button>
          <div className="text-sm text-center text-muted-foreground w-full">
            Don't have an account? <a href="/signup" className="text-primary hover:underline font-medium">Register here</a>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}

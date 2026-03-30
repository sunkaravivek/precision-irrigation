"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, Leaf } from "lucide-react"
import { logout } from "@/actions/auth"
import { Button } from "./ui/button"

export function Navbar() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block text-primary">PrecisionAgri</span>
        </Link>
        
        {/* Only show these nav items if we are not on the marketing landing page (approximate check) */}
        {pathname !== '/' && (
          <div className="flex flex-1 items-center space-x-6 ml-8 hidden md:flex">
             <Link href="/dashboard" className={`text-sm font-medium transition-colors hover:text-primary ${pathname==='/dashboard' ? 'text-primary' : 'text-muted-foreground'}`}>Overview</Link>
             <Link href="/dashboard/simulation" className={`text-sm font-medium transition-colors hover:text-primary ${pathname?.includes('/simulation') ? 'text-primary' : 'text-muted-foreground'}`}>Simulator</Link>
             <Link href="/dashboard/farms" className={`text-sm font-medium transition-colors hover:text-primary ${pathname?.includes('/farms') ? 'text-primary' : 'text-muted-foreground'}`}>Farms</Link>
          </div>
        )}

        <div className="flex items-center space-x-4">
          {pathname !== '/' ? (
             <form action={logout}>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </form>
          ) : (
             <div className="space-x-2">
                <Link href="/login"><Button variant="ghost">Login</Button></Link>
                <Link href="/signup"><Button>Get Started</Button></Link>
             </div>
          )}
        </div>
      </div>
    </header>
  )
}

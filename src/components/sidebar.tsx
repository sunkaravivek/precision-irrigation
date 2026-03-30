"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, LeafyGreen, LineChart, Map, Network, Database, History } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/farms", icon: Map, label: "Farms" },
  { href: "/dashboard/simulation", icon: LeafyGreen, label: "Run Simulation" },
  { href: "/dashboard/state-explorer", icon: Network, label: "State Explorer" },
  { href: "/dashboard/datasets", icon: Database, label: "Datasets" },
  { href: "/dashboard/analytics", icon: LineChart, label: "Analytics" },
  { href: "/dashboard/history", icon: History, label: "History" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex flex-col w-64 border-r min-h-[calc(100vh-4rem)] p-4 space-y-2 bg-card">
      <div className="mb-4 px-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
        Dashboard
      </div>
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`) && item.href !== '/dashboard'
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
              isActive 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

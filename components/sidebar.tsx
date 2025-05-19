"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { NavItem } from "@/components/ui/nav-item"
import {
  LayoutDashboard,
  Users,
  Trophy,
  BarChart2,
  Layers,
  BarChart,
  Shield,
  Settings,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
  activePath: string
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, activePath }) => {
  return (
    <>
      {isOpen && (
        <div
          className={cn("fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden", "transition-all duration-500")}
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={cn(
          "w-[280px] h-full bg-[#09090b]/95 backdrop-blur-2xl flex flex-col pt-4 fixed inset-y-0 left-0 z-50 transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:translate-x-0 lg:static lg:z-auto border-r border-[#222224]",
          "after:absolute after:right-0 after:top-0 after:h-full after:w-[1px] after:bg-gradient-to-b after:from-blue-500/20 after:via-blue-500/10 after:to-transparent",
          "before:absolute before:right-0 before:top-0 before:h-full before:w-[1px] before:shadow-[0_0_15px_rgba(59,130,246,0.3)] before:transition-opacity before:duration-500",
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full",
        )}
      >
        {/* Toggle button */}
        <button
          onClick={toggleSidebar}
          className={cn(
            "absolute -right-4 top-6 w-8 h-8 rounded-full bg-blue-600",
            "flex items-center justify-center text-white",
            "shadow-lg shadow-blue-500/20",
            "hover:bg-blue-700 transition-all duration-300",
            "lg:hidden",
            "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-blue-600/50 before:to-blue-700/50 before:opacity-0 before:transition-opacity before:duration-300",
            "hover:before:opacity-100",
          )}
        >
          {isOpen ? <ChevronLeft className="w-5 h-5 animate-in" /> : <ChevronRight className="w-5 h-5 animate-in" />}
        </button>

        <div className="px-4 mb-6">
          <a href="/" className="flex items-center gap-2 group">
            <div className="relative h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20 transition-all duration-500 group-hover:shadow-blue-500/30 overflow-hidden">
              <Trophy className="text-white h-5 w-5 relative z-10 transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 to-purple-500 rotate-45 translate-y-full group-hover:translate-y-0 transition-transform duration-1000" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                WINMIX
              </span>
              <span className="text-[9px] -mt-0.5 text-blue-500/90 font-medium tracking-wider">TIPSTER</span>
            </div>
          </a>
        </div>

        <div className="px-3 mb-4">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1.5 overflow-y-auto">
          <NavItem
            href="/"
            icon={<LayoutDashboard size={20} />}
            title="Dashboard"
            subtitle="Overview & Analytics"
            active={activePath === "/"}
          />

          <NavItem
            href="/teams"
            icon={<Users size={20} />}
            title="Teams"
            subtitle="Team Management"
            active={activePath === "/teams"}
            endIcon={
              <ChevronRight
                size={16}
                className="text-gray-500 transition-transform duration-300 group-hover:translate-x-1"
              />
            }
          />

          <NavItem
            href="/matches"
            icon={<Trophy size={20} />}
            title="Matches"
            subtitle="Match Schedules"
            active={activePath === "/matches"}
            endIcon={
              <ChevronRight
                size={16}
                className="text-gray-500 transition-transform duration-300 group-hover:translate-x-1"
              />
            }
          />

          <NavItem
            href="/analysis"
            icon={<BarChart2 size={20} />}
            title="Analysis"
            subtitle="Performance Analytics"
            active={activePath === "/analysis"}
            badge={{ text: "NEW", color: "blue" }}
          />

          <NavItem
            href="/patterns"
            icon={<Layers size={20} />}
            title="Patterns"
            subtitle="Game Patterns"
            active={activePath === "/patterns"}
            endIcon={
              <ChevronRight
                size={16}
                className="text-gray-500 transition-transform duration-300 group-hover:translate-x-1"
              />
            }
          />

          <NavItem
            href="/statistics"
            icon={<BarChart size={20} />}
            title="Statistics"
            subtitle="Advanced Statistics"
            active={activePath === "/statistics"}
            badge={{ text: "BETA", color: "blue" }}
          />

          <NavItem
            href="/league-management"
            icon={<Shield size={20} />}
            title="League Management"
            subtitle="League Operations"
            active={activePath === "/league-management"}
            endIcon={
              <ChevronRight
                size={16}
                className="text-gray-500 transition-transform duration-300 group-hover:translate-x-1"
              />
            }
          />

          <NavItem
            href="/settings"
            icon={<Settings size={20} />}
            title="Settings"
            subtitle="System Settings"
            active={activePath === "/settings"}
            endIcon={
              <ChevronRight
                size={16}
                className="text-gray-500 transition-transform duration-300 group-hover:translate-x-1"
              />
            }
          />
        </nav>

        {/* Pro version banner */}
        <div className="mt-auto mx-3 mb-4">
          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-md p-4 group hover:border-blue-500/20 transition-all duration-300">
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl transition-all duration-500 group-hover:bg-blue-500/20" />
            <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl transition-all duration-500 group-hover:bg-purple-500/20" />

            <div className="relative z-10">
              <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded shadow-lg shadow-blue-500/20">
                PRO
              </span>
              <h4 className="font-medium text-sm mt-2 text-white">Upgrade to Pro Plan</h4>
              <p className="text-xs mt-1 text-gray-300">Get advanced analytics and premium features</p>
              <button className="mt-3 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-medium py-1.5 px-3 rounded transition-all duration-300 hover:shadow-lg hover:shadow-blue-700/20 relative overflow-hidden group">
                <span className="relative z-10">Upgrade Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

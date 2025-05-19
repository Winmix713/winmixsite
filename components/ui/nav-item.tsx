import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  title: string
  subtitle?: string
  active?: boolean
  badge?: {
    text: string
    color: string
  }
  endIcon?: React.ReactNode
}

export const NavItem: React.FC<NavItemProps> = ({ href, icon, title, subtitle, active, badge, endIcon }) => {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ease-out",
        active ? "sidebar-active text-white" : "text-white/70 hover:bg-white/5 hover:text-white sidebar-item",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200",
            active
              ? "bg-gradient-to-br from-blue-500/20 to-blue-600/20 text-blue-500"
              : "text-white/70 group-hover:text-white",
          )}
        >
          {icon}
        </div>
        <div>
          <div className="font-medium leading-none">{title}</div>
          {subtitle && <div className="mt-1 text-xs text-white/50">{subtitle}</div>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {badge && (
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 text-[10px] font-medium",
              badge.color === "blue" ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-400",
            )}
          >
            {badge.text}
          </span>
        )}
        {endIcon}
      </div>
    </Link>
  )
}

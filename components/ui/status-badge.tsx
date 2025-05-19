import { cn } from "@/lib/utils"

type StatusType = "completed" | "live" | "upcoming"

interface StatusBadgeProps {
  status: StatusType
  className?: string
  size?: "sm" | "md" | "lg"
  animated?: boolean
}

export function StatusBadge({ status, className, size = "md", animated = true }: StatusBadgeProps) {
  const getStatusConfig = (status: StatusType) => {
    const baseConfig = {
      wrapper: "relative inline-flex items-center rounded-full font-medium transition-all duration-300",
      indicator: "absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full",
      glow: "absolute inset-0 rounded-full opacity-0 transition-opacity duration-300",
    }

    const configs = {
      completed: {
        bg: "bg-green-500/20",
        text: "text-green-500",
        label: "Completed",
        animation: animated ? "after:bg-green-500" : "",
        border: "border border-green-500/30",
        glow: `${baseConfig.glow} bg-green-500/10`,
        indicator: `${baseConfig.indicator} bg-green-500`,
      },
      live: {
        bg: "bg-red-500/20",
        text: "text-red-500",
        label: "Live",
        animation: animated ? "after:bg-red-500 after:animate-pulse" : "",
        border: "border border-red-500/30",
        glow: `${baseConfig.glow} bg-red-500/10`,
        indicator: `${baseConfig.indicator} bg-red-500`,
      },
      upcoming: {
        bg: "bg-blue-500/20",
        text: "text-blue-500",
        label: "Upcoming",
        animation: animated ? "after:bg-blue-500" : "",
        border: "border border-blue-500/30",
        glow: `${baseConfig.glow} bg-blue-500/10`,
        indicator: `${baseConfig.indicator} bg-blue-500`,
      },
    }

    return configs[status]
  }

  const getSizeConfig = (size: "sm" | "md" | "lg") => {
    const configs = {
      sm: "px-1.5 py-0.5 text-xs after:h-1.5 after:w-1.5",
      md: "px-2 py-1 text-xs after:h-2 after:w-2",
      lg: "px-3 py-1.5 text-sm after:h-2.5 after:w-2.5",
    }
    return configs[size]
  }

  const config = getStatusConfig(status)
  const sizeClass = getSizeConfig(size)

  return (
    <span
      className={cn(
        "group",
        config.wrapper,
        config.bg,
        config.text,
        config.border,
        sizeClass,
        "hover:shadow-lg",
        className,
      )}
    >
      <div className={config.glow} />
      {config.label}
      <span className={cn(config.indicator, "opacity-70 transition-all duration-300", animated && "animate-pulse")} />
    </span>
  )
}

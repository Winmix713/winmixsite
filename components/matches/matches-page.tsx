import { cn } from "@/lib/utils"

interface PerformanceBarProps {
  label: string
  value: number
  color: "emerald" | "blue" | "purple" | "amber" | "red"
}

function PerformanceBar({ label, value, color }: PerformanceBarProps) {
  const colorMap = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    amber: "bg-amber-500",
    red: "bg-red-500",
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-400">{label}</span>
        <span className="text-sm font-medium text-gray-400">{value}%</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2.5">
        <div
          className={cn("h-2.5 rounded-full", colorMap[color as keyof typeof colorMap])}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  )
}

export default function MatchesPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Matches</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-lg shadow-md p-5">
          <h2 className="text-xl font-semibold mb-3">Match 1</h2>
          <PerformanceBar label="Attack" value={75} color="emerald" />
          <PerformanceBar label="Defense" value={60} color="blue" />
          <PerformanceBar label="Midfield" value={80} color="purple" />
        </div>

        <div className="bg-gray-900 rounded-lg shadow-md p-5">
          <h2 className="text-xl font-semibold mb-3">Match 2</h2>
          <PerformanceBar label="Attack" value={50} color="amber" />
          <PerformanceBar label="Defense" value={90} color="red" />
          <PerformanceBar label="Midfield" value={70} color="emerald" />
        </div>

        <div className="bg-gray-900 rounded-lg shadow-md p-5">
          <h2 className="text-xl font-semibold mb-3">Match 3</h2>
          <PerformanceBar label="Attack" value={85} color="blue" />
          <PerformanceBar label="Defense" value={45} color="purple" />
          <PerformanceBar label="Midfield" value={95} color="amber" />
        </div>
      </div>
    </div>
  )
}

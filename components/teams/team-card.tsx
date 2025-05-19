"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Trophy, Users } from "lucide-react"

interface Team {
  id: string
  name: string
  stadium: string
  founded: number
  color: string
}

interface TeamCardProps {
  team: Team
  view: "grid" | "list"
}

export default function TeamCard({ team, view }: TeamCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = -(y / rect.height) * 5
    const rotateY = (x / rect.width) * 5
    setRotation({ x: rotateX, y: rotateY })
  }

  // Mock data for the team card
  const stats = {
    wins: 12,
    draws: 5,
    losses: 3,
    points: 41,
    players: 25,
  }

  const recentResults = ["W", "W", "D", "L", "W"]

  const getResultColor = (result: string) => {
    switch (result) {
      case "W":
        return "bg-emerald-500"
      case "D":
        return "bg-amber-500"
      case "L":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  if (view === "list") {
    return (
      <motion.div
        className="group relative bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-md rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_10px_40px_rgba(59,130,246,0.25)] border border-white/10 hover:border-blue-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-2 h-2 sm:h-auto" style={{ backgroundColor: team.color }}></div>
          <div className="flex-1 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Image
                  src={`/placeholder.svg?height=32&width=32`}
                  alt={`${team.name} Logo`}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
                  {team.name}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-white/60 mt-1">
                  <div className="flex items-center gap-1">
                    <span>{team.stadium}</span>
                  </div>
                  <div className="hidden sm:block text-white/30">•</div>
                  <div className="flex items-center gap-1">
                    <span>Founded {team.founded}</span>
                  </div>
                </div>
              </div>
            </div>
            <Link
              href={`/team/${team.id}`}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-700/20"
            >
              View Team
            </Link>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="group relative bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_10px_40px_rgba(59,130,246,0.25)] border border-white/10 hover:border-blue-500/20"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        transform: isHovering
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          : "perspective(1000px) rotateX(0) rotateY(0)",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setRotation({ x: 0, y: 0 })
      }}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glass reflection effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent rounded-2xl pointer-events-none transition-opacity duration-700 transform -rotate-12"></div>

      {/* Content container */}
      <div className="relative flex flex-col h-full p-5 z-10 group-hover:translate-y-[-5px] transition-transform duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Image
                src={`/placeholder.svg?height=32&width=32`}
                alt={`${team.name} Logo`}
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
                {team.name}
              </h2>
              <p className="text-xs text-white/60">{team.stadium}</p>
            </div>
          </div>
          <button
            className="text-white/80 hover:text-blue-400 transition-colors h-8 w-8 bg-white/5 rounded-full flex items-center justify-center transform group-hover:rotate-2 group-hover:scale-110"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-white/5 rounded-lg p-2 backdrop-blur-sm">
            <p className="text-base font-bold text-white">{stats.wins}</p>
            <p className="text-xs text-white/60">Wins</p>
          </div>
          <div className="bg-white/5 rounded-lg p-2 backdrop-blur-sm">
            <p className="text-base font-bold text-white">{stats.draws}</p>
            <p className="text-xs text-white/60">Draws</p>
          </div>
          <div className="bg-white/5 rounded-lg p-2 backdrop-blur-sm">
            <p className="text-base font-bold text-white">{stats.losses}</p>
            <p className="text-xs text-white/60">Losses</p>
          </div>
        </div>

        {/* Recent Results */}
        <div className="mb-3">
          <h3 className="text-white/80 text-xs font-medium mb-1.5">Recent Results</h3>
          <div className="flex gap-1.5">
            {recentResults.map((result, index) => (
              <div
                key={index}
                className={`w-6 h-6 rounded-md flex items-center justify-center text-white font-medium text-xs ${getResultColor(
                  result,
                )}`}
              >
                {result}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-auto grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <div>
              <p className="text-base font-bold text-white">{stats.points}</p>
              <p className="text-xs text-white/60">Points</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
            <Users className="w-4 h-4 text-blue-500" />
            <div>
              <p className="text-base font-bold text-white">{stats.players}</p>
              <p className="text-xs text-white/60">Players</p>
            </div>
          </div>
        </div>

        {/* View details button */}
        <Link
          href={`/team/${team.id}`}
          className="w-full mt-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs py-2 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transform group-hover:scale-105 flex items-center justify-center"
        >
          View Team Details
        </Link>
      </div>

      {/* Glass border effect */}
      <div className="absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none group-hover:border-gradient-to-r group-hover:from-blue-500/30 group-hover:to-blue-600/30 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
    </motion.div>
  )
}

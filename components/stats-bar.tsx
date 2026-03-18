"use client"

import { Car } from "@/lib/cars-data"
import { useLanguage } from "@/lib/language-context"
import { Car as CarIcon, Leaf, TrendingDown, Zap, LayoutGrid } from "lucide-react"

interface StatsBarProps {
  cars: Car[]
}

export function StatsBar({ cars }: StatsBarProps) {
  const { t } = useLanguage()
  const totalCars = cars.length
  const electricCount = cars.filter((c) => c.fuel === "Electrique").length
  const avgCo2 = Math.round(cars.reduce((sum, c) => sum + c.co2, 0) / totalCars)
  const greenCount = cars.filter((c) => c.carbonGrade === "A" || c.carbonGrade === "B").length
  const categoryCount = new Set(cars.map((c) => c.category)).size

  const stats = [
    {
      icon: CarIcon,
      label: t("vehiclesLabel"),
      value: totalCars.toString(),
    },
    {
      icon: LayoutGrid,
      label: t("categoriesLabel"),
      value: categoryCount.toString(),
    },
    {
      icon: Zap,
      label: t("electric"),
      value: electricCount.toString(),
    },
    {
      icon: TrendingDown,
      label: t("avgCo2"),
      value: `${avgCo2} g/km`,
    },
    {
      icon: Leaf,
      label: t("classAB"),
      value: greenCount.toString(),
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <stat.icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-lg font-black text-card-foreground font-mono leading-tight">
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

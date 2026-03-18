"use client"

import { useState, useMemo } from "react"
import {
  type CarbonGrade,
  type VehicleCategory,
  cars as allCars,
  vehicleCategoryConfig,
  allCategories,
} from "@/lib/cars-data"
import { CarCard } from "@/components/car-card"
import { FilterSidebar } from "@/components/filter-sidebar"
import { StatsBar } from "@/components/stats-bar"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"
import { Leaf, LayoutGrid, List, SlidersHorizontal } from "lucide-react"

export function CarListing() {
  const { t, language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGrades, setSelectedGrades] = useState<CarbonGrade[]>([])
  const [selectedFuels, setSelectedFuels] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<VehicleCategory[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [viewMode, setViewMode] = useState<"category" | "flat">("category")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const handleGradeToggle = (grade: CarbonGrade) => {
    setSelectedGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    )
  }

  const handleFuelToggle = (fuel: string) => {
    setSelectedFuels((prev) =>
      prev.includes(fuel) ? prev.filter((f) => f !== fuel) : [...prev, fuel]
    )
  }

  const handleCategoryToggle = (category: VehicleCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const handleLocationToggle = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    )
  }

  const filteredCars = useMemo(() => {
    let result = [...allCars]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (car) =>
          car.brand.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query) ||
          car.location.toLowerCase().includes(query)
      )
    }

    if (selectedGrades.length > 0) {
      result = result.filter((car) => selectedGrades.includes(car.carbonGrade))
    }

    if (selectedFuels.length > 0) {
      result = result.filter((car) => selectedFuels.includes(car.fuel))
    }

    if (selectedCategories.length > 0) {
      result = result.filter((car) => selectedCategories.includes(car.category))
    }

    if (selectedLocations.length > 0) {
      result = result.filter((car) => selectedLocations.includes(car.location))
    }

    result.sort((a, b) =>
      sortOrder === "asc" ? a.co2 - b.co2 : b.co2 - a.co2
    )

    return result
  }, [searchQuery, selectedGrades, selectedFuels, selectedCategories, selectedLocations, sortOrder])

  const groupedCars = useMemo(() => {
    const groups: Record<VehicleCategory, typeof filteredCars> = {} as Record<
      VehicleCategory,
      typeof filteredCars
    >
    for (const category of allCategories) {
      const carsInCategory = filteredCars.filter((car) => car.category === category)
      if (carsInCategory.length > 0) {
        groups[category] = carsInCategory
      }
    }
    return groups
  }, [filteredCars])

  let firstCardRendered = false

  const activeFilterCount =
    selectedGrades.length + selectedFuels.length + selectedCategories.length + selectedLocations.length

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left sidebar filters */}
      <FilterSidebar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGrades={selectedGrades}
        onGradeToggle={handleGradeToggle}
        selectedFuels={selectedFuels}
        onFuelToggle={handleFuelToggle}
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        selectedLocations={selectedLocations}
        onLocationToggle={handleLocationToggle}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        allCars={allCars}
        totalResults={filteredCars.length}
        mobileOpen={mobileFiltersOpen}
        onMobileClose={() => setMobileFiltersOpen(false)}
      />

      {/* Right content area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <div className="flex items-center gap-3">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
                aria-label={t("filters")}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                {t("filters")}
                {activeFilterCount > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                  <Leaf className="h-4.5 w-4.5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-black text-card-foreground font-mono tracking-tight leading-tight">
                    {t("siteName")}
                  </h1>
                  <p className="hidden text-[11px] text-muted-foreground sm:block">
                    {t("tagline")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Language switcher */}
              <LanguageSwitcher />

              {/* View mode toggle */}
              <div className="hidden items-center gap-1 rounded-lg border border-border p-0.5 md:flex">
                <button
                  onClick={() => setViewMode("category")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    viewMode === "category"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label={t("categories")}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  {t("categories")}
                </button>
                <button
                  onClick={() => setViewMode("flat")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    viewMode === "flat"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label={t("all")}
                >
                  <List className="h-3.5 w-3.5" />
                  {t("all")}
                </button>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {filteredCars.length} {filteredCars.length !== 1 ? t("vehiclesPlural") : t("vehicles")}
              </span>
            </div>
          </div>
        </header>

        {/* Main scrollable content */}
        <main className="flex-1 px-4 py-6 md:px-6">
          <div className="flex flex-col gap-6">
            {/* Stats */}
            <StatsBar cars={allCars} />

            {/* Results */}
            {filteredCars.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Leaf className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold text-card-foreground">
                  {t("noVehicleFound")}
                </h3>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  {t("tryDifferentFilters")}
                </p>
              </div>
            ) : viewMode === "category" ? (
              <div className="flex flex-col gap-8">
                {(Object.keys(groupedCars) as VehicleCategory[]).map(
                  (category) => {
                    const carsInGroup = groupedCars[category]
                    const categoryConfig = vehicleCategoryConfig[category]
                    const avgCo2 = Math.round(
                      carsInGroup.reduce((sum, c) => sum + c.co2, 0) /
                        carsInGroup.length
                    )

                    return (
                      <section key={category}>
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                              <Leaf className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h2 className="text-lg font-bold text-foreground font-mono">
                                {t(category as keyof typeof import("@/lib/translations").translations.fr)}
                              </h2>
                              <p className="text-xs text-muted-foreground">
                                {carsInGroup.length} {carsInGroup.length !== 1 ? t("vehiclesPlural") : t("vehicles")} &middot;
                                {t("avgCo2Label")}: {avgCo2} g/km
                              </p>
                            </div>
                          </div>
                          <div className="hidden items-center gap-2 md:flex">
                            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${Math.min(100, (avgCo2 / 270) * 100)}%`,
                                  backgroundColor:
                                    avgCo2 <= 50
                                      ? "#22c55e"
                                      : avgCo2 <= 100
                                        ? "#34d399"
                                        : avgCo2 <= 140
                                          ? "#facc15"
                                          : avgCo2 <= 200
                                            ? "#fb923c"
                                            : "#ef4444",
                                }}
                              />
                            </div>
                            <span className="text-xs font-mono font-semibold text-muted-foreground">
                              {avgCo2} g/km
                            </span>
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                          {carsInGroup.map((car) => {
                            const isPriority = !firstCardRendered
                            if (isPriority) firstCardRendered = true
                            return (
                              <CarCard
                                key={car.id}
                                car={car}
                                priority={isPriority}
                              />
                            )
                          })}
                        </div>
                      </section>
                    )
                  }
                )}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCars.map((car, index) => (
                  <CarCard key={car.id} car={car} priority={index < 3} />
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-border bg-card">
          <div className="px-4 py-6 md:px-6">
            <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
              <p>{t("footerText")}</p>
              <p className="text-xs">{t("footerNote")}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

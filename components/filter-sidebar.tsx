"use client"

import { useMemo, useState } from "react"
import {
  type Car,
  type CarbonGrade,
  type VehicleCategory,
  carbonGradeConfig,
  vehicleCategoryConfig,
  allCategories,
} from "@/lib/cars-data"
import { useLanguage } from "@/lib/language-context"
import {
  Search,
  SlidersHorizontal,
  Car,
  Zap as ZapIcon,
  ArrowUpDown,
  X,
  Filter,
  MapPin,
} from "lucide-react"

interface FilterSidebarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedGrades: CarbonGrade[]
  onGradeToggle: (grade: CarbonGrade) => void
  selectedFuels: string[]
  onFuelToggle: (fuel: string) => void
  selectedCategories: VehicleCategory[]
  onCategoryToggle: (category: VehicleCategory) => void
  selectedLocations: string[]
  onLocationToggle: (location: string) => void
  sortOrder: "asc" | "desc"
  onSortOrderChange: (order: "asc" | "desc") => void
  allCars: Car[]
  totalResults: number
  mobileOpen: boolean
  onMobileClose: () => void
}

const allGrades: CarbonGrade[] = ["A", "B", "C", "D", "E", "F", "G"]
const allFuels = ["Electrique", "Hybride", "Essence", "Diesel"]

export function FilterSidebar({
  searchQuery,
  onSearchChange,
  selectedGrades,
  onGradeToggle,
  selectedFuels,
  onFuelToggle,
  selectedCategories,
  onCategoryToggle,
  selectedLocations,
  onLocationToggle,
  sortOrder,
  onSortOrderChange,
  allCars,
  totalResults,
  mobileOpen,
  onMobileClose,
}: FilterSidebarProps) {
  const { t } = useLanguage()
  const activeFilterCount =
    selectedGrades.length + selectedFuels.length + selectedCategories.length + selectedLocations.length

  const [locationSearch, setLocationSearch] = useState("")

  // Compute location counts from all cars, sorted desc by count
  const locationCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const car of allCars) {
      counts[car.location] = (counts[car.location] || 0) + 1
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [allCars])

  const filteredLocations = useMemo(() => {
    if (!locationSearch.trim()) return locationCounts
    const q = locationSearch.toLowerCase().trim()
    return locationCounts.filter(([loc]) => loc.toLowerCase().includes(q))
  }, [locationCounts, locationSearch])

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-border bg-card shadow-lg transition-transform duration-300 lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:translate-x-0 lg:shadow-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-card-foreground uppercase tracking-wider">
              {t("filters")}
            </span>
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button
            onClick={onMobileClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
            aria-label={t("close")}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable filter content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="flex flex-col gap-6">
            {/* Search */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="search-input"
                className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
              >
                {t("search")}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="search-input"
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-border" />

            {/* Type de vehicule */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                <Car className="h-3 w-3" />
                {t("vehicleType")}
              </div>
              <div className="flex flex-col gap-1.5">
                {allCategories.map((category) => {
                  const isSelected = selectedCategories.includes(category)
                  const translatedLabel = t(category as keyof typeof import("@/lib/translations").translations.fr)
                  return (
                    <button
                      key={category}
                      onClick={() => onCategoryToggle(category)}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                      aria-label={translatedLabel}
                      aria-pressed={isSelected}
                    >
                      <span className="flex-1 text-left">{translatedLabel}</span>
                      {isSelected && (
                        <X className="h-3 w-3 opacity-70" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-border" />

            {/* Etiquette carbone */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                <SlidersHorizontal className="h-3 w-3" />
                {t("carbonLabel")}
              </div>
              <div className="flex flex-col gap-1">
                {allGrades.map((grade) => {
                  const config = carbonGradeConfig[grade]
                  const isSelected = selectedGrades.includes(grade)
                  return (
                    <button
                      key={grade}
                      onClick={() => onGradeToggle(grade)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 transition-all duration-200 hover:bg-muted/50"
                      aria-label={`${t("filterByLabel")} ${grade}`}
                      aria-pressed={isSelected}
                    >
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold font-mono transition-all"
                        style={{
                          backgroundColor: isSelected
                            ? config.bgColor
                            : "transparent",
                          color: isSelected ? config.color : config.borderColor,
                          border: `2px solid ${isSelected ? config.borderColor : `${config.borderColor}50`}`,
                          transform: isSelected ? "scale(1.05)" : "scale(1)",
                        }}
                      >
                        {grade}
                      </div>
                      <div className="flex flex-1 flex-col items-start">
                        <span
                          className={`text-xs font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {t("classLabel")} {grade}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {config.range}
                        </span>
                      </div>
                      {isSelected && (
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: config.borderColor }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-border" />

            {/* Carburant */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                <ZapIcon className="h-3 w-3" />
                {t("fuel")}
              </div>
              <div className="flex flex-col gap-1.5">
                {allFuels.map((fuel) => {
                  const isSelected = selectedFuels.includes(fuel)
                  const translatedFuel = t(fuel as keyof typeof import("@/lib/translations").translations.fr)
                  return (
                    <button
                      key={fuel}
                      onClick={() => onFuelToggle(fuel)}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                      aria-label={translatedFuel}
                      aria-pressed={isSelected}
                    >
                      {fuel === "Electrique" && (
                        <ZapIcon className="h-3 w-3 shrink-0" />
                      )}
                      <span className="flex-1 text-left">{translatedFuel}</span>
                      {isSelected && (
                        <X className="h-3 w-3 opacity-70" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-border" />

            {/* Localisation */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                <MapPin className="h-3 w-3" />
                {t("location")}
              </div>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("searchCity")}
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background py-1.5 pl-8 pr-8 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  aria-label={t("searchLocation")}
                />
                {locationSearch && (
                  <button
                    onClick={() => setLocationSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={t("clearSearch")}
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
              <div className="flex max-h-52 flex-col gap-1.5 overflow-y-auto pr-1">
                {filteredLocations.length === 0 ? (
                  <p className="px-3 py-2 text-xs text-muted-foreground text-center">
                    {t("noCityFound")}
                  </p>
                ) : null}
                {filteredLocations.map(([location, count]) => {
                  const isSelected = selectedLocations.includes(location)
                  return (
                    <button
                      key={location}
                      onClick={() => onLocationToggle(location)}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                      aria-label={`${t("filterByLocation")} ${location}`}
                      aria-pressed={isSelected}
                    >
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="flex-1 text-left">{location}</span>
                      <span
                        className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                          isSelected
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-border" />

            {/* Tri CO2 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                <ArrowUpDown className="h-3 w-3" />
                {t("co2Sort")}
              </div>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => onSortOrderChange("asc")}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 ${
                    sortOrder === "asc"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span className="flex-1 text-left">{t("leastPolluting")}</span>
                </button>
                <button
                  onClick={() => onSortOrderChange("desc")}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 ${
                    sortOrder === "desc"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span className="flex-1 text-left">{t("mostPolluting")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar footer */}
        <div className="border-t border-border px-5 py-3">
          <p className="text-center text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{totalResults}</span> {totalResults !== 1 ? t("vehiclesPlural") : t("vehicles")} {t("found")}
          </p>
        </div>
      </aside>
    </>
  )
}

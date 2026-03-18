"use client"

import { useState } from "react"
import Image from "next/image"
import { Car, carbonGradeConfig } from "@/lib/cars-data"
import { CarbonSticker } from "@/components/carbon-sticker"
import { useLanguage } from "@/lib/language-context"
import {
  MapPin,
  Gauge,
  Fuel,
  Settings2,
  Zap,
  Weight,
  Palette,
  DoorOpen,
  Users,
  Package,
  Cog,
  Shield,
  ChevronDown,
  Battery,
  Copy,
  Check,
  FileSearch,
  CircleCheckBig,
  AlertTriangle,
  Info,
  History,
  MessageSquare,
  Send,
  X,
  ArrowDown,
  ShoppingCart,
} from "lucide-react"

interface CarCardProps {
  car: Car
  priority?: boolean
}

// Map French events to translation keys
const eventTranslationMap: Record<string, string> = {
  "Premiere immatriculation": "eventFirstReg",
  "Premiere immatriculation (import US)": "eventFirstRegImport",
  "Revision constructeur - RAS": "eventRevision",
  "Controle technique - Favorable": "eventControlOk",
  "Controle technique - A surveiller": "eventControlWarning",
  "Reparation carrosserie (choc leger)": "eventBodyRepair",
  "Rappel constructeur effectue": "eventRecall",
}

export function CarCard({ car, priority = false }: CarCardProps) {
  const { t } = useLanguage()
  const gradeConfig = carbonGradeConfig[car.carbonGrade]
  
  // Helper to translate VIN history events
  const translateEvent = (event: string) => {
    const key = eventTranslationMap[event]
    if (key) {
      return t(key as keyof typeof import("@/lib/translations").translations.fr)
    }
    return event
  }
  const [expanded, setExpanded] = useState(false)
  const [vinCopied, setVinCopied] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showNegotiate, setShowNegotiate] = useState(false)
  const [offerPrice, setOfferPrice] = useState("")
  const [offerName, setOfferName] = useState("")
  const [offerEmail, setOfferEmail] = useState("")
  const [offerMessage, setOfferMessage] = useState("")
  const [offerSent, setOfferSent] = useState(false)
  const [showBuy, setShowBuy] = useState(false)
  const [buyName, setBuyName] = useState("")
  const [buyEmail, setBuyEmail] = useState("")
  const [buyPhone, setBuyPhone] = useState("")
  const [buySent, setBuySent] = useState(false)

  const handleSubmitBuy = () => {
    if (!buyName || !buyEmail || !buyPhone) return
    setBuySent(true)
    setTimeout(() => {
      setBuySent(false)
      setShowBuy(false)
      setBuyName("")
      setBuyEmail("")
      setBuyPhone("")
    }, 3000)
  }

  const copyVin = async () => {
    await navigator.clipboard.writeText(car.vin)
    setVinCopied(true)
    setTimeout(() => setVinCopied(false), 2000)
  }

  const suggestedPrice = Math.round(car.price * 0.92)
  const maxDiscount = Math.round(car.price * 0.85)

  const handleSubmitOffer = () => {
    if (!offerPrice || !offerName || !offerEmail) return
    setOfferSent(true)
    setTimeout(() => {
      setOfferSent(false)
      setShowNegotiate(false)
      setOfferPrice("")
      setOfferName("")
      setOfferEmail("")
      setOfferMessage("")
    }, 3000)
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Carbon sticker badge */}
      <div className="absolute right-3 top-3 z-10">
        <CarbonSticker grade={car.carbonGrade} co2={car.co2} size="sm" />
      </div>

      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
        {/* Fuel type chip */}
        <div className="absolute bottom-3 left-3">
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-md"
            style={{
              backgroundColor:
                car.fuel === "Electrique"
                  ? "rgba(22, 163, 74, 0.9)"
                  : car.fuel === "Hybride"
                    ? "rgba(59, 130, 246, 0.9)"
                    : "rgba(0,0,0,0.7)",
              color: "#fff",
            }}
          >
            {car.fuel === "Electrique" && <Zap className="h-3 w-3" />}
            {t(car.fuel as keyof typeof import("@/lib/translations").translations.fr)}
          </span>
        </div>
        {/* Category chip */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-full bg-card/90 px-2.5 py-1 text-xs font-semibold text-card-foreground backdrop-blur-md">
            {t(car.category as keyof typeof import("@/lib/translations").translations.fr)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Title + Price */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-card-foreground font-mono leading-tight text-balance">
              {car.brand} {car.model}
            </h3>
            <p className="text-sm text-muted-foreground">{car.year}</p>
          </div>
          <p className="text-lg font-black text-primary whitespace-nowrap">
            {car.price.toLocaleString("fr-FR")} {"\u20AC"}
          </p>
        </div>

        {/* Primary specs grid */}
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 shrink-0" />
            <span>{car.mileage.toLocaleString("fr-FR")} km</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5 shrink-0" />
            <span>{t(car.fuel as keyof typeof import("@/lib/translations").translations.fr)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Settings2 className="h-3.5 w-3.5 shrink-0" />
            <span>{t(car.transmission as keyof typeof import("@/lib/translations").translations.fr)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 shrink-0" />
            <span>{car.power}</span>
          </div>
        </div>

        {/* Expandable details */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
          aria-expanded={expanded}
        >
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
          {expanded ? t("hideDetails") : t("seeAllSpecs")}
        </button>

        {expanded && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground animate-in fade-in-0 slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-1.5">
              <Cog className="h-3 w-3 shrink-0 text-primary/60" />
              <span className="text-foreground font-medium">{car.cylinders}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Palette className="h-3 w-3 shrink-0 text-primary/60" />
              <span className="text-foreground font-medium">{car.color}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DoorOpen className="h-3 w-3 shrink-0 text-primary/60" />
              <span className="text-foreground font-medium">{car.doors} {t("doors")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-3 w-3 shrink-0 text-primary/60" />
              <span className="text-foreground font-medium">{car.seats} {t("seats")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Package className="h-3 w-3 shrink-0 text-primary/60" />
              <span className="text-foreground font-medium">{car.trunkVolume} {t("trunk")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Weight className="h-3 w-3 shrink-0 text-primary/60" />
              <span className="text-foreground font-medium">{car.weight.toLocaleString("fr-FR")} kg</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="h-3 w-3 shrink-0 text-primary/60" />
              <span className="text-foreground font-medium">{car.euroNorm}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Settings2 className="h-3 w-3 shrink-0 text-primary/60" />
              <span className="text-foreground font-medium">{t(car.drivetrain as keyof typeof import("@/lib/translations").translations.fr)}</span>
            </div>
            {car.autonomy > 0 && (
              <div className="col-span-2 flex items-center gap-1.5 border-t border-border pt-2 mt-1">
                <Battery className="h-3 w-3 shrink-0 text-primary" />
                <span className="text-foreground font-medium">
                  {t("autonomy")}: {car.autonomy} km
                </span>
              </div>
            )}

            {/* VIN Section */}
            <div className="col-span-2 flex flex-col gap-2 border-t border-border pt-2 mt-1">
              <div className="flex items-center gap-1.5">
                <FileSearch className="h-3 w-3 shrink-0 text-primary" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("vinNumber")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded-md bg-foreground/5 px-2.5 py-1.5 font-mono text-[11px] font-bold tracking-widest text-foreground">
                  {car.vin}
                </code>
                <button
                  onClick={copyVin}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-foreground/5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  title={t("copyVin")}
                  aria-label={t("copyVin")}
                >
                  {vinCopied ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary transition-colors hover:text-primary/80"
              >
                <History className="h-3 w-3" />
                {showHistory ? t("hideHistory") : t("viewHistory")}
              </button>

              {/* Inline VIN History Timeline */}
              {showHistory && car.vinHistory.length > 0 && (
                <div className="col-span-2 mt-1 flex flex-col gap-0 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("history")} ({car.vinHistory.length} {t("events")})
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                      <CircleCheckBig className="h-2.5 w-2.5" />
                      {t("verified")}
                    </span>
                  </div>
                  <div className="relative pl-4">
                    {/* Timeline line */}
                    <div className="absolute left-[7px] top-1 bottom-1 w-px bg-border" />
                    {car.vinHistory.map((entry, i) => (
                      <div key={i} className="relative flex gap-3 pb-3 last:pb-0">
                        {/* Dot */}
                        <div
                          className="relative z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 flex items-center justify-center"
                          style={{
                            borderColor:
                              entry.status === "ok"
                                ? "#22c55e"
                                : entry.status === "warning"
                                  ? "#f59e0b"
                                  : "#6b7280",
                            backgroundColor:
                              entry.status === "ok"
                                ? "#dcfce7"
                                : entry.status === "warning"
                                  ? "#fef3c7"
                                  : "#f3f4f6",
                          }}
                        >
                          {entry.status === "ok" && <CircleCheckBig className="h-2 w-2 text-green-600" />}
                          {entry.status === "warning" && <AlertTriangle className="h-2 w-2 text-amber-600" />}
                          {entry.status === "info" && <Info className="h-2 w-2 text-gray-500" />}
                        </div>
                        {/* Content */}
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span className="text-[11px] font-bold text-foreground whitespace-nowrap">
                              {entry.date}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {entry.mileage.toLocaleString("fr-FR")} km
                            </span>
                          </div>
                          <p
                            className="text-[11px] leading-snug"
                            style={{
                              color:
                                entry.status === "warning"
                                  ? "#b45309"
                                  : "var(--muted-foreground)",
                            }}
                          >
                            {translateEvent(entry.event)}
                          </p>
                          <span className="text-[10px] text-muted-foreground/70">
                            {entry.location}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Negotiate CTA */}
        {!showNegotiate ? (
          <button
            onClick={() => setShowNegotiate(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
          >
            <MessageSquare className="h-4 w-4" />
            {t("negotiate")}
          </button>
        ) : (
          <div className="flex flex-col gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3 animate-in fade-in-0 slide-in-from-top-2 duration-200">
            {offerSent ? (
              <div className="flex flex-col items-center gap-2 py-3 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-bold text-foreground">{t("offerSent")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("responseIn24h")}
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">
                    {t("makeOffer")}
                  </span>
                  <button
                    onClick={() => setShowNegotiate(false)}
                    className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label={t("close")}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Price context */}
                <div className="flex items-center justify-between rounded-md bg-card px-3 py-2 text-xs">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">{t("listedPrice")}</span>
                    <span className="font-bold text-foreground">
                      {car.price.toLocaleString("fr-FR")} {"\u20AC"}
                    </span>
                  </div>
                  <ArrowDown className="h-3.5 w-3.5 text-primary" />
                  <div className="flex flex-col items-end">
                    <span className="text-muted-foreground">{t("suggestedPrice")}</span>
                    <span className="font-bold text-primary">
                      {suggestedPrice.toLocaleString("fr-FR")} {"\u20AC"}
                    </span>
                  </div>
                </div>

                {/* Price input */}
                <div>
                  <label htmlFor={`offer-price-${car.id}`} className="sr-only">{t("yourOffer")}</label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        id={`offer-price-${car.id}`}
                        type="number"
                        placeholder={suggestedPrice.toString()}
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(e.target.value)}
                        min={maxDiscount}
                        max={car.price}
                        className="w-full rounded-md border border-input bg-card px-3 py-2 pr-10 text-sm font-bold text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                        {"\u20AC"}
                      </span>
                    </div>
                  </div>
                  {offerPrice && Number(offerPrice) < maxDiscount && (
                    <p className="mt-1 text-[10px] text-destructive">
                      {t("minOffer")}: {maxDiscount.toLocaleString("fr-FR")} {"\u20AC"} (-15%)
                    </p>
                  )}
                  {offerPrice && Number(offerPrice) >= maxDiscount && Number(offerPrice) < car.price && (
                    <p className="mt-1 text-[10px] text-primary">
                      {t("savings")}: {(car.price - Number(offerPrice)).toLocaleString("fr-FR")} {"\u20AC"}
                      ({" "}
                      {Math.round(((car.price - Number(offerPrice)) / car.price) * 100)}%)
                    </p>
                  )}
                </div>

                {/* Contact fields */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor={`offer-name-${car.id}`} className="sr-only">{t("yourName")}</label>
                    <input
                      id={`offer-name-${car.id}`}
                      type="text"
                      placeholder={t("yourName")}
                      value={offerName}
                      onChange={(e) => setOfferName(e.target.value)}
                      className="w-full rounded-md border border-input bg-card px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor={`offer-email-${car.id}`} className="sr-only">{t("email")}</label>
                    <input
                      id={`offer-email-${car.id}`}
                      type="email"
                      placeholder={t("email")}
                      value={offerEmail}
                      onChange={(e) => setOfferEmail(e.target.value)}
                      className="w-full rounded-md border border-input bg-card px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Optional message */}
                <div>
                  <label htmlFor={`offer-msg-${car.id}`} className="sr-only">{t("messageOptional")}</label>
                  <textarea
                    id={`offer-msg-${car.id}`}
                    placeholder={t("messageOptional")}
                    value={offerMessage}
                    onChange={(e) => setOfferMessage(e.target.value)}
                    rows={2}
                    className="w-full resize-none rounded-md border border-input bg-card px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmitOffer}
                  disabled={
                    !offerPrice ||
                    !offerName ||
                    !offerEmail ||
                    Number(offerPrice) < maxDiscount
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  {t("sendOffer")}
                </button>
              </>
            )}
          </div>
        )}

        {/* Buy CTA */}
        {!showBuy ? (
          <button
            onClick={() => setShowBuy(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-primary bg-primary/5 px-4 py-2.5 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground active:scale-[0.98]"
          >
            <ShoppingCart className="h-4 w-4" />
            {t("buyVehicle")}
          </button>
        ) : (
          <div className="flex flex-col gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3 animate-in fade-in-0 slide-in-from-top-2 duration-200">
            {buySent ? (
              <div className="flex flex-col items-center gap-2 py-3 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-bold text-foreground">{t("requestSent")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("advisorContact")}
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">
                      {t("buyVehicle")}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {car.brand} {car.model} - {car.price.toLocaleString("fr-FR")} {"\u20AC"}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowBuy(false)}
                    className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label={t("close")}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <div>
                    <label htmlFor={`buy-name-${car.id}`} className="sr-only">{t("fullName")}</label>
                    <input
                      id={`buy-name-${car.id}`}
                      type="text"
                      placeholder={t("fullName")}
                      value={buyName}
                      onChange={(e) => setBuyName(e.target.value)}
                      className="w-full rounded-md border border-input bg-card px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor={`buy-email-${car.id}`} className="sr-only">{t("email")}</label>
                    <input
                      id={`buy-email-${car.id}`}
                      type="email"
                      placeholder={t("email")}
                      value={buyEmail}
                      onChange={(e) => setBuyEmail(e.target.value)}
                      className="w-full rounded-md border border-input bg-card px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor={`buy-phone-${car.id}`} className="sr-only">{t("phone")}</label>
                    <input
                      id={`buy-phone-${car.id}`}
                      type="tel"
                      placeholder={t("phone")}
                      value={buyPhone}
                      onChange={(e) => setBuyPhone(e.target.value)}
                      className="w-full rounded-md border border-input bg-card px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmitBuy}
                  disabled={!buyName || !buyEmail || !buyPhone}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  {t("confirmPurchase")}
                </button>

                <p className="text-center text-[10px] text-muted-foreground">
                  {t("purchaseConfirmNote")}
                </p>
              </>
            )}
          </div>
        )}

        {/* Bottom row */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{car.location}</span>
          </div>
          {/* Emission bar */}
          <div className="flex items-center gap-1.5">
            <div
              className="h-2 rounded-full"
              style={{
                width: `${Math.max(16, Math.min(64, (car.co2 / 270) * 64))}px`,
                backgroundColor: gradeConfig.borderColor,
              }}
            />
            <span
              className="text-xs font-bold font-mono"
              style={{ color: gradeConfig.color }}
            >
              {car.carbonGrade}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

import { type CarbonGrade, carbonGradeConfig } from "@/lib/cars-data"

interface CarbonStickerProps {
  grade: CarbonGrade
  co2: number
  size?: "sm" | "md" | "lg"
}

const allGrades: CarbonGrade[] = ["A", "B", "C", "D", "E", "F", "G"]

export function CarbonSticker({ grade, co2, size = "md" }: CarbonStickerProps) {
  const config = carbonGradeConfig[grade]

  const sizeClasses = {
    sm: "w-16 h-20",
    md: "w-24 h-28",
    lg: "w-32 h-36",
  }

  const fontSizes = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-5xl",
  }

  const subFontSizes = {
    sm: "text-[8px]",
    md: "text-[10px]",
    lg: "text-xs",
  }

  return (
    <div
      className={`${sizeClasses[size]} relative flex flex-col items-center justify-center rounded-lg border-2 shadow-md`}
      style={{
        backgroundColor: config.bgColor,
        borderColor: config.borderColor,
      }}
    >
      {/* Top label */}
      <div
        className={`absolute -top-2.5 rounded-full px-2 py-0.5 ${subFontSizes[size]} font-bold tracking-wider`}
        style={{
          backgroundColor: config.borderColor,
          color: "#fff",
        }}
      >
        CO2
      </div>

      {/* Grade letter */}
      <span
        className={`${fontSizes[size]} font-black leading-none font-mono`}
        style={{ color: config.color }}
      >
        {grade}
      </span>

      {/* CO2 value */}
      <span
        className={`${subFontSizes[size]} mt-1 font-semibold`}
        style={{ color: config.color }}
      >
        {co2 === 0 ? "0 g/km" : `${co2} g/km`}
      </span>

      {/* Mini scale */}
      <div className="mt-1.5 flex gap-px">
        {allGrades.map((g) => {
          const gConfig = carbonGradeConfig[g]
          return (
            <div
              key={g}
              className={`rounded-sm ${size === "sm" ? "h-1 w-1.5" : "h-1.5 w-2"}`}
              style={{
                backgroundColor: g === grade ? gConfig.borderColor : `${gConfig.borderColor}40`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export function CarbonStickerInline({ grade, co2 }: { grade: CarbonGrade; co2: number }) {
  const config = carbonGradeConfig[grade]
  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
        border: `1.5px solid ${config.borderColor}`,
      }}
    >
      <span className="font-mono text-sm">{grade}</span>
      <span className="font-normal opacity-80">
        {co2 === 0 ? "0 g/km" : `${co2} g/km`}
      </span>
    </div>
  )
}

import { type CarbonGrade, carbonGradeConfig } from "@/lib/cars-data"

const allGrades: CarbonGrade[] = ["A", "B", "C", "D", "E", "F", "G"]

export function GradeLegend() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-bold text-card-foreground uppercase tracking-wider">
        Echelle des emissions CO2
      </h3>
      <div className="flex flex-col gap-1.5">
        {allGrades.map((grade, index) => {
          const config = carbonGradeConfig[grade]
          const widthPercent = 40 + index * 10
          return (
            <div key={grade} className="flex items-center gap-2">
              <div
                className="flex items-center justify-between rounded-r-md py-1 pl-2 pr-3 text-xs font-bold"
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: config.borderColor,
                  color: "#fff",
                }}
              >
                <span className="font-mono text-sm">{grade}</span>
                <span className="font-normal opacity-90">{config.range}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

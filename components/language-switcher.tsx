"use client"

import { useLanguage } from "@/lib/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border p-0.5">
      <button
        onClick={() => setLanguage("fr")}
        className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-all ${
          language === "fr"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        }`}
        aria-label="Francais"
        title="Francais"
      >
        {/* France flag */}
        <svg
          className="h-4 w-4 rounded-sm overflow-hidden"
          viewBox="0 0 640 480"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="213.3" height="480" fill="#002654" />
          <rect x="213.3" width="213.4" height="480" fill="#fff" />
          <rect x="426.7" width="213.3" height="480" fill="#ce1126" />
        </svg>
        <span className="hidden sm:inline">FR</span>
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-all ${
          language === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        }`}
        aria-label="English"
        title="English"
      >
        {/* USA flag */}
        <svg
          className="h-4 w-4 rounded-sm overflow-hidden"
          viewBox="0 0 640 480"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fillRule="evenodd">
            <g strokeWidth="1pt">
              <path fill="#bd3d44" d="M0 0h912v37H0zm0 73.9h912v37H0zm0 73.8h912v37H0zm0 73.8h912v37H0zm0 74h912v36.8H0zm0 73.7h912v37H0zM0 443h912v37H0z" transform="scale(.9375 1)"/>
              <path fill="#fff" d="M0 37h912v36.9H0zm0 73.8h912v36.9H0zm0 73.8h912v37H0zm0 73.9h912v37H0zm0 73.8h912v37H0zm0 73.8h912v37H0z" transform="scale(.9375 1)"/>
            </g>
            <path fill="#192f5d" d="M0 0h364.8v258.5H0z" transform="scale(.9375 1)"/>
            <path fill="#fff" d="m30.4 11 3.4 10.3h10.6l-8.6 6.3 3.3 10.3-8.7-6.4-8.6 6.3 3.2-10.3-8.5-6.3h10.6zm60.8 0 3.3 10.3h10.8l-8.7 6.3 3.2 10.3-8.6-6.4-8.7 6.3 3.3-10.3-8.6-6.3h10.6zm60.8 0 3.3 10.3H166l-8.6 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.3-8.6-6.3h10.6zm60.8 0 3.3 10.3h10.8l-8.7 6.3 3.3 10.3-8.7-6.4-8.6 6.3 3.2-10.3-8.5-6.3h10.6zm60.8 0 3.3 10.3h10.7l-8.6 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.3-8.6-6.3h10.6zM60.8 37l3.3 10.2H75l-8.7 6.2 3.2 10.3-8.5-6.3-8.7 6.3 3.1-10.3-8.4-6.2h10.6zm60.8 0 3.4 10.2h10.7l-8.8 6.2 3.4 10.3-8.7-6.3-8.7 6.3 3.3-10.3-8.7-6.2h10.8zm60.8 0 3.3 10.2h10.8l-8.7 6.2 3.3 10.3-8.7-6.3-8.7 6.3 3.4-10.3-8.8-6.2h10.8zm60.8 0 3.4 10.2h10.7l-8.8 6.2 3.4 10.3-8.7-6.3-8.6 6.3 3.2-10.3-8.6-6.2H232zM30.4 62.6l3.4 10.4h10.6l-8.6 6.3 3.3 10.2-8.7-6.3-8.6 6.3 3.2-10.3-8.5-6.3h10.6zm60.8 0 3.3 10.4h10.8l-8.7 6.3 3.2 10.2-8.6-6.3-8.7 6.3 3.3-10.3-8.6-6.3h10.6zm60.8 0 3.3 10.4H166l-8.6 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.3-10.3-8.6-6.3h10.6zm60.8 0 3.3 10.4h10.8l-8.7 6.3 3.3 10.2-8.7-6.3-8.6 6.3 3.2-10.3-8.5-6.3h10.6zm60.8 0 3.3 10.4h10.7l-8.6 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.3-10.3-8.6-6.3h10.6zM60.8 88.6l3.3 10h11l-8.8 6.4 3.3 10.2-8.6-6.3-8.7 6.3 3.2-10.3-8.5-6.3h10.6zm60.8 0 3.4 10h10.7l-8.8 6.4 3.4 10.2-8.7-6.3-8.7 6.3 3.3-10.3-8.7-6.3h10.8zm60.8 0 3.3 10h10.8l-8.7 6.4 3.3 10.2-8.7-6.3-8.7 6.3 3.4-10.3-8.8-6.3h10.8zm60.8 0 3.4 10h10.7l-8.8 6.4 3.4 10.2-8.7-6.3-8.6 6.3 3.2-10.3-8.6-6.3H232z" transform="scale(.9375 1)"/>
          </g>
        </svg>
        <span className="hidden sm:inline">EN</span>
      </button>
    </div>
  )
}

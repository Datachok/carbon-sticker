export type Language = "fr" | "en"

export const translations = {
  fr: {
    // Header
    siteName: "Carbon Sticker",
    tagline: "Voitures d'occasion eco-responsables",
    vehicles: "vehicule",
    vehiclesPlural: "vehicules",
    categories: "Categories",
    all: "Tous",

    // Filters
    filters: "Filtres",
    search: "Recherche",
    searchPlaceholder: "Marque, modele, ville...",
    vehicleType: "Type de vehicule",
    carbonLabel: "Etiquette carbone",
    classLabel: "Classe",
    fuel: "Carburant",
    location: "Localisation",
    searchCity: "Rechercher une ville...",
    noCityFound: "Aucune ville trouvee",
    co2Sort: "Tri CO2",
    leastPolluting: "Moins polluant d'abord",
    mostPolluting: "Plus polluant d'abord",
    found: "trouves",

    // Stats
    vehiclesLabel: "Vehicules",
    categoriesLabel: "Categories",
    electric: "Electriques",
    avgCo2: "CO2 moyen",
    classAB: "Classe A-B",

    // Car card
    seeAllSpecs: "Voir toutes les caracteristiques",
    hideDetails: "Masquer les details",
    doors: "portes",
    seats: "places",
    trunk: "L coffre",
    autonomy: "Autonomie",
    vinNumber: "N. Identification (VIN)",
    copyVin: "Copier le numero VIN",
    viewHistory: "Consulter l'historique du vehicule",
    hideHistory: "Masquer l'historique",
    events: "evenements",
    verified: "Verifie",
    negotiate: "Negocier le prix",
    makeOffer: "Faire une offre",
    close: "Fermer",
    listedPrice: "Prix affiche",
    suggestedPrice: "Prix suggere",
    yourOffer: "Votre offre",
    minOffer: "Offre minimum",
    savings: "Economie",
    yourName: "Votre nom",
    email: "Email",
    phone: "Telephone",
    messageOptional: "Message (optionnel)",
    sendOffer: "Envoyer l'offre",
    offerSent: "Offre envoyee",
    responseIn24h: "Vous recevrez une reponse sous 24h.",
    buyVehicle: "Acheter ce vehicule",
    confirmPurchase: "Confirmer l'achat",
    fullName: "Nom complet",
    requestSent: "Demande envoyee",
    advisorContact: "Un conseiller vous contactera sous 2h.",
    purchaseConfirmNote: "En confirmant, un conseiller vous contactera pour finaliser la transaction.",

    // Footer
    footerText: "Carbon Sticker - Classement ecologique des vehicules d'occasion",
    footerNote: "Les emissions CO2 sont basees sur les donnees constructeur (cycle WLTP).",

    // Empty state
    noVehicleFound: "Aucun vehicule trouve",
    tryDifferentFilters: "Essayez de modifier vos filtres ou votre recherche pour trouver des vehicules correspondants.",

    // Category labels
    avgCo2Label: "CO2 moyen",

    // Vehicle categories
    Citadine: "Citadine",
    Berline: "Berline",
    SUV: "SUV",
    Break: "Break",
    Coupe: "Coupe",
    Cabriolet: "Cabriolet",
    Monospace: "Monospace",
    Utilitaire: "Utilitaire",

    // Fuel types
    Electrique: "Electrique",
    Hybride: "Hybride",
    Essence: "Essence",
    Diesel: "Diesel",

    // Car card extras
    color: "Couleur",
    weight: "Poids",
    history: "Historique",
    Manuelle: "Manuelle",
    Automatique: "Automatique",
    Traction: "Traction",
    Propulsion: "Propulsion",
    Integrale: "Integrale",

    // Accessibility
    filterByLabel: "Filtrer par etiquette",
    filterByLocation: "Filtrer par",
    searchLocation: "Rechercher une localisation",
    clearSearch: "Effacer la recherche",

    // VIN History events
    eventFirstReg: "Premiere immatriculation",
    eventFirstRegImport: "Premiere immatriculation (import US)",
    eventRevision: "Revision constructeur - RAS",
    eventControlOk: "Controle technique - Favorable",
    eventControlWarning: "Controle technique - A surveiller",
    eventBodyRepair: "Reparation carrosserie (choc leger)",
    eventRecall: "Rappel constructeur effectue",
  },
  en: {
    // Header
    siteName: "Carbon Sticker",
    tagline: "Eco-friendly used cars",
    vehicles: "vehicle",
    vehiclesPlural: "vehicles",
    categories: "Categories",
    all: "All",

    // Filters
    filters: "Filters",
    search: "Search",
    searchPlaceholder: "Brand, model, city...",
    vehicleType: "Vehicle type",
    carbonLabel: "Carbon label",
    classLabel: "Class",
    fuel: "Fuel",
    location: "Location",
    searchCity: "Search a city...",
    noCityFound: "No city found",
    co2Sort: "CO2 sort",
    leastPolluting: "Least polluting first",
    mostPolluting: "Most polluting first",
    found: "found",

    // Stats
    vehiclesLabel: "Vehicles",
    categoriesLabel: "Categories",
    electric: "Electric",
    avgCo2: "Avg CO2",
    classAB: "Class A-B",

    // Car card
    seeAllSpecs: "See all specifications",
    hideDetails: "Hide details",
    doors: "doors",
    seats: "seats",
    trunk: "L trunk",
    autonomy: "Range",
    vinNumber: "VIN Number",
    copyVin: "Copy VIN number",
    viewHistory: "View vehicle history",
    hideHistory: "Hide history",
    events: "events",
    verified: "Verified",
    negotiate: "Negotiate price",
    makeOffer: "Make an offer",
    close: "Close",
    listedPrice: "Listed price",
    suggestedPrice: "Suggested price",
    yourOffer: "Your offer",
    minOffer: "Minimum offer",
    savings: "Savings",
    yourName: "Your name",
    email: "Email",
    phone: "Phone",
    messageOptional: "Message (optional)",
    sendOffer: "Send offer",
    offerSent: "Offer sent",
    responseIn24h: "You will receive a response within 24h.",
    buyVehicle: "Buy this vehicle",
    confirmPurchase: "Confirm purchase",
    fullName: "Full name",
    requestSent: "Request sent",
    advisorContact: "An advisor will contact you within 2h.",
    purchaseConfirmNote: "By confirming, an advisor will contact you to finalize the transaction.",

    // Footer
    footerText: "Carbon Sticker - Ecological ranking of used vehicles",
    footerNote: "CO2 emissions are based on manufacturer data (WLTP cycle).",

    // Empty state
    noVehicleFound: "No vehicle found",
    tryDifferentFilters: "Try adjusting your filters or search to find matching vehicles.",

    // Category labels
    avgCo2Label: "Avg CO2",

    // Vehicle categories
    Citadine: "City car",
    Berline: "Sedan",
    SUV: "SUV",
    Break: "Estate",
    Coupe: "Coupe",
    Cabriolet: "Convertible",
    Monospace: "Minivan",
    Utilitaire: "Commercial",

    // Fuel types
    Electrique: "Electric",
    Hybride: "Hybrid",
    Essence: "Petrol",
    Diesel: "Diesel",

    // Car card extras
    color: "Color",
    weight: "Weight",
    history: "History",
    Manuelle: "Manual",
    Automatique: "Automatic",
    Traction: "FWD",
    Propulsion: "RWD",
    Integrale: "AWD",

    // Accessibility
    filterByLabel: "Filter by label",
    filterByLocation: "Filter by",
    searchLocation: "Search a location",
    clearSearch: "Clear search",

    // VIN History events
    eventFirstReg: "First registration",
    eventFirstRegImport: "First registration (US import)",
    eventRevision: "Manufacturer service - OK",
    eventControlOk: "Vehicle inspection - Passed",
    eventControlWarning: "Vehicle inspection - Monitor",
    eventBodyRepair: "Body repair (minor impact)",
    eventRecall: "Manufacturer recall completed",
  },
} as const

export type TranslationKey = keyof typeof translations.fr

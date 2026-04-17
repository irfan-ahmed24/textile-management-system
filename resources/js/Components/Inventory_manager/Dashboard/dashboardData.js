import { Database, PlusCircle, MinusCircle, AlertTriangle } from "lucide-react";

export const inventoryStats = [
    {
        label: "Current Stock Items",
        value: "2,480 kg",
        icon: Database,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        trend: "+120kg today",
    },
    {
        label: "Total Stock In",
        value: "850 kg",
        icon: PlusCircle,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        trend: "Last 7 days",
    },
    {
        label: "Total Dispatched",
        value: "620 kg",
        icon: MinusCircle,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        trend: "In Production",
    },
    {
        label: "Stock Alerts",
        value: "04 Items",
        icon: AlertTriangle,
        color: "text-red-500",
        bg: "bg-red-500/10",
        trend: "Needs Attention",
    },
];

export const movementLogs = [
    {
        name: "Cotton Yarn 20s",
        type: "STOCK IN",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        qty: "+250kg",
        time: "10 mins ago",
    },
    {
        name: "Indigo Dye",
        type: "STOCK OUT",
        color: "text-red-400",
        bg: "bg-red-400/10",
        qty: "-45kg",
        time: "45 mins ago",
    },
    {
        name: "Polyester Thread",
        type: "STOCK IN",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        qty: "+100kg",
        time: "2 hours ago",
    },
    {
        name: "Caustic Soda",
        type: "STOCK OUT",
        color: "text-red-400",
        bg: "bg-red-400/10",
        qty: "-12kg",
        time: "5 hours ago",
    },
];

export const criticalLowStockItems = [
    {
        name: "Reactive Blue Dye",
        stock: "5kg remaining",
    },
    {
        name: "Softener Chemical",
        stock: "2kg remaining",
    },
];

export const storageHealth = [
    {
        section: "YARN SECTION",
        percent: 82,
        color: "text-emerald-500",
        barColor: "bg-emerald-500",
    },
    {
        section: "CHEMICAL STORE",
        percent: 45,
        color: "text-amber-500",
        barColor: "bg-amber-500",
    },
];

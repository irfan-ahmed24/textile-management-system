// resources/js/Data/AllOrder.js

export const runningOrders = [
    {
        id: "ORD-9921",
        product: "Slim Fit Denim Jeans",
        total_qty: "1500",
        completed: "450",
        currentStageId: 3, // Dyeing
        ordered_by: "Fashion Tex Ltd.",
        lastUpdate: "Apr 22",
    },
    {
        id: "ORD-9925",
        product: "Organic Cotton Tee",
        total_qty: "3000",
        completed: "2100",
        currentStageId: 4, // Sewing
        ordered_by: "Global Apparel",
        lastUpdate: "Apr 23",
    },
    {
        id: "ORD-7701",
        product: "Polyester Sportswear",
        total_qty: "1000",
        completed: "150",
        currentStageId: 2, // Knitting
        ordered_by: "Eco Styles",
        lastUpdate: "Apr 21",
    },
];

export const baseStages = [
    { id: 1, name: "Yarn Spinning", iconName: "Wind" },
    { id: 2, name: "Knitting", iconName: "GitGraph" },
    { id: 3, name: "Dyeing", iconName: "Droplets" },
    { id: 4, name: "Sewing", iconName: "Scissors" },
    { id: 5, name: "Packing", iconName: "Box" },
];

import type { Invoice } from "../../../../../Types";

export const invoices: Invoice[] = [
  { id: "INV-1990", category: "Android", price: "$83.74", status: "Paid" },
  { id: "INV-1991", category: "Mac", price: "$97.14", status: "Out of date" },
  { id: "INV-1992", category: "Windows", price: "$68.71", status: "Progress" },
  { id: "INV-1993", category: "Android", price: "$85.21", status: "Paid" },
  { id: "INV-1994", category: "Mac", price: "$52.17", status: "Paid" },
];

export const getStatusStyle = (status: string) => {
  switch (status) {
    case "Paid":
      return {
        color: "#118D57",
        backgroundColor: "rgba(34, 197, 94, 0.16)"
      };
    case "Out of date":
      return {
        color: "#B72136",
        backgroundColor: "rgba(255, 72, 66, 0.16)"
      };
    case "Progress":
      return {
        color: "#C68400",
        backgroundColor: "rgba(255, 171, 0, 0.16)"
      };
    default:
      return {};
  }
};
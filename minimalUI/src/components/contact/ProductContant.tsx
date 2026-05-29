import type { ProductList } from "../../Types";
import Image from "../../constants/Images";


export const productRows: ProductList[] = [
  {
    id: 1,
    image: Image.product1,
    name: "Urban Explorer Sneakers",
    description: "Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.",
    contect: "Category Mobile Manufacturer Apple Warranty 12 Months Serial number 358607726380311 Ships from United States",
    item: "Accessories",
    date: "03 Mar 2026",
    time: "11:41 am",
    role: "Content Creator",
    price: "$83.74",
    status: "Draft",
    stock: 0,
  },
  {
    id: 2,
    image: Image.product2,
    name: "Classic Leather Loafers",
    description: "Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.",
    contect: "Category Mobile Manufacturer Apple Warranty 12 Months Serial number 358607726380311 Ships from United States",
    item: "Shose",
    date: "02 Mar 2026",
    time: "10:41 am",
    role: "Content Creator",
    price: "$97.14",
    status: "Published",
    stock: 72,
  },
  {
    id: 3,
    image: Image.product3,
    name: "Mountain Trekking Boots",
    description: "Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.",
    contect: "Category Mobile Manufacturer Apple Warranty 12 Months Serial number 358607726380311 Ships from United States",
    item: "Apparel",
    date: "01 Mar 2026",
    time: "09:41 am",
    role: "Content Creator",
    price: "$68.71",
    status: "Published",
    stock: 10,
  },
  {
    id: 4,
    image: Image.product4,
    name: "Elegance Stiletto Heels",
    description: "Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.",
    contect: "Category Mobile Manufacturer Apple Warranty 12 Months Serial number 358607726380311 Ships from United States",
    item: "Shose",
    date: "28 Feb 2026",
    time: "08:41 am",
    role: "Content Creator",
    price: "$85.21",
    status: "Draft",
    stock: 72,
  },
  {
    id: 5,
    image: Image.product5,
    name: "Comfy Running Shoess",
    description: "Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.",
    contect: "Category Mobile Manufacturer Apple Warranty 12 Months Serial number 358607726380311 Ships from United States",
    item: "Apparel",
    date: "27 Feb 2026",
    time: "11:41 am",
    role: "Content Creator",
    price: "$52.17",
    status: "Published",
    stock: 10,
  },
];


export const getProductpublishStyle = (publish: string) => {
  switch (publish.toLowerCase()) {
    case "draft":
      return {
        color: "#f1f1f1",
        backgroundColor: "rgba(145, 158, 171, 0.16)",
      };

    case "publish":
      return {
        color: "#006C9C",
        backgroundColor: "rgba(0, 184, 217, 0.16)",
      };

    default:
      return {
        color: "#637381",
        backgroundColor: "rgba(145, 158, 171, 0.16)",
      };
  }
};

export const getStockStatus = (stock: number, maxStock: number = 100) => {
  const safeStock = Number(stock) || 0;
  const safeMax = Number(maxStock) || 100;

  const progress = (safeStock / safeMax) * 100;

  if (safeStock === 0) {
    return {
      label: "Out of stock",
      color: "#ff56303d",
      progress: 100,
    };
  }

  if (safeStock <= safeMax * 0.2) {
    return {
      label: `${safeStock} Low stock`,
      color: "#f75625",
       background: "#ff56303d",
      progress,
    };
  }

  if (safeStock <= safeMax * 0.8) {
    return {
      label: `${safeStock} Medium stock`,
      color: "#FFAB00",
       background: "#ffab003d",
      progress,
    };
  }

  return {
    label: `${safeStock} In stock`,
    color: "#22C55E",
    progress: 100,
  };
};
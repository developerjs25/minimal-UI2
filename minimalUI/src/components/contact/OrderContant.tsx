import type { Order } from "../../Types";
import Image from "../../constants/Images";



export const orders: Order[] = [
  {
    id: 6010,
    status: "refunded",
    date: "31 Mar 2026 8:44 am",
    time: "2:19 pm",
    items: "6",
    product: {
      name: "Classic Leather Loafers",
      sku: "16H9UR1",
      image: Image.product2,
      quantity: 6,
      price: 483.74
    },
    subtotal: 483.74,
    shipping: 10,
    discount: 10,
    taxes: 10,
    total: 473.74,
    customer: {
      name: "Jayvion Simon",
      image: Image.avtar2,
      email: "nannie.abernathy70@yahoo.com",
      ip: "192.158.1.38"
    },
    delivery: {
      shipBy: "DHL",
      speed: "Standard",
      tracking: "SPX037739199373"
    },
    shippingAddress: {
      address: "19034 Verna Unions Apt...",
      phone: "365-374-4961"
    }
  },
  {
    id: 6011,
    status: "completed",
    date: "30 Mar 2026 7:44 am",
    time: "1:19 pm",
    items: "2",
    product: {
      name: "Urban Explorer Sneakers",
      sku: "16H9UR0",
      image: Image.product1,
      quantity: 1,
      price: 83.74
    },
    subtotal: 83.74,
    shipping: 10,
    discount: 10,
    taxes: 10,
    total: 73.74,
    customer: {
      name: "Lucian Obrien",
      image: Image.avtar1,
      email: "ashlynn.ohara62@gmail.com",
      ip: "192.158.1.38"
    },
    delivery: {
      shipBy: "DHL",
      speed: "Standard",
      tracking: "SPX037739199373"
    },
    shippingAddress: {
      address: "19034 Verna Unions Apt...",
      phone: "365-374-4961"
    }
  },
  {
    id: 6012,
    status: "pending",
    date: "29 Mar 2026 3:44 am",
    time: "3:19 pm",
    items: "4",
    product: {
      name: "Urban Explorer Sneakers",
      sku: "16H9UR0",
      image: Image.product3,
      quantity: 3,
      price: 283.74
    },
    subtotal: 283.74,
    shipping: 10,
    discount: 10,
    taxes: 10,
    total: 273.74,
    customer: {
      name: "Ariana Lang",
      image: Image.avtar4,
      email: "avery43@hotmail.com",
      ip: "192.158.1.38"
    },
    delivery: {
      shipBy: "DHL",
      speed: "Standard",
      tracking: "SPX037739199373"
    },
    shippingAddress: {
      address: "19034 Verna Unions Apt...",
      phone: "365-374-4961"
    }
  },
   {
    id: 6013,
    status: "pending",
    date: "26 Mar 2026 3:44 am",
    time: "3:19 pm",
    items: "4",
    product: {
      name: "Urban Explorer Sneakers",
      sku: "16H9UR0",
      image: Image.product2,
      quantity: 3,
      price: 203.74
    },
    subtotal: 203.74,
    shipping: 10,
    discount: 10,
    taxes: 10,
    total: 203.74,
    customer: {
      name: "Brycen Jimenez",
      image: Image.avtar6,
      email: "ave3@hotmail.com",
      ip: "132.154.1.38"
    },
    delivery: {
      shipBy: "PHL",
      speed: "Standard",
      tracking: "SPX037739199373"
    },
    shippingAddress: {
      address: "19034 Verna Unions Apt...",
      phone: "365-374-4961"
    }
  },
   {
    id: 6014,
    status: "refunded",
    date: "28 Mar 2026 3:44 am",
    time: "3:19 pm",
    items: "4",
    product: {
      name: "Urban Explorer Sneakers",
      sku: "16H9UR0",
      image: Image.product4,
      quantity: 3,
      price: 133.74
    },
    subtotal: 133.74,
    shipping: 10,
    discount: 10,
    taxes: 10,
    total: 123.74,
    customer: {
      name: "Chase Day",
      image: Image.avtar7,
      email: "oana.simonis84@gmail.com",
      ip: "192.158.1.38"
    },
    delivery: {
      shipBy: "DHL",
      speed: "Standard",
      tracking: "SPX037739199373"
    },
    shippingAddress: {
      address: "19034 Verna Unions Apt...",
      phone: "365-374-4961"
    }
  },
   {
    id: 6015,
    status: "pending",
    date: "27 Mar 2026 3:44 am",
    time: "3:19 pm",
    items: "4",
    product: {
      name: "Urban Explorer Sneakers",
      sku: "16H9UR0",
      image: Image.product6,
      quantity: 3,
      price: 283.74
    },
    subtotal: 283.74,
    shipping: 10,
    discount: 10,
    taxes: 10,
    total: 273.74,
    customer: {
      name: "Angelique Morse",
      image: Image.avtar3,
      email: "benny89@yahoo.com",
      ip: "192.158.1.38"
    },
    delivery: {
      shipBy: "LHL",
      speed: "Standard",
      tracking: "SPX037739199373"
    },
    shippingAddress: {
      address: "19034 Verna Unions Apt...",
      phone: "365-374-4961"
    }
  },

  
];

export const getUserStatusStyle = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return {
        color: "#118D57",
        backgroundColor: "rgba(34, 197, 94, 0.16)",
      };

    case "refunded":
      return {
        color: "#637381",
        backgroundColor: "rgba(145, 158, 171, 0.16)",
      };

    case "pending":
      return {
        color: "#C68400",
        backgroundColor: "rgba(255, 171, 0, 0.16)",
      };

    default:
      return {
        color: "#637381",
        backgroundColor: "rgba(145, 158, 171, 0.16)",
      };
  }
};


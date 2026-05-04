 import {COLORS} from "./constants/colors"
 
 declare module "@mui/material/styles" {
 export interface Palette {
    custom: {
      navbarBg: string;
      textSecondary: string;
    };
  }
 export interface PaletteOptions {
    custom?: {
      navbarBg?: string;
      textSecondary?: string;
    };
  }
}

export interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

export interface OptionType {
  label: string;
  badge: string;
  image: string;
  chipBackground: string;
}
// pages/users/image box
export interface ImageBoxProps {
  image?: string;
  status?: string;
  error?: boolean;
  onChange?: (image: string) => void;
}

export interface UserList {
  id: number;
  image: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  
  number: string;
  country: string;
    countrycode?: string;
  role: string;
  city: string;
  address1: string;
  address2: string;
  state: string;
  zip: string;
  company: string;
  status: string;
}

export interface OrderList {
  id: number;
  image: string;
  name: string;
  email: string;
  number: string;
  items: string;
  time: string;
  date: string;
  price: string;
  status: string;
}

export interface ProductList {
  id: number;
  image: string;
  name: string;
  description: string;
  contect: string;
  item: string;
  date: string;
  time: string;
  price: string;
  role: string;
  status: string;
  stock: number;
}

export interface StatsCardProps {
  title: string;
  value: string;
  percentage: string;
  trend: "up" | "down";
  barsColor: string;
  sparkData: number[];
}

type InvoiceStatus = "Paid" | "Out of date" | "Progress";

export interface Invoice {
  id: string;
  category: string;
  price: string;
  status: InvoiceStatus;
}

export interface AppItem {
  name: string;
  price: string;
  downloads: string;
  size: string;
  rating: string;
  logo: string;
}

//components , chip
export interface StyledChipProps {
  label: string;
  bgcolor?: string;
  color?: string;
}
//components , deletepopup
export interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
// components, input
export interface UserInputFieldProps {
  PlaceHolder?: string;
  value?: string;
  row?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  country?: any;
  onCountryChange?: (country: any) => void;
}

//phone number input 
export type PhoneInputFieldProps = {
  PlaceHolder?: string;
  value: string;
  onChange?: (data: { phone: string; countryNumber : string }) => void;
  country?: string;     
  countryNumber ?: string; 
  error?: boolean;
  helperText?: string;
};
//countary types
export type CountrysType = {
  label: string;
  code: string;
};

// state input props

export type StateProps = {
  countryCode: string;
  value: StateType | null;
  onChange?: (value: StateType | null) => void;
  error?: boolean;
  helperText?: string;
};

export type StateType = {
  label: string;
  code: string;
};


// pages/product/components/projuctdetails
export interface ProductFormProps {
  ProductName?: string;
  Productdescription?: string;
  ProductContent?: string;
}

//theme 
declare module "@mui/material/styles" {
 export interface Palette {
    neutral: typeof COLORS.neutral;
    black: typeof COLORS.black;
    white: typeof COLORS.white;
    blur: typeof COLORS.blur;
    green: typeof COLORS.green;
    yellow: typeof COLORS.yellow;
    orange: typeof COLORS.orange;
    red: typeof COLORS.red;
    workspace: typeof COLORS.workspace;
  }
  export  interface PaletteOptions {
    neutral?: typeof COLORS.neutral;
    black?: typeof COLORS.black;
    white?: typeof COLORS.white;
    blur?: typeof COLORS.blur;
    green?: Partial<typeof COLORS.green>;
    yellow?: typeof COLORS.yellow;
    orange?: typeof COLORS.orange;
    red?: typeof COLORS.red;
    workspace?: typeof COLORS.workspace;
  }
}
type ColorShade = {
  light: string;
  main: string;
  dark: string;
};

export interface ColorContextType {
  mode: "light" | "dark";
  setMainColor: (color: ColorShade) => void;
  toggleMode: (newMode?: "light" | "dark") => void;
}

declare module "@mui/material/styles" {
export  interface TypeBackground {
    default: string;
    paper: string;
    SidebarBorder: string;
    blurBackground: string;
    buttonHover: string;
    whiteBlack: string;
    listColor: string;
    TableRowColor: string;
    ViewPaperColor: string;
    notificationbg: string;
    notificationHover: string;
    logoutButtonColor: string;
    logoutButtonbg: string;
    signininputbg: string;
    Sidebarmenu: string;
    Inputborder: string;
    Menubg: string;
    userchipcolor: string;
          
  }
}

// action button 

export type ActionMenuProps = {
  onView: () => void;
  onEdit?: () => void;   // ✅ correct
  onDelete: () => void;
  firstlink?: string;
  secoundlink?:string;
  thirdlink?: string;

};

// order details

export type Order = {
  id: number;
  status: string;
  date: string;
  time: string;
  items: string;

  product: {
    name: string;
    sku: string;
    image: string;
    quantity: number;
    price: number;
  };
  subtotal: number;
  shipping: number;
  discount: number;
  taxes: number;
  total: number;
  customer: {
    name: string;
    image: string;
    email: string;
    ip: string;
  };
  delivery: {
    shipBy: string;
    speed: string;
    tracking: string;
  };
  shippingAddress: {
    address: string;
    phone: string;
  };
};

//myaccount

export interface UserData  {
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  countryNumber: string;
  countrycode: string;
  stateName: string;
  stateCode: string;
  city: string;
  address1: string;
  address2: string;
  status: string;
  role: string;
};

export interface FormErrors {
    password?: string;
    confirmPassword?: string;
}

//create user

export interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

//otp box
export type OtpProps = {
    otp: string[];
    setOtp: (otp: string[]) => void;
};
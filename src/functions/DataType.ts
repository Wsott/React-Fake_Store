export interface CardData {
    id: number;
    name: string;
    image: string;
    creationDate: string | null;
    updateDate: string | null;
}

export interface UserData {
    user: LoginToken | null;
    setUser: (user: LoginToken | null) => void;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface SignupData {
    name: string;
    email: string;
    password: string;
    avatar: string;
}

export interface LoggedUser {
    name: string | null;
}

export interface LoginToken {
    access_token: string;
    refresh_token: string;
}

export interface ProductsData {
    filter: string | null;
}

export interface AuthContextData {
    user: string | null;
    login: (user: string, callback: VoidFunction) => void;
    logout: (callback: VoidFunction) => void;
}

export interface UserContextType {
  user: string;
  role: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  logOut: Function;
  logIn: Function;
}

export interface CreateProductData {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: Array<string>;
}

export interface ProductData {
    id: number;
    title: string;
    price: number;
    description: string;
    category: any;
    images: any;
}

export interface CreateCategoryData {
    name: string;
    image: string;
}

export interface CategoryData {
    id: number;
    name: string;
    image: string;
}

export interface CartData {
  items: Array<CartItem>;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
}

export interface CartItem {
    id: number;
    title: string;
    price: number;
    ammount: number;
}
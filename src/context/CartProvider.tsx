import { createContext, useState } from "react";
import { CartData, CartItem } from "../functions/DataType";

const CartContext = createContext<CartData>({
    items: [],
    totalPrice: 0,
    addItem: (item: CartItem) => {return},
    removeItem: (id: number) => {return}
});

export const CartProvider = ({children}: any) => {
    const [items, setItems] = useState<Array<CartItem>>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    function isRepeated (item: CartItem): boolean {
        return items.some(x => x.id === item.id);
    } 

    const addItem = (item: CartItem) => {
        if (isRepeated(item)) {
            const repeatedItem = items.find(x => x.id === item.id);

            if (repeatedItem) {
                repeatedItem.ammount = repeatedItem.ammount + 1;
                setTotalPrice (totalPrice + repeatedItem.price);
                console.log("PRICE => ", totalPrice);
                console.log("CART => ", items);
            }
        }
        else {
            setTotalPrice(totalPrice + (item.price * item.ammount));
            setItems([...items, item]);
        }
    }

    const removeItem = (id: number) => {
        return
    }

    return (
        <CartContext.Provider value={{items, totalPrice, addItem, removeItem}}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
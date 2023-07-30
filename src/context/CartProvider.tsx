import { createContext, useState } from "react";
import { CartData, CartItem } from "../functions/DataType";

const CartContext = createContext<CartData>({
    items: [],
    totalPrice: 0,
    addItem: (item: CartItem) => {return},
    removeItem: (id: number) => {return},
    changeAmount: (id: number, change: number) => {return}
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
                repeatedItem.amount = repeatedItem.amount + 1;
                setTotalPrice (totalPrice + repeatedItem.price);
                console.log("PRICE => ", totalPrice);
                console.log("CART => ", items);
            }
        }
        else {
            setTotalPrice(totalPrice + (item.price * item.amount));
            setItems([...items, item]);
        }
    }

    const removeItem = (id: number) => {
        setItems(items.filter(x => x.id != id));
    }

    const changeAmount = (id: number, change: number) => {
        const item = items.find(x => x.id === id);

        if (item) {
            item.amount = item.amount + change;
            setTotalPrice (totalPrice + (item.price * change));
            console.log("PRICE => ", totalPrice);
            console.log("CART => ", items);
        }
    }

    return (
        <CartContext.Provider value={{items, totalPrice, addItem, removeItem, changeAmount}}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
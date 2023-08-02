import { createContext, useState } from "react";
import { CartData, CartItem } from "../functions/DataType";

const CartContext = createContext<CartData>({
    items: [],
    totalPrice: 0,
    addItem: () => {return},
    removeItem: () => {return},
    changeAmount: () => {return},
    cleanTheCart: () => {return}
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
        const itemToDelete = items.find(x => x.id === id);

        if (itemToDelete) {
            setItems(items.filter(x => x.id != id));
            setTotalPrice(totalPrice - (itemToDelete?.price * itemToDelete?.amount));
        }
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

    const cleanTheCart = () => {
        setItems([]);
        setTotalPrice(0);
    }

    return (
        <CartContext.Provider value={{items, totalPrice, addItem, removeItem, changeAmount, cleanTheCart}}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
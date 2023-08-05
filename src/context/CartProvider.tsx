import { createContext, useEffect, useState } from "react";
import { CartData, CartItem } from "../functions/DataType";

const CartContext = createContext<CartData>({
    items: [],
    totalPrice: 0,
    addItem: () => {return},
    removeItem: () => {return},
    changeAmount: () => {return},
    cleanTheCart: () => {return},
    restoreState: () => {return}
});

export const CartProvider = ({children}: any) => {
    const [items, setItems] = useState<Array<CartItem>>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect (() => {
        if (totalPrice != 0) {
            guardarEstado();
        }
    }, [items, totalPrice])

    function isRepeated (item: CartItem): boolean {
        return items.some(x => x.id === item.id);
    } 

    function guardarEstado (): void {
        localStorage.setItem("carrito", JSON.stringify(items));
        localStorage.setItem("precio", JSON.stringify(totalPrice));
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
        //guardarEstado();
    }

    const removeItem = (id: number) => {
        const itemToDelete = items.find(x => x.id === id);

        if (itemToDelete) {
            setItems(items.filter(x => x.id != id));
            setTotalPrice(totalPrice - (itemToDelete?.price * itemToDelete?.amount));
        }
        //guardarEstado();
    }

    const changeAmount = (id: number, change: number) => {
        const item = items.find(x => x.id === id);

        if (item) {
            item.amount = item.amount + change;
            setTotalPrice (totalPrice + (item.price * change));
            console.log("PRICE => ", totalPrice);
            console.log("CART => ", items);
        }
        //guardarEstado();
    }

    const cleanTheCart = () => {
        setItems([]);
        setTotalPrice(0);
        localStorage.removeItem("carrito");
        localStorage.removeItem("precio");
    }

    const restoreState = () => {
        const carritoAlmacenado = localStorage.getItem("carrito");
        const precioAlmacenado = localStorage.getItem("precio");

        console.log(carritoAlmacenado);
        //console.log(precioAlmacenado);

        if (carritoAlmacenado && precioAlmacenado) {
            setItems(JSON.parse(carritoAlmacenado));
            setTotalPrice(Number(JSON.parse(precioAlmacenado)));
        }
    }

    return (
        <CartContext.Provider value={{items, totalPrice, addItem, removeItem, changeAmount, cleanTheCart, restoreState}}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
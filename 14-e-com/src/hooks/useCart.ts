import { addToCart, clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from "../store/slices/cart-slice";
import type { Product } from "../types";
import { useAppDispatch, useAppSelector } from "./useRedux"

const useCart = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.cart.items);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const totalPrice = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 0
    );

    const handleAddToCart = (product: Product, quantity: number) => {
        dispatch(addToCart({ product, quantity }));
    };

    const handleRemoveFromCart = (productId: string) => {
        dispatch(removeFromCart(productId));
    };

    const handleIncrease = (productId: string) => {
        dispatch(increaseQuantity(productId));
    };
     
    const handleDecrease = (productId: string) => {
        dispatch(decreaseQuantity(productId));
    };
    
    const handleClearCart = () => {
        dispatch(clearCart());
    };
    
    const isInCart = (productId: string) =>
        items.some((item) => item.product.id === productId);

    return {
        items,
        totalItems,
        totalPrice,
        handleAddToCart,
        handleRemoveFromCart,
        handleIncrease,
        handleDecrease,
        handleClearCart,
        isInCart
    };
};

export default useCart;
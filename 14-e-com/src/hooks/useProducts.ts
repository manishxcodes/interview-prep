import { addProduct, deleteProduct, updateProduct } from "../store/slices/product-slice";
import type { ProductFormData } from "../types";
import { useAppDispatch, useAppSelector } from "./useRedux"

const useProduct = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.products);

    const handleAddProduct = (data: ProductFormData) => {
        dispatch(addProduct(data));
    };

    const handleUpdateProduct = (id: string, data: ProductFormData) => {
        dispatch(updateProduct({ id, data }));
    }

    const handleDeleteProduct = (id: string) => {
        dispatch(deleteProduct(id));
    }

    const getProductById = (id: string) => products.find((p) => p.id === id) ?? null

    return {
        products,
        handleAddProduct,
        handleUpdateProduct,
        handleDeleteProduct,
        getProductById
    }
}

export default useProduct;
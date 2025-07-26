import { create } from 'zustand';
export const useProductStore = create((set) => ({
    products : [],
    setProduct : (products) => set( { products }),
    createProduct : async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return {
                success : false,
                message : "All field are required"
            }
        }
        const res = await fetch('/api/product', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(newProduct),
        });
        const data = await res.json();
        set((state) => ({
            products : [...state.products, data.data] // Assuming data contains the new product
        }));
        return {
            success : true,
            message : "Product created successfully"
        } 
    },

    fetchProducts : async () =>{
        const res = await fetch('/api/product');
        const data = await res.json();
        set({ products: data.data });
    },

    deleteProduct : async (pid) => {
        const res = await fetch(`/api/product/${pid}`, {
            method : "DELETE",
        });
        const data = await res.json();
        if (!data.success) {
            return {
                success : false,
                message : data.message
            };
        }

        set((state) => ({
            products : state.products.filter((product) => product._id !== pid)
        }));
        return {
            success : true,
            message : "Product deleted successfully"
        };
    },

    updateProduct : async (pid, updatedProduct) => {
        const res = await fetch(`/api/product/${pid}`, {
            method : "PUT",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (!data.success) {
            return {
                success : false,
                message : data.message
            };
        };
        set((state) => ({
            products : state.products.map((product) => product._id === pid ? data.data : product)
        }));

        return {
            success : true,
            message : "Product updated successfully"
        };
    }
}))
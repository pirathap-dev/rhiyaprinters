import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import ProductModal from "../modals/ProductModal";
import toast from "react-hot-toast";
import axios from "../utils/axios";


export default function Products() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        axios.get("/products")
            .then(res => {
                setProducts(res.data);
                setSuccess(false); // 👈 reset
            })
            .catch(err => toast.error("Failed to load products"));
    }, []);

    useEffect(() => {
        if (success) {
            axios.get("/products")
                .then(res => {
                    setProducts(res.data);
                    setSuccess(false); // 👈 reset
                })
                .catch(err => toast.error("Failed to load products"));
        }
    }, [success]);


    const handleAddProduct = async (newProduct) => {
        try {
            if (editingProduct) {
                const id = editingProduct._id || editingProduct.id;
                await axios.put(`/products/${id}`, newProduct);
                setSuccess(true);           // success = true on success
                toast.success("Product updated successfully");
            } else {
                await axios.post("/products", newProduct);
                setSuccess(true);           // success = true on success
                toast.success("Product created successfully");
            }
        } catch (err) {
            setSuccess(false);            // success = false on error
            toast.error(editingProduct ? "Failed to update product" : "Failed to create product");
        }
    };


    const handleDelete = (id) => {
        toast((t) => (
            <span className="text-sm">
                Are you sure you want to delete this product?
                <div className="mt-2 flex justify-end gap-2">
                    <button
                        onClick={async () => {
                            try {
                                await axios.delete(`/products/${id}`).then(() => {
                                    setSuccess(true); 
                                    toast.dismiss(t.id);
                                    toast.success("Product deleted");
                                });
                            } catch (error) {
                                toast.dismiss(t.id);
                                toast.error("Failed to delete product");
                            }
                        }}
                        className="bg-red-600 text-white px-3 py-1 text-sm rounded"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="border px-3 py-1 text-sm rounded"
                    >
                        Cancel
                    </button>
                </div>
            </span>
        ), {
            duration: 8000,
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">All Products</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                    <PlusIcon className="h-5 w-5" />
                    Add Product
                </button>
            </div>

            {showModal && (
                <ProductModal
                    onClose={() => {
                        setShowModal(false);
                        setEditingProduct(null);
                    }}
                    onSubmit={handleAddProduct}
                    initialData={editingProduct}
                />
            )}


            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
                    <thead className="bg-gray-100 text-left text-sm uppercase text-gray-600">
                        <tr>
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Variants</th>
                            <th className="px-6 py-3">Stock</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {products.map((p, i) => (
                            <tr key={i} className="border-t">
                                <td className="px-6 py-4">
                                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded object-contain" />
                                </td>
                                <td className="px-6 py-4">{p.name}</td>
                                <td className="px-6 py-4">{p.category}</td>
                                <td className="px-6 py-4">$ {p.price}</td>
                                <td className="px-6 py-4">
                                    {p.hasVariants ? (
                                        <span className="text-green-600 font-semibold">Yes</span>
                                    ) : (
                                        <span className="text-red-500 font-semibold">No</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {p.hasVariants
                                        ? Object.values(p.variants || {}).reduce((total, colorVariants) => {
                                            const sizes = Object.entries(colorVariants)
                                                .filter(([key, val]) => key !== "_id") // exclude _id
                                                .map(([, val]) => val);
                                            return total + sizes.reduce((a, b) => a + b, 0);
                                        }, 0)
                                        : p.stock || 0}
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button
                                        className="text-blue-600 hover:underline flex items-center gap-1"
                                        onClick={() => {
                                            setEditingProduct(p);
                                            setShowModal(true);
                                        }}
                                    >
                                        <PencilIcon className="h-4 w-4" />
                                        Edit
                                    </button>

                                    <button
                                        className="text-red-600 hover:underline flex items-center gap-1"
                                        onClick={() => handleDelete(p._id)}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


import { useState } from "react";
import { uploadToImgBB } from "../utils/imgbbUpload";

export default function ProductModal({ onClose, onSubmit, initialData = null }) {
    const [form, setForm] = useState(
        initialData || {
            name: "",
            price: "",
            description: "",
            category: "",
            sub: "",
            hasVariants: false,
            stock: "",
            image: null,
            variants: {},
            variantImages: {},
        }
    );

    const [variantColors, setVariantColors] = useState(
        initialData?.hasVariants ? Object.keys(initialData.variants || {}) : []
    );
    const [variantSizes, setVariantSizes] = useState(["S", "M", "L", "XL", "XXL"]);
    const [isUploading, setIsUploading] = useState(false);

    const allowedColors = ["Red", "Green", "Blue", "Orange", "Black", "White", "Yellow", "Brown", "Grey"];
    const categoryOptions = {
        "T-Shirts": ["Round Neck T-Shirt", "Collar T-shirt"],
        "Hoodies": ["Zipped Hoodies", "Unzipped Hoodies"],
        "Accessories": ["Mugs", "Caps", "Key Chains", "Bottles", "Others"]
    };



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsUploading(true);
        const url = await uploadToImgBB(file);
        setForm({ ...form, image: url });
        setIsUploading(false);
    };

    const handleVariantImageUpload = async (color, file) => {
        setIsUploading(true);
        const url = await uploadToImgBB(file);
        setForm((prev) => ({
            ...prev,
            variantImages: {
                ...prev.variantImages,
                [color]: url,
            },
        }));
        setIsUploading(false);
    };


    const handleStockChange = (color, size, value) => {
        setForm((prev) => ({
            ...prev,
            variants: {
                ...prev.variants,
                [color]: {
                    ...prev.variants[color],
                    [size]: Number(value),
                },
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.hasVariants) {
            for (const color of variantColors) {
                const sizeStock = Object.values(form.variants[color] || {}).map(Number);
                const hasStock = sizeStock.some((qty) => qty > 0);

                if (!hasStock) {
                    alert(`Variant "${color}" must have at least one size with stock greater than 0.`);
                    return;
                }
            }
        }

        onSubmit(form); // send updated or new form
        onClose();
    };



    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-20 z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-lg max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Add New Product</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Basic Fields */}
                    <input name="name" placeholder="Product Name" className="input" value={form.name} onChange={handleChange} required />
                    <input name="price" type="number" placeholder="Price" className="input" value={form.price} onChange={handleChange} required />
                    <input name="description" placeholder="Description" className="input" value={form.description} onChange={handleChange} />

                    <div>
                        <label className="block mb-1 font-medium">Category</label>
                        <select
                            name="category"
                            className="input"
                            value={form.category}
                            onChange={(e) => {
                                const selected = e.target.value;
                                setForm({
                                    ...form,
                                    category: selected,
                                    sub: "", // reset subcategory when main category changes
                                });
                            }}
                            required
                        >
                            <option value="">Select category</option>
                            {Object.keys(categoryOptions).map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>


                    {form.category && (
                        <div>
                            <label className="block mb-1 font-medium">Sub Category</label>
                            <select
                                name="sub"
                                className="input"
                                value={form.sub}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select sub category</option>
                                {categoryOptions[form.category].map((sub) => (
                                    <option key={sub} value={sub}>
                                        {sub}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Image Upload */}
                    <div>
                        <label className="block font-semibold mb-1">Default Image</label>
                        <input type="file" onChange={handleFileChange} accept="image/*" />
                        {form.image && <img src={form.image} alt="preview" className="h-20 mt-2" />}
                    </div>


                    {/* Toggle for Variants */}
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={form.hasVariants}
                            onChange={(e) => setForm({ ...form, hasVariants: e.target.checked })}
                        />
                        Has Variants?
                    </label>

                    {/* Variant Section */}
                    {form.hasVariants && (
                        <div className="border-t pt-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">Variants</h3>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium">Add Color:</label>
                                    <select
                                        onChange={(e) => {
                                            const color = e.target.value;
                                            if (color && !variantColors.includes(color)) {
                                                setVariantColors([...variantColors, color]);
                                                setForm((prev) => ({
                                                    ...prev,
                                                    variants: { ...prev.variants, [color]: {} },
                                                }));
                                            }
                                        }}
                                        className="border px-3 py-1 rounded text-sm"
                                    >
                                        <option value="">Select</option>
                                        {allowedColors
                                            .filter((c) => !variantColors.includes(c))
                                            .map((c) => (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>


                            {variantColors.map((color) => (
                                <div key={color} className="mt-3 border p-3 rounded">
                                    <div className="flex items-center gap-3">
                                        <h4 className="font-semibold">{color}</h4>
                                        <input
                                            type="file"
                                            onChange={(e) => handleVariantImageUpload(color, e.target.files[0])}
                                            accept="image/*"
                                        />
                                        {form.variantImages[color] && (
                                            <img src={form.variantImages[color]} className="h-12" alt={color} />
                                        )}
                                    </div>

                                    <div className="grid grid-cols-5 gap-2 mt-2">
                                        {variantSizes.map((size) => (
                                            <div key={size}>
                                                <label className="text-sm">{size}</label>
                                                <input
                                                    type="number"
                                                    className="w-full border px-2 py-1 rounded"
                                                    onChange={(e) => handleStockChange(color, size, e.target.value)}
                                                    value={form.variants[color]?.[size] || ""}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Stock for simple products */}
                    {!form.hasVariants && (
                        <input
                            name="stock"
                            value={form.stock}
                            type="number"
                            placeholder="Stock"
                            className="input"
                            onChange={handleChange}
                            required
                        />
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isUploading}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {isUploading ? "Uploading..." : "Save Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

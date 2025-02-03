import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const ManageProducts: React.FC = () => {
    const [action, setAction] = useState<string>("approve");
    const [productId, setProductId] = useState<number | null>(null);
    const [productData, setProductData] = useState<any>({});
    const [products, setProducts] = useState<any[]>([]);
    const [approvedProducts, setApprovedProducts] = useState<any[]>([]);
    const [waitingProducts, setWaitingProducts] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [approvedLimit, setApprovedLimit] = useState<number>(10);
    const [waitingLimit, setWaitingLimit] = useState<number>(10);

    // Fetch products on initial load
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/admin/products");
                const approved = response.data.filter((product: any) => product.isApproved === true);
                const waiting = response.data.filter((product: any) => product.isApproved !== true);

                setProducts(response.data);
                setApprovedProducts(approved);
                setWaitingProducts(waiting);
            } catch (err) {
                setError("Failed to fetch products.");
            }
        };

        fetchProducts();
    }, []);

    const handleSubmit = async () => {
        if (!productId) {
            setError("Product ID is required");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            if (action === "approve") {
                await axios.post("http://localhost:5000/admin/products/approve", { id: productId });
                toast.success("Product approved successfully!");
            } else if (action === "remove") {
                await axios.post("http://localhost:5000/admin/products/remove", { id: productId });
                toast.success("Product removed successfully!");
            } else if (action === "edit") {
                await axios.post("http://localhost:5000/admin/products/edit", { id: productId, ...productData });
                toast.success("Product updated successfully!");
            }

            // Refresh the product list after action
            const response = await axios.get("http://localhost:5000/admin/products");
            setProducts(response.data);
            setApprovedProducts(response.data.filter((product: any) => product.approved));
            setWaitingProducts(response.data.filter((product: any) => !product.approved));
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const filteredApprovedProducts = approvedProducts
        .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, approvedLimit);

    const filteredWaitingProducts = waitingProducts
        .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, waitingLimit);

    return (
        <div className="flex max-w-6xl mx-auto mt-10 gap-6">
            <Toaster />
            {/* Product List Section */}
            <div className="w-2/3 bg-white rounded-xl shadow-md border border-gray-200 p-4 overflow-y-auto max-h-[70vh]">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Product List</h2>

                {/* Search Bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search Products"
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Product Tables */}
                <div className="flex justify-between">
                    {/* Waiting Products */}
                    <div className="mb-2 w-1/2">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Waiting to be Approved</h3>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 border-b">ID</th>
                                    <th className="py-2 px-4 border-b">Name</th>
                                    <th className="py-2 px-4 border-b">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredWaitingProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td className="py-2 px-4 border-b">{product.id}</td>
                                        <td className="py-2 px-4 border-b">{product.name}</td>
                                        <td className="py-2 px-4 border-b">{product.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Approved Products */}
                    <div className="w-1/2">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Approved</h3>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 border-b">ID</th>
                                    <th className="py-2 px-4 border-b">Name</th>
                                    <th className="py-2 px-4 border-b">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApprovedProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td className="py-2 px-4 border-b">{product.id}</td>
                                        <td className="py-2 px-4 border-b">{product.name}</td>
                                        <td className="py-2 px-4 border-b">{product.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Manage Products Section */}
            <div className="w-1/3 bg-white rounded-xl shadow-md border border-gray-200 p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Products</h1>

                <div className="flex flex-col gap-6">
                    {/* Action Selector */}
                    <select className="border p-3 rounded-lg" value={action} onChange={(e) => setAction(e.target.value)}>
                        <option value="approve">Approve</option>
                        <option value="edit">Edit</option>
                        <option value="remove">Remove</option>
                    </select>

                    {/* Product ID Input */}
                    <input type="number" placeholder="Enter Product ID" className="border p-3 rounded-lg" onChange={(e) => setProductId(Number(e.target.value))} />

                    {/* Product Data (For Edit) */}
                    {action === "edit" && (
                        <>
                            <input type="text" placeholder="Product Name" className="border p-3 rounded-lg" value={productData.name || ""} onChange={(e) => setProductData({ ...productData, name: e.target.value })} />
                            <textarea placeholder="Product Description" className="border p-3 rounded-lg" value={productData.description || ""} onChange={(e) => setProductData({ ...productData, description: e.target.value })} />
                        </>
                    )}

                    <button onClick={handleSubmit} className="bg-blue-500 text-white p-3 rounded-lg">{loading ? "Processing..." : "Submit"}</button>

                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;

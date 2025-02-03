import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const ManageUsers: React.FC = () => {
    const [action, setAction] = useState<string>("add");
    const [userId, setUserId] = useState<number | null>(null);
    const [userData, setUserData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [visibleUsers, setVisibleUsers] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [viewCount, setViewCount] = useState<number>(10);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/admin/users");
            setUsers(response.data);
            setVisibleUsers(response.data.slice(0, 10));
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query) {
            const filteredUsers = users.filter((user) =>
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query)
            );
            setVisibleUsers(filteredUsers.slice(0, viewCount));
        } else {
            setVisibleUsers(users.slice(0, viewCount));
        }
    };

    const handleViewMore = () => {
        setViewCount((prev) => prev + 10);
        setVisibleUsers(users.slice(0, viewCount + 10));
    };

    const handleViewLess = () => {
        setViewCount(10);
        setVisibleUsers(users.slice(0, 10));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.post(
                `http://localhost:5000/admin/users/${action}`,
                action === "add"
                    ? { ...userData }
                    : { id: userId, ...userData }
            );

            console.log("Response:", response.data);
            toast.success("Action completed successfully!");
            fetchUsers();
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-6">
            <Toaster />
            {/* User List Section */}
            <div className="col-span-2 border p-4 rounded-lg bg-white overflow-y-scroll max-h-screen">
                <h2 className="text-xl font-bold mb-4">User List</h2>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full mb-4 p-2 border rounded-lg"
                />
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleUsers.map((user) => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2">{user.id}</td>
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between mt-4">
                    {viewCount > 10 && (
                        <button
                            onClick={handleViewLess}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            View Less
                        </button>
                    )}
                    {visibleUsers.length < users.length && (
                        <button
                            onClick={handleViewMore}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            View More
                        </button>
                    )}
                </div>
            </div>

            {/* Manage Users Section */}
            <div className="col-span-1 border p-4 rounded-lg bg-white">
                <h2 className="text-xl font-bold mb-4">Manage Users</h2>

                <div className="flex flex-col gap-4">
                    {/* Action Selector */}
                    <div>
                        <label className="block text-gray-600 font-medium mb-2">Action</label>
                        <select
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            onChange={(e) => setAction(e.target.value)}
                            value={action}
                        >
                            <option value="add">Add</option>
                            <option value="edit">Edit</option>
                            <option value="remove">Remove</option>
                        </select>
                    </div>

                    {/* User ID Input (Only for Edit and Remove) */}
                    {action !== "add" && (
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">
                                User ID
                            </label>
                            <input
                                type="number"
                                placeholder="Enter User ID"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                onChange={(e) => setUserId(Number(e.target.value))}
                            />
                        </div>
                    )}

                    {/* Conditional Fields for Add/Edit */}
                    {action !== "remove" && (
                        <>
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    onChange={(e) =>
                                        setUserData({ ...userData, name: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600 font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    onChange={(e) =>
                                        setUserData({ ...userData, email: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600 font-medium mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    onChange={(e) =>
                                        setUserData({ ...userData, password: e.target.value })
                                    }
                                />
                            </div>
                        </>
                    )}

                    {/* Error Message */}
                    {error && <p className="text-red-600 font-medium">{error}</p>}

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-medium text-white ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                            }`}
                    >
                        {loading ? "Processing..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;

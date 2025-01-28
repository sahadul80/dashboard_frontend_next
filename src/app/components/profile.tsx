"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Calendar from "./calendar";

export default function Profile() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        id: 0,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const email = localStorage.getItem("email");
                if (token) {
                    const response = await axios.get(`http://localhost:5000/admin/user/${email}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setFormData(response.data);
                } else {
                    router.push("/pages/login");
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
                router.push("/pages/login");
            }
        };
        fetchUserData();
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.patch(
                `http://localhost:5000/admin/user/update/${formData.id}`,
                { name: formData.name, email: formData.email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile: ", error);
            toast.error("Failed to update profile.");
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/admin/user/delete/${formData.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Profile deleted successfully!");
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            router.push("/login");
        } catch (error) {
            console.error("Error deleting profile: ", error);
            toast.error("Failed to delete profile.");
        }
    };

    return (
        <>
        <Toaster />
            <div className="container flex justify-between p-4">
                <div className="w-1/3">
                <div className="card w-auto bg-base-100 shadow-xl">
                    <form onSubmit={handleUpdate}>
                        <div className="card-body">
                            <h2 className="card-title">Update Profile</h2>
                            <div>
                                <label className="label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="mt-4">
                                <button type="submit" className="btn btn-primary w-full">
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="card-body">
                        <button onClick={handleDelete} className="btn btn-error w-full">
                            Delete Profile
                        </button>
                    </div>
                    </div>
                </div>
                <div className="w-auto">
                    <Calendar />
                </div>
            </div>
        </>
    );
}

"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: "",
    });
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateInputs = (): boolean => {
        const { name, email, role, password, confirmPassword } = formData;

        if (!name.trim()) {
            toast.error("Name is required!");
            return false;
        }

        if (!email.trim()) {
            toast.error("Email is required!");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Invalid email format!");
            return false;
        }

        if (!role || role === "Select Role") {
            toast.error("Please select a role!");
            return false;
        }

        if (!password) {
            toast.error("Password is required!");
            return false;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error(
                "Password must be at least 8 characters long, include 1 uppercase letter, and 1 number!"
            );
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do NOT match!");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateInputs()) return;

        try {
            const { confirmPassword, ...submissionData } = formData;
            console.log("Data being sent:", submissionData);

            const response = await axios.post(
                "http://localhost:5000/admin/register",
                submissionData
            );

            console.log(response.data);
            toast.success("SignUp successful!");
            router.push("/pages/login");
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <>
            <Toaster />
            <div className="hero max-h-screen bg-base-400">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-right">
                        <h1 className="text-4xl font-bold">SignUp now!</h1>
                        <p className="py-4">Already Registered?</p>
                        <p className="py-2">
                            SignIn{" "}
                            <Link href="/pages/login/" className="text-red-800">
                                HERE
                            </Link>
                            !
                        </p>
                    </div>
                    <div className="card shrink-2 w-full min-w-sm shadow-2xl bg-base-200">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="input input-bordered flex items-center gap-2">
                                    Name
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Firstname Lastname"
                                        className="grow smaller-placeholder"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="input input-bordered flex items-center gap-2">
                                    Role
                                    <select
                                        name="role"
                                        className="grow"
                                        value={formData.role}
                                        onChange={handleSelect}
                                    >
                                        <option>Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="seller">Seller</option>
                                        <option value="vendor">Vendor</option>
                                    </select>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="input input-bordered flex items-center gap-2">
                                    Email
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="example@domain.com"
                                        className="grow smaller-placeholder"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="input input-bordered flex items-center gap-2">
                                    Password
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="1-uppercase, 1-number, 8-char long"
                                        className="grow smaller-placeholder"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="input input-bordered flex items-center gap-2">
                                    Confirm Password
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        className="grow smaller-placeholder"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-secondary">SignUp</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

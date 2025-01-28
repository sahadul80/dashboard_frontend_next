"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function LogInForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/index/login', formData);
            console.log(response.data);

            const token = response.data;
            console.log(token.access_token);

            toast.success('Logged in successfully...');

            // Store token and email in localStorage
            localStorage.setItem('token', token.access_token);
            localStorage.setItem('email', formData.email);

            // Redirect to dashboard after successful login
            router.push('/pages/dashboard');
        } catch (error) {
            console.error('Error signing in: ', error);
            toast.error('Login failed. Please check your credentials!');
        }
    };

    const handlePass = async (e: FormEvent) => {
        router.push('/pages/forgetpassword');
    }

    return (
        <>
            <Toaster />
            <div className="hero max-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-right">
                        <h1 className="text-4xl font-bold">Login now!</h1>
                        <p className="py-4">Yet NOT Registered?</p>
                        <p className="py-2">REGISTER <Link href="/pages/signup/" className="text-red-800">HERE</Link>!</p>
                    </div>
                    <div className="card shrink-0 w-full min-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="label">
                                    <li onClick={handlePass} className="link link-hover">Forgot password?</li>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

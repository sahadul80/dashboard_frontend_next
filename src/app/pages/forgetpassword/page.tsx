"use client"
import Header from "../../components/header";
import Footer from "../../components/footer";
import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ForgetPasswordForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: ''
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
            const response = await axios.get('http://localhost:5000/admin/forgetpass/' + formData.email);
            console.log(response.data);

            toast.success('A confirmation email has been sent...');
            // Display a dialog box with the link
            const confirmation = window.confirm(`A confirmation email has been sent to ${formData.email}. Click OK to go to the Google email login page.`);

            // If the user clicks OK, open the Google email login page in a new window
            if (confirmation) {
                window.open('https://mail.google.com/');
            }
        } catch (error) {
            toast.error(`User not found with the email: ${formData.email}.Please check your email address and try again!`);
        }
    };

    return (
        <>
      {/* Header */}
      <Header />
        <Toaster/>
        <div className="hero max-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-right">
                    <h1 className="text-4xl font-bold">Forgot Password?</h1>
                    <p>Provide your email address to retrive your account.</p>
                    <p className="py-6">Not Registered?</p>
                    <p>REGISTER <Link href="/pages/signup/" className="text-red-800">HERE</Link>!</p>
                    <p>To LogIn Click <Link href="/pages/login/" className="text-red-800">HERE</Link>!</p>
                </div>
                <div className="card shrink-0 w-full min-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Email" className="input input-bordered" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
      {/* Footer */}
      <Footer />
        </>
    );
}

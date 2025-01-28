"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ResetPasswordForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        passtoken: '',
        password: '',
        cpassword: ''
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

        if (formData.password != formData.cpassword) {
            window.alert("Passwords do not match. Make sure that both passwords are same...")
        } else {
            try {
                const response = await axios.post('http://localhost:5000/admin/resetpass/' + formData.passtoken, formData);
                console.log(response.data);
                router.push('/pages/login');
            } catch (error) {
                console.error('Error confirming password change in: ', error);
                toast.error('Resetting password failed!');
            }
        }
    };

    return (
        <>
            <Toaster />
        <div className="hero max-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-right">
                    <h1 className="text-4xl font-bold">Reset Password!</h1>
                </div>
                <div className="card shrink-0 w-full min-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Token</span>
                            </label>
                            <input type="text" name="passtoken" placeholder="paste the token here" className="input input-bordered" value={formData.passtoken} onChange={handleChange} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">New Password</span>
                            </label>
                            <input type="password" name="password" placeholder="1-uppercase, 1-number, 8-char long" className="input input-bordered" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" name="cpassword" placeholder="Confirm password" className="input input-bordered" value={formData.cpassword} onChange={handleChange} required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </>
    );
}

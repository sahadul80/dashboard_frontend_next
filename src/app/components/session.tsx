import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import AdminDashboard from './adminDashboard';
import UserManagement from './users';
import ProductManagement from './products';
import Profile from './profile';

interface User {
    id: number;
    name: string;
    email: string;
}

export default function Session() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeLink, setActiveLink] = useState('overview'); // Track the current active link

    useEffect(() => {
        // Fetch user data on component mount
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');

            if (token && email) {
                try {
                    const response = await axios.get(`http://localhost:5000/admin/user/${email}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching userdata: ', error);
                    toast.error('Login failed. Please check your credentials!');
                    router.push('/pages/login');
                }
            } else {
                // If no token or email, redirect to login page
                router.push('/pages/login');
            }

            setLoading(false);
        };

        fetchUserData();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        router.push('/pages/login');
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state until the data is fetched
    }

    if (!user) {
        return <div>No user data available</div>; // Show fallback if there's no user data
    }

    return (
        <div className="container">
            <div className="flex min-h-screen bg-gray-100">
                <Toaster />
                {/* Right-Side Navigation Panel */}
                <aside className="w-64">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold">Dashboard</h2>
                    </div>
                    <nav className="space-y-2 px-6">
                        <button
                            onClick={() => setActiveLink('overview')}
                            className={`block px-4 py-2 rounded ${activeLink === 'overview' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveLink('user-management')}
                            className={`block px-4 py-2 rounded ${activeLink === 'user-management' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                        >
                            User Management
                        </button>
                        <button
                            onClick={() => setActiveLink('product-management')}
                            className={`block px-4 py-2 rounded ${activeLink === 'product-management' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                        >
                            Product Management
                        </button>
                        <button
                            onClick={() => setActiveLink('profile')}
                            className={`block px-4 py-2 rounded ${activeLink === 'profile' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                        >
                            Profile
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Top Bar */}
                    <header className="flex items-center justify-between bg-white shadow px-6 py-4">
                        <h1 className="text-xl font-semibold text-gray-800">
                            Welcome, {user.name}!
                        </h1>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
                            >
                                Logout
                            </button>
                        </div>
                    </header>

                    {/* Main Dashboard Content */}
                    <main className="p-4">
                        {activeLink === 'overview' && <AdminDashboard />}
                        {activeLink === 'user-management' && <UserManagement />}
                        {activeLink === 'product-management' && <ProductManagement />}
                        {activeLink === 'profile' && <Profile />}
                    </main>
                </div>
            </div>
        </div>
    );
}

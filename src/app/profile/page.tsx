'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/navigation';
import Footer from '../components/Footer';

interface User {
    username: string;
    email: string;
    id?: number;
    balance: string;
    valute: string;
}

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8080/auth/me', {
                    withCredentials: true
                });
                setUser(res.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <p className="text-center mt-20 text-gray-500">Загрузка...</p>;
    if (error) return <p className="text-center mt-20 text-red-500">Ошибка: {error}</p>;

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/auth/logout', {}, { withCredentials: true });
            setUser(null);
            router.replace('/auth/login');
        } catch (err) {
            console.error('Ошибка при выходе:', err);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">

            <div className="flex flex-1 flex-col md:flex-row">
                {/* Sidebar */}
                <div className="w-full md:w-60">
                    <Sidebar />
                </div>

                {/* Основной контент */}
                <main className="flex-1 p-4 md:p-10 flex justify-center items-start">
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 w-full max-w-3xl">
                        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Profile user</h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Name:</p>
                                <p className="text-gray-900 font-medium text-lg">{user?.username}</p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm mb-1">Email:</p>
                                <p className="text-gray-900 font-medium text-lg">{user?.email}</p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm mb-1">ID:</p>
                                <p className="text-gray-900 font-medium text-lg">{user?.id}</p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm mb-1">Role:</p>
                                <p className="text-gray-900 font-medium text-lg">User</p>
                            </div>

                            <div>
                                <p className="text-gray-500 text-sm mb-1">Balance:</p>
                                <p className="text-gray-900 font-medium text-lg">{user?.balance} {user?.valute}</p>
                            </div>

                            <div className="flex justify-center sm:justify-start">
                                <button 
                                    onClick={handleLogout} 
                                    className='bg-red-600 w-full sm:w-40 h-10 rounded-2xl text-white cursor-pointer text-[18px]'
                                >
                                    LogOut
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Profile;

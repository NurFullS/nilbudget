'use client';

import React from 'react';
import Sidebar from '../components/Sidebar';


const SettingsPage = () => {

    return (
        <div className="flex">
            
            <Sidebar />
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-6">Settings</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-xl font-semibold mb-4">Profile</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Username</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    placeholder="Enter your username"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                                Save
                            </button>
                        </form>
                    </div>

                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-xl font-semibold mb-4">Security</h2>
                        <p className="text-gray-600 mb-4">Manage your password and 2FA</p>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                            Change Password
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default SettingsPage;

'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

type His = {
    date: any;
    amount: string;
    description: string;
    id?: number;
};

const History = () => {
    const [history, setHistory] = useState<His[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/auth/consumption/history`, {
                    withCredentials: true,
                });
                setHistory(response.data);
            } catch (err) {
                setError('Error not history found');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [BASE_URL]);


    if (loading)
        return (
            <div className="flex justify-center items-center text-center h-[60vh]">
                <p className="text-gray-500 text-lg">Loading...</p>
            </div>
        );

    if (error)
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );

    return (
        <div className="flex flex-col bg-gray-100">
            <div className="flex flex-col md:flex-row flex-1">
                <div className="w-full md:w-60">
                    <Sidebar />
                </div>

                <div className="flex-1 p-4 md:p-6 mt-4 md:mt-6">
                    <div className="bg-white shadow-lg rounded-2xl w-full max-w-4xl mx-auto p-4 md:p-6">
                        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Expense History</h2>

                        {history.length === 0 ? (
                            <p className="text-gray-500 text-center">History is empty</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <div className="max-h-[60vh] overflow-y-auto border border-gray-200 rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100 sticky top-0 z-10">
                                            <tr>
                                                <th className="px-3 sm:px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                    Date
                                                </th>
                                                <th className="px-3 sm:px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                    Sum
                                                </th>
                                                <th className="px-3 sm:px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                    Description
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {history.map((item, idx) => (
                                                <tr
                                                    key={item.id || idx}
                                                    className={`hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                                                >
                                                    <td className="px-3 sm:px-6 py-4 text-sm text-gray-600">
                                                        {new Date(item.date).toLocaleString()}
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-4 text-sm font-medium text-green-600">
                                                        {item.amount} KGS
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-4 text-sm text-gray-600">
                                                        {item.description || 'Income'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;

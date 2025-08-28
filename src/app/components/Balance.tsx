import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';

const Balance = () => {
    const [balance, setBalance] = useState(0);
    const [newCurrency, setCurrency] = useState('USD'); 
    const [openModalBalance, setOpenModalBalance] = useState(false);
    const [openModalConsumption, setOpenModalConsumption] = useState(false);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const currencySymbols: Record<string, string> = {
        USD: '$',
        KGS: 'KGS',
        EUR: '€',
        RUB: '₽'
    };

    const handleIncome = () => setOpenModalBalance(true);
    const handleConsumption = () => setOpenModalConsumption(true);

    const resetFields = () => {
        setAmount('');
        setDescription('');
    };

    const fetchUser = async () => {
        try {
            const res = await axios.get('http://localhost:8080/auth/me', { withCredentials: true });
            setBalance(res.data.balance);
            setCurrency(res.data.valute || 'USD');
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleAddIncome = async () => {
        const num = Number(amount);
        if (isNaN(num) || num <= 0) return;

        try {
            const res = await axios.post(
                'http://localhost:8080/auth/income',
                { amount: num, newCurrency }, 
                { withCredentials: true }
            );

            setBalance(res.data.balance);
            setCurrency(res.data.valute);
            setOpenModalBalance(false);
            resetFields();
        } catch (err) {
            console.error('Error adding income:', err);
        }

        try {
            await axios.post(
                "http://localhost:8080/auth/valute",
                { valute: newCurrency },
                { withCredentials: true }
            );
        } catch (error) {
            console.error("Error updating currency:", error);
        }
    };

    const handleAddConsumption = async () => {
        const num = Number(amount);
        if (isNaN(num) || num <= 0) return;

        try {
            const res = await axios.post(
                'http://localhost:8080/auth/consumption',
                { amount: num, description },
                { withCredentials: true }
            );

            setBalance(res.data.balance);
            setOpenModalConsumption(false);
            resetFields();
        } catch (err) {
            console.error('Error subtracting balance:', err);
        }
    };

    return (
        <>
            <div className="w-[400px] h-[200px] ml-30 mt-10 bg-green-200 shadow-lg rounded-2xl p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-700">Balance</h2>
                    <span className="text-sm text-gray-500">{currencySymbols[newCurrency]}</span>
                </div>

                <div className="text-4xl font-extrabold text-green-600">
                    {(balance ?? 0).toLocaleString()} {currencySymbols[newCurrency] || 'USD'}
                </div>

                <div className="flex justify-between mt-4">
                    <button
                        onClick={handleIncome}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
                    >
                        Income
                    </button>
                    <button
                        onClick={handleConsumption}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
                    >
                        Consumption
                    </button>
                </div>
            </div>

            {openModalConsumption && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-400 bg-opacity-50 z-50">
                    <div className="bg-white rounded-2xl shadow-lg w-[300px] p-6 text-center">
                        <h1 className="text-xl font-bold mb-4">Add Consumption</h1>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 outline-none"
                        />
                        <TextField
                            type="text"
                            placeholder="Description of consumption..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={4}
                            fullWidth
                            className="mb-4"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={handleAddConsumption}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Add
                            </button>
                            <button
                                onClick={() => { setOpenModalConsumption(false); resetFields(); }}
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {openModalBalance && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-400 bg-opacity-50 z-50">
                    <div className="bg-white rounded-2xl shadow-lg w-[300px] p-6 text-center">
                        <h1 className="text-xl font-bold mb-4">Add Income</h1>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 outline-none"
                        />
                        <select
                            value={newCurrency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 outline-none"
                        >
                            <option value="USD">USD</option>
                            <option value="KGS">KGS</option>
                            <option value="EUR">EUR</option>
                            <option value="RUB">RUB</option>
                        </select>
                        <div className="flex justify-between">
                            <button
                                onClick={handleAddIncome}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                            >
                                Add
                            </button>
                            <button
                                onClick={() => { setOpenModalBalance(false); resetFields(); }}
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Balance;
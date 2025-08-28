import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TextField } from '@mui/material'

const Balance = () => {
    const [balance, setBalance] = useState(0)
    const [currency, setCurrency] = useState('$')
    const [openModalBalance, setOpenModalBalance] = useState(false)
    const [amount, setAmount] = useState('')
    const [openModalConsumption, setOpenModalConsumption] = useState(false)
    const [description, setDescription] = useState('')

    const handleIncome = () => setOpenModalBalance(true)

    const handleAddIncome = async () => {
        const num = Number(amount);
        if (isNaN(num) || num <= 0) return;

        try {
            const res = await axios.post(
                'http://localhost:8080/auth/income',
                { amount: num, description: description || '' },
                { withCredentials: true }
            );

            setBalance(res.data.balance);
            setCurrency(res.data.valute);
            setAmount('');
            setDescription('');
            setOpenModalBalance(false);
        } catch (err) {
            console.error('Error adding income:', err);
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
            setAmount('');
        } catch (err) {
            console.error('Error subtracting balance:', err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8080/auth/me', { withCredentials: true })
                setBalance(res.data.balance)
                setCurrency(res.data.valute)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    const handleConsumption = () => {
        setOpenModalConsumption(true)
    }

    return (
        <>
            <div className="w-[400px] h-[200px] ml-30 mt-10 bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-700">Balance</h2>
                    <span className="text-sm text-gray-500">{currency}</span>
                </div>

                <div className="text-4xl font-extrabold text-green-600">
                    {balance.toLocaleString()} {currency}
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
                        <h1 className="text-xl font-bold mb-4">Add Income</h1>
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
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                            >
                                Consumption
                            </button>
                            <button
                                onClick={() => setOpenModalConsumption(false)}
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
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 outline-none"
                        >
                            <option value="$">USD</option>
                            <option value="KGS">KGS</option>
                            <option value="€">EUR</option>
                            <option value="₽">RUB</option>
                        </select>
                        <div className="flex justify-between">
                            <button
                                onClick={handleAddIncome}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                            >
                                Add
                            </button>
                            <button
                                onClick={() => setOpenModalBalance(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Balance;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/consumption/history', {
          withCredentials: true,
        });
        setHistory(response.data);
      } catch (err) {
        setError('Не удалось загрузить историю');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center text-center h-64">
        <p className="text-gray-500 text-lg text-center justify-center ml-[300px]">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Expense History</h2>

      {history.length === 0 ? (
        <p className="text-gray-500 text-center">History is empty</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Summ
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
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
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(item.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-green-600">
                    {item.amount} KGS
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
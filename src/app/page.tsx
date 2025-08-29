'use client'

import Sidebar from "./components/Sidebar";
import Balance from "./components/Balance";
import History from "./components/History";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-60">
        <Sidebar />
      </div>

      {/* Основной контент */}
      <div className="flex-1 p-4 md:p-6 flex flex-col md:flex-row gap-6 flex-wrap justify-center">
        <div className="flex-1 min-w-[280px]">
          <Balance />
        </div>
        <div className="flex-1 min-w-[280px]">
          <History />
        </div>
      </div>
    </div>
  );
}

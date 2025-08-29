'use client'

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Balance from "./components/Balance";
import History from "./components/History";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex gap-6">
        <Sidebar />
        <div className="flex gap-30">
          <Balance />
          <History />
        </div>
      </div>
    </div>
  );
}

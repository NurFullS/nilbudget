'use client'

import Sidebar from "./components/Sidebar";
import Balance from "./components/Balance";
import History from "./components/History";

export default function Home() {
  return (
    <div>
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

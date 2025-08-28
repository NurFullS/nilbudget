'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Balance from "./components/Balance";
import History from "./components/History";

interface User {
  id: number;
  username: string;
  email: string;
}

export default function Home() {

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <Balance />
        <History />
      </div>
    </>
  );
}

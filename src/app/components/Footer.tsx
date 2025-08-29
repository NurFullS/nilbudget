import React from 'react';
import { FaInstagram, FaTelegram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full mt-auto bg-blue-100">
      <div className="max-w-6xl mx-auto py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="text-gray-700 font-bold text-lg">
          NilBudget
        </div>

        <div className="flex items-center gap-6 text-gray-700">
          <a href="https://instagram.com/ruslanovi.ch" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition">
            <FaInstagram size={24} />
          </a>
          <a href="https://t.me/NurJnR" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition">
            <FaTelegram size={24} />
          </a>
          <a href="mailto:nurzhenishov10@gmail.com" className="hover:text-gray-900 transition">
            <FaEnvelope size={24} />
          </a>
        </div>

        <div className="text-gray-700 text-sm text-center md:text-right">
          © 2025 NilStudio. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer;

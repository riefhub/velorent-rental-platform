// components/Navbar.js
"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = ({ userName }) => {
    return (
        <div className="bg-black rounded-b-[25px] shadow-lg z-10 relative">
            <nav className="flex items-center justify-between px-12 py-5">
                <div className="logo text-3xl font-bold text-white tracking-tight">
                    VeloRent
                </div>
                <ul className="flex gap-16 text-white font-semibold text-lg">
                    <li>
                        <a href="/home" className="hover:text-blue-400 transition">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/history" className="hover:text-blue-400 transition">
                            History
                        </a>
                    </li>
                </ul>
                <div className="flex items-center gap-3">
                    <Link href="/home/profile">
                        <span className="text-white font-medium hover:text-blue-400 transition cursor-pointer">
                            Hello, {userName}!
                        </span>
                    </Link>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200">
                        <svg
                            className="w-7 h-7 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="8" r="4" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4"
                            />
                        </svg>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;

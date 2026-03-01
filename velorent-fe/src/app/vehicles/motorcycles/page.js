"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import request from "@/utils/request";
import Navbar from "@/components/Navbar";


export default function Motorcycles() {
	const router = useRouter();
	const [motorList, setMotorList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState("");

	// Ambil username dari localStorage
	useEffect(() => {
		const storedUsername = localStorage.getItem("username");
		if (storedUsername) {
			setUsername(storedUsername);
		} else {
			console.warn("Username tidak ditemukan di localStorage");
		}
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await request.get("/motor");
				console.log("Response data:", res.data);
				setMotorList(res.data);
			} catch (error) {
				console.error("Gagal mengambil data mobil:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);
	return (
		<div className="min-h-screen font-sans bg-gradient-to-b from-blue-400 to-blue-100 overflow-x-hidden">
			{/* Gunakan Navbar dengan username */}
			<Navbar userName={username} />

			{/* List Motor */}
			<main className="py-12 px-6">
				<h1 className="text-4xl font-bold mb-10 text-center text-white">
					Daftar Motor Tersedia
				</h1>

				{loading ? (
					<p className="text-center text-white text-lg">Memuat data motor...</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{motorList.length === 0 ? (
							<p className="text-white text-center col-span-full">
								Tidak ada motor tersedia.
							</p>
						) : (
							motorList.map((motor, idx) => (
								<div
									key={idx}
									onClick={() => router.push(`/checkout/review/${motor.id}`)}
									className="bg-white/80 text-gray-900 rounded-2xl shadow-xl border border-gray-200 p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
								>
									<img
										src={
											motor.gambar
												? `${process.env.NEXT_PUBLIC_HOST}${motor.gambar}`
												: "/images/default.png"
										}
										alt={motor.nama || "Motor"}
										className="w-full h-40 object-contain mb-4"
									/>
									<h3 className="font-bold text-lg">{motor.nama || "Nama tidak tersedia"}</h3>
									<p className="text-sm text-gray-600">
										{motor.status || "Tidak Tersedia"}
									</p>
									<p className="font-semibold mt-2">
										{motor.harga ? `Rp ${motor.harga} / hari` : "Harga tidak tersedia"}
									</p>
								</div>
							))
						)}
					</div>
				)}
			</main>
		</div>
	);
}

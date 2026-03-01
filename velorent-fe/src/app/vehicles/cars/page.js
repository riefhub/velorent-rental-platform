"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import request from "@/utils/request";
import Navbar from "@/components/Navbar";

export default function Cars() {
	const router = useRouter();
	const [mobilList, setMobilList] = useState([]);
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
				const res = await request.get("/mobil");
				console.log("Response data:", res.data);
				setMobilList(res.data);
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

			{/* List Mobil */}
			<main className="py-12 px-6">
				<h1 className="text-4xl font-bold mb-10 text-center text-white">
					Daftar Mobil Tersedia
				</h1>

				{loading ? (
					<p className="text-center text-white text-lg">Memuat data mobil...</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{mobilList.length === 0 ? (
							<p className="text-white text-center col-span-full">
								Tidak ada mobil tersedia.
							</p>
						) : (
							mobilList.map((mobil, idx) => (
								<div
									key={idx}
									onClick={() => router.push(`/checkout/review/${mobil.id}`)}
									className="bg-white/80 text-gray-900 rounded-2xl shadow-xl border border-gray-200 p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
								>
									<img
										src={
											mobil.gambar
												? `${process.env.NEXT_PUBLIC_HOST}${mobil.gambar}`
												: "/images/default.png"
										}
										alt={mobil.nama || "Mobil"}
										className="w-full h-40 object-contain mb-4"
									/>
									<h3 className="font-bold text-lg">{mobil.nama || "Nama tidak tersedia"}</h3>
									<p className="text-sm text-gray-600">
										{mobil.status || "Tidak Tersedia"}
									</p>
									<p className="font-semibold mt-2">
										{mobil.harga
											? `Rp ${mobil.harga.toLocaleString("id-ID")} / hari`
											: "Harga tidak tersedia"}
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

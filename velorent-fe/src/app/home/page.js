"use client";
import React, { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import request from "@/utils/request";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const [promoCars, setPromoCars] = useState([]);
	const [promoMotorcycles, setPromoMotorcycles] = useState([]);

	const [username, setUsername] = useState("");

	useEffect(() => {
		const fetchCars = async () => {
			try {
				const res = await request.get("/mobil");
				console.log("Response data cars:", res.data);
				// Ambil 3 mobil pertama
				setPromoCars(res.data.slice(0, 3)); // Batasi hanya 3 mobil
			} catch (error) {
				console.error("Gagal mengambil data mobil:", error);
			}
		};

		fetchCars();
	}, []);

	useEffect(() => {
		const fetchMotorcycles = async () => {
			try {
				const res = await request.get("/motor");
				console.log("Response data motorcycles:", res.data);
				// Ambil 2 motor pertama
				setPromoMotorcycles(res.data.slice(0, 2)); // Batasi hanya 2 motor
			} catch (error) {
				console.error("Gagal mengambil data motor:", error);
			}
		};

		fetchMotorcycles();
	}, []);

	useEffect(() => {
		const storedUsername = localStorage.getItem("username");
		if (storedUsername) {
			setUsername(storedUsername);
		}
	}, []);

	const carouselRef = useRef(null);

	const handlePrev = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
		}
	};

	const handleNext = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
		}
	};

	return (
		<div className="min-h-screen font-sans bg-[#3b5bdb] relative overflow-x-hidden">
			{/* Gunakan Navbar dengan username */}
			<Navbar userName={username} />
			{/* Section di bawahnya overlap ke atas */}
			<div className="bg-gradient-to-b from-[#3b5bdb] to-[#5f8dff] pt-32 pb-20 -mt-8 z-0 relative shadow-xl">
				<section className="flex justify-center gap-16">
					<a
						href="/vehicles/cars"
						className="bg-white rounded-2xl shadow-md flex flex-col items-center px-12 py-10 transition hover:scale-105 cursor-pointer"
					>
						<img
							src="https://img.icons8.com/ios/100/car--v1.png"
							alt="Car"
							className="w-24 h-24 mb-4"
						/>
						<p className="font-bold text-lg text-gray-800">Cars</p>
					</a>

					<a
						href="/vehicles/motorcycles"
						className="bg-white rounded-2xl shadow-md flex flex-col items-center px-12 py-10 transition hover:scale-105 cursor-pointer"
					>
						<img
							src="https://img.icons8.com/ios/100/motorcycle.png"
							alt="Motorcycle"
							className="w-24 h-24 mb-4"
						/>
						<p className="font-bold text-lg text-gray-800">Motorcycle</p>
					</a>
				</section>
			</div>

			{/* Hot Products */}
			<div className="bg-white py-12">
				<section className="max-w-6xl mx-auto">
					<div className="flex items-center gap-2 mb-6">
						<h2 className="text-2xl font-extrabold text-black">Hot Promo this week</h2>
						<span className="text-2xl">🔥</span>
					</div>
					<div className="flex items-center gap-4">
						<button
							className="bg-white shadow-md w-12 h-12 flex items-center justify-center rounded-full text-2xl text-gray-700 hover:bg-gray-100 transition"
							onClick={handlePrev}
							aria-label="Scroll left"
						>
							<svg
								className="w-7 h-7"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						<div
							className="flex gap-8 px-2"
							ref={carouselRef}
							style={{
								scrollBehavior: "smooth",
								overflowX: "hidden",
								WebkitOverflowScrolling: "touch",
							}}
						>
							{promoCars.map((car, idx) => (
								<div
									key={idx}
									onClick={() => router.push(`/checkout/review/${car.id}`)}
									className="bg-gray-100 rounded-2xl flex flex-col items-center justify-center min-w-[260px] min-h-[230px] shadow transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
								>
									<img
										src={
											car.gambar
												? `${process.env.NEXT_PUBLIC_HOST}${car.gambar}`
												: "/images/default.png"
										}
										alt={car.nama || "Mobil"}
										className="w-44 h-28 object-contain mb-2"
									/>
									<p className="font-semibold text-sm text-gray-800">{car.nama}</p>
									<p className="text-[12px] text-gray-600 italic text-center">
										{car.status}
									</p>
									<p className="text-[12px] text-gray-900 font-bold mt-1">
										{car.harga}
									</p>
								</div>
							))}
							{promoMotorcycles.map((motor, idx) => (
								<div
									key={idx}
									onClick={() => router.push(`/checkout/review/${motor.id}`)}
									className="bg-gray-100 rounded-2xl flex flex-col items-center justify-center min-w-[260px] min-h-[230px] shadow transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
								>
									<img
										src={
											motor.gambar
												? `${process.env.NEXT_PUBLIC_HOST}${motor.gambar}`
												: "/images/default.png"
										}
										alt={motor.nama || "Mobil"}

										className="w-44 h-28 object-contain mb-2"
									/>
									<p className="font-semibold text-sm text-gray-800">{motor.nama}</p>
									<p className="text-[12px] text-gray-600 italic text-center">
										{motor.status}
									</p>
									<p className="text-[12px] text-gray-900 font-bold mt-1">
										{motor.harga}
									</p>
								</div>
							))}
						</div>
						<button
							className="bg-white shadow-md w-12 h-12 flex items-center justify-center rounded-full text-2xl text-gray-700 hover:bg-gray-100 transition"
							onClick={handleNext}
							aria-label="Scroll right"
						>
							<svg
								className="w-7 h-7"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>
				</section>
			</div>
		</div>
	);
}

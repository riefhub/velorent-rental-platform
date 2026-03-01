'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DetailMobilPage({ params }) {
    const router = useRouter();
    const [mobil, setMobil] = useState(null);

    useEffect(() => {
        const storedMobil = localStorage.getItem('selectedMobil');
        if (storedMobil) {
            setMobil(JSON.parse(storedMobil));
        }
    }, []);

 // Ganti sesuai backend kamu

    if (!mobil) {
        return (
            <div className="p-6 text-center text-red-500 font-semibold">
                Mobil tidak ditemukan.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Detail Mobil</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                    {mobil.gambar ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_HOST}${mobil.gambar}`}
                            alt={mobil.nama}
                            className="w-full md:w-80 h-auto rounded-lg shadow-md object-cover"
                        />
                    ) : (
                        <div className="w-80 h-48 flex items-center justify-center bg-gray-100 text-gray-500 italic rounded">
                            Tidak ada gambar
                        </div>
                    )}
                </div>
                <div className="flex-1 space-y-3">
                    <p><span className="font-semibold">ID:</span> {mobil.id}</p>
                    <p><span className="font-semibold">Nama:</span> {mobil.nama}</p>
                    <p><span className="font-semibold">Nomor Polisi:</span> {mobil.nomorPolisi}</p>
                    <p><span className="font-semibold">Tahun:</span> {mobil.tahun}</p>
                    <p><span className="font-semibold">Status:</span> {mobil.status}</p>
                    <p><span className="font-semibold">Harga:</span> Rp {mobil.harga.toLocaleString()}</p>
                    <p><span className="font-semibold">Transmisi:</span> {mobil.jenisTransmisi}</p>
                    <p><span className="font-semibold">Bahan Bakar:</span> {mobil.jenisBahanBakar}</p>
                    <p><span className="font-semibold">Tipe Mobil:</span> {mobil.tipeMobil}</p>
                    <p><span className="font-semibold">Kapasitas:</span> {mobil.kapasitas} orang</p>
                </div>
            </div>

            <button
                onClick={() => router.back()}
                className="mt-8 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Kembali
            </button>
        </div>
    );
}

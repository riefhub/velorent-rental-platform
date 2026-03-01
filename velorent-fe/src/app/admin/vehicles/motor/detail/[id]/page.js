'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DetailMotorPage({ params }) {
    const router = useRouter();
    const [motor, setMotor] = useState(null);

    useEffect(() => {
        const storedMotor = localStorage.getItem('selectedMotor');
        if (storedMotor) {
            setMotor(JSON.parse(storedMotor));
        }
    }, []);

 // Ganti sesuai backend kamu

    if (!motor) {
        return (
            <div className="p-6 text-center text-red-500 font-semibold">
                Motor tidak ditemukan.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Detail Motor</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                    {motor.gambar ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_HOST}${motor.gambar}`}
                            alt={motor.nama}
                            className="w-full md:w-80 h-auto rounded-lg shadow-md object-cover"
                        />
                    ) : (
                        <div className="w-80 h-48 flex items-center justify-center bg-gray-100 text-gray-500 italic rounded">
                            Tidak ada gambar
                        </div>
                    )}
                </div>
                <div className="flex-1 space-y-3">
                    <p><span className="font-semibold">ID:</span> {motor.id}</p>
                    <p><span className="font-semibold">Nama:</span> {motor.nama}</p>
                    <p><span className="font-semibold">Nomor Polisi:</span> {motor.nomorPolisi}</p>
                    <p><span className="font-semibold">Tahun:</span> {motor.tahun}</p>
                    <p><span className="font-semibold">Status:</span> {motor.status}</p>
                    <p><span className="font-semibold">Harga:</span> Rp {motor.harga.toLocaleString()}</p>
                    <p><span className="font-semibold">Transmisi:</span> {motor.jenisTransmisi}</p>
                    <p><span className="font-semibold">Bahan Bakar:</span> {motor.jenisBahanBakar}</p>
                    <p><span className="font-semibold">Tipe Motor:</span> {motor.tipeMotor}</p>
                    <p><span className="font-semibold">Kapasitas Mesin:</span> {motor.kapasitasMesin} cc</p>
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

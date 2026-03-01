'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import request from '@/utils/request';

export default function Page() {
  const router = useRouter();
  const params = useParams(); // ✅ Gunakan useParams dari next/navigation
  const [username, setUsername] = useState('');
  const [kendaraan, setKendaraan] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil data kendaraan dari API
  useEffect(() => {
    const fetchKendaraan = async () => {
      if (!params?.id) return;

      try {
        const res = await request.get(`/kendaraan/${params.id}`);
        setKendaraan(res.data);
      } catch (err) {
        console.error('Gagal memuat data kendaraan:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchKendaraan();
  }, [params?.id]);

  // Ambil username dari localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      console.warn('Username tidak ditemukan di localStorage');
    }
  }, []);

  return (
    <div className="min-h-screen font-sans bg-[#3b5bdb] relative overflow-x-hidden">
      <Navbar userName={username} />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <div className="relative w-full max-w-md">
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : kendaraan ? (
            <img
              src={`${process.env.NEXT_PUBLIC_HOST}${kendaraan.gambar}`}
              alt={kendaraan.nama}
              className="w-full h-56 object-cover rounded-lg shadow"
            />
          ) : (
            <p className="text-white">Data kendaraan tidak ditemukan.</p>
          )}
        </div>

        <div className="w-full max-w-md bg-white rounded-xl shadow p-6 mt-4">
          {kendaraan ? (
            <>
              <h2 className="text-2xl font-bold mb-2">{kendaraan.nama}</h2>
              <p className="text-lg text-gray-700 mb-4">
                Price at{" "}
                <span className="font-bold">
                  {Number(kendaraan.harga).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 2,
                  })}{" "}
                  / Day
                </span>
              </p>

              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 font-semibold shadow">
                Vehicle Description
              </button>

              <div className="text-left text-sm">
                <p className="font-semibold mb-1">{kendaraan.nama}</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Status: {kendaraan.status}</li>
                  <li>No Polisi: {kendaraan.nomorPolisi}</li>
                  <li>Transmisi: {kendaraan.jenisTransmisi}</li>
                  <li>Bahan Bakar: {kendaraan.jenisBahanBakar}</li>
                  <li>Tahun: {kendaraan.tahun}</li>

                  {kendaraan.jenis === 'Mobil' ? (
                    <>
                      <li>Type: {kendaraan.tipeMobil}</li>
                      <li>Kapasitas: {kendaraan.kapasitas} orang</li>
                    </>
                  ) : kendaraan.jenis === 'Motor' ? (
                    <>
                      <li>Tipe Motor: {kendaraan.tipeMotor}</li>
                      <li>Kapasitas Mesin: {kendaraan.kapasitasMesin} cc</li>
                    </>
                  ) : (
                    <li>Jenis kendaraan tidak diketahui</li>
                  )}
                </ul>
              </div>
            </>
          ) : (
            <p>Loading vehicle details...</p>
          )}
        </div>
      </main>

      <div className="w-full flex justify-center gap-4 px-4 py-2">
        <button
          className="bg-blue-500 text-white py-3 text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition w-full max-w-xs"
          onClick={() => router.back()}
        >
          BACK
        </button>
        <button
          className="bg-blue-500 text-white py-3 text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition w-full max-w-xs"
          onClick={() => router.push(`/checkout/transaction/${params.id}`)}
        >
          RENT
        </button>
      </div>
    </div>
  );
}

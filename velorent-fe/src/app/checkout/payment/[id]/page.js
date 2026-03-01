'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import request from '@/utils/request';
import { useRouter, useParams } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

export default function Payment() {
  const router = useRouter();
  const { id } = useParams();

  const [username, setUsername] = useState('');
  const [totalHarga, setTotalHarga] = useState(null);
  const [jumlahBayar, setJumlahBayar] = useState(0);
  const [kembalian, setKembalian] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      console.warn('Username not found in localStorage');
    }

    if (id) {
      request.get(`/transaksi/${id}`)
        .then(response => {
          const data = response.data;
          setTotalHarga(data.totalHarga);
        })
        .catch(err => {
          console.error('Gagal mengambil data transaksi:', err);
        });
    }
  }, [id]);

  const handlePayment = async () => {
    if (jumlahBayar >= totalHarga) {
      const kembali = jumlahBayar - totalHarga;
      setKembalian(kembali);

      try {
        const response = await request.post('/pembayaran', {
          transaksiId: id,
          jumlahBayar
        });

        toast.success('Pembayaran berhasil!');
        setShowConfirmation(true);

        setTimeout(() => {
          router.push('/home');
        }, 2000);

      } catch (error) {
        console.error('Gagal melakukan pembayaran:', error);
        toast.error('Pembayaran gagal, coba lagi!');
      }
    } else {
      toast.error('Jumlah bayar tidak cukup!');
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gray-100 p-4 font-sans">
        <Navbar userName={username} />
        <main className="mt-8 flex flex-col gap-8 px-4">
          <section className="bg-white p-6 border border-gray-300 rounded-xl shadow-sm flex-1">
            <h2 className="text-2xl font-bold mb-6 text-center">Pembayaran</h2>
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="flex-1 w-full">
                <p className="text-blue-500 font-bold mb-4 text-lg">
                  Total Harga: {totalHarga !== null ? `Rp ${totalHarga.toLocaleString()}` : 'Loading...'}
                </p>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1">Jumlah Bayar</label>
                  <input
                    type="number"
                    onChange={e => setJumlahBayar(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full p-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan jumlah bayar"
                    value={jumlahBayar === 0 ? "" : jumlahBayar}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1">Kembalian</label>
                  <input
                    type="number"
                    value={kembalian}
                    readOnly
                    className="w-full p-2 bg-gray-100 rounded-md border border-gray-300"
                    placeholder="Kembalian"
                  />
                </div>
                <button
                  onClick={handlePayment}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition duration-200"
                >
                  Bayar
                </button>
              </div>
            </div>
          </section>
          {showConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center">
                <h3 className="text-2xl font-bold mb-4 text-green-600">Pembayaran Berhasil!</h3>
                <p className="mb-4">Terima kasih, pembayaran Anda telah diterima.</p>
                <div className="flex flex-col gap-2 text-left text-sm mb-4">
                  <span><b>Total Harga:</b> Rp {totalHarga?.toLocaleString()}</span>
                  <span><b>Jumlah Bayar:</b> Rp {jumlahBayar?.toLocaleString()}</span>
                  <span><b>Kembalian:</b> Rp {kembalian?.toLocaleString()}</span>
                </div>
                <p className="text-gray-500 text-xs">Anda akan diarahkan ke halaman konfirmasi...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

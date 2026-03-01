'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import request from '@/utils/request';
import { Toaster, toast } from 'react-hot-toast';

export default function Transaction() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);
  const [kendaraan, setKendaraan] = useState(null);
  const [tanggalPinjam, setTanggalPinjam] = useState('');
  const [tanggalKembali, setTanggalKembali] = useState('');
  const [totalHarga, setTotalHarga] = useState(null);
  const [hargaPerHari, setHargaPerHari] = useState(0);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    if (storedUsername && storedUserId) {
      setUsername(storedUsername);
      setUserId(storedUserId);
    } else {
      console.warn('Username atau userId tidak ditemukan di localStorage');
    }

    if (id) {
      request.get(`/kendaraan/${id}`)
        .then(response => {
          const data = response.data;
          setKendaraan(data);
          setHargaPerHari(Number(data.harga) || 0);
        })
        .catch(err => {
          console.error('Gagal mengambil data kendaraan:', err);
        });
    }
  }, [id]);

  const hitungTotalHarga = () => {
    if (tanggalPinjam && tanggalKembali && hargaPerHari > 0) {
      const tanggalPeminjaman = new Date(tanggalPinjam);
      const tanggalPengembalian = new Date(tanggalKembali);
      const msPerHari = 1000 * 60 * 60 * 24;
      const start = Date.UTC(tanggalPeminjaman.getFullYear(), tanggalPeminjaman.getMonth(), tanggalPeminjaman.getDate());
      const end = Date.UTC(tanggalPengembalian.getFullYear(), tanggalPengembalian.getMonth(), tanggalPengembalian.getDate());
      const selisihHari = Math.floor((end - start) / msPerHari);

      if (selisihHari < 1) {
        toast.error('Tanggal kembali harus lebih dari tanggal pinjam!');
        setTotalHarga(null);
        return;
      }

      const total = selisihHari * hargaPerHari;
      setTotalHarga(total);
    } else {
      toast.error('Silakan isi tanggal dengan benar dan pastikan harga kendaraan tersedia.');
    }
  };

  const handleOrder = async () => {
    if (!userId || !id || !tanggalPinjam || !tanggalKembali) {
      toast.error('Harap lengkapi semua data!');
      return;
    }

    try {
      const response = await request.post('/transaksi', {
        userId,
        kendaraanId: id,
        tanggalPeminjaman: tanggalPinjam,
        tanggalPengembalian: tanggalKembali
      });

      const { totalHarga, transaksiId } = response.data;
      setTotalHarga(totalHarga);
      toast.success('Transaksi berhasil dibuat!');
      router.push(`/checkout/payment/${transaksiId}`);
    } catch (error) {
      console.error('Gagal membuat transaksi:', error);
      toast.error('Gagal membuat transaksi!');
    }
  };

  return (
    <>
      <Toaster position='top-center' />
      <div className="min-h-screen bg-gray-100 p-4 font-sans">
        <Navbar userName={username} />
        <main className="mt-8 flex flex-col gap-8 px-4 max-w-5xl mx-auto">
          <section className="bg-white p-6 border border-gray-300 rounded-xl shadow-sm flex-1">
            {kendaraan ? (
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <img
                  src={`${process.env.NEXT_PUBLIC_HOST}${kendaraan.gambar}`}
                  alt={kendaraan.nama}
                  className="w-full lg:w-1/2 rounded-lg shadow-md object-cover max-h-[400px]"
                  onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e82f1109-8814-433e-b088-ab73c9ccea91.png'; }}
                />
                <div className="flex-1 w-full flex flex-col">
                  <h2 className="text-2xl font-bold mb-2">{kendaraan.nama}</h2>
                  <p className="text-blue-600 font-semibold mb-6 text-lg">
                    IDR {hargaPerHari.toLocaleString()},00 / Day
                  </p>
                  <form className="space-y-3" onSubmit={e => e.preventDefault()}>
                    <div className="flex gap-4 flex-col sm:flex-row">
                      <div className="flex-1">
                        <label htmlFor="tanggalPinjam" className="block text-sm font-medium mb-1 uppercase">
                          Tanggal Pinjam
                        </label>
                        <input
                          id="tanggalPinjam"
                          type="date"
                          value={tanggalPinjam}
                          onChange={e => setTanggalPinjam(e.target.value)}
                          className="w-full p-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="tanggalKembali" className="block text-sm font-medium mb-1 uppercase">
                          Tanggal Kembali
                        </label>
                        <input
                          id="tanggalKembali"
                          type="date"
                          value={tanggalKembali}
                          onChange={e => setTanggalKembali(e.target.value)}
                          className="w-full p-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={hitungTotalHarga}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                      >
                        Hitung Total Harga
                      </button>
                      {totalHarga !== null && (
                        <div className="text-lg font-semibold text-blue-800">
                          Total Harga: <span>Rp {totalHarga.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-6 text-right">
                      <button
                        type="button"
                        onClick={handleOrder}
                        disabled={totalHarga === null}
                        className={`
                          bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200
                          ${totalHarga === null ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                      >
                        Buat Pesanan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">Loading vehicle details...</p>
            )}
          </section>
        </main>
      </div>
    </>
  );
}


'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import request from '@/utils/request';

export default function TransactionsPage() {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const response = await request.get('/transaksi');
        if (response.status === 200) {
          setTransaksi(response.data);
        } else {
          console.error('Gagal mengambil data transaksi:', response.statusText);
        }
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data transaksi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaksi();
  }, []);

  const handleEdit = (transaksiId) => {
    router.push(`/admin/transaksi/edit/${transaksiId}`);
  };

  const handleDelete = async (transaksiId) => {
    const konfirmasi = confirm('Apakah Anda yakin ingin menghapus transaksi ini?');
    if (!konfirmasi) return;

    try {
      const res = await request.delete(`/transaksi/${transaksiId}`);

      if (res.status === 401) {
        alert('Token tidak valid atau sesi habis. Silakan login ulang.');
        return;
      }

      setTransaksi((prev) => prev.filter((item) => item.transaksiId !== transaksiId));
    } catch (err) {
      console.error('Gagal menghapus transaksi:', err);
      alert(err.message || 'Terjadi kesalahan saat menghapus transaksi.');
    }
  };

  if (loading) return <div className="p-6 text-gray-500">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Pengelolaan Transaksi</h1>

      <div className="grid gap-4">
        {transaksi.length === 0 ? (
          <div className="text-gray-500">Tidak ada data transaksi.</div>
        ) : (
          transaksi.map((item) => (
            <div
              key={item.transaksiId}
              className="border rounded-xl p-4 shadow-sm hover:shadow-md transition duration-200 bg-white"
            >
              <div className="font-semibold text-lg mb-2">Transaksi #{item.transaksiId}</div>
              <div className="text-sm">User ID: {item.userId}</div>
              <div className="text-sm">Kendaraan: {item.namaKendaraan}</div>
              <div className="text-sm">Harga: Rp{item.hargaKendaraan}</div>
              <div className="text-sm">Tanggal Peminjaman: {item.tanggalPeminjaman}</div>
              <div className="text-sm">Tanggal Pengembalian: {item.tanggalPengembalian}</div>
              <div className="text-sm">Total Harga: Rp{item.totalHarga}</div>
              <div className="text-sm mb-4">Status: {item.statusTransaksi}</div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(item.transaksiId)}
                  className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.transaksiId)}
                  className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import request from '@/utils/request';

export default function TambahMobilPage() {
  const router = useRouter(); // useRouter() hook for navigation
  const [mobilData, setMobilData] = useState({
    nama: '',
    nomorPolisi: '',
    tahun: '',
    status: 'TERSEDIA',
    harga: '',
    kapasitas: '',
    jenisTransmisi: 'manual',
    jenisBahanBakar: 'bensin',
    tipeMobil: '',
    gambar: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMobilData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setMobilData((prev) => ({ ...prev, gambar: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading('Loading...');  // Menyimpan ID toast untuk menghapusnya nanti

    try {
      const response = await request.postMultipart(
        "/mobil", 
        {
          gambar: mobilData.gambar,
          nama: mobilData.nama, 
          nomorPolisi: mobilData.nomorPolisi,
          tahun: mobilData.tahun,
          status: mobilData.status,
          harga: mobilData.harga,
          kapasitas: mobilData.kapasitas,
          jenisTransmisi: mobilData.jenisTransmisi,
          jenisBahanBakar: mobilData.jenisBahanBakar,
          tipeMobil: mobilData.tipeMobil,
        },
      );
      if (response.status === 200 || response.status === 201) {
        toast.dismiss(); // Dismiss the loading toast
        toast.success('Mobil berhasil ditambahkan!');
        setTimeout(() => {
          router.push('/admin/vehicles/mobil'); // Redirect to the vehicles page after a short delay
        }, 1000);
      }
    } catch (error) {
      toast.dismiss(); // Dismiss the loading toast
      toast.error('Gagal menambahkan mobil. Silakan coba lagi.');
      setError(error?.response?.data?.message || error.message || 'Terjadi kesalahan');
      
    } finally{
      setLoading(false);
    }
  };
  return (
    <>
      <Toaster position='top-center' />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Tambah Mobil</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} >
          <div className="mb-4">
            <label className="block mb-1">Nama Mobil</label>
            <input
              name="nama"
              value={mobilData.nama}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Nomor Polisi</label>
            <input
              name="nomorPolisi"
              value={mobilData.nomorPolisi}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1">Tahun</label>
              <input
                type="number"
                name="tahun"
                value={mobilData.tahun}
                onChange={handleChange}
                required
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Status</label>
              <select
                name="status"
                value={mobilData.status}
                onChange={handleChange}
                required
                className="border p-2 w-full rounded"
              >
                <option value="TERSEDIA">Tersedia</option>
                <option value="DISEWA">Disewa</option>
                <option value="TIDAK_TERSEDIA">Tidak Tersedia</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1">Harga</label>
              <input
                type="number"
                name="harga"
                value={mobilData.harga}
                onChange={handleChange}
                required
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Kapasitas</label>
              <input
                type="number"
                name="kapasitas"
                value={mobilData.kapasitas}
                onChange={handleChange}
                required
                className="border p-2 w-full rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1">Jenis Transmisi</label>
              <select
                name="jenisTransmisi"
                value={mobilData.jenisTransmisi}
                onChange={handleChange}
                required
                className="border p-2 w-full rounded"
              >
                <option value="manual">Manual</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Jenis Bahan Bakar</label>
              <select
                name="jenisBahanBakar"
                value={mobilData.jenisBahanBakar}
                onChange={handleChange}
                required
                className="border p-2 w-full rounded"
              >
                <option value="bensin">Bensin</option>
                <option value="diesel">Diesel</option>
                <option value="listrik">Listrik</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Tipe Mobil</label>
            <input
              name="tipeMobil"
              value={mobilData.tipeMobil}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Gambar Mobil</label>
            <input
              type="file"
              name="gambar"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="border p-2 w-full rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </form>
      </div>
    </>
  );
}

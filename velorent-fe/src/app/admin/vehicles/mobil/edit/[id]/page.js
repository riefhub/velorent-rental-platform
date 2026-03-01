'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { use } from 'react';
import request from '@/utils/request';

export default function EditMobil({ params }) {
    const router = useRouter();
    const { id } = use(params);
    const [mobil, setMobil] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMobil = async () => {
            try {
                const response = await request.get(`/mobil/${id}`);
                setMobil(response.data); // Pastikan backend mengirimkan objek mobil
            } catch (error) {
                console.error('Gagal mengambil data mobil:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMobil();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMobil((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMobil((prev) => ({ ...prev, gambar: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            for (const key in mobil) {
                formData.append(key, mobil[key]);
            }

            await request.put(`/mobil/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Mobil berhasil diedit!');
            router.push('/admin/vehicles/mobil');
        } catch (error) {
            console.error('Gagal mengedit mobil:', error);
            alert('Terjadi kesalahan saat menyimpan data.');
        }
    };

    if (loading || !mobil) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Edit Mobil</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-4">

                {/* Input Nama */}
                <div className="mb-4">
                    <label htmlFor="nama" className="block text-sm font-medium mb-2">Nama Mobil</label>
                    <input
                        type="text"
                        id="nama"
                        name="nama"
                        value={mobil.nama || ''}
                        onChange={handleChange}
                        className="px-4 py-2 border rounded w-full"
                        required
                    />
                </div>

                {/* Input Nomor Polisi */}
                <div className="mb-4">
                    <label htmlFor="nomorPolisi" className="block text-sm font-medium mb-2">Nomor Polisi</label>
                    <input
                        type="text"
                        id="nomorPolisi"
                        name="nomorPolisi"
                        value={mobil.nomorPolisi || ''}
                        onChange={handleChange}
                        className="px-4 py-2 border rounded w-full"
                        required
                    />
                </div>

                {/* Input Tahun & Status */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="tahun" className="block text-sm font-medium mb-2">Tahun</label>
                        <input
                            type="number"
                            id="tahun"
                            name="tahun"
                            value={mobil.tahun || ''}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded w-full"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium mb-2">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={mobil.status || ''}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded w-full"
                            required
                        >
                            <option value="TERSEDIA">Tersedia</option>
                            <option value="DISEWA">Disewa</option>
                            <option value="TIDAK_TERSEDIA">Tidak Tersedia</option>
                        </select>
                    </div>
                </div>

                {/* Input Harga & Kapasitas */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="harga" className="block text-sm font-medium mb-2">Harga</label>
                        <input
                            type="number"
                            id="harga"
                            name="harga"
                            value={mobil.harga || ''}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded w-full"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="kapasitas" className="block text-sm font-medium mb-2">Kapasitas</label>
                        <input
                            type="number"
                            id="kapasitas"
                            name="kapasitas"
                            value={mobil.kapasitas || ''}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded w-full"
                            required
                        />
                    </div>
                </div>

                {/* Input Transmisi & Bahan Bakar */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="jenisTransmisi" className="block text-sm font-medium mb-2">Jenis Transmisi</label>
                        <select
                            id="jenisTransmisi"
                            name="jenisTransmisi"
                            value={mobil.jenisTransmisi || ''}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded w-full"
                            required
                        >
                            <option value="manual">Manual</option>
                            <option value="auto">Auto</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="jenisBahanBakar" className="block text-sm font-medium mb-2">Jenis Bahan Bakar</label>
                        <select
                            id="jenisBahanBakar"
                            name="jenisBahanBakar"
                            value={mobil.jenisBahanBakar || ''}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded w-full"
                            required
                        >
                            <option value="bensin">Bensin</option>
                            <option value="diesel">Diesel</option>
                            <option value="listrik">Listrik</option>
                        </select>
                    </div>
                </div>

                {/* Input Tipe Mobil */}
                <div className="mb-4">
                    <label htmlFor="tipeMobil" className="block text-sm font-medium mb-2">Tipe Mobil</label>
                    <input
                        type="text"
                        id="tipeMobil"
                        name="tipeMobil"
                        value={mobil.tipeMobil || ''}
                        onChange={handleChange}
                        className="px-4 py-2 border rounded w-full"
                        required
                    />
                </div>

                {/* Input Gambar */}
                {mobil.gambarUrl && (
                    <div className="mb-2">
                        <p className="text-sm text-gray-600">Gambar saat ini:</p>
                        <img src={mobil.gambarUrl} alt="Gambar Sekarang" className="w-48 rounded shadow" />
                    </div>
                )}

                {/* Input untuk upload gambar baru (opsional) */}
                <label htmlFor="gambar" className="block text-sm font-medium mb-2">Ganti Gambar</label>
                <input
                    type="file"
                    id="gambar"
                    name="gambar"
                    onChange={handleFileChange}
                    className="px-4 py-2 border rounded w-full"
                />

                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                >
                    Simpan
                </button>
            </form>
        </div>
    );
}

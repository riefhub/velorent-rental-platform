'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import request from '@/utils/request';


export default function TambahMotorPage() {
    const router = useRouter();
    const [motorData, setMotorData] = useState({
        nama: '',
        nomorPolisi: '',
        tahun: '',
        status: 'TERSEDIA',
        harga: '',
        kapasitasMesin: '',
        jenisTransmisi: 'manual',
        jenisBahanBakar: 'bensin',
        tipeMotor: '',
        gambar: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMotorData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        setMotorData((prev) => ({ ...prev, gambar: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const toastId = toast.loading('Loading...');

        try {
            const response = await request.postMultipart(
                "/motor",
                {
                    gambar: motorData.gambar,
                    nama: motorData.nama,
                    nomorPolisi: motorData.nomorPolisi,
                    tahun: motorData.tahun,
                    status: motorData.status,
                    harga: motorData.harga,
                    kapasitasMesin: motorData.kapasitasMesin,
                    jenisTransmisi: motorData.jenisTransmisi,
                    jenisBahanBakar: motorData.jenisBahanBakar,
                    tipeMotor: motorData.tipeMotor,
                },
            );

            if (response.status === 200 || response.status === 201) {
                toast.dismiss(toastId);
                toast.success("Motor berhasil ditambahkan!");
                setTimeout(() => {
                    router.push("/admin/vehicles/motor");
                }, 1000);
            } else {
                toast.dismiss(toastId);
                toast.error(`Gagal menambah motor: ${response.statusText || response.status}`);
            }
        } catch (error) {
            toast.dismiss();
            // Jangan langsung logout user jika 401, tampilkan error saja
            toast.error("Terjadi kesalahan saat menambah motor.");
            setError(error?.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster position='top-center' />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Tambah Motor</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Nama Motor</label>
                        <input
                            name="nama"
                            value={motorData.nama}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Nomor Polisi</label>
                        <input
                            name="nomorPolisi"
                            value={motorData.nomorPolisi}
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
                                value={motorData.tahun}
                                onChange={handleChange}
                                required
                                className="border p-2 w-full rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Status</label>
                            <select
                                name="status"
                                value={motorData.status}
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
                                value={motorData.harga}
                                onChange={handleChange}
                                required
                                className="border p-2 w-full rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Kapasitas Mesin</label>
                            <input
                                type="number"
                                name="kapasitasMesin"
                                value={motorData.kapasitasMesin}
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
                                value={motorData.jenisTransmisi}
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
                                value={motorData.jenisBahanBakar}
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
                        <label className="block mb-1">Tipe Motor</label>
                        <input
                            name="tipeMotor"
                            value={motorData.tipeMotor}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Gambar Motor</label>
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
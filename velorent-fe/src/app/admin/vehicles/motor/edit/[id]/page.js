'use client';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import request from '@/utils/request';

export default function EditMotor() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [motor, setMotor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMotor = async () => {
            try {
                const response = await request.get(`/motor/${id}`);
                setMotor(response.data); // Pastikan backend mengirimkan objek motor
            } catch (error) {
                console.error('Gagal mengambil data motor:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMotor();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMotor((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMotor((prev) => ({ ...prev, gambar: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            for (const key in motor) {
                formData.append(key, motor[key]);
            }

            await request.put(`/motor/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Mobil berhasil diedit!');
            router.push('/admin/vehicles/motor');
        } catch (error) {
            console.error('Gagal mengedit motor:', error);
            alert('Terjadi kesalahan saat menyimpan data.');
        }
    };

    if (loading || !motor) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Edit Motor</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-4">

                {/* Input Nama */}
                <div className="mb-4">
                    <label htmlFor="nama" className="block text-sm font-medium mb-2">Nama Motor</label>
                    <input
                        type="text"
                        id="nama"
                        name="nama"
                        value={motor.nama || ''}
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
                        value={motor.nomorPolisi || ''}
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
                            value={motor.tahun || ''}
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
                            value={motor.status || ''}
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
                            value={motor.harga || ''}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded w-full"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="kapasitas" className="block text-sm font-medium mb-2">Kapasitas Mesin</label>
                        <input
                            type="number"
                            id="kapasitas"
                            name="kapasitas"
                            value={motor.kapasitasMesin || ''}
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
                            value={motor.jenisTransmisi || ''}
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
                            value={motor.jenisBahanBakar || ''}
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
                    <label htmlFor="tipeMotor" className="block text-sm font-medium mb-2">Tipe Motor</label>
                    <input
                        type="text"
                        id="tipeMotor"
                        name="tipeMotor"
                        value={motor.tipeMotor || ''}
                        onChange={handleChange}
                        className="px-4 py-2 border rounded w-full"
                        required
                    />
                </div>

                {/* Input Gambar */}
                <div className="mb-4">
                    <label htmlFor="gambar" className="block text-sm font-medium mb-2">Gambar Motor</label>
                    <input
                        type="file"
                        id="gambar"
                        name="gambar"
                        onChange={handleFileChange}
                        className="px-4 py-2 border rounded w-full"
                    />
                </div>

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

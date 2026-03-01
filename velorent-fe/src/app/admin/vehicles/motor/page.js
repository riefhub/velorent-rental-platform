'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import request from '@/utils/request';

export default function Motor() {
    const router = useRouter();
    const [motorList, setMotorList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await request.get('/motor');
                setMotorList(res.data);
            } catch (error) {
                console.error('Gagal mengambil data motor:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDetail = (motorId) => {
        const selectedMotor = motorList.find((motor) => motor.id === motorId);
        localStorage.setItem('selectedMotor', JSON.stringify(selectedMotor));
        router.push(`/admin/vehicles/motor/detail/${motorId}`);
    };

    const handleEdit = (motorId) => {
        router.push(`/admin/vehicles/motor/edit/${motorId}`);
    };

    const handleDelete = async (motorId) => {

        const konfirmasi = confirm('Apakah Anda yakin ingin menghapus motor ini?');
        if (!konfirmasi) return;

        try {
            const res = await request.delete(`/motor/${motorId}` )

            if (res.status === 401) {
                alert('Token tidak valid atau sesi habis. Silakan login ulang.');
                return;
            }

            setMotorList((prev) => prev.filter((motor) => motor.id !== motorId));
        } catch (err) {
            console.error('Gagal menghapus motor:', err);
            alert(err.message || 'Terjadi kesalahan saat menghapus motor.');
        }
    };

    if (loading) return <p className="p-4">Memuat data motor...</p>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Daftar Motor</h1>
                <Link href="/admin/vehicles/motor/tambahMotor">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all">
                        Tambah Motor
                    </button>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse table-auto">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-4 py-2 border-b">ID</th>
                            <th className="px-4 py-2 border-b">Nama Motor</th>
                            <th className="px-4 py-2 border-b">Nomor Polisi</th>
                            <th className="px-4 py-2 border-b">Tahun</th>
                            <th className="px-4 py-2 border-b">Harga</th>
                            <th className="px-4 py-2 border-b text-center">Detail</th>
                            <th className="px-4 py-2 border-b text-center">Edit</th>
                            <th className="px-4 py-2 border-b text-center">Hapus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {motorList.map((motor) => (
                            <tr key={motor.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{motor.id}</td>
                                <td className="px-4 py-2 border-b">{motor.nama}</td>
                                <td className="px-4 py-2 border-b">{motor.nomorPolisi}</td>
                                <td className="px-4 py-2 border-b">{motor.tahun}</td>
                                <td className="px-4 py-2 border-b">{motor.harga}</td>
                                <td className="px-4 py-2 border-b text-center">
                                    <button
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                                        onClick={() => handleDetail(motor.id)}
                                    >
                                        Lihat Detail
                                    </button>
                                </td>
                                <td className="px-4 py-2 border-b text-center">
                                    <button
                                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-all"
                                        onClick={() => handleEdit(motor.id)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="px-4 py-2 border-b text-center">
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
                                        onClick={() => handleDelete(motor.id)}
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

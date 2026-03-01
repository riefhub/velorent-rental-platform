'use client';

import request from '@/utils/request';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { set } from 'zod';

export default function ListMobilPage() {
    const router = useRouter();
    const [mobilList, setMobilList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await request.get('/mobil')
            console.log('Response data:', res.data);
            setMobilList(res.data);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleDetail = (mobilId) => {
        const selectedMobil = mobilList.find((mobil) => mobil.id === mobilId);
        localStorage.setItem('selectedMobil', JSON.stringify(selectedMobil));
        router.push(`/admin/vehicles/mobil/detail/${mobilId}`);
    };

    const handleEdit = (mobilId) => {
        router.push(`/admin/vehicles/mobil/edit/${mobilId}`);
    };

    const handleDelete = async (mobilId) => {

        const konfirmasi = confirm('Apakah Anda yakin ingin menghapus mobil ini?');
        if (!konfirmasi) return;

        try {
            const res = await request.delete(`/mobil/${mobilId}` )

            if (res.status === 401) {
                alert('Token tidak valid atau sesi habis. Silakan login ulang.');
                return;
            }

            setMobilList((prev) => prev.filter((mobil) => mobil.id !== mobilId));
        } catch (err) {
            console.error('Gagal menghapus motor:', err);
            alert(err.message || 'Terjadi kesalahan saat menghapus mobil.');
        }
    };


    if (loading) return <p className="p-4">Memuat data mobil...</p>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Daftar Mobil</h1>
                <Link href="/admin/vehicles/mobil/tambahMobil">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all">
                        Tambah Mobil
                    </button>
                </Link>
            </div>

            {mobilList.length === 0 ? (
                <p>Tidak ada data mobil tersedia.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse table-auto">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="px-4 py-2 border-b">ID</th>
                                <th className="px-4 py-2 border-b">Nama Mobil</th>
                                <th className="px-4 py-2 border-b">Nomor Polisi</th>
                                <th className="px-4 py-2 border-b">Tahun</th>
                                <th className="px-4 py-2 border-b">Harga</th>
                                <th className="px-4 py-2 border-b text-center">Detail</th>
                                <th className="px-4 py-2 border-b text-center">Edit</th>
                                <th className="px-4 py-2 border-b text-center">Hapus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mobilList.map((mobil) => (
                                <tr key={mobil.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b">{mobil.id}</td>
                                    <td className="px-4 py-2 border-b">{mobil.nama}</td>
                                    <td className="px-4 py-2 border-b">{mobil.nomorPolisi}</td>
                                    <td className="px-4 py-2 border-b">{mobil.tahun}</td>
                                    <td className="px-4 py-2 border-b">{mobil.harga}</td>
                                    <td className="px-4 py-2 border-b text-center">
                                        <button
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                                            onClick={() => handleDetail(mobil.id)}
                                        >
                                            Lihat Detail
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 border-b text-center">
                                        <button
                                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-all"
                                            onClick={() => handleEdit(mobil.id)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 border-b text-center">
                                        <button
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
                                            onClick={() => handleDelete(mobil.id)}
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

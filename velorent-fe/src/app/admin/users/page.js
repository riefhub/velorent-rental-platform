'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import request from '@/utils/request';

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await request.get('/users');
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          console.error('Gagal mengambil data pengguna:', response.statusText);
        }
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data pengguna:', error);
      } finally {
        setLoading(false);
      }
    };


    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    // Arahkan ke halaman edit dengan id user
    router.push(`/admin/users/edit/${userId}`);
  };

    const handleDelete = async (userId) => {

        const konfirmasi = confirm('Apakah Anda yakin ingin menghapus user ini?');
        if (!konfirmasi) return;

        try {
            const res = await request.delete(`/users/${userId}` )

            if (res.status === 401) {
                alert('Token tidak valid atau sesi habis. Silakan login ulang.');
                return;
            }

            setUsers((prev) => prev.filter((user) => user.id !== userId));
        } catch (err) {
            console.error('Gagal menghapus motor:', err);
            alert(err.message || 'Terjadi kesalahan saat menghapus motor.');
        }
    };

  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Daftar Pengguna</h1>

      <table className="min-w-full table-auto">
        <thead className="bg-black text-white">
          <tr>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Nama Lengkap</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">No Telepon</th>
            <th className="px-4 py-2">Dibuat Pada</th>
            {/* <th className="px-4 py-2">Edit</th> */}
            <th className="px-4 py-2">Hapus</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {loading ? (
            <tr>
              <td colSpan="6" className="px-4 py-2 text-center">Memuat data...</td>
            </tr>
          ) : users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-blue-100">
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.namaLengkap}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.noTelepon}</td>
                <td className="px-4 py-2">{user.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</td>
                {/* <td className="px-4 py-2">
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                </td> */}
                <td className="px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(user.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-2 text-center">
                Tidak ada pengguna.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

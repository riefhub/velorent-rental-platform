'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast'; // Tambahkan untuk notifikasi

const SidebarAdmin = () => {
  const [isKendaraanOpen, setIsKendaraanOpen] = useState(false);

  const toggleKendaraan = () => {
    setIsKendaraanOpen(!isKendaraanOpen);
  };

  // Fungsi untuk handle logout
  const handleLogout = () => {
    // Menghapus token dari localStorage
    localStorage.removeItem('token');

    // Menampilkan notifikasi logout berhasil
    toast.success('Logout berhasil!');

    // Mengarahkan ke halaman login
    setTimeout(() => {
      window.location.href = '/auth/login'; // Menggunakan window.location.href untuk redirect langsung
    }, 1500); // Tunggu 1,5 detik untuk menunjukkan notifikasi
  };

  return (
    <div className="w-64 bg-white shadow-lg p-4">
      <Toaster position="top-center" /> {/* Menampilkan toaster */}

      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <nav className="space-y-2">
        <Link href="/admin/dashboard" className="block px-2 py-1 hover:bg-gray-200 rounded">Dashboard</Link>
        
        {/* Kendaraan with collapse/expand functionality */}
        <div>
          <button 
            onClick={toggleKendaraan}
            className="block w-full text-left px-2 py-1 hover:bg-gray-200 rounded flex justify-between items-center"
          >
            Kendaraan
            <span className="ml-2">
              {isKendaraanOpen ? '-' : '+'}
            </span>
          </button>
          
          {/* Submenu for Mobil and Motor, which will toggle based on isKendaraanOpen */}
          {isKendaraanOpen && (
            <div className="pl-4 space-y-2">
              <Link href="/admin/vehicles/mobil" className="block px-2 py-1 hover:bg-gray-200 rounded">Mobil</Link>
              <Link href="/admin/vehicles/motor" className="block px-2 py-1 hover:bg-gray-200 rounded">Motor</Link>
            </div>
          )}
        </div>

        <Link href="/admin/users" className="block px-2 py-1 hover:bg-gray-200 rounded">User</Link>
        <Link href="/admin/transactions" className="block px-2 py-1 hover:bg-gray-200 rounded">Transaksi</Link>

        {/* Tombol Logout */}
        <button
          onClick={handleLogout}
          className="mt-4 block w-full px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default SidebarAdmin;

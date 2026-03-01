'use client';

import { FaCar, FaUsers, FaClipboardList } from 'react-icons/fa'; // Import icon
import { useRouter } from 'next/navigation'; // Import useRouter untuk navigasi

export default function DashboardPage() {
  const router = useRouter(); // Initialize router

  // Function to navigate to specific route
  const handleNavigation = (route) => {
    router.push(route); // Navigate to the route
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Ringkasan Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Kendaraan */}
        <div 
          className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 cursor-pointer"
          onClick={() => handleNavigation('/admin/vehicles/mobil')} // Navigasi ke halaman kendaraan
        >
          <div className="bg-blue-500 p-3 rounded-full text-white">
            <FaCar size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Kendaraan</h3>
            <p className="text-xl text-gray-800">Informasi terkait kendaraan</p>  
          </div>
        </div>

        {/* User */}
        <div 
          className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 cursor-pointer"
          onClick={() => handleNavigation('/admin/users')} // Navigasi ke halaman pengguna
        >
          <div className="bg-green-500 p-3 rounded-full text-white">
            <FaUsers size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Pengguna</h3>
            <p className="text-xl text-gray-800">Informasi terkait pengguna</p>
          </div>
        </div>

        {/* Transaksi */}
        <div 
          className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 cursor-pointer"
          onClick={() => handleNavigation('/admin/transactions')} // Navigasi ke halaman transaksi
        >
          <div className="bg-yellow-500 p-3 rounded-full text-white">
            <FaClipboardList size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Transaksi</h3>
            <p className="text-xl text-gray-800">Informasi terkait transaksi</p>
          </div>
        </div>
      </div>
    </div>
  );
}

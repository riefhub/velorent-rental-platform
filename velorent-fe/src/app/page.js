import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-sans">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Sistem Rental Kendaraan
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Selamat datang di platform penyewaan kendaraan kami! Temukan kendaraan yang sesuai dengan kebutuhan Anda dan sewa dengan mudah.
        </p>
        
        <div className="flex justify-center">
          <Link
            href="/auth/login"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import request from "@/utils/request"; // Pastikan Anda memiliki request yang tepat untuk API

export default function ProfilePage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState({}); // Set default state as empty object
    const [editField, setEditField] = useState(null);

    // Ambil data username dari localStorage
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) setUsername(storedUsername);
        
        // Ambil data profile berdasarkan userId (pastikan Anda menyimpan userId di localStorage)
        const userId = localStorage.getItem("userId");
        if (userId) {
            // Ambil data profil dari API, sesuaikan endpoint sesuai API Anda
            request
                .get(`/users/${userId}`)  // Asumsi API untuk mengambil data profil
                .then((response) => {
                    setProfile(response.data);  // Set data profil ke state profile
                })
                .catch((error) => {
                    console.error("Error fetching profile:", error);
                });
        }
    }, []);

    const handleEdit = (field) => setEditField(field);
    const handleChange = (e) => setProfile({ ...profile, [editField]: e.target.value });
    const handleBlur = () => setEditField(null);
    const handleKeyDown = (e) => {
        if (e.key === "Enter") setEditField(null);
    };

    return (
        <div className="min-h-screen font-sans bg-gradient-to-b from-blue-400 to-blue-100 overflow-x-hidden">
            <Navbar userName={username} />

            <div className="max-w-3xl mx-auto pt-20 px-4">
                <div className="bg-white/80 rounded-xl p-8 shadow-lg text-gray-800">
                    <h1 className="text-3xl font-bold mb-8 text-center">Profil Pengguna</h1>

                    <div className="flex flex-col gap-6 text-base">
                        {["username", "email", "noTelepon", "namaLengkap"].map((field) => (
                            <div key={field} className="flex flex-col">
                                <label className="text-sm uppercase tracking-widest text-gray-600 mb-1">
                                    {field === "noTelepon" ? "No. Telepon" : field === "namaLengkap" ? "Nama Lengkap" : field}
                                </label>
                                <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-md border border-gray-300">
                                    {editField === field ? (
                                        <input
                                            className="bg-transparent outline-none text-gray-800 w-full"
                                            value={profile[field] || ""} // Menangani kemungkinan nilai undefined
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            onKeyDown={handleKeyDown}
                                            autoFocus
                                        />
                                    ) : (
                                        <>
                                            <span className="w-full text-gray-800">{profile[field]}</span>
                                            <button onClick={() => handleEdit(field)} className="text-blue-600 hover:text-blue-800">
                                                ✏️
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Menampilkan Akun Dibuat Tanpa Edit */}
                    {/* Menambahkan informasi tanggal pembuatan akun */}
                    <div className="flex flex-col gap-3 text-base mt-6">
                        <label className="text-sm uppercase tracking-widest text-gray-600 mb-1">Akun Dibuat Pada</label>
                        <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-md border border-gray-300">
                            <span className="w-full text-gray-800">{profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"}</span>
                        </div>
                    </div>

                    <div className="flex justify-center mt-10">
                        <button
                            onClick={() => {
                                // Menghapus token dan data login saat logout
                                localStorage.removeItem("token");
                                localStorage.removeItem("userId"); // Hapus userId dari localStorage juga
                                router.push("/auth/login");
                            }}
                            className="bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition-all ease-in-out duration-300 flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                            </svg>
                            Logout
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

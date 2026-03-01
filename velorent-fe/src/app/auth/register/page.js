"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import request from "@/utils/request";

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    namaLengkap: "",
    email: "",
    noTelepon: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Password dan konfirmasi password tidak sama");
      setLoading(false);
      return;
    }

    request
      .post("/auth/register", {
        username: formData.username,
        namaLengkap: formData.namaLengkap,
        email: formData.email,
        noTelepon: formData.noTelepon,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })
      .then(function (response) {
        if (response.status === 200 || response.status === 201) {
          toast.dismiss();
          toast.success("Success Register");
          router.push("/auth/login");
        } else {
          toast.dismiss();
          toast.error("Registrasi gagal. Silakan coba lagi.");
        }
      })
      .catch(function (error) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.errors?.message ||
          "Terjadi kesalahan. Silakan coba lagi.";
        toast.dismiss();
        toast.error(message);
        setErrorMessage(message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
    <Toaster position="top-center"/>
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg-login.jpg')] bg-cover bg-center font-sans">
      <div className="bg-white bg-opacity-95 shadow-2xl rounded-xl w-full max-w-xl p-10 flex flex-col items-start">
        <h2 className="text-3xl font-bold mb-6 w-full text-center text-blue-700">Buat Akun Baru</h2>

        {successMessage && (
          <div className="w-full bg-green-100 text-green-700 border border-green-400 px-4 py-2 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="w-full bg-red-100 text-red-700 border border-red-400 px-4 py-2 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div>
            <label htmlFor="username" className="block font-medium mb-1">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Username"
              required
            />
          </div>
          <div>
            <label htmlFor="namaLengkap" className="block font-medium mb-1">Nama Lengkap</label>
            <input
              id="namaLengkap"
              name="namaLengkap"
              type="text"
              value={formData.namaLengkap}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nama Lengkap"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label htmlFor="noTelepon" className="block font-medium mb-1">Nomor Telepon</label>
            <input
              id="noTelepon"
              name="noTelepon"
              type="tel"
              value={formData.noTelepon}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="08xxxxxxxxxx"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block font-medium mb-1">Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500"
              tabIndex={-1}
            >
              👁️
            </button>
          </div>
          <div className="relative">
            <label htmlFor="confirmPassword" className="block font-medium mb-1">Konfirmasi Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              placeholder="Konfirmasi Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500"
              tabIndex={-1}
            >
              👁️
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
          >
            {loading ? "Mendaftar..." : "Daftar"}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-600 w-full text-center">
          Sudah punya akun?{" "}
          <a href="/auth/login" className="text-blue-600 font-semibold hover:underline">
            Masuk di sini
          </a>
        </div>
      </div>
    </div>
    </>
  );
}

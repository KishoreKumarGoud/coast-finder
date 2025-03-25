'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";

export default function UserForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        uid: user.uid,
        createdAt: new Date().toISOString(),
      });

      alert("✅ User registered successfully!");
      router.push('/');

      setFormData({ name: '', email: '', password: '' });

    } catch (error) {
      console.error("❌ Error:", error);
      alert("Failed to register user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1920x1080/?beach,ocean')"
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Form Container */}
      <div className="relative bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md border-2 border-yellow-400">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">
          🌊 Join the Beach Vibes!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="🏖️ Your Name"
            onChange={handleChange}
            value={formData.name}
            className="w-full p-3 border border-yellow-400 rounded-lg focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-50"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="🌅 Email Address"
            onChange={handleChange}
            value={formData.email}
            className="w-full p-3 border border-yellow-400 rounded-lg focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-50"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="🌴 Password"
            onChange={handleChange}
            value={formData.password}
            className="w-full p-3 border border-yellow-400 rounded-lg focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-50"
            required
          />
          <button
            type="submit"
            className={`w-full py-3 text-white font-bold rounded-lg transition-all duration-300 bg-gradient-to-r from-teal-500 to-blue-600 ${
              loading ? 'opacity-50' : 'hover:scale-105 shadow-md'
            }`}
            disabled={loading}
          >
            {loading ? '🌊 Registering...' : '🏝️ Join Now'}
          </button>
        </form>
      </div>
    </div>
  );
}

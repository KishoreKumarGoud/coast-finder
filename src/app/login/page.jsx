'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField } from "@/components/Fields";
import Image from "next/image";

export default function LoginPage() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     router.push("/hero");
//   };

const handleSubmit = (e) => {
    e.preventDefault();
  
    // Define dummy credentials
    const dummyCredentials = [
      { email: "test@example.com", password: "password123" },
      { email: "user@example.com", password: "securepass" }
    ];
  
    // Check if the entered email & password match any dummy credentials
    const isValidUser = dummyCredentials.some(
      (user) => user.email === formData.email && user.password === formData.password
    );
  
    if (isValidUser) {
      alert("Login Successful! Redirecting...");
      router.push("/");
    } else {
      alert("Invalid email or password. Try using test@example.com / password123");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
          alt="Beautiful beach waves"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/30" /> {/* Overlay to improve readability */}
      </div>

      {/* Login Form */}
      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl relative z-10 mx-4 overflow-hidden">
        {/* Emoji Background */}
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none select-none">
          <div className="animate-float-slow absolute top-5 left-5 text-3xl">🏖</div>
          <div className="animate-float-delayed absolute top-20 right-10 text-3xl">🌊</div>
          <div className="animate-float absolute top-40 left-15 text-3xl">🏄‍♂</div>
          <div className="animate-float-slow absolute top-60 right-20 text-3xl">🌴</div>
          <div className="animate-float-delayed absolute top-80 left-10 text-3xl">🌞</div>
          <div className="animate-float absolute bottom-20 right-15 text-3xl">🐚</div>
          <div className="animate-float-slow absolute bottom-40 left-20 text-3xl">🐠</div>
          <div className="animate-float-delayed absolute bottom-60 right-10 text-3xl">🦀</div>
          <div className="animate-float absolute bottom-80 left-15 text-3xl">🐋</div>
          <div className="animate-float-slow absolute top-1/3 right-1/3 text-3xl">🏊‍♂</div>
          <div className="animate-float-delayed absolute bottom-1/3 left-1/3 text-3xl">🐢</div>
          <div className="animate-float absolute top-1/2 right-1/2 text-3xl">🌺</div>
          <div className="animate-float-slow absolute bottom-1/2 left-1/2 text-3xl">🍹</div>
          <div className="animate-float-delayed absolute top-2/3 right-1/4 text-3xl">⛱</div>
          <div className="animate-float absolute bottom-1/4 left-2/3 text-3xl">🐡</div>
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 font-serif mb-2">
            Coast Finder
          </h1>
          <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Catch the Vibe, Join the Tribe!
          </h2>
          <h3 className="mt-4 text-center text-xl font-semibold text-gray-900">
            {isNewUser ? "Create Account" : "Login"}
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 relative z-10">
          {isNewUser && (
            <div className="space-y-4">
              <TextField
                label="Name"
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                label="Age"
                type="number"
                name="age"
                placeholder="Enter Age"
                value={formData.age}
                onChange={handleChange}
                required
              />
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          )}
          <TextField
            label="Email"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isNewUser ? "Sign Up" : "Login"}
          </button>
        </form>
        <p 
          onClick={() => setIsNewUser(!isNewUser)}
          className="mt-4 text-center text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer relative z-10"
        >
          {isNewUser
            ? "Already have an account? Login"
            : "New user? Create an account"}
        </p>
      </div>
    </div>
  );
}
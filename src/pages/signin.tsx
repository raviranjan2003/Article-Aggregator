import { useState } from "react";
// import { auth } from "../../lib/firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/router";
import { Header } from "@/components/Header";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signin", { email, password });
      if(response.status === 200) {
        localStorage.setItem("user", response.data.data.userEmail);
        localStorage.setItem("token", response.data.data.token);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <div className="px-5 pt-5 min-h-screen relative">
      {/* <div className="flex flex-col text-center justify-center">
          <label className="left-0">Email:</label>
          <input type="email" placeholder="Email" className="border border-1 w-2/4 m-auto" onChange={(e) => setEmail(e.target.value)} />
          <label>Password:</label>
          <input type="password" placeholder="Password" className="border border-1 w-2/4 m-auto" onChange={(e) => setPassword(e.target.value)} />
          <button className="border border-1 w-2/4 m-auto bg-black text-white mt-1 rounded-lg" onClick={handleSignin}>Sign In</button>
        </div> */}

      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/5174551.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        <div className="flex justify-center min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-[#0388d2]">
                Sign in to your account
              </h2>
            </div>
            
            <form onSubmit={handleSignin} className="mt-8 space-y-6">
              <div className="shadow-lg sm:rounded-md sm:overflow-hidden border border-gray-100">
                <div className="px-9 py-8 bg-white space-y-6 shadow-[0_0_15px_rgba(3,136,210,0.1)]">
                  <div className="col-span-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      autoComplete="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#0388d2] focus:border-[#0388d2] focus:z-10 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                      type="password" 
                      name="password" 
                      id="password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#0388d2] focus:border-[#0388d2] focus:z-10 sm:text-sm"
                    />
                  </div>
                  <div>
                    <button 
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0388d2] hover:bg-[#0277bd] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0388d2] transition-colors duration-200"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

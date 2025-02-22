import { useState } from "react";
import { auth } from "../../lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { Header } from "@/components/Header";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignin = async () => {
    // const user = await signInWithEmailAndPassword(auth, email, password);
    // console.log(user);
    const response = await axios.post("/api/signin", { email, password });
    if(response.status === 200) {
      localStorage.setItem("user" , response.data.data.userEmail);
      router.push('/dashboard');
    }
  };

  return (
    <div className="p-5">
      <Header />
      <div className="flex flex-col text-center justify-center">
        <label className="left-0">Email:</label>
        <input type="email" placeholder="Email" className="border border-1 w-2/4 m-auto" onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" placeholder="Password" className="border border-1 w-2/4 m-auto" onChange={(e) => setPassword(e.target.value)} />
        <button className="border border-1 w-2/4 m-auto bg-black text-white mt-1 rounded-lg" onClick={handleSignin}>Sign In</button>
      </div>
    </div>
  );
}

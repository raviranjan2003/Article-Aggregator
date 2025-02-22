import { useState } from "react";
// import { auth } from "../../lib/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/router";
import { Header } from "@/components/Header";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  const router = useRouter();

  const handleSignup = async () => {
    // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // console.log(userCredential);
    const response = await axios.post("/api/auth", { email, password, categories });
    console.log("Response==>", response);
    alert("Signup successful");
    if(response.status === 200) {
      router.push('/signin');
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
        <label>Category:</label>
        <input type="text" placeholder="Categories (comma separated)" className="border border-1 w-2/4 m-auto" onChange={(e) => setCategories(e.target.value.split(","))} />
        <button className="border border-1 w-2/4 m-auto bg-black text-white mt-1 rounded-lg" onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
}

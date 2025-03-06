import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export const Header = () => {
    const [user, setUser] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);

    const router = useRouter();
  
    // Use useEffect to access localStorage on the client side
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser);
      if (storedUser) {
        setUserName(storedUser.split('@')[0]);
      }
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/");
    }

  return (
    <div className="flex justify-between">
      <div className='flex items-center gap-2'>
        <Image src="/sheet_14874214.png" alt="logo" width={40} height={40} />
        <h1 className="text-2xl font-bold text-[#0388d2]">Articles Aggregator</h1>
      </div>
            {user ? 
            <div className="flex gap-2 items-center">
                <h1 className='capitalize'>{userName}</h1>
                <button 
                    className="border-1 rounded-md bg-[#0388d2] text-white px-2 flex items-center justify-center gap-2"
                    onClick={handleLogOut}>LogOut
                </button>
            </div> : 
            <div className="flex gap-1">
                <Link href="/signin">
                    <button
                    className="border-1 rounded-md bg-[#87b7d2] text-white px-2 flex items-center justify-center gap-2"
                    >
                    SignIn
                    </button>
                </Link>
                <Link href="/signup">
                    <button
                    className="border-1 rounded-md bg-[#0388d2] text-white px-2 flex items-center justify-center gap-2"
                    >
                    SignUp
                    </button>
                </Link>
            </div>}
    </div>
  )
}
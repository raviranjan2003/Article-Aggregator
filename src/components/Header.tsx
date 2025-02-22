import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

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
        router.push("/");
    }

  return (
    <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Articles Aggregator</h1>
            {user ? 
            <div className="flex gap-2 items-center">
                <h1 className='capitalize'>{userName}</h1>
                <button 
                    className="border-1 rounded-lg bg-slate-500 text-white px-2 flex items-center justify-center gap-2"
                    onClick={handleLogOut}>LogOut
                </button>
            </div> : 
            <div className="flex gap-1">
                <Link href="/signin">
                    <button
                    className="border-1 rounded-lg bg-slate-500 text-white px-2 flex items-center justify-center gap-2"
                    >
                    SignIn
                    </button>
                </Link>
                <Link href="/signup">
                    <button
                    className="border-1 rounded-lg bg-slate-700 text-white px-2 flex items-center justify-center gap-2"
                    >
                    SignUp
                    </button>
                </Link>
            </div>}
    </div>
  )
}
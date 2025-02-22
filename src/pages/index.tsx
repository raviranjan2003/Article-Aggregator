import Link from "next/link";
import { Header } from "@/components/Header";


export default function Home() {
  return (
     <div className="p-5">
      <Header />
      <div className="text-center mt-3">
        <h1 className="text-4xl">Welcome To Articles Aggregator</h1>
        <h2 className="text-xl text-[#64748d] mt-2"><Link href="/signup" className="font-bold underline">SignUp</Link> to get customized articles from the web.</h2>
      </div>
    </div>
  );
}

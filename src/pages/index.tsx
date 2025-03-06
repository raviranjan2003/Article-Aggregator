import Link from "next/link";
import { Header } from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-5 min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Description Section */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-4xl font-bold text-[#0388d2]">
              Your Personalized News Hub
            </h1>
            <p className="text-xl text-gray-600">
              Stay informed with customized articles tailored to your interests. Our AI-powered aggregator brings you the latest news from your favorite categories.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-[#0388d2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Personalized content curation</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-[#0388d2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Real-time updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-[#0388d2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Multiple categories support</span>
              </div>
            </div>
            <div className="pt-4">
              <Link 
                href="/signup" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#0388d2] hover:bg-[#0277bd] transition-colors duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Vector Image Section */}
          <div className="relative h-[400px] md:h-[500px]">
            <Image
              src="/5174551.jpg"
              alt="News Aggregation Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

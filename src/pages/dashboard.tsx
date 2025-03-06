import { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "@/components/NewsCard";
import { Header } from "@/components/Header";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Dashboard() {
  const [category, setCategory] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem("token");
    if (!token) {
      router.push('/signin');
    }
  }, [router]);

  // Query for fetching user's articles
  const { data: articles = [], isLoading: isLoadingArticles } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push('/signin');
        return [];
      }

      const response = await axios.get('/api/articles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    enabled: isClient && !!localStorage.getItem('token'),
  });

  // Mutation for searching new articles
  const { mutate: searchArticles, isPending: isSearching } = useMutation({
    mutationFn: async (category: string) => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/signin');
        return;
      }

      const response = await axios.post('/api/articles', { category }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response==>",response);
      return response.data;
    },
    onSuccess: (data) => {
      // Update the articles query cache with the new data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(['articles'], (oldData: any) => {
        return [...(oldData || []), ...data.articleData];
      });
    },
    onError: (error) => {
      console.error('Error fetching articles:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push('/signin');
      }
    },
  });

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("/5174551.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-5">
        <Header />
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-[#0388d2]"></h1>
          <div className="flex gap-1">
            <input 
              type="text" 
              placeholder="Enter category" 
              className="border border-b-2 px-2 rounded-md focus:outline-none focus:ring-[#0388d2] focus:border-[#0388d2]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button
              className="border-1 rounded-lg bg-[#0388d2] text-white px-4 py-2 flex items-center justify-center gap-2 hover:bg-[#0277bd] disabled:opacity-50"
              onClick={() => searchArticles(category)}
              disabled={isSearching || !category.trim()} 
            >
              {isSearching ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : 'Search Articles'}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {isLoadingArticles ? (
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-slate-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : articles.length ? (
            articles.map((article: any, ind: number) => (
              <NewsCard
                key={ind}
                title={article.title}
                snippet={article.snippet}
                url={article.url}
                imageUrl="https://img.freepik.com/premium-vector/breaking-news-live-banner-world-map-background-vector-illustration_258787-1348.jpg?w=800"
              />
            ))
          ) : (
            <div className="mt-2 text-center">
              <h1 className="text-gray-600">There is nothing to display. Enter a category to get customized articles.</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

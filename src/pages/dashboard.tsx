import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "@/components/NewsCard";
import { Header } from "@/components/Header";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const getArticles = async (category: string) => {
    try {
      setIsLoading(true);
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
      
      setArticles(response.data.articleData);
    } catch (error) {
      console.error('Error fetching articles:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push('/signin');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const fetchUserArticles = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        router.push('/signin');
        return;
      }

      const response = await axios.get('/api/articles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching user articles:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push('/signin');
      }
    }
  };

  useEffect(() => {
    fetchUserArticles();
  }, []);

  return (
    <div className="p-5">
      <Header />
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Your Articles</h1>
        <div className="flex gap-1">
          <input 
            type="text" 
            placeholder="Enter category" 
            className="border border-b-2 px-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button
            className="border-1 rounded-lg bg-slate-500 text-white px-4 py-2 flex items-center justify-center gap-2 hover:bg-slate-600 disabled:opacity-50"
            onClick={() => getArticles(category)}
            disabled={isLoading || !category.trim()} 
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : 'Search Articles'}
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {articles.length ? articles.map((article: any) => (
          <NewsCard
            key={article.id}
            title={article.title}
            snippet={article.snippet}
            url={article.url}
            imageUrl="https://img.freepik.com/premium-vector/breaking-news-live-banner-world-map-background-vector-illustration_258787-1348.jpg?w=800"
          />
        )) : 
        <div className="mt-2 text-center">
          <h1 className="text-gray-600">There's nothing to display. Enter a category to get customized articles.</h1>
        </div>}
      </div>
    </div>
  );
}

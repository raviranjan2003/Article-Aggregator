import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "@/components/NewsCard";
import { Header } from "@/components/Header";

export default function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  
  const getArticles = async (category: string) => {
    try {
      setIsLoading(true);
      console.log(category);
      const articles = await axios.post("/api/articles", { category });
      console.log(articles);
      setArticles(articles.data.articleData);
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
    
  }
  
  useEffect(() => {
    const fetchArticles = async () => {
      const userEmail = localStorage.getItem("user");
      // console.log(userEmail);
      const { data } = await axios.get(`/api/articles?userEmail=${userEmail}`);
      setArticles(data);
    };
    fetchArticles();
  }, []);

  return (
    <div className="p-5">
      <Header />
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Your Articles</h1>
        <div className="flex gap-1">
        <button
          className="border-1 rounded-lg bg-slate-500 text-white px-2 flex items-center justify-center gap-2"
          onClick={() => getArticles(category)}
          disabled={isLoading} 
        >
          {isLoading ? (
            // Circular loader
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : ('Click to get articles')}
        </button>
          <input type="text" placeholder="Search" className="border border-b-2"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {articles.length ? articles.map((article: any) => (
          <NewsCard
            key={article.id}
            title={article.title}
            snippet={article.snippet}
            url={article.url}
            imageUrl="https://img.freepik.com/premium-vector/breaking-news-live-banner-world-map-background-vector-illustration_258787-1348.jpg?w=800"
          />
        )) : 
        <div className="mt-2">
          <h1>There nothing to display, kindly search any topic to get customized articles.</h1>
        </div>}
      </div>
    </div>
  );
}

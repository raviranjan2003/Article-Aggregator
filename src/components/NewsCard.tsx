import React from "react";

interface NewsCardProps {
  title: string;
  snippet: string;
  url: string;
  imageUrl: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, snippet, url, imageUrl }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg border border-gray-200 mt-3 m-1">
      {/* Image Section */}
      <img className="w-full h-48 object-cover" src={imageUrl} alt="Image Not Available" />

      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 truncate">{title}</h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{snippet}</p>

        {/* Button */}
        <button className="mt-4 rounded-lg bg-black text-white px-4 py-2 text-sm">
          <a href={url} target="_blank" rel="noopener noreferrer">
            Read More...
          </a>
        </button>
      </div>
    </div>
  );
};

export default NewsCard;

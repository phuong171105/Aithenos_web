import { Link } from "react-router-dom";

export function NavHeader() {
  return (
    <header className="w-full px-4 py-4 z-10 bg-gradient-to-br from-green-50 to-blue-50 sticky top-0 opacity-95">
      <nav className="mx-auto max-w-7xl flex items-center justify-between">
        <Link to="/" className="text-4xl font-bold text-red-600">
          Tresure Reborn
        </Link>
        <div className="flex gap-8 text-lg">
          {[
            ["Tính năng", "/upload-image"],
            ["Hướng dẫn", "#tutorial"],
            ["Giá cả", "#pricing"],
            ["FAQs", "#faqs"],
            ["Cộng đồng", "#community"],
          ].map(([title, url]) => (
            <Link
              key={title}
              to={url}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

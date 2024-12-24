import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/services";
import "./ClientPage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaHeart, FaCheckCircle } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_path: string;
  user: string;
}

const ClientPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const userName = localStorage.getItem("user-name");
  const userId = localStorage.getItem("user-id");
  const favoritesKey = `favorites-${userId}`;
  const [favorites, setFavorites] = useState<number[]>(() => {
    const storedFavorites = localStorage.getItem(favoritesKey);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setFilteredProducts(data);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.map((product: Product) => product.category)) as Set<string>
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(value) ||
        product.description.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  const handleSort = (order: "asc" | "desc") => {
    setSortOrder(order);
    const sorted = [...filteredProducts].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sorted);
  };

  const handleFilterByCategory = (category: string | null) => {
    setSelectedCategory(category);

    if (category) {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const toggleFavorite = (productId: number) => {
    const updatedFavorites = favorites.includes(productId)
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];

    setFavorites(updatedFavorites);
    localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Header />
      <div className="client-page">
        <h1>Available Products</h1>

        {/* Search and Filters */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search for a product..."
            value={search}
            onChange={handleSearch}
          />

          <select
            onChange={(e) => handleSort(e.target.value as "asc" | "desc")}
            value={sortOrder}
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>

          <select
            onChange={(e) => handleFilterByCategory(e.target.value || null)}
            value={selectedCategory ?? ""}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {paginatedProducts.map((product) => (
            <div
              className={`product-card ${
                product.user === userName ? "user-product" : ""
              }`}
              key={product.id}
            >
              <img
                src={`http://localhost:8000/api/${product.image_path}`}
                alt={product.name}
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">{product.price} Dt</p>
                <p className="category">{product.category}</p>
                {product.user === userName ? (
                  <p className="user-badge">
                    <FaCheckCircle /> This is your product
                  </p>
                ) : (
                  <button
                    className={`favorite-btn ${
                      favorites.includes(product.id) ? "active" : "notactive"
                    }`}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <FaHeart />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  className={page === currentPage ? "active" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ClientPage;

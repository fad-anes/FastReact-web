import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/services";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaHeart, FaCheckCircle } from "react-icons/fa";
import "./FavoritesPage.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_path: string;
  user: string;
}

const FavoritesPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const userName = localStorage.getItem("user-name");
  const userId = localStorage.getItem("user-id");
  const favoritesKey = `favorites-${userId}`;

  // Charger les favoris à partir du localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem(favoritesKey);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, [favoritesKey]);

  // Charger les produits
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts(); // Assurez-vous que cette méthode existe et renvoie des produits
        setProducts(data);
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filtrer les produits favoris
  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  // Gérer l'ajout et le retrait des favoris
  const handleFavoriteToggle = (productId: number) => {
    const updatedFavorites = [...favorites];
    const productIndex = updatedFavorites.indexOf(productId);

    if (productIndex === -1) {
      // Si le produit n'est pas déjà dans les favoris, on l'ajoute
      updatedFavorites.push(productId);
    } else {
      // Si le produit est déjà dans les favoris, on le retire
      updatedFavorites.splice(productIndex, 1);
    }

    // Mettre à jour les favoris dans le localStorage
    setFavorites(updatedFavorites);
    localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <Header />
      <div className="favorites-page">
        <h1>Your Favorite Products</h1>

        {/* Liste des produits favoris */}
        <div className="product-grid">
          {favoriteProducts.length > 0 ? (
            favoriteProducts.map((product) => (
              <div
                className={`product-card ${product.user === userName ? "user-product" : ""}`}
                key={product.id}
              >
                <img
                  src={`http://localhost:8000/api/${product.image_path}`}
                  alt={product.name}
                />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="price">{product.price} €</p>
                  <p className="category">{product.category}</p>
                  {product.user === userName ? (
                    <p className="user-badge">
                      <FaCheckCircle /> This is your product
                    </p>
                  ) : (
                    <button
                      className={`favorite-btn ${favorites.includes(product.id) ? "active" : ""}`}
                      onClick={() => handleFavoriteToggle(product.id)}
                    >
                      <FaHeart />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No favorite products found</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavoritesPage;

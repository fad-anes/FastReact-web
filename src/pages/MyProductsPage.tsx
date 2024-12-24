import React, { useState, useEffect } from "react";
import { getUserProducts, deleteProduct, createProduct, updateProduct } from "../services/services";
import { FaTrashAlt, FaEdit, FaPlusCircle, FaCloudUploadAlt } from "react-icons/fa";
import Modal from "react-modal";
import { useDropzone } from "react-dropzone"; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import "./MyProductsPage.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_path: string;
}

const MyProductsPage: React.FC = () => {
  const ModalComponent = Modal as any;
  const userId = localStorage.getItem("user-id");
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (userId) {
      const fetchProducts = async () => {
        const data = await getUserProducts();
        setProducts(data);
      };
      fetchProducts();
    }
  }, [userId]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
    },
 
  });

  const handleAddProductClick = () => {
    setSelectedProduct(null);
    setName("");
    setDescription("");
    setPrice(0);
    setCategory("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!name) newErrors.name = "Le nom du produit est requis";
    if (!description) newErrors.description = "La description est requise";
    if (!price || price <= 0) newErrors.price = "Le prix doit être un nombre positif";
    if (!category) newErrors.category = "La catégorie est requise";
    if (!image) newErrors.image = "Une image est requise";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("category", category);
    if (image) formData.append("image", image);

    await createProduct(formData);
    setShowModal(false);
    if (userId) {
      const data = await getUserProducts();
      setProducts(data);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    await deleteProduct(productId);
    if (userId) {
      const data = await getUserProducts();
      setProducts(data);
    }
  };

  const handleUpdateProduct = (product: Product) => {
    setSelectedProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setCategory(product.category);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("category", category);
    if (image) formData.append("image", image);

    if (selectedProduct && formData) {
      await updateProduct(formData, selectedProduct.id);
      setShowModal(false);
      if (userId) {
        const data = await getUserProducts();
        setProducts(data);
      }
    }
  };

  return (
    <div>
         <Header />
      <h1>My Products</h1>
      <button className="add-product-btn" onClick={handleAddProductClick}>
        <FaPlusCircle /> Add Products
      </button>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={`http://localhost:8000/api/${product.image_path}`}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price} Dt</p>
              <div className="product-actions">
                <button onClick={() => handleUpdateProduct(product)}>
                  <FaEdit /> Update
                </button>
                <button onClick={() => handleDeleteProduct(product.id)}>
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ModalComponent isOpen={showModal} onRequestClose={handleCloseModal} ariaHideApp={false}>
        <h2>{selectedProduct ? "Modifier le produit" : "Ajouter un produit"}</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Name of the product"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <textarea
            placeholder="Description of the product"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p className="error">{errors.description}</p>}

          <input
            type="number"
            placeholder="Price"
            value={price || ""}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          {errors.price && <p className="error">{errors.price}</p>}
          <input
            type="text"
            placeholder="category"
            value={category || ""}
            onChange={(e) => setCategory((e.target.value))}
          />
          {errors.category && <p className="error">{errors.category}</p>}

          {/* Zone de Drag and Drop pour l'image */}
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <FaCloudUploadAlt size={40} color="#004aad" />
            <p>Drag and drop an image here</p>
            <p>or click to select an image</p>
            {image && <p>Featured image : {image.name}</p>}
          </div>
          {errors.image && <p className="error">{errors.image}</p>}

          <button type="button" onClick={selectedProduct ? handleUpdate : handleAddProduct}>
            {selectedProduct ? "Update" : "Add"}
          </button>
          <button type="button" onClick={handleCloseModal}>Cancel</button>
        </form>
      </ModalComponent>
      <Footer />
    </div>
  );
};

export default MyProductsPage;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import debounce from "lodash.debounce";
import SearchProducts from "./components/SearchProducts";
import OrderPlaced from "./components/OrderPlaced";
import PageNotFound from "./components/PageNotFound";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalProducts, setTotalProducts] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const limit = 9;

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      if (categoryFilter === null) {
        const resp = await axios.get(
          `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
        );
        setProducts(resp.data.products);
        setTotalProducts(resp.data.total);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        const resp = await axios.get(
          `https://dummyjson.com/products/category/${categoryFilter}`
        );
        setProducts(resp.data.products);
        setTotalProducts(resp.data.total);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getAllCategories = async () => {
    const resp = await axios.get("https://dummyjson.com/products/categories");

    setCategories(resp.data);
  };

  useEffect(() => {
    fetchProducts();
    getAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, categoryFilter]);

  const handleAddToCart = (product) => {
    const isProductExist = cartItems.find(
      (item) => item.product.id === product.id
    );
    if (!isProductExist) {
      setCartItems([...cartItems, { product, qty: 1 }]);
      toast.success("Item Successfully Added to Cart !", {
        autoClose: 1500,
        pauseOnHover: false,
        position: "top-center",
        transition: Slide,
        limit: 1,
      });
    } else {
      toast.warn("Item Already in Cart !", {
        autoClose: 1500,
        pauseOnHover: false,
        position: "top-center",
        transition: Slide,
        limit: 1,
      });
    }
  };

  const handleRemove = (id) => {
    const filteredCart = cartItems.filter((item) => item.product.id !== id);
    setCartItems(filteredCart);
    toast.error("Item Removed from Cart !", {
      autoClose: 1500,
      position: "top-left",
    });
  };

  const handleQuantity = (index, value) => {
    const copy = [...cartItems];
    copy[index].qty = parseInt(value);
    setCartItems(copy);
  };

  const sortLTH = () => {
    const copy = [...products];
    copy.sort((a, b) => a.price - b.price);
    setProducts(copy);
  };

  const sortHTL = () => {
    const copy = [...products];
    copy.sort((a, b) => b.price - a.price);
    setProducts(copy);
  };

  const sortRating = () => {
    const copy = [...products];
    copy.sort((a, b) => b.rating - a.rating);
    setProducts(copy);
  };

  const debouncedSearch = debounce(async (value) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${value}`
      );
      setSearchResults(response.data.products);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  }, 500);

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              categories={categories}
              skip={skip}
              setSkip={setSkip}
              totalProducts={totalProducts}
              setTotalProducts={setTotalProducts}
              limit={limit}
              setCategoryFilter={setCategoryFilter}
              handleAddToCart={handleAddToCart}
              cartItems={cartItems}
              isLoading={isLoading}
              sortLTH={sortLTH}
              sortHTL={sortHTL}
              sortRating={sortRating}
              query={query}
              handleInputChange={handleInputChange}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              setQuery={setQuery}
              categoryFilter={categoryFilter}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetail
              cartItems={cartItems}
              handleAddToCart={handleAddToCart}
              query={query}
              handleInputChange={handleInputChange}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              setQuery={setQuery}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
              handleRemove={handleRemove}
              handleQuantity={handleQuantity}
              query={query}
              handleInputChange={handleInputChange}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              setQuery={setQuery}
            />
          }
        />
        <Route
          path="/searchProducts"
          element={
            <SearchProducts
              isLoading={isLoading}
              query={query}
              cartItems={cartItems}
              handleAddToCart={handleAddToCart}
              handleInputChange={handleInputChange}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              setQuery={setQuery}
            />
          }
        />
        <Route path="/order-placed" element={<OrderPlaced />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

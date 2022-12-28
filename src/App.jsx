import React from "react";
import { Header } from "./components/Header";
import { ShoppingList } from "./components/ShoppingList";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Favorites } from "./components/pages/Favorites";
import { Orders } from "./components/pages/Orders";

export const AppContext = React.createContext({});

function App() {
  const [products, setProducts] = React.useState([]);
  const [addedProducts, setAddedProducts] = React.useState([]);
  const [favoriteProducts, setFavoriteProducts] = React.useState([]);
  const [shoppingList, setShoppingList] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [orderProducts, setOrderProducts] = React.useState([]);
  const [isOrder, setIsOrder] = React.useState(false);
  const [fullPrice, setFullPrice] = React.useState(0);

  const sumPrice = (prods) => {
    let price = 0;
    prods.forEach((item) => {
      price += item["price"];
    });
    setFullPrice(price);
  };

  React.useEffect(() => {
    const products = JSON.parse(localStorage.getItem("prod"));
    const addedProd = JSON.parse(localStorage.getItem("addedProd"));
    const favoriteProd = JSON.parse(localStorage.getItem("favoriteProd"));
    const orderProd = JSON.parse(localStorage.getItem("orderProd"));

    if (products) {
      setProducts(products);
    } else {
      axios
        .get("https://63a34151471b38b2060a8a55.mockapi.io/all_sneakers")
        .then((res) => {
          localStorage.setItem("prod", JSON.stringify(res.data));
          setProducts(res.data);
        });
    }
    if (addedProd) {
      setAddedProducts(addedProd);
      sumPrice(addedProd);
    }
    if (favoriteProd) {
      setFavoriteProducts(favoriteProd);
    }
    if (orderProd) {
      setOrderProducts(orderProd);
    }
  }, []);

  const addProduct = (product) => {
    if (addedProducts.find((obj) => obj.id === product.id)) {
      removeProduct(product);
    } else {
      const newProducts = [...addedProducts, product];
      setAddedProducts(newProducts);
      localStorage.setItem("addedProd", JSON.stringify(newProducts));
      sumPrice(newProducts);
    }
    const prod = [...products];
    prod.forEach((obj) => {
      if (obj.id === product.id) {
        obj["added"] = !obj["added"];
      }
    });
    setProducts(prod);
    localStorage.setItem("prod", JSON.stringify(prod));
  };

  const removeProduct = (product) => {
    const prod = [...products];
    const newProducts = addedProducts.filter((prev) => prev.id !== product.id);
    setAddedProducts(newProducts);
    localStorage.setItem("addedProd", JSON.stringify(newProducts));
    localStorage.setItem("prod", JSON.stringify(prod));
    sumPrice(newProducts);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const addFavorite = (product) => {
    if (favoriteProducts.find((obj) => obj.id === product.id)) {
      removeFavorite(product);
    } else {
      const favoriteProd = [...favoriteProducts, product];
      setFavoriteProducts(favoriteProd);
      localStorage.setItem("favoriteProd", JSON.stringify(favoriteProd));
    }
    const prod = [...products];
    prod.forEach((obj) => {
      if (obj.id === product.id) {
        obj["favorite"] = !obj["favorite"];
      }
    });
    setProducts(prod);
    localStorage.setItem("prod", JSON.stringify(prod));
  };

  const removeFavorite = (product) => {
    const favoriteProd = favoriteProducts.filter(
      (prev) => prev.id !== product.id
    );
    setFavoriteProducts(favoriteProd);
    localStorage.setItem("favoriteProd", JSON.stringify(favoriteProd));
  };

  const makeOrderProducts = () => {
    setIsOrder(true);
    const orders = [...orderProducts, ...addedProducts];
    setOrderProducts(orders);
    setAddedProducts([]);

    const prods = [...products];
    prods.forEach((product) => {
      if (product["added"]) {
        product["added"] = false;
      }
    });
    setProducts(prods);
    setFullPrice(0);

    localStorage.setItem("orderProd", JSON.stringify(orders));
    localStorage.setItem("addedProd", JSON.stringify([]));
    localStorage.setItem("prod", JSON.stringify(prods));
  };

  return (
    <AppContext.Provider
      value={{
        products,
        addedProducts,
        favoriteProducts,
        shoppingList,
        search,
        orderProducts,
        isOrder,
      }}
    >
      <div className="wrapper relative">
        {shoppingList && (
          <ShoppingList
            products={addedProducts}
            fullPrice={fullPrice}
            orderProducts={makeOrderProducts}
            removeProduct={(product) => addProduct(product)}
            hideShopping={() => setShoppingList(false)}
          />
        )}
        <Header
          fullPrice={fullPrice}
          favorites={favoriteProducts}
          showShopping={() => setShoppingList(true)}
        />
        <hr />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                search={search}
                onSearch={onSearch}
                addFavorite={addFavorite}
                addProduct={addProduct}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                products={favoriteProducts}
                search={search}
                onSearch={onSearch}
                addFavorite={addFavorite}
                addProduct={addProduct}
              />
            }
          />
          <Route
            path="/orders"
            element={
              <Orders
                products={orderProducts}
                search={search}
                onSearch={onSearch}
                addFavorite={addFavorite}
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;

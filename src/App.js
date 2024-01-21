import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Category, Cart } from "./pages/index";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import { Provider } from "react-redux";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
    return (
        <div className="wrapper">
            <Provider store={store}>
            <BrowserRouter>
            
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:name" element={<Category />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;

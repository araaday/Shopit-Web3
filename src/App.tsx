import Navbar from "./components/Navbar";
import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import SupportPage from "./pages/SupportPage";
import CartPage from "./pages/CartPage";
import ItemPage from "./pages/ItemPage";
import ListingPage from "./pages/ListingPage";
import EventsPage from "./pages/EventsPage";
import EventPage from "./pages/EventPage";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/item" element={<ItemPage />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/event" element={<EventPage />} />
      </Routes>
    </Router>
  );
}

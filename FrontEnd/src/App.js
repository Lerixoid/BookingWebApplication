import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Service from "./pages/Service";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Confirmation from "./components/Checkout/Confirmation";
import ForBussiness from "./pages/ForBussiness";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import RequireAuth from "./components/context/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import PersistLogin from "./components/context/PersistLogin";

import "./App.scss";

function App() {
  const roles = {
    user: "User",
    owner: "Owner",
    admin: "Admin",
  };
  return (
    <>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/business" element={<ForBussiness />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* Need login */}
          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={[roles.user, roles.admin]} />}
            >
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/confirmation" element={<Confirmation />} />
              <Route path="/service/:id" element={<Service />} />
              <Route path="/services" element={<Services />} />
              <Route path="/service" element={<Service />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[roles.user]} />}>
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

        </Routes>
      
      <Footer />
    </>
  );
}

export default App;

import Navbar from "./Pages/Shared/Navbar";
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import NotFound from "./Pages/NotFound/NotFound";
import Appointment from "./Pages/Appointment/Appointment";
import Contacts from "./Pages/Contacts/Contacts";
import Reviews from "./Pages/Reviews/Reviews";
import Footer from "./Pages/Shared/Footer";
import Login from "./Pages/Login/Login";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
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
import SignUp from "./Pages/Login/SignUp";
import RequireAuth from "./Pages/Login/RequireAuth";
import ForgetPassword from "./Pages/Login/ForgetPassword";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyAppointment from "./Pages/Dashboard/MyAppointment";
import MyReviews from "./Pages/Dashboard/MyReviews";
import MyHistory from "./Pages/Dashboard/MyHistory";
import Users from "./Pages/Dashboard/Users";
import Bookings from "./Pages/Dashboard/Bookings";
import RequireAdmin from "./Pages/Login/RequireAdmin";



function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/appointment" element={
          <RequireAuth>
            <Appointment />
          </RequireAuth>
        } />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} >
          <Route index element={<MyAppointment />} />
          <Route path="review" element={<MyReviews />} />
          <Route path="history" element={<MyHistory />} />
          <Route path="bookings" element={<RequireAdmin><Bookings /></RequireAdmin>} />
          <Route path="users" element={<RequireAdmin><Users /></RequireAdmin>} />
        </Route>
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
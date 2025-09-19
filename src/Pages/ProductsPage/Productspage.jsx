import { useEffect } from "react";
import { Products } from "../Products/Products";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Cart } from "../../CartItems/Cart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Productspage = () => {
  const navigate = useNavigate();
  const axToken = useSelector((state) => state.auth.axToken);

  useEffect(() => {
    if (!axToken) {
      toast.error("Please login first");
      navigate("/");
    }
  }, [axToken, navigate]);

  return (
    <>
      <Header />
      <Products />
      <Cart />
    </>
  );
};

export default Productspage;

import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../redux/authSlice";

export const useProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axToken = useSelector((state) => state.auth.axToken);

  useEffect(() => {
    // Don't fetch if no token
    if (!axToken) {
      navigate("/");
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(import.meta.env.VITE_PRODUCTS_URL, {
          headers: {
            Authorization: `Bearer ${axToken}`,
          },
        });

        if (response.status === 200) {
          setProductList(response.data.data);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch products");

        if (err.response?.status === 401 || err.response?.status === 403) {
          dispatch(removeToken());
          localStorage.clear();
          navigate("/", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [axToken, dispatch, navigate]);

  return { productList, loading, error };
};

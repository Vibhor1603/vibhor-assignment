import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeToken } from "../redux/authSlice";

export const useProductInfo = (productId) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const [error, setError] = useState();
  const axToken = useSelector((state) => state.auth.axToken);
  const dispatch = useDispatch();

  useEffect(() => {
    // Don't fetch if no token or productId
    if (!axToken || !productId) {
      if (!axToken) navigate("/");
      return;
    }

    const fetchProductInfo = async () => {
      setLoading(true);
      setError(null);
      setProductInfo(null); // Reset product info when fetching new product

      const url = `${import.meta.env.VITE_PRODUCT_INFO_URL}/${productId}`;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${axToken}`,
          },
        });

        if (response.status == 200) {
          setProductInfo(response.data);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch product info");

        if (err.response?.status === 401 || err.response?.status === 403) {
          dispatch(removeToken());
          localStorage.clear();
          navigate("/", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductInfo();
  }, [axToken, navigate, dispatch, productId]);
  return { productInfo, loading, error };
};

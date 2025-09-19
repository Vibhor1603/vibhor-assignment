/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, Store } from "lucide-react";
import { storeToken } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export default function Login() {
  const loginUrl = import.meta.env.VITE_LOGIN_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const forgotPassHandle = () => {
    toast.error("Password reset not available yet");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(loginUrl, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);

      if (response.status == 201) {
        dispatch(storeToken(response.data.access_token));
        localStorage.setItem("refreshToken", response.data.refresh_token);
        toast.success("Login successful");
        navigate("/products");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Login failed. Please check your credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-sm">
        {/* Logo and Branding */}
        <div className="flex items-center justify-center  mb-8">
          <div className=" bg-primary-light rounded-lg">
            <Store className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-text-primary">
              Luxe<span className="text-primary">Shop</span>
            </h2>
          </div>
        </div>

        {/* Login Form */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Login to your account</CardTitle>
            <CardDescription className="text-lg">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6 ">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-xl">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="h-10 placeholder:text-md"
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password" className="text-xl">
                      Password
                    </Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-md underline-offset-4 hover:underline"
                      onClick={forgotPassHandle}
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="h-10 placeholder:text-md pr-10"
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-1/2 border-2 hover:cursor-pointer"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

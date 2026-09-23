import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(() => localStorage.getItem("authRole"));
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(true);

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${API}/api/v1/user/register`,
        { name, email, password },
        { withCredentials: true },
      );

      const tokenData = res.data?.token;
      const userData = res.data?.user || res.data;

      if (tokenData) {
        setToken(tokenData);
        setRole("user");
        setUser(userData);

        localStorage.setItem("authToken", tokenData);
        localStorage.setItem("authRole", "user");

        navigate("/user/dashboard");
      }
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || "Registration failed";
    } finally {
      setLoading(false);
    }
  };

  const login = async (roleType, email, password) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${API}/api/v1/${roleType}/login`,
        { email, password },
        { withCredentials: true },
      );

      const tokenData = res.data?.token;
      const userData = res.data?.[roleType] || res.data?.user || res.data;

      if (tokenData) {
        setToken(tokenData);
        setRole(roleType);
        setUser(userData);

        localStorage.setItem("authToken", tokenData);
        localStorage.setItem("authRole", roleType);

        navigate(`/${roleType}/dashboard`);
      }
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authRole");
    navigate("/", { replace: true });
  }, [navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token || !role) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${API}/api/v1/${role}/me`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setUser(res.data?.[role] || res.data);
      } catch (error) {
        console.error("Session restoration failed:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, role, logout]);

  const contextValue = useMemo(
    () => ({
      user,
      role,
      token,
      loading,
      login,
      register,
      logout,
    }),
    [user, role, token, loading, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be wrapped in AuthProvider");
  }
  return context;
};

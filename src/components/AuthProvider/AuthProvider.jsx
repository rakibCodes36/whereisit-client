import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../../firebase/firebse.config";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleRegister = async (email, password, name, photoURL) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const registeredUser = userCredential.user;

      await updateProfile(registeredUser, {
        displayName: name,
        photoURL: photoURL,
      });

      setUser({ ...registeredUser, displayName: name, photoURL: photoURL });
      console.log("User registered successfully:", registeredUser);
    } catch (error) {
      console.error("Registration failed:", error.message);
      throw error;
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      return result.user;
    } catch (error) {
      console.error("Google login failed:", error.message);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const user = {
          email: currentUser.email,
        };
        axios
          .post("https://whereisit-sigma.vercel.app/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("login token", res.data);
            setLoading(false);
          });
      } else {
        axios
          .post(
            "https://whereisit-sigma.vercel.app/logout",
            {},
            { withCredentials: true }
          )
          .then((res) => {
            console.log("logout", res.data);
            setLoading(false);
          });
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    handleRegister,
    handleLogin,
    handleGoogleLogin,
    handleLogout,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

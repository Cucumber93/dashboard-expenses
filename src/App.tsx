import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./utils/protectedRoute";
import Line from "./pages/auth/Line";
import { AuthProvider } from "./context/authContext";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/line" element={<Line/>} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AuthProvider>
                <Home />
              </AuthProvider>
              
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

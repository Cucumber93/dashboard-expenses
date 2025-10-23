import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/protectedRoute";
import Login from "./pages/Login";
import Callback from "./pages/Callback";
import Home from "./pages/Home";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </BrowserRouter>
  );
}

// src/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import ProtectedRoute from "./utils/protectedRoute"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* หน้า Home ต้อง login ก่อน */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* หน้า Login เข้าได้เสมอ */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

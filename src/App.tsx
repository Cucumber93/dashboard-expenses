// src/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Login from "./pages/Login"
import Login from "./pages/Login"
import Home from "./pages/Home"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./pages/Post";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import CreatePost from "./pages/Dashboard/CreatePost";
import ManagePosts from "./pages/Dashboard/ManagePosts";
import PostDetail from "./pages/PostDetail";
import AdminRoute from "./routes/AdminRoute";
import Dashboard from "./pages/User/UserDashboard";
import ChangePassword from "./pages/User/ChangePassword";
import ResetPasswordRequest from "./pages/User/ResetPasswordRequest";
import ResetPassword from "./pages/User/ResetPassword";
import GoogleCallback from "./pages/GoogleCallback";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user/request-reset-password"
          element={<ResetPasswordRequest />}
        />
        <Route path="/user/reset-password" element={<ResetPassword />} />
        <Route path="/auth/success" element={<GoogleCallback />} />
        {/* Protected */}
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <PostDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        {/* Admin Only */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create-post"
          element={
            <AdminRoute>
              <CreatePost />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-posts"
          element={
            <AdminRoute>
              <ManagePosts />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

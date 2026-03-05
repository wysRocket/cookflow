import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const shouldEnforceAuth = import.meta.env.VITE_REQUIRE_AUTH === 'true';

  if (!shouldEnforceAuth) {
    return <Outlet />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] flex items-center justify-center">
        <p className="text-sm tracking-widest uppercase text-[#94A3B8]">Checking session...</p>
      </div>
    );
  }

  if (!user) {
    const next = `${location.pathname}${location.search}`;
    return <Navigate to={`/auth/sign-in?next=${encodeURIComponent(next)}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

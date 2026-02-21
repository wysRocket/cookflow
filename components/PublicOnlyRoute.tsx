import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authClient } from '../lib/auth-client';

const PublicOnlyRoute: React.FC = () => {
  const shouldEnforceAuth = import.meta.env.VITE_REQUIRE_AUTH === 'true';
  const location = useLocation();

  if (!shouldEnforceAuth) {
    return <Outlet />;
  }

  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] flex items-center justify-center">
        <p className="text-sm tracking-widest uppercase text-[#94A3B8]">Checking session...</p>
      </div>
    );
  }

  if (session) {
    const params = new URLSearchParams(location.search);
    const next = params.get('next') ?? '/app/courses';
    return <Navigate to={next} replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;

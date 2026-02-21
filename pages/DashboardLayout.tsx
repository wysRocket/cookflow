import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ChefHat, Bell, Search, Menu, X } from 'lucide-react';
import AuthControls from '../components/AuthControls';

const navItems = [
    { to: '/app/courses', label: 'Courses', end: false },
    { to: '/app/recipes', label: 'Recipes', end: false },
    { to: '/app/meal-planner', label: 'Planner', end: false },
    { to: '/app/chefs', label: 'Chefs', end: false },
    { to: '/app/community', label: 'Community', end: false },
    { to: '/app/masterclass', label: 'Masterclass', end: false },
];

const DashboardLayout: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-[#0F172A] font-sans text-[#F1F5F9]">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-30 bg-[#0F172A]/90 backdrop-blur-md border-b border-[#334155] px-6 py-4 flex items-center justify-between">

                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 text-[#14b8a6] flex items-center justify-center">
                            <ChefHat className="w-full h-full" />
                        </div>
                        <span className="text-xl md:text-2xl font-bold tracking-tight text-[#f1f5f9] font-serif">CookFlow</span>
                    </div>

                    {/* Desktop Main Navigation */}
                    <nav className="hidden md:flex items-center gap-6 ml-4">
                        {navItems.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors relative py-1 ${isActive
                                        ? 'text-[#D4AF37]'
                                        : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {label}
                                        {isActive && (
                                            <span className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-[#D4AF37] rounded-t-full" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Right side actions - Desktop & Tablet */}
                <div className="hidden sm:flex items-center gap-6">
                    {/* Search Field */}
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                        <input
                            type="text"
                            placeholder="Search chefs or recipes"
                            className="bg-[#1E293B] border border-[#334155] rounded-full py-2 pl-9 pr-4 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#14b8a6] transition-colors w-64 placeholder-[#64748B]"
                        />
                    </div>

                    <div className="flex items-center gap-4 border-l border-[#334155] pl-6">
                        <button className="relative text-[#94A3B8] hover:text-[#F1F5F9] transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-[#14b8a6] rounded-full" />
                        </button>
                        <AuthControls />
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="sm:hidden p-2 text-[#94A3B8] hover:text-[#F1F5F9]"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="sm:hidden bg-[#1E293B] border-b border-[#334155] px-6 py-4 space-y-4">
                    <nav className="flex flex-col gap-3">
                        {navItems.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `text-base font-medium transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-[#94A3B8]'
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="pt-4 border-t border-[#334155]">
                        <div className="relative mb-4">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-[#0F172A] border border-[#334155] rounded-lg py-2 pl-9 pr-4 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#14b8a6]"
                            />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <AuthControls mobile />
                            <button className="relative text-[#94A3B8]">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-[#14b8a6] rounded-full" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Space */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;

import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import {
  CloseOutlined,
  HeartOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Drawer, Input, Menu } from "antd";
import { Link } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { queryClient } from "../lib/queryClient";
import { useAuth } from "../hooks/useAuth";
import { useGetCartItems } from "../hooks/cartHook";

export const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: cartData } = useGetCartItems();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { key: "1", label: "Men", to: "/men" },
    { key: "2", label: "Women", to: "/women" },
    { key: "3", label: "Kids", to: "/kids" },
    { key: "4", label: "Shop", to: "/shop" },
    { key: "5", label: "Contact Us", to: "/contactUs" },
  ];

  const headerItems = navLinks.map((item) => ({
    key: item.key,
    label: <Link to={item.to}>{item.label}</Link>,
  }));

  const userName = user ? user.name || "User" : "Guest";

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await axiosInstance.post("/auth/logout", { token: refreshToken });
      queryClient.clear();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    } catch (error) {
      console.log("Logout error: ", error);
      // Clear tokens and redirect even if API call fails
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full font-['Libre_Baskerville']">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 h-[70px] w-full">
        <div className="flex items-center justify-between h-full px-4 sm:px-12">
          {/* Left: Logo + Desktop Nav */}
          <div className="flex items-center gap-8">
            <Link to="/home" replace>
              <span className="text-xl font-bold text-primary">LOGO</span>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:block">
              <Menu
                mode="horizontal"
                items={headerItems}
                className="!border-none !leading-[70px]"
              />
            </nav>
          </div>

          {/* Right: Search + Icons */}
          <div className="flex items-center gap-4">
            {/* Search — full on desktop, icon-toggle on mobile */}
            <div className="hidden md:block">
              <Input
                placeholder="Search here"
                prefix={<SearchOutlined />}
                className="w-[280px] rounded-full"
              />
            </div>
            <button
              className="md:hidden text-gray-600 text-xl"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Toggle search"
            >
              <SearchOutlined />
            </button>

            <HeartOutlined className="text-xl cursor-pointer" />

            <Badge count={cartData?.cartItems?.length || 0} size="small" offset={[-2, 2]}>
              <ShoppingCartOutlined
                className="text-xl -mt-1 cursor-pointer"
                onClick={() => navigate("/myCart")}
              />
            </Badge>

            {/* User info */}
            <div className="hidden sm:flex items-center gap-2 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-primaryLight flex items-center justify-center">
                <UserOutlined className="text-primary" />
              </div>
              <span className="text-sm">{userName}</span>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
            >
              Logout
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-gray-600 text-xl ml-1"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuOutlined />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3 bg-white border-b border-gray-100">
            <Input
              placeholder="Search here"
              prefix={<SearchOutlined />}
              className="rounded-full w-full"
              autoFocus
            />
          </div>
        )}
      </header>

      {/* Mobile Nav Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={260}
      >
        <nav className="flex flex-col gap-4">
          {navLinks.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              className="text-base font-medium text-gray-700 hover:text-accent py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-2 text-red-600 font-medium py-2"
          >
            Logout
          </button>
        </nav>
      </Drawer>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="mt-12 bg-primary text-white pt-16 pb-8">
        <div className="px-4 sm:px-12">
          {/* Logo */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold m-0">LOGO</h2>
          </div>

          {/* Footer Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
            {[
              {
                title: "Women",
                links: ["All Women", "Skirts", "T-Shirts", "Tops", "Jackets"],
              },
              {
                title: "Men",
                links: ["All Men", "Shirts", "T-Shirts", "Shorts", "Jackets"],
              },
              {
                title: "Kids",
                links: ["All Kids", "Shirts", "T-Shirts", "Shorts", "Jackets"],
              },
              {
                title: "Shopping",
                links: [
                  "Your cart",
                  "Your orders",
                  "Compared items",
                  "Wishlist",
                  "Shipping Details",
                ],
              },
              {
                title: "More links",
                links: [
                  "Blogs",
                  "Gift center",
                  "Buying guides",
                  "New arrivals",
                  "Clearance",
                ],
              },
            ].map((column, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-3">{column.title}</h3>
                <ul className="list-none p-0 m-0 space-y-2">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-white opacity-80 hover:opacity-100 no-underline text-sm transition-opacity"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Stay In Touch */}
            <div className="col-span-2 sm:col-span-3 md:col-span-1">
              <h3 className="text-lg font-semibold mb-5">Stay In Touch</h3>
              <p className="opacity-80 mb-5 leading-relaxed text-sm">
                Stay in touch to get special offers, free giveaways and once in
                a lifetime deals
              </p>
              <Input
                placeholder="Enter your email"
                prefix={<span>✉</span>}
                className="!bg-transparent !border-white/30 !text-white !placeholder-white/50 rounded"
              />
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-wrap justify-between items-center gap-5">
            <div className="flex gap-8">
              {["Terms & Conditions", "Privacy Policy"].map((text, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-white opacity-80 hover:opacity-100 no-underline text-sm transition-opacity"
                >
                  {text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

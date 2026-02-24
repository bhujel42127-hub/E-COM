import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  HeartOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Drawer, Input } from "antd";
import { Link } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { queryClient } from "../lib/queryClient";
import { useAuth } from "../hooks/useAuth";
import { useGetCartItems } from "../hooks/cartHook";

export const UserDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
  };

  const footerColumns = [
    { title: "Women", links: ["All Women", "Skirts", "T-Shirts", "Tops", "Jackets"] },
    { title: "Men", links: ["All Men", "Shirts", "T-Shirts", "Shorts", "Jackets"] },
    { title: "Kids", links: ["All Kids", "Shirts", "T-Shirts", "Shorts", "Jackets"] },
    { title: "Shopping", links: ["Your cart", "Your orders", "Compared items", "Wishlist", "Shipping Details"] },
    { title: "More links", links: ["Blogs", "Gift center", "Buying guides", "New arrivals", "Clearance"] },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full font-['Libre_Baskerville']">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 h-[70px] w-full">
        <div className="flex items-center justify-between h-full px-4 sm:px-12">
          <div className="flex items-center gap-8">
            <Link to="/home" replace>
              <span className="text-xl font-bold text-gray-900 font-['Libre_Baskerville']">LOGO</span>
            </Link>

            {/* Plain nav — no Ant Design Menu so font inherits correctly */}
            <nav className="hidden md:flex items-center gap-1 h-[70px]">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.key}
                    to={item.to}
                    className={`
                      px-4 h-full flex items-center text-sm font-medium
                      font-['Libre_Baskerville'] transition-colors no-underline
                      border-b-2 hover:text-gray-900
                      ${isActive
                        ? "border-gray-900 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
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
            >
              <SearchOutlined />
            </button>

            <HeartOutlined className="text-xl cursor-pointer text-gray-600" />

            <Badge count={cartData?.cartItems?.length || 0} size="small" offset={[-2, 2]}>
              <ShoppingCartOutlined
                className="text-xl -mt-1 cursor-pointer text-gray-600"
                onClick={() => navigate("/myCart")}
              />
            </Badge>

            <div className="hidden sm:flex items-center gap-2 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                <UserOutlined className="text-gray-600" />
              </div>
              <span className="text-sm text-gray-700 font-['Libre_Baskerville']">{userName}</span>
            </div>

            <button
              onClick={handleLogout}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium font-['Libre_Baskerville'] text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
            >
              Logout
            </button>

            <button
              className="md:hidden text-gray-600 text-xl ml-1"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuOutlined />
            </button>
          </div>
        </div>

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

      {/* Mobile Drawer */}
      <Drawer
        title={<span className="font-['Libre_Baskerville']">Menu</span>}
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
              className="text-base font-medium font-['Libre_Baskerville'] text-gray-700 hover:text-gray-900 py-2 border-b border-gray-100 no-underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-2 text-red-600 font-medium font-['Libre_Baskerville'] py-2"
          >
            Logout
          </button>
        </nav>
      </Drawer>

      {/* Main */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-12 pt-16 pb-8 bg-gray-900">
        <div className="px-4 sm:px-12">
          <div className="mb-12">
            <h2 className="text-4xl font-bold m-0 text-white font-['Libre_Baskerville']">LOGO</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
            {footerColumns.map((column, index) => (
              <div key={index}>
                <h3 className="text-base font-semibold mb-4 text-white font-['Libre_Baskerville']">
                  {column.title}
                </h3>
                <ul className="list-none p-0 m-0 space-y-2 mb-5 leading-relaxed text-sm text-gray-400 font-['Libre_Baskerville']">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors no-underline font-['Libre_Baskerville']">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Stay In Touch */}
            <div className="col-span-2 sm:col-span-3 md:col-span-1">
              <h3 className="text-base font-semibold mb-4 text-white font-['Libre_Baskerville']">Stay In Touch</h3>
              <p className="mb-5 leading-relaxed text-sm text-gray-400 font-['Libre_Baskerville']">
                Stay in touch to get special offers, free giveaways and once in a lifetime deals
              </p>
              <div className="flex items-center gap-2 border border-gray-600 rounded px-3 py-2">
                <span className="text-gray-400">✉</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border-none outline-none text-white text-sm w-full placeholder-gray-500 font-['Libre_Baskerville']"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-wrap justify-between items-center gap-5">
            <div className="flex gap-8">
              {["Terms & Conditions", "Privacy Policy"].map((text, i) => (
                <a key={i} href="#" className="text-sm text-gray-400 hover:text-white transition-colors no-underline font-['Libre_Baskerville']">
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
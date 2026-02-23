import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  HeartOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  DashboardOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Badge, Col, Dropdown, Input, Layout, Row, Drawer, Menu } from "antd";
import type { MenuProps } from "antd";
import { LogoutOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const navLinks = [
  { key: "1", label: "Men", to: "/men" },
  { key: "2", label: "Women", to: "/women" },
  { key: "3", label: "Kids", to: "/kids" },
  { key: "4", label: "Shop", to: "/shop" },
  { key: "5", label: "Contact Us", to: "/contactUs" },
];

const footerColumns = [
  { title: "Women", links: ["All Women", "Skirts", "T-Shirts", "Tops", "Jackets"] },
  { title: "Men", links: ["All Men", "Shirts", "T-Shirts", "Shorts", "Jackets"] },
  { title: "Kids", links: ["All Kids", "Shirts", "T-Shirts", "Shorts", "Jackets"] },
  { title: "Shopping", links: ["Your Cart", "Your Orders", "Compared Items", "Wishlist", "Shipping Details"] },
  { title: "More Links", links: ["Blogs", "Gift Center", "Buying Guides", "New Arrivals", "Clearance"] },
];

export const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();
  const userName = user?.name || "Guest";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "name",
      label: (
        <div className="px-1 py-0.5">
          <p className="font-bold text-[#0a0e27] m-0">{userName}</p>
          <p className="text-xs text-gray-400 m-0">{user?.email}</p>
        </div>
      ),
      disabled: true,
    },
    { type: "divider" },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "My Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <span className="text-[#e11d48] font-semibold">Logout</span>,
      onClick: logout,
    },
  ];

  return (
    <Layout className="min-h-screen bg-white w-full">
      {/* ── Top announcement bar ── */}
      <div className="bg-[#0a0e27] text-white text-xs text-center py-2 tracking-wide">
        Free shipping on orders above ₹999 &nbsp;·&nbsp;
        <span className="underline cursor-pointer">Shop Now</span>
      </div>

      {/* ── Main Navbar ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-16">

          {/* Mobile Menu Icon (Hamburger) */}
          <div className="md:hidden flex items-center mr-4">
            <MenuOutlined className="text-xl cursor-pointer" onClick={toggleMobileMenu} />
          </div>

          {/* Logo */}
          <Link to="/home" replace className="flex-shrink-0">
            <span className="text-2xl font-black tracking-tight text-[#0a0e27] uppercase">
              LUXE<span className="text-[#e11d48]">.</span>
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.key}
                to={item.to}
                className="text-sm font-semibold text-gray-700 uppercase tracking-wider hover:text-[#e11d48] transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e11d48] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <Input
              placeholder="Search products…"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="hidden lg:flex w-56 rounded-full border-gray-200 bg-gray-50 text-sm"
            />

            {/* Admin shortcut */}
            {(role === "SUPER_ADMIN" || role === "ADMIN") && (
              <button
                onClick={() => navigate("/admin")}
                title="Admin Dashboard"
                className="text-gray-500 hover:text-[#0a0e27] transition-colors"
              >
                <DashboardOutlined className="text-xl" />
              </button>
            )}

            {/* Wishlist */}
            <button className="text-gray-500 hover:text-[#e11d48] transition-colors">
              <HeartOutlined className="text-xl" />
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate("/myCart")}
              className="text-gray-500 hover:text-[#0a0e27] transition-colors"
            >
              <Badge count={5} size="small">
                <ShoppingCartOutlined className="text-xl" />
              </Badge>
            </button>

            {/* User avatar with dropdown */}
            <Dropdown
              menu={{ items: userMenuItems }}
              trigger={["click"]}
              placement="bottomRight"
              classNames={{ root: "w-52" }}
            >
              <div className="flex items-center gap-2 cursor-pointer group select-none">
                <div className="w-8 h-8 rounded-full bg-[#0a0e27] flex items-center justify-center text-white text-xs font-bold ring-2 ring-transparent group-hover:ring-[#e11d48] transition-all">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden lg:block text-sm font-medium text-gray-700 group-hover:text-[#0a0e27]">
                  {userName}
                </span>
              </div>
            </Dropdown>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar/Drawer Menu */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={toggleMobileMenu}
        open={mobileMenuOpen}
      >
        <div className="mb-4">
          <Input
            placeholder="Search products…"
            prefix={<SearchOutlined className="text-gray-400" />}
            className="w-full rounded-full mb-4"
          />
        </div>
        <Menu
          mode="vertical"
          items={navLinks.map((item) => ({
            key: item.key,
            label: <Link to={item.to}>{item.label}</Link>
          }))}
          className="border-none w-full text-lg"
          onClick={toggleMobileMenu}
        />
      </Drawer>

      {/* ── Page Content ── */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* ── Footer ── */}
      <footer className="bg-[#0a0e27] text-white pt-16 pb-8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          {/* Logo + tagline */}
          <div className="mb-12">
            <h2 className="text-3xl font-black tracking-tight mb-1">
              LUXE<span className="text-[#e11d48]">.</span>
            </h2>
            <p className="text-gray-400 text-sm">Fashion that speaks for itself.</p>
          </div>

          <Row gutter={[32, 40]}>
            {footerColumns.map((col, i) => (
              <Col key={i} xs={12} sm={8} md={4}>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2 list-none p-0 m-0">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href="#"
                        className="text-sm text-gray-300 hover:text-white transition-colors duration-200 no-underline"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </Col>
            ))}

            {/* Newsletter */}
            <Col xs={24} sm={16} md={8}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Stay In Touch
              </h4>
              <p className="text-sm text-gray-300 mb-5 leading-relaxed">
                Get exclusive deals, style tips, and new arrivals straight to your inbox.
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="your@email.com"
                  prefix={<span className="text-gray-400">✉</span>}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-lg"
                />
                <button className="px-4 py-2 bg-[#e11d48] text-white text-sm font-semibold rounded-lg hover:bg-[#be123c] transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </Col>
          </Row>

          {/* Bottom bar */}
          <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} LUXE. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Terms & Conditions", "Privacy Policy"].map((text, i) => (
                <a key={i} href="#" className="text-xs text-gray-500 hover:text-white transition-colors no-underline">
                  {text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

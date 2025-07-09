import { HelpCircle, LogOut, Search, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useState, useRef,useEffect } from "react";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();


  // Close dropdown when clicking outside the Home Link
  useEffect(() => {
    const handleHomeLinkNav = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleHomeLinkNav);
    return () => document.removeEventListener("mousedown", handleHomeLinkNav);
  }, []);


  const avatarUrl = user
    ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        user.username
      )}`
    : ""; 

  const handleLogout = async () => {
    const { message } = await logout();
    toast.success(message);
    setShowMenu(false);
  };

  const onClick = () => {
    const menu = document.querySelector("#menu-bar")
    const navbar = document.querySelector(".navbar")
    menu.classList.toggle("fa-times")
    navbar.classList.toggle("active")
  }

  return (
    <header className=" bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap">
      <Link to={"/"} className="cursor-pointer text-[#e50914] font-bold text-xl brightness-125">🎬MovieFlix</Link>
      <div id="menu-bar" className="fas fa-bars" onClick={onClick}></div>
      <nav className="navbar md:hidden lg:flex space-x-6">

        <div className="relative inline-block" ref={dropdownRef}>
          {/* Parent Home link (acts like a menu) */}
          <Link
            to="/" onClick={() => setIsOpen(!isOpen)}
            className=" hover:text-[#e50914]">Home</Link>

          {/* Dropdown Home menu */}
          {isOpen && (
            <div className="absolute left-0 mt-2 bg-white border rounded shadow-lg w-auto z-10">
              <a
                href="#popular"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-[#e50914] text-gray-800">Popular</a>
              <a
                href="#top_rated"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-[#e50914] text-gray-800">Top Rated</a>
              <a
                href="#upcoming"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-[#e50914] text-gray-800">Upcoming</a>
            </div>
          )}
        </div>

        <Link to={"/favorites"} className=" hover:text-[#e50914]">Favorites</Link>
        <Link to={"/watchlist"} className=" hover:text-[#e50914]">Watchlists</Link>
        <Link to={"#"} className=" hover:text-[#e50914]">Profile</Link>
      </nav> 

      <div className="flex items-center space-x-4 relative">
          <div className="relative hidden md:inline-flex">
            <input
              type="text"
              className="bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none"
              placeholder="Search..."
            />
            <Search className="absolute top-2 right-4 w-5 h-5" />
          </div>

          <Link to={user ? "ai-recommendations" : "signin"}>
            <button className="bg-[#e50914] px-5 py-2 text-white cursor-pointer">
              Get AI Movie Picks
            </button>
          </Link>

          {!user ? (
            <Link to={"/signin"}>
              <button className="border border-[#333333] py-2 px-4 cursor-pointer">
                Sign In
              </button>
            </Link>
          ) : (
            <div className="text-white">
              <img
                src={avatarUrl}
                alt="username initials"
                className="w-10 h-10 rounded-full border-2 border-[#e50914] cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              />

              {showMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-[#232323] bg-opacity-95 rounded-lg z-50 shadow-lg py-4 px-3 flex flex-col gap-2 border border-[#333333]">
                  <div className="flex flex-col items-center mb-2">
                    <span className="text-white font-semibold text-base">
                      {user.username}
                    </span>
                    <span className="text-xs text-gray-400">{user.email}</span>
                  </div>

                  <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer">
                    <HelpCircle className="w-5 h-5" />
                    Help Center
                  </button>

                  <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer">
                    <Settings className="w-5 h-5" />
                    Settings
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1d1c1c] gap-3 cursor-pointer"
                  >
                    <LogOut className="w-5 h-5" />
                    Log Out
                  </button>
                </div>
                
              )}
            </div>
          )}
        </div> 
    </header>
  ); 
};

export default Navbar;

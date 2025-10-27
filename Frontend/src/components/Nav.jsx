import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const menuIconRef = useRef();

  const menuItems = ["Home", "Login"];

  // Toggle menu open/close
  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  // Close when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (event) => {
      // Ignore clicks on the menu icon
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuIconRef.current &&
        !menuIconRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Format name for URL (replace spaces with hyphens)
  const formatPath = (name) => {
    if (name === "Login") return `/auth`;
    if (name === "Home") return `/`;
    return `/${name.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <>
      <nav className="w-full absolute top-0 left-0 bg-white text-black flex justify-between items-center py-5 px-4 z-30 md:px-8 xl:px-16 border-b-2 border-[#a2ada1]/40">
        {/* left: menu icon + logo */}
        <div className="flex items-center gap-3">
          <i
            ref={menuIconRef}
            onClick={handleMenuToggle}
            className="ri-menu-line text-xl font-semibold md:hidden cursor-pointer"
          ></i>

          <h2 className="text-2xl font-extrabold md:text-2xl lg:text-3xl font-[Gilroy]">
            <Link to="/">URL SHORTNER</Link>
          </h2>
        </div>

        {/* center: links (visible on md and above, centered) */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex gap-8 items-center lg:text-base text-sm">
            {menuItems.map((item) => (
              <NavLink
                key={item}
                to={formatPath(item)}
                className={({ isActive }) =>
                  `nav-underline ${isActive ? "text-[#454545]" : "text-black"}`
                }
              >
                <span className="nav-underline-text">{item}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* right: Dashboard button (visible on all sizes, on right side) */}
        <div className="ml-4 flex items-center">
          <NavLink
            to="/dashboard"
            className="inline-flex items-center justify-center bg-black text-white px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </NavLink>
        </div>
      </nav>

      {/* Mobile menu: only links (scrollable if many) */}
      <div
        ref={menuRef}
        className={`w-full bg-white flex flex-col gap-3 pt-2 pb-3 px-3 absolute z-20 left-0 duration-500 ease-out ${
          menuOpen ? "top-16" : "-top-60"
        } max-h-[60vh] overflow-y-auto`}
      >
        <hr className="w-[95%] mx-auto text-[#dbdbdb]" />
        {menuItems.map((item) => (
          <NavLink
            key={item}
            to={formatPath(item)}
            className="text-lg active:bg-[#f3f3f3] rounded-4xl px-4 py-2"
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Nav;

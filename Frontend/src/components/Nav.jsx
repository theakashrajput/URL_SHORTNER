import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const menuIconRef = useRef(); // Add this ref

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
    if (name === "Login") {
      return `/auth`;
    } else if (name === "Home") {
      return `/`;
    }
    // return `/${name.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <>
      <nav className="w-full absolute top-0 left-0 bg-white text-black flex justify-between items-center py-5 px-4 z-30 md:px-8 xl:px-16 border-b-2 border-[#a2ada1]/40">
        <div className="flex items-center">
          <i
            ref={menuIconRef} // Attach ref here
            onClick={handleMenuToggle}
            className="ri-menu-line text-xl font-semibold md:hidden cursor-pointer"
          ></i>

          <h2 className="text-2xl font-extrabold ml-3 md:ml-0 md:text-2xl lg:text-3xl font-[Gilroy]">
            <Link to="/">URL SHORTNER</Link>
          </h2>
        </div>

        <div className="flex gap-5 lg:w-1/2 md:w-2/5 items-center justify-end">
          <div className="hidden md:flex xl:gap-5 gap-3 items-center lg:text-base text-sm lg:ml-10 xl:ml-12 md:ml-8">
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
          {/* <i className="md:hidden ri-search-line text-2xl font-semibold"></i>
          <div className="hidden md:block bg-[#F0F0F0] w-[85%] px-3 py-2 rounded-4xl">
            <i className="ri-search-line lg:text-xl text-sm text-[#A3A3A3]"></i>
            <input
              type="text"
              className="inline-block w-[85%] lg:text-base outline-none lg:ml-3 ml-1 bg-transparent"
              placeholder="Search for products..."
            />
          </div>
          <i className="ri-shopping-cart-line text-xl font-semibold lg:text-2xl"></i>
          <i className="ri-user-3-line text-xl font-semibold lg:text-2xl"></i> */}
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`w-full bg-white flex flex-col gap-3 pt-2 pb-3 px-1 absolute z-20 left-0 duration-500 ease-out ${
          menuOpen ? "top-16" : "-top-48"
        }`}
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

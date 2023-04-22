import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const activeUrl = location.pathname;

  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-red-400 px-5 py-10">
        <div className="no-underline text-lg text-white text-center hover:text-red-100">
          <a href="https://sourabhshukla.com/" target="_blank" rel="noreferrer">
            <span className="font-bold">By </span>
            <span className="font-semibold italic">sourabhshukla.com</span>
          </a>
        </div>
        <nav className="mt-10 ">
          <Link
            className={`${
              activeUrl === "/"
                ? "text-red-400  bg-red-100"
                : "text-white hover:bg-red-300"
            } text-2xl block mt-2  p-1.5 rounded`}
            to="/"
          >
            Contacts
          </Link>

          <Link
            className={`${
              activeUrl === "/charts_and_maps"
                ? "text-red-400  bg-red-100"
                : "text-white hover:bg-red-300"
            } text-2xl block mt-2  p-1.5 rounded`}
            to="/charts_and_maps"
          >
            Charts and Maps
          </Link>
        </nav>
      </div>
      <div className="md:w-3/4 p-10 bg-slate-50 md:h-screen overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

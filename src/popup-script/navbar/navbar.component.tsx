import logo from "../../assets/images/fluentfly-logo .webp";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <div className="w-full h-16 flex items-center justify-between px-3 py-4 border-b border-b-gray-400">
      <Link to="/">
        <div className="flex flex-row items-center justify-start">
          <img src={logo} alt="" className="h-12 w-10 inline" />
          <h1 className="text-2xl text-primary font-bold">FluentFly.ai</h1>
        </div>
      </Link>
      <Link
        to="/login"
        className="bg-primary px-3 py-2 text-gray-50 text-base rounded-lg"
      >
        Sign In
      </Link>
    </div>
  );
};

export default NavbarComponent;

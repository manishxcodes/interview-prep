import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-3">
      <Link to={"/"} className="text-lg font-bold">
        MovieStore
      </Link>

      <Link to={"/cart"}>
        <button className="bg-yellow-300 px-4 py-2 rounded-md">Cart</button>
      </Link>
    </div>
  );
};

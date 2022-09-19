import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <Link to="/" className="navbar-brand">
          Pokemon
        </Link>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/favourites" className="nav-link">
                Favourites
              </Link>
            </li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

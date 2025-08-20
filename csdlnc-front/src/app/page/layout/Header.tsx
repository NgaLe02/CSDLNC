import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="App-header">
      <Link className="App-link" to="/system">
        System
      </Link>
      {" | "}
      <Link className="App-link" to="/revenue">
        Revenue
      </Link>
    </nav>
  );
}

export default Header;

import { Link } from "react-router-dom";
import Typography from "../components/typography/Typography";

function Header() {
  return (
    <header>
      <Typography variant="h1">
        Message Board App
      </Typography>

      <nav className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/messages/create">
          Create Messages
        </Link>

        <Link to="/messages">
          View Messages
        </Link>

        <Link to="/contact">Contact</Link>
        <Link to="/company">Company</Link>
      </nav>
    </header>
  );
}

export default Header;
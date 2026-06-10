import { Link } from "react-router-dom";
import Typography from "../components/typography/Typography";

function Home() {
  return (
    <div className="home-page">
      <Typography variant="h2">
        Welcome
      </Typography>

      <Typography variant="p">
        This is the home page.
      </Typography>

      <Link
        to="/messages/create"
        className="home-btn"
      >
        Go to Message Creation
      </Link>
    </div>
  );
}

export default Home;
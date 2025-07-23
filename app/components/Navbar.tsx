import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";

const Navbar: () => Element = () => {
    return (
        <nav className="navbar">
            <Link to="/">
                <p className="text-2xl font-bold text-gradient">CVMind</p>
            </Link>

            <Link to="/upload" className="primary-button w-fit">
                Upload CV
            </Link>
        </nav>)
}


export default Navbar;
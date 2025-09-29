import logo from "../assets/logo.png";
import NavBar from './NavBar';
function Header() {
    return (
        <header className="flex items-center justify-between px-4 py-6 bg-white">
            <div className="flex items-center space-x-1">
                <a href="/" className="min-w-[96px] min-h-[96px]">
                    <img src={logo} alt="Logo" className="h-24 w-auto" />
                </a>
                <span className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">
                    <a href="/">DREAMS</a>
                </span>
            </div>
            <NavBar />
        </header>
    );
}

export default Header;
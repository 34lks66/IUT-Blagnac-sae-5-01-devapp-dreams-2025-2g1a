import './header.css'
import logo from "../assets/logo.png";

function Header() {
    return (
        <header className="flex items-center justify-between px-4 py-2 bg-white">
            <div className="flex items-center space-x-2">
                <img src={logo} alt="Logo" className="h-24 w-auto" />
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">
                    DREAMS
                </span>

            </div>
        </header>
    );
}

export default Header;
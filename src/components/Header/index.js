import { useLocalStorage } from 'react-use';

function Header({ children }) {
    const [auth] = useLocalStorage("auth");

    return (
        <header className="bg-red-500 text-white p-4">
            <div className="container max-w-xl flex justify-between items-center md:px-4">
                <a href="/dashboard" className="cursor-pointer">
                    <img className="w-28 md:w-40" src="/imgs/logo-vinho.svg" alt="foto" />
                </a>
                {auth?.user?.id && children}
            </div>
        </header>
    );
}

export default Header;
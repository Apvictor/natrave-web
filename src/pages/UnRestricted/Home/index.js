import { Navigate } from "react-router-dom";
import useLocalStorage from "react-use/lib/useLocalStorage";

function Home() {
  const [auth] = useLocalStorage("auth");

  return auth?.user?.id ? (
    <Navigate to="/dashboard" replace={true} />
  ) : (
    <div className="h-full md:h-screen bg-red-700 p-4 flex flex-col items-center space-y-6">
      <header className="container flex justify-center max-w-xl p-4">
        <img className="w-40" src="/imgs/logo-white.svg" alt="foto" />
      </header>

      <div className="container max-w-5xl text-white flex-1 p-4 flex flex-col justify-center items-center space-y-6 md:flex-row md:space-y-0 md:space-x-6">
        <div className="md:flex-1">
          <img
            className="w-full max-w-sm flex justify-center"
            src="/imgs/photo.png"
            alt="foto"
          />
        </div>

        <div className="md:flex-1 flex flex-col space-y-6">
          <h1 className="text-xl text-center font-bold md:text-3xl md:text-left">
            Dê o seu palpite na Copa do Mundo do Catar 2022!
          </h1>

          <a
            href="/signup"
            className="text-red-700 bg-white text-xl px-8 py-4 rounded-xl text-center"
          >
            Criar minha conta
          </a>
          <a
            href="/login"
            className="text-white border border-white text-xl px-8 py-4 rounded-xl text-center"
          >
            Fazer login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;

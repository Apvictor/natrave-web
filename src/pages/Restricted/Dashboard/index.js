import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import { format, formatISO } from "date-fns";
import Header from "../../../components/Header";
import DateSelect from "../../../components/DateSelect";
import { useLocalStorage, useAsyncFn } from 'react-use';

function Dashboard() {
  const [auth] = useLocalStorage("auth");

  const [currentDate, setCurrentDate] = useState(
    formatISO(new Date(2022, 10, 20))
  );

  const [hunches, fetchHunches] = useAsyncFn(async () => {
    const res = await axios({
      method: "get",
      baseURL: process.env.REACT_APP_API_URL,
      url: `/${auth.user.username}`,
    });

    const hunches = res.data.hunches.reduce((acc, hunch) => {
      acc[hunch.gameId] = hunch
      return acc;
    }, {})

    return hunches;
  })

  const [games, fetchGames] = useAsyncFn(async (params) => {
    const res = await axios({
      method: "get",
      baseURL: process.env.REACT_APP_API_URL,
      url: "/games",
      params,
    });

    return res.data;
  });

  const isLoading = games.loading || hunches.loading;
  const hasError = games.error || hunches.error;
  const isDone = !isLoading && !hasError;

  useEffect(() => {
    fetchHunches();
  }, [])


  useEffect(() => {
    fetchGames({ gameTime: currentDate });
  }, [currentDate]);


  return !auth?.user?.id ? (
    <Navigate to="/" replace={true} />
  ) : (
    <>
      <Header>
        <a href={`${auth.user.username}`}>
          <Icon className="w-8" name="profile" />
        </a>
      </Header>

      <main>
        <section id="header" className="bg-red-500 text-white">
          <div className="container max-w-xl space-y-2 p-4">
            <span>Olá, {auth.user.name}</span>
            <h3 className="text-2xl font-bold">Qual é o seu palpite?</h3>
          </div>
        </section>

        <section id="content" className="container max-w-xl p-4 space-y-4">
          <DateSelect currentDate={currentDate} onChange={setCurrentDate} />

          <div className="space-y-4 flex justify-center flex-col">
            {isLoading && "Carregando..."}
            {hasError && "Ops! Algo deu errado."}
            {isDone && games.value?.map((game) =>
              <Card
                key={game?.id}
                gameId={game?.id}
                homeTeam={game.homeTeam}
                awayTeam={game.awayTeam}
                gameTime={format(new Date(game.gameTime), "H:mm")}
                homeTeamScore={hunches?.value?.[game?.id]?.homeTeamScore || '-'}
                awayTeamScore={hunches?.value?.[game?.id]?.awayTeamScore || ''}
              />
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;

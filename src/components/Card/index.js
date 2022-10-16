import axios from "axios";
import * as yup from "yup";
import Input from "../Input";
import { useFormik } from "formik";
import useLocalStorage from "react-use/lib/useLocalStorage";

function Card({ gameId, homeTeam, homeTeamScore, awayTeamScore, awayTeam, gameTime, disabled }) {
  const [auth] = useLocalStorage("auth");

  const validationSchema = yup.object().shape({
    homeTeamScore: yup.string().required(),
    awayTeamScore: yup.string().required(),
  });

  const formik = useFormik({
    onSubmit: (values) => {
      axios({
        method: "post",
        baseURL: process.env.REACT_APP_API_URL,
        url: "/hunches",
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
        },
        data: {
          ...values,
          gameId,
        },
      });
    },
    initialValues: {
      homeTeamScore,
      awayTeamScore,
    },
    validationSchema,
  });
  return (
    <div className="rounded-xl border border-gray-300 p-4 text-center space-y-4">
      <span className="text-sm md:text-base text-gray-700 font-bold">
        {gameTime}
      </span>

      <form className="flex justify-center md:items-center items-start space-x-4"
        onSubmit={formik.handleSubmit}>

        <div className="flex flex-col-reverse md:flex md:flex-row md:items-center md:space-x-4">
          <span className="uppercase">{homeTeam}</span>
          <img className="flex-1" src={`/imgs/flags/${homeTeam}.png`} alt={homeTeam} />
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Input
            className="bg-red-300/[0.2] w-[55px] h-[55px] text-red-700 text-xl text-center rounded-md"
            type="number"
            name="homeTeamScore"
            value={formik.values.homeTeamScore}
            onChange={formik.handleChange}
            onBlur={formik.handleSubmit}
            disabled={disabled}
          />
          <span className="text-red-500 font-bold">X</span>
          <Input
            className="bg-red-300/[0.2] w-[55px] h-[55px] text-red-700 text-xl text-center rounded-md"
            type="number"
            name="awayTeamScore"
            value={formik.values.awayTeamScore}
            onChange={formik.handleChange}
            onBlur={formik.handleSubmit}
            disabled={disabled}
          />
        </div>

        <div className="flex flex-col md:flex md:flex-row md:items-center md:space-x-4">
          <img src={`/imgs/flags/${awayTeam}.png`} alt={awayTeam} />
          <span className="uppercase">{awayTeam}</span>
        </div>

      </form>
    </div>
  );
}

export default Card;

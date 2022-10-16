import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import Icon from "../../../components/Icon";
import { Navigate } from "react-router-dom";
import Input from "../../../components/Input";
import useLocalStorage from "react-use/lib/useLocalStorage";

function Signup() {
  const [auth, setAuth] = useLocalStorage("auth");

  const validationSchema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    username: yup.string().required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
    email: yup
      .string()
      .email("Informe um e-mail válido")
      .required("Campo obrigatório"),
  });

  const formik = useFormik({
    onSubmit: async (values) => {
      const res = await axios({
        method: "post",
        baseURL: process.env.REACT_APP_API_URL,
        url: "/users",
        data: values,
      });

      setAuth(res.data);
    },
    initialValues: { name: "", username: "", email: "", password: "" },
    validationSchema,
  });

  return auth?.user?.id ? (
    <Navigate to="/dashboard" replace={true} />
  ) : (
    <div>
      <header className="p-4 border-b border-red-300">
        <div className="container max-w-xl flex justify-center">
          <img className="w-32 md:w-40" src="/imgs/logo-red.svg" alt="foto" />
        </div>
      </header>

      <main className="container max-w-xl p-4">
        <div className="flex items-center space-x-4 p-4">
          <a href="/">
            <Icon className="h-6" name="back" />
          </a>
          <h2 className="text-xl font-bold">Crie sua conta</h2>
        </div>

        <form className="space-y-6 p-4" onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            name="name"
            label="Seu nome"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            placeholder="Digite seu nome"
            onChange={formik.handleChange}
            error={formik.touched.name && formik.errors.name}
          />

          <Input
            type="text"
            name="username"
            label="Seu nome de usuário"
            onBlur={formik.handleBlur}
            value={formik.values.username}
            onChange={formik.handleChange}
            placeholder="Digite um nome de usuário"
            error={formik.touched.username && formik.errors.username}
          />

          <Input
            type="text"
            name="email"
            label="Seu e-mail"
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Digite seu e-mail"
            error={formik.touched.email && formik.errors.email}
          />

          <Input
            name="password"
            type="password"
            label="Sua senha"
            onBlur={formik.handleBlur}
            placeholder="Digite sua senha"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password}
          />

          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className="block w-full text-center text-white bg-red-500 px-6 py-3 rounded-xl disabled:opacity-50"
          >
            {formik.isSubmitting ? "Carregando..." : "Criar minha conta"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default Signup;

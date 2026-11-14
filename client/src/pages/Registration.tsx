import { useState } from "react";
import { Link } from "react-router-dom";
import HomeButton from "../components/HomeButton";

const Registration = () => {
  const inputStyle: string = `
    w-full outline-none border border-gray-300 rounded-lg
    h-12 px-4 text-lg bg-white text-gray-700
    placeholder:text-gray-400
    hover:border-blue-400
    focus:border-blue-500 focus:ring-2 focus:ring-blue-100
    transition-all duration-200
  `;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [againPassword, setAgainPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [act, setAct] = useState<string>("");

  const [verifyStatus, setVerifyStatus] = useState<boolean>(false);

  const handleChange = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setAct("");
    setError("");

      if(password !== againPassword) {
        setError("Пароли должны совпадать!");
        return;
      }
      if(name === "" || password === "" || email === "") {
        setError("Все поля должны быть заполнены!");
        return;
      }

      try {
        const API: string = "http://localhost:4000/reg";

        const sendData = await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        });

        const data = await sendData.json();

        if(!(sendData.ok)) {
          setError(data.message);
          return;
        }

        setVerifyStatus(true);

        return setAct(data.message);

      }
      catch(error) {
        if(error instanceof Error) {
          setError(error.message);
        }
      }
    
  };

  sessionStorage.setItem("emailStorage", JSON.stringify({
    email: email
  }));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">

      <div className="
        bg-white flex flex-col justify-center items-center
        w-full max-w-md min-h-[600px]
        border border-gray-200 rounded-2xl
        shadow-xl p-8 gap-10
      ">

        <h1 className="text-4xl font-bold tracking-wide text-gray-700">
          Регистрация
        </h1>

        <form onSubmit={handleChange} className="flex flex-col gap-5 w-full">

          <input
            type="text"
            placeholder="Имя"
            className={inputStyle}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input
            type="email"
            placeholder="Gmail"
            className={inputStyle}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Пароль"
            className={inputStyle}
            onChange={(event) => setPassword(event.target.value)}
          />

          <input
            type="password"
            placeholder="Пароль повторно"
            className={inputStyle}
            onChange={(event) => setAgainPassword(event.target.value)}
          />

          <a className="text-red-500 text-center">{error}</a>
          <a className="text-green-500 text-center">{act}</a>

          {
            verifyStatus === false ? (<button
            className="
              cursor-pointer bg-blue-500 text-white
              rounded-lg w-fit px-10 h-12 mx-auto mt-3
              text-lg font-semibold
              hover:bg-blue-600 hover:shadow-lg
              active:scale-95
              transition-all duration-200
            "
            type="submit"
          >
            Готово
          </button>) : (<Link to={"/verify"}
            className="
              cursor-pointer bg-blue-500 text-white
              rounded-lg w-fit px-10 h-12 mx-auto mt-3
              text-lg font-semibold
              hover:bg-blue-600 hover:shadow-lg
              active:scale-95
              transition-all duration-200 pt-2
            "
            type="submit"
          >
            Перейти к верификации
          </Link>)
          }

        </form>

        <HomeButton />
      </div>

    </div>
  );
};

export default Registration;
import { Link } from "react-router-dom";

const Home = () => {
  const buttonStyle = `
    w-full bg-blue-500 text-white rounded-lg
    py-3 px-6 text-lg font-semibold
    hover:bg-blue-600 hover:shadow-lg
    active:scale-95
    transition-all duration-200
  `;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">

      <div className="
        bg-white flex flex-col items-center
        w-full max-w-md
        border border-gray-200 rounded-2xl
        shadow-xl p-8 gap-8
      ">

        <h1 className="text-4xl text-gray-800 font-bold tracking-tight">
          Главная
        </h1>

        <p className="text-gray-500 text-center">
          Выберите необходимое действие
        </p>

        <div className="flex flex-col gap-5 w-full">

          <Link to="/reg" className={buttonStyle}>
            Регистрация
          </Link>

          <Link to="/auth" className={buttonStyle}>
            Авторизация
          </Link>

          <Link to="/profile" className={buttonStyle}>
            Профиль
          </Link>

          <Link to="/delete" className={buttonStyle}>
            Удаление пользователей
          </Link>

          <Link to="/users" className={buttonStyle}>
            Все пользователи
          </Link>          

        </div>

      </div>

    </div>
  );
};

export default Home;
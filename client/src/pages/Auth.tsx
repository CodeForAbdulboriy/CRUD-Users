import { useState } from "react";
import HomeButton from "../components/HomeButton";

const Auth = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [statusRes, setStatusRes] = useState<string>("");

    const handleChange = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();

            const API = "http://localhost:4000/log";

            if (!name || !email || !password) {
                return setStatusRes("Все поля должны быть заполнены!");
            }

            const sendData = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await sendData.json();

            setStatusRes(data.message);

            sessionStorage.setItem("token", JSON.stringify(data.token));
        }
        catch (error) {
            setStatusRes("Ошибка сервера!");
        }
    };

    const inputStyle = `
        w-full h-12 sm:h-14
        border border-gray-300
        rounded-xl px-4
        text-sm sm:text-base
        text-gray-700
        outline-none
        bg-white
        placeholder:text-gray-400
        hover:border-blue-400
        focus:border-blue-500
        focus:ring-4 focus:ring-blue-100
        transition-all duration-200
    `;

    return (
        <div className="
            min-h-screen
            flex justify-center items-center
            bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100
            px-4 py-8
        ">

            <div className="
                bg-white
                w-full max-w-md
                p-6 sm:p-8 md:p-10
                rounded-2xl sm:rounded-3xl
                border border-gray-100
                shadow-2xl shadow-blue-900/10
                flex flex-col items-center
                gap-8 sm:gap-10
            ">

                <div className="text-center">
                    <h1 className="
                        text-3xl sm:text-4xl
                        font-bold
                        tracking-wide
                        text-gray-700
                    ">
                        Авторизация
                    </h1>

                    <p className="text-gray-400 text-sm sm:text-base mt-3">
                        Войдите в свой аккаунт
                    </p>
                </div>

                <form
                    onSubmit={handleChange}
                    className="w-full flex flex-col gap-5"
                >

                    <input
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputStyle}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputStyle}
                    />

                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputStyle}
                    />

                    <button
                        type="submit"
                        className="
                            w-full h-12 sm:h-14
                            mt-3
                            rounded-xl
                            bg-blue-600
                            text-white
                            font-semibold
                            text-base sm:text-lg
                            shadow-lg shadow-blue-600/20
                            hover:bg-blue-700
                            hover:shadow-xl
                            active:scale-[0.98]
                            transition-all duration-300
                            cursor-pointer
                        "
                    >
                        Войти
                    </button>

                </form>

                {statusRes && (
                    <p className="
                        w-full
                        text-center
                        text-sm sm:text-base
                        text-gray-600
                        break-words
                    ">
                        {statusRes}
                    </p>
                )}

                <HomeButton />
            </div>

        </div>
    );
};

export default Auth;
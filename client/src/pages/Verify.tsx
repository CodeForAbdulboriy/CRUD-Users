import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../components/HomeButton";

interface EmailData {
    email: string;
}

const Verify = () => {
    const navigate = useNavigate();

    const API: string = "http://localhost:4000/verify-email";

    const [code, setCode] = useState<string>("");
    const [reply, setReply] = useState<string>("");

    const handleChange = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // Получаем Email из sessionStorage
            const getEmail = sessionStorage.getItem("emailStorage");

            if (getEmail === null) {
                setReply("Данные отсутствуют!");
                return;
            }

            // Преобразуем строку в объект
            const parsedEmail: EmailData = JSON.parse(getEmail);

            // Отправляем Email и код на сервер
            const postVerify = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: parsedEmail.email,
                    code: code
                })
            });

            const verifyReply = await postVerify.json();

            setReply(verifyReply.message);

            if(postVerify.ok) {
                navigate("/");
            }

        } catch(error) {
            if(error instanceof Error) {
                setReply(error.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 flex flex-col items-center justify-center px-4">

            <div className="mb-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
                    Верификация
                </h1>

                <p className="mt-3 text-gray-500 text-base md:text-lg">
                    Подтвердите свой адрес электронной почты
                </p>
            </div>

            <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-2xl shadow-2xl shadow-blue-900/10 border border-gray-100">

                {/* Иконка */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    Введите код
                </h2>

                <p className="text-gray-500 text-center mt-2 mb-8 leading-relaxed">
                    Мы отправили вам код подтверждения на электронную почту.
                </p>

                <form className="flex flex-col gap-5" onSubmit={handleChange}>

                    <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="000000"
                        className="w-full h-16 text-center text-3xl font-semibold tracking-[0.5em]
                        outline-none border-2 border-gray-200 rounded-xl
                        bg-gray-50 text-gray-800 placeholder:text-gray-300
                        focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100
                        transition-all duration-200"
                    />

                    <button
                        type="submit"
                        className="w-full h-14 rounded-xl bg-blue-600 text-white
                        font-semibold text-lg shadow-lg shadow-blue-600/25
                        hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30
                        active:scale-[0.98] transition-all duration-200"
                    >
                        Подтвердить
                    </button>

                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        {reply}
                    </p>
                </div>

            </div>

        </div>
    );
};

export default Verify;
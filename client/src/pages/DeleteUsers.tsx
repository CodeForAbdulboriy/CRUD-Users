import { useState } from "react";
import HomeButton from "../components/HomeButton";

const DeleteUsers = () => {
    const API = "http://localhost:4000/delete";

    const [name, setName] = useState<string>("");
    const [reply, setReply] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!name.trim()) {
            setReply("Введите имя пользователя!");
            setSuccess(false);
            return;
        }

        if (!window.confirm(`Вы действительно хотите удалить пользователя ${name}?`)) {
            return;
        }

        try {
            setLoading(true);
            setReply("");

            const response = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name.trim()
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setReply(data.message || "Не удалось удалить пользователя!");
                setSuccess(false);
                return;
            }

            setReply(data.message || "Пользователь успешно удалён!");
            setSuccess(true);
            setName("");

        } catch (error) {
            setReply("Ошибка сервера!");
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="
            min-h-screen
            flex justify-center items-center
            px-4 py-8
            bg-gradient-to-br from-red-50 via-orange-50 to-red-100
        ">

            <div className="
                bg-white
                w-full max-w-md
                p-6 sm:p-8 md:p-10
                rounded-2xl sm:rounded-3xl
                shadow-2xl shadow-red-900/10
                border border-gray-100
                flex flex-col items-center
                gap-8
            ">

                <div className="text-center">
                    <h1 className="
                        text-3xl sm:text-4xl
                        font-bold tracking-wide
                        text-gray-800
                    ">
                        Удаление
                    </h1>

                    <p className="mt-3 text-gray-500 text-sm sm:text-base">
                        Введите имя пользователя, которого хотите удалить
                    </p>
                </div>

                <form
                    onSubmit={handleDelete}
                    className="w-full flex flex-col gap-5"
                >
                    <input
                        type="text"
                        placeholder="Имя пользователя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="
                            w-full h-14
                            px-4
                            rounded-xl
                            border-2 border-gray-200
                            bg-gray-50
                            text-gray-700
                            outline-none
                            transition-all duration-300
                        "
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full h-14
                            rounded-xl
                            bg-red-600
                            text-white
                            cursor-pointer
                            font-semibold text-lg
                            shadow-lg
                            hover:bg-red-700
                            transition-all duration-300
                        "
                    >
                        Удалить пользователя
                    </button>
                </form>

                {reply && (
                    <p className={`
                        text-center text-sm sm:text-base
                        break-words w-full
                        ${success ? "text-green-600" : "text-red-600"}
                    `}>
                        {reply}
                    </p>
                )}

                <HomeButton />

            </div>
        </div>
    );
};

export default DeleteUsers;
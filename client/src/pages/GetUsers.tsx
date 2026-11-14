import { useEffect, useState } from "react";
import HomeButton from "../components/HomeButton";

interface User {
    id: string;
    name: string;
    email: string;
    status: string;
}

const GetUsers = () => {
    const API = "http://localhost:4000/";

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const getUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(API, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Не удалось получить пользователей");
            }

            setUsers(data);
        }
        catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ошибка сервера!");
            }
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="
            min-h-screen
            bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100
            px-4 py-10 sm:px-8
        ">

            <div className="max-w-5xl mx-auto">

                <div className="text-center mb-10">
                    <h1 className="
                        text-3xl sm:text-4xl md:text-5xl
                        font-bold tracking-wide
                        text-gray-800
                    ">
                        Пользователи
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Список зарегистрированных пользователей
                    </p>
                </div>

                <div className="
                    bg-white
                    rounded-2xl sm:rounded-3xl
                    shadow-2xl shadow-blue-900/10
                    border border-gray-100
                    p-5 sm:p-8
                ">

                    <div className="
                        flex flex-col sm:flex-row
                        justify-between items-center
                        gap-4 mb-8
                    ">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                            Все пользователи
                        </h2>

                        <button
                            onClick={getUsers}
                            disabled={loading}
                            className="
                                w-full sm:w-auto
                                px-6 py-3
                                rounded-xl
                                bg-blue-600 text-white
                                font-semibold
                                hover:bg-blue-700
                                disabled:opacity-50
                                transition-all duration-300
                                active:scale-95
                            "
                        >
                            {loading ? "Загрузка..." : "Обновить"}
                        </button>
                    </div>

                    {loading && (
                        <div className="text-center py-12 text-blue-600">
                            Загружаем пользователей...
                        </div>
                    )}

                    {!loading && error && (
                        <div className="
                            bg-red-50 border border-red-200
                            text-red-600 rounded-xl
                            p-4 text-center
                        ">
                            {error}
                        </div>
                    )}

                    {!loading && !error && users.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                            Пользователи не найдены.
                        </div>
                    )}

                    {!loading && !error && users.length > 0 && (
                        <div className="flex flex-col gap-4">

                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    className="
                                        flex flex-col sm:flex-row
                                        sm:items-center
                                        gap-4
                                        p-5
                                        border border-gray-100
                                        rounded-xl
                                        bg-gray-50
                                        hover:bg-blue-50
                                        hover:border-blue-200
                                        hover:shadow-md
                                        transition-all duration-300
                                    "
                                >

                                    <div className="
                                        w-12 h-12
                                        rounded-full
                                        bg-blue-100
                                        text-blue-600
                                        flex items-center justify-center
                                        font-bold text-xl
                                        shrink-0
                                    ">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-800 text-lg break-words">
                                            {user.name}
                                        </h3>

                                        <p className="text-gray-500 text-sm break-all">
                                            {user.email}
                                        </p>
                                    </div>

                                    <div className="
                                        self-start sm:self-center
                                        px-4 py-2
                                        rounded-full
                                        bg-green-100
                                        text-green-700
                                        text-sm font-medium
                                    ">
                                        {user.status}
                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                    {!loading && !error && (
                        <div className="
                            mt-8 pt-5
                            border-t border-gray-100
                            text-sm text-gray-400 text-center
                        ">
                            Всего пользователей: {users.length}
                        </div>
                    )}

                </div>

                <div className="flex justify-center mt-4">
                    <HomeButton />
                </div>
                
            </div>
        </div>
    );
};

export default GetUsers;
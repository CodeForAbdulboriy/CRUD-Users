import HomeButton from "../components/HomeButton";
import { useState, useEffect } from "react";

interface ResponseInfo {
    id: string,
    name: string;
    email: string;
}

interface ApiResponse {
    user: ResponseInfo;
}

const Profile = () => {
    const [resp, setResp] = useState<ResponseInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const getProfile = async () => {
        try {
            const storedToken = sessionStorage.getItem("token");

            if(!storedToken) {
                throw new Error("Токен авторизации не найден!");
            }

            const parsedToken = JSON.parse(storedToken);

            const response = await fetch("http://localhost:4000/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${parsedToken}`
                }
            });

            const data: ApiResponse = await response.json();

            if(!response.ok) {
                throw new Error(
                    (data as unknown as { message: string }).message ||
                    "Не удалось загрузить профиль"
                );
            }

            setResp(data.user);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Произошла ошибка"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">

            <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">

                <div className="border-b border-gray-100 pb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Профиль
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Информация о вашем аккаунте
                    </p>
                </div>

                {loading ? (
                    <div className="py-12 flex justify-center">
                        <div className="w-7 h-7 border-[3px] border-gray-200 border-t-blue-600 rounded-full animate-spin" />
                    </div>
                ) : error ? (
                    <div className="mt-6 rounded-xl bg-red-50 border border-red-100 p-4">
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    </div>
                ) : resp ? (
                    <div className="py-6 space-y-6">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                ID пользователя
                            </p>

                            <p className="mt-2 text-base font-medium text-gray-900">
                                {resp.id}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                Имя пользователя
                            </p>

                            <p className="mt-2 text-base font-medium text-gray-900">
                                {resp.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                Электронная почта
                            </p>

                            <p className="mt-2 text-base font-medium text-gray-900 break-all">
                                {resp.email}
                            </p>
                        </div>

                    </div>
                ) : null}

                <button
                    onClick={() => {
                        setLoading(true);
                        setError("");
                        getProfile();
                    }}
                    disabled={loading}
                    className="w-full h-11 rounded-xl bg-gray-900 hover:bg-gray-700 disabled:opacity-50 text-white text-sm font-medium transition-colors duration-200"
                >
                    Обновить профиль
                </button>

                <div className="flex justify-center mt-4">
                    <HomeButton />
                </div>
            </div>
            
        </div>
    );
};

export default Profile;
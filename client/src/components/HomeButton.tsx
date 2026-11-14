const HomeButton = () => {
    const handleHome = () => {
        window.location.href = "http://localhost:5173/";
    };

    return (
        <button
            onClick={handleHome}
            className="
                inline-flex items-center justify-center gap-2
                px-5 py-3
                bg-white
                border border-gray-200
                rounded-xl
                text-gray-700
                font-medium text-sm
                shadow-sm
                hover:bg-gray-50
                hover:border-gray-300
                hover:shadow-md
                active:scale-[0.97]
                transition-all duration-200
            "
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
            </svg>

            На главную
        </button>
    );
};

export default HomeButton;
const apiUrl = process.env.REACT_APP_API_URL;

export const gameSseMiddleware = (store) => {
    let isInitialized = false;

    return (next) => (action) => {
        // Пропускаем все действия через цепочку
        const result = next(action);

        // Инициализируем SSE только при старте приложения
        if (!isInitialized) {
            console.log("Инициализация SSE подключения");
            isInitialized = true;
            const eventSource = new EventSource(`${apiUrl}/game-update`);

            eventSource.addEventListener("gameUpdate", (event) => {
                const data = JSON.parse(event.data);
                console.log(data);
                //   store.dispatch({ type: 'UPDATE_GAME_STATE', payload: data });
            });

            eventSource.onerror = () => {
                console.error("SSE ошибка соединения");
            };
        }

        return result;
    };
};

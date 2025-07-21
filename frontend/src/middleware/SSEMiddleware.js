const apiUrl = process.env.REACT_APP_API_URL;

export const gameSseMiddleware = (store) => {
    let eventSource = null;

    return (next) => (action) => {
        // Подключение к SSE
        const connect = (countryName, password) => {
            eventSource = new EventSource(
                `${apiUrl}/game-update?country_name=${countryName}&password=${password}`
            );

            eventSource.addEventListener("gameUpdate", (event) => {
                const data = JSON.parse(event.data);
                store.dispatch({
                    type: "countries/setCountries",
                    payload: data.countries,
                });
                store.dispatch({
                    type: "ownCountry/setOwnCountry",
                    payload: data.ownCountry,
                });

                alert("Новый раунд!");
            });

            eventSource.onerror = (error) => {
                console.error("SSE connection error:", error);
                eventSource?.close();
            };
        };

        // Обработка действий
        switch (action.type) {
            case "checkAuth/fulfilled":
                if (!eventSource) {
                    console.log("Authenticated, establishing SSE connection");
                    connect(action.payload.name, action.payload.password);
                }
                break;

            case "ownCountry/logout":
                if (eventSource) {
                    console.log("Resetting, closing SSE connection");
                    eventSource.close();
                    eventSource = null;
                } else {
                    console.log("no EventSource", eventSource);
                }
                break;

            default:
                break;
        }

        return next(action);
    };
};

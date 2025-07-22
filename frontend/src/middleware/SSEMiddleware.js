import { fetchCountriesData } from "../features/countriesSlice";

const apiUrl = process.env.REACT_APP_API_URL;

export const gameSseMiddleware = (store) => {
    let eventSource = null;

    return (next) => (action) => {
        // Подключение к SSE
        const connect = (countryName) => {
            eventSource = new EventSource(
                `${apiUrl}/game-update?country_name=${countryName}`,
                {
                    withCredentials: true,
                }
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
                if (eventSource) {
                    eventSource.close();
                }
                console.log("Authenticated, establishing SSE connection");
                connect(action.payload.name);
                store.dispatch(fetchCountriesData());
                break;

            case "logout/fulfilled":
                eventSource?.close();
                eventSource = null;
                break;

            default:
                break;
        }

        return next(action);
    };
};

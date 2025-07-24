import { fetchCountriesData, setCountries } from "../features/countriesSlice";
import { setOwnCountry } from "../features/ownCountrySlice";

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
                store.dispatch(setCountries(data.countries));
                store.dispatch(setOwnCountry(data.ownCountry));

                alert("Новый раунд!");
            });

            eventSource.addEventListener("transfer", (event) => {
                const data = JSON.parse(event.data);
                store.dispatch(setOwnCountry(data.ownCountry));
                if (data.from) alert(`Перевод ${data.sum} от ${data.from}`);
            });

            eventSource.onerror = (error) => {
                eventSource?.close();
            };
        };

        // Обработка действий
        switch (action.type) {
            case "checkAuth/fulfilled":
                if (eventSource) {
                    eventSource.close();
                }
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

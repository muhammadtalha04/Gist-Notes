import { useEffect, useState } from "react";

export const useFetch = (url: string, opt: boolean) => {
    const [response, setResponse] = useState({});
    const [error, setError] = useState({});

    useEffect(() => {
        (async () => {
            let options = {};

            if (opt === true) {
                options = {
                    method: "get",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`
                    }
                };
            }

            try {
                const response = await fetch(url, options);
                const jsonResp = await response.json();
                setResponse(jsonResp);
            }
            catch (err) {
                setError(err);
            }
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { response, error };
}
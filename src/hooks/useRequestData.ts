import { useEffect, useState } from "react";

export default function useRequestData <T> (API_URL: string) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect (() => {
        requestData();
    }, []);

    async function requestData() {
        try {
            const response = await fetch(API_URL);
            const json = await response.json();

            if (json.error) {
                setError (json.error);
                setLoading (false);
            }
            else {
                setData (json);
                setLoading (false);
                setError (null);
            }
        }
        catch (e) {
            console.log("Error", e);
        }
    }
}
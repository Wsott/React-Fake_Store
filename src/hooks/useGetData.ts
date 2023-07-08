import { useEffect, useState } from "react";

export default async function useGetData (API_URL: string) {
    const response = await fetch(API_URL);
    const json = await response.json();

    if (json.error) {
        throw new Error(json.error);
    }
    
    return json;
}
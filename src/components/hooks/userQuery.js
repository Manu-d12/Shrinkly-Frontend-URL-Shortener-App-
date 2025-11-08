import { useQuery } from "react-query";
import api from "../api/api.js"

export const useFetchTotalClicks = (token, onError) => {
    return useQuery (
            "url-usertotalclicks", 
            async () => {
                return await api.get (
                    '/api/urls/totalClicks?startDate=2025-10-05&endDate=2026-10-05',
                    {
                        headers : {
                            "Content-Type" : "application/json",
                            "Accept" : "*/*",
                            "Authorization" : `Bearer ${token}`
                        }
                    }
                );
            }, 
            {
                select : ({data}) => {
                    let transformedData = Object.keys(data).map(key => ({date : key, clickCount : data[key]}));
                    return transformedData;
                },
                onError,
                staleTime : 5000
            }
        );
}
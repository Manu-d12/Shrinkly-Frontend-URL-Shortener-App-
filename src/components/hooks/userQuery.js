import { useQuery } from "react-query";
import api from "../api/api.js"

export const useFetchTotalClicks = (token, onError) => {
    const { startDate, endDate } = calculateStartAndEndDateInISOFormat();
    return useQuery (
            "url-usertotalclicks", 
            async () => {
                return await api.get (
                    `/api/urls/totalClicks?startDate=${startDate.split("T")[0]}&endDate=${endDate.split("T")[0]}`,
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


export const useFetchUrlSpecificClicks = (token, onError) => {
    return useQuery(
        "url-urlspecificlicks", 
        async () => {
            return await api.get (
                '/api/urls/myurls',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
        }, 
        {
            select : ({data}) => {
                data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
                return data;
            },
            onError,
            staleTime : 2000
        }
    );
}


export const useFetchShortUrlSpecificClicks = (shortUrl, token, onError) => {
    const { startDate, endDate } = calculateStartAndEndDateInISOFormat();
    return useQuery(
        "url-shorturlspecificlicks", 
        async () => {
            return await api.get (
                `/api/urls/anayltics/${shortUrl}?startDate=${startDate}&endDate=${endDate}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
        }, 
        {
            select : ({data}) => {
                data.sort((a, b) => new Date(a.createdDate - b.createdDate));
                return data;
            },
            onError,
            staleTime : 2000
        }
    );
}


function calculateStartAndEndDateInISOFormat( pastMonths = 3) {
    const now = new Date();

    const startDate = new Date(now);
    startDate.setMonth(startDate.getMonth() - pastMonths);
    startDate.setHours(0, 0, 0, 0);


    const endDate = new Date(now);
    endDate.setDate(now.getDate() + 1);
    endDate.setHours(0, 0, 0, 0);


    return {
        'startDate' : startDate.toISOString().slice(0, -1),
        'endDate' : endDate.toISOString().slice(0, -1)
    }
}

 
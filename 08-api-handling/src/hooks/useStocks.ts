import { useState, useEffect } from 'react';
import axios from 'axios';

interface Stock {
    Name: string,
    Symbol: string,
    ListingDate: string,
    ISIN: string,
    MarketCap: string,
    CurrentPrice: string,
    HighLow: string,
    StockPE:string,
    BookValue: string,
    DividendYield: string,
    ROCE: string,
    ROE: string,
    FaceValue: string
}

interface Pagination {
    page: number,
    limit: number,
    totalPages: number,
    nextPage: boolean,
    previousPage: boolean,
    
}


const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const useStocks = ( page: number, limit: number) => {
    const [stocks, setStock] = useState<Stock[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [pagination, setPagination] = useState<Pagination>({
        page: page,
        limit: limit,
        totalPages: 1,
        nextPage: false,
        previousPage: false,
    });

    async function fetchStock (page = pagination.page, limit = pagination.limit) {
        setLoading(true);

        try {
            const response = await axios.get(
                `${baseUrl}/stocks?page=${page}&limit=${limit}&query=tata`,
            );
            const data = response.data.data;
            setStock(data.data);
            setPagination({
                page: data.page,
                limit: data.limit,
                totalPages: data.totalPages,
                nextPage: data.nextPage,
                previousPage: data.previousPage,
            });
        } catch (err: any) {
            setError(err)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchStock(page, limit);
    }, [page, limit]);

    return { stocks , loading, error, pagination };
}
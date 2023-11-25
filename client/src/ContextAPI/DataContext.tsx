import axios from 'axios';
import { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';
import { url } from '../Components/url';
interface DataContextProps {
    data: any[];
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    fetchData: () => void;
    setData: Dispatch<SetStateAction<any[]>>;
}
const DataContext = createContext<DataContextProps>({
    data: [],
    loading: true,
    setLoading: () => { },
    fetchData: () => { },
    setData: () => { }
});
export const DataProvider = ({ children }: any) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    async function fetchData() {
        const { data } = await axios.get(`${url}/pokemon`)
        setData(data)
        setLoading(false)
    }
    return (
        <DataContext.Provider value={{ data, loading, setLoading, fetchData, setData }}>
            {children}
        </DataContext.Provider>
    )
}
export const useData = () => {
    return useContext(DataContext);
};
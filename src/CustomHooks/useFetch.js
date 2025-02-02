import {useEffect, useState} from "react";
import axios from "axios";

function useFetchGet(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await axios.get(url);
                setData(response.data);
                setIsLoading(false);

            }
            catch(error){
                setError(error);
                setIsLoading(false);
            }
        }
        fetchData();

    },[url]);

    return {data, isLoading, error};
}

function useFetchPost(url) {

}

export default useFetchGet;

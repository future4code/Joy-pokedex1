import axios from "axios";
import { useEffect, useState } from "react";

const useRequestData=(url,header)=>{
	const [data,setData]=useState();
	const [isLoading,setIsLoading]=useState(false)
	const [error,setError]=useState()
	useEffect(()=>{
		setIsLoading(true)
		axios.get(url,header)
		.then(response=>{
			setData(response.data)
			setIsLoading(false)
		}).catch(error=>{
			setError(error)
			setIsLoading(false)
		})
	},[url])
	return [data, isLoading, error];
}
export default useRequestData;
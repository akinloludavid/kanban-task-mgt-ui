import { useQuery } from 'react-query'
import axiosInstance from '../../api'

const getBoards = async () => {
    const res = await axiosInstance.get(`/boards`)
    return res.data?.data || res.data
}

export const useGetBoards = () => {
    return useQuery({
        queryKey: '/boards',
        queryFn: getBoards,
    })
}

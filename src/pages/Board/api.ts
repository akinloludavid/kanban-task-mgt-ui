import { useQuery } from 'react-query'
import axiosInstance from '../../api'

const getTasksInBoard = async (boardId: string) => {
    const res = await axiosInstance.get(`/tasks/${boardId}`)
    return res.data?.data || res.data
}

const getBoardById = async (boardId: string) => {
    const res = await axiosInstance.get(`/boards/${boardId}`)
    return res.data?.data || res.data
}
export const useGetTasksInABoard = (boardId: string) => {
    return useQuery({
        queryKey: `/tasks/${boardId}`,
        queryFn: () => getTasksInBoard(boardId),
    })
}

export const useGetBoardById = (boardId: string) => {
    return useQuery({
        queryKey: `/board/by-id/${boardId}`,
        queryFn: () => getBoardById(boardId),
    })
}

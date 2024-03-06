import { useQueries, useQuery } from 'react-query'
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
        enabled: !!boardId,
    })
}

export const useGetTasksInAllBoards = (boards: any[] = []) => {
    return (
        useQueries(
            boards?.map(board => ({
                queryKey: [`/board/${board?._id}`],
                queryFn: () => getTasksInBoard(board?._id),
                enabled: !!boards,
            })),
        ) || []
    )
}

export const useGetBoardById = (boardId: string) => {
    return useQuery({
        queryKey: `/board/by-id/${boardId}`,
        queryFn: () => getBoardById(boardId),
    })
}

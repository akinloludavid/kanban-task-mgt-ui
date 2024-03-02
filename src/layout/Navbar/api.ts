import { useMutation } from 'react-query'
import axiosInstance from '../../api'
import { ICreateTask } from '../../types'

const deleteBoard = async (boardId: string) => {
    const res = await axiosInstance.delete(`/boards/${boardId}`)
    return res.data?.data || res.data
}

const createTask = async (taskBody: ICreateTask, boardId: string) => {
    const res = await axiosInstance.post(`/boards/${boardId}`, taskBody)
    return res.data?.data || res.data
}

export const useDeleteBoard = () => {
    return useMutation({
        mutationKey: `/delete/board/`,
        mutationFn: (boardId: string) => deleteBoard(boardId),
    })
}

export const useCreateTask = () => {
    return useMutation({
        mutationKey: `/create-task`,
        mutationFn: ({
            body,
            boardId,
        }: {
            body: ICreateTask
            boardId: string
        }) => createTask(body, boardId),
    })
}

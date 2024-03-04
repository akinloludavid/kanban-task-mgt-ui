import { useMutation } from 'react-query'
import axiosInstance from '../../api'
import { ICreateBoardBody, ICreateTask } from '../../types'

const deleteBoard = async (boardId: string) => {
    const res = await axiosInstance.delete(`/boards/${boardId}`)
    return res.data?.data || res.data
}

const updateBoard = async (boardId: string, body: ICreateBoardBody) => {
    const res = await axiosInstance.put(`/boards/${boardId}`, body)
    return res.data?.data || res.data
}

export const useUpdateBoard = (boardId: string) => {
    return useMutation({
        mutationKey: `/boards/update/${boardId}`,
        mutationFn: ({
            boardId,
            body,
        }: {
            boardId: string
            body: ICreateBoardBody
        }) => updateBoard(boardId, body),
    })
}

const createTask = async (taskBody: ICreateTask) => {
    const res = await axiosInstance.post(`/tasks`, taskBody)
    return res.data?.data || res.data
}

const updateTask = async (taskBody: ICreateTask, taskId: string) => {
    const res = await axiosInstance.put(`/task/update/${taskId}`, taskBody)
    return res.data?.data || res.data
}
const deleteTask = async (boardId: string, taskId: string) => {
    const res = await axiosInstance.delete(`/task/delete/${boardId}/${taskId}`)
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
        mutationFn: (body: ICreateTask) => createTask(body),
    })
}

export const useUpdateTask = (taskId: string) => {
    return useMutation({
        mutationKey: `/update-task/${taskId}`,
        mutationFn: (body: ICreateTask) => updateTask(body, taskId),
    })
}
export const useDeleteTask = (taskId: string) => {
    return useMutation({
        mutationKey: `/delete-task/${taskId}`,
        mutationFn: ({ boardId }: { boardId: string }) =>
            deleteTask(boardId, taskId),
    })
}
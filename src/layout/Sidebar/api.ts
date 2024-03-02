import { useMutation } from 'react-query'
import axiosInstance from '../../api'
import { ICreateBoardBody } from '../../types'

const createBoard = async (body: ICreateBoardBody) => {
    const res = await axiosInstance.post(`/boards`, body)
    return res.data?.data || res.data
}

export const useCreateBoard = () => {
    return useMutation({
        mutationKey: `/boards`,
        mutationFn: (body: ICreateBoardBody) => createBoard(body),
    })
}

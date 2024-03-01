import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetTasksInABoard } from './api'

const Board = () => {
    const { id = '' } = useParams()
    const { data } = useGetTasksInABoard(id)
    console.log(data)
    return <div>Board {id}</div>
}

export default Board

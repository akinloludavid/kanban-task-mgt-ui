import React from 'react'
import { useGetBoards } from './api'

const Dashboard = () => {
    const { data } = useGetBoards()
    console.log(data)
    return <div>Dashboard</div>
}

export default Dashboard

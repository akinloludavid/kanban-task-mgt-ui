import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TaskCard from '../../components/TaskCard'
import { useAppContext } from '../../context/AppContext'
import { getTaskObjectFromList } from '../../utils/helpers'
import { useGetBoardById, useGetTasksInABoard } from './api'

const Board = () => {
    const { id = '' } = useParams()
    const { setCurrentBoard } = useAppContext()
    useEffect(() => {
        setCurrentBoard(id)
    }, [id])
    const { data: tasksInBoard } = useGetTasksInABoard(id)

    console.log(tasksInBoard)
    const { data: board } = useGetBoardById(id)
    console.log(board)
    const tasks = getTaskObjectFromList(tasksInBoard)
    return (
        <Box>
            <Grid
                overflowX={'scroll'}
                gridTemplateColumns={`repeat(${board?.columns?.length}, 1fr)`}
                maxW='100vw'
                columnGap={'24px'}
            >
                {board?.columns?.map((el: any, idx: number) => (
                    <GridItem w='280px' mb='24px'>
                        <Text color='secTextColor'>{el?.toUpperCase()}</Text>
                    </GridItem>
                ))}
                {Object.values(tasks)?.map((el: any, idx: number) => (
                    <Flex flexDir={'column'} gap='24px' key={idx}>
                        {el?.map((task: any) => (
                            <GridItem key={task?._id}>
                                <TaskCard
                                    title={task?.title}
                                    subtasks={task?.subtasks}
                                    task={task}
                                />
                            </GridItem>
                        ))}
                    </Flex>
                ))}
            </Grid>
        </Box>
    )
}

export default Board

import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TaskCard from '../../components/TaskCard'
import { useAppContext } from '../../context/AppContext'
import UpdateBoardModal from '../../layout/Navbar/UpdateBoardModal'
import { getTaskObjectFromList } from '../../utils/helpers'
import { useGetBoardById, useGetTasksInABoard } from './api'
import Loader from './Loader'

const Board = () => {
    const { id = '' } = useParams()
    const { setCurrentBoard } = useAppContext()
    useEffect(() => {
        setCurrentBoard(id)
    }, [id])
    const { data: tasksInBoard, isLoading: isLoadingTasks } =
        useGetTasksInABoard(id)

    const { data: board, isLoading: isLoadingBoard } = useGetBoardById(id)
    const tasks = getTaskObjectFromList(board?.columns, tasksInBoard)
    const [showEditBoard, setShowEditBoard] = useState(false)
    return (
        <Box>
            <UpdateBoardModal
                isOpen={showEditBoard}
                onClose={() => setShowEditBoard(false)}
            />
            {isLoadingTasks || isLoadingBoard ? (
                <Loader />
            ) : board?.columns?.length === 0 ? (
                <Flex
                    w='100%'
                    h='100vh'
                    justify={'center'}
                    align='center'
                    gap='54px'
                    flexDir={'column'}
                >
                    <Text color='secTextColor'>
                        This board is empty. Create a new column to get started
                    </Text>
                    <Button
                        w='fit-content'
                        onClick={() => setShowEditBoard(true)}
                    >
                        +Add New Column
                    </Button>
                </Flex>
            ) : (
                <Grid
                    overflowX={'scroll'}
                    gridTemplateColumns={`repeat(${board?.columns?.length}, 1fr)`}
                    maxW='100vw'
                    columnGap={'24px'}
                    position='relative'
                >
                    {Object.entries(tasks)?.map(([k, v]: any) => (
                        <GridItem w='280px' mb='24px' key={nanoid()}>
                            <Text color='secTextColor'>
                                {k?.toUpperCase()} ({v?.length})
                            </Text>
                        </GridItem>
                    ))}

                    {Object.entries(tasks)
                        ?.map(([k, v]) => v)
                        ?.map((tasks: any) => (
                            <GridItem
                                display={'flex'}
                                flexDir={'column'}
                                gap='24px'
                                key={nanoid()}
                            >
                                {tasks?.map((task: any) => (
                                    <Flex key={task?._id}>
                                        <TaskCard
                                            title={task?.title}
                                            subtasks={task?.subtasks}
                                            task={task}
                                        />
                                    </Flex>
                                ))}
                            </GridItem>
                        ))}
                </Grid>
            )}
        </Box>
    )
}

export default Board

import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
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

    return (
        <Box>
            <Grid
                overflowX={'scroll'}
                gridTemplateColumns={`repeat(${
                    board?.columns?.length + 1
                }, 1fr)`}
                maxW='100vw'
            >
                {board?.columns?.map((el: any, idx: number) => (
                    <GridItem w='280px' mb='16px'>
                        <Text color='secTextColor'>{el?.toUpperCase()}</Text>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    )
}

export default Board

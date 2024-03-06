import {
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateBoardModal from '../../layout/Sidebar/CreateBoardModal'
import { useGetTasksInAllBoards } from '../Board/api'
import { useGetBoards } from './api'

const Dashboard = () => {
    const { data: boards } = useGetBoards()
    const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false)
    const cardBgColor = useColorModeValue('light.secBg', 'dark.secBg')
    const navigate = useNavigate()
    const allTasks: any = useGetTasksInAllBoards(boards)
    return (
        <>
            <CreateBoardModal
                isOpen={isCreateBoardOpen}
                onClose={() => setIsCreateBoardOpen(false)}
            />
            {boards?.length === 0 ? (
                <Flex
                    align={'center'}
                    justify='center'
                    flexDir={'column'}
                    h='100%'
                    gap='8px'
                >
                    <Text color='secTextColor'>
                        You currently have no boards
                    </Text>
                    <Button
                        w='fit-content'
                        onClick={() => setIsCreateBoardOpen(true)}
                    >
                        + Create New Board
                    </Button>
                </Flex>
            ) : (
                <Grid
                    templateColumns={[
                        'repeat(1, 1fr)',
                        'repeat(2, 1fr)',
                        'repeat(2, 1fr)',
                        'repeat(4, 1fr)',
                    ]}
                    gap={['24px']}
                >
                    {boards?.map((board: any, idx: number) => (
                        <GridItem key={nanoid()}>
                            <Flex
                                flexDir={'column'}
                                shadow={'lg'}
                                bgColor={cardBgColor}
                                p={'16px'}
                                borderRadius='8px'
                                cursor={'pointer'}
                                onClick={() =>
                                    navigate(`/dashboard/board/${board?._id}`)
                                }
                                minH='160px'
                            >
                                <Heading noOfLines={1}>{board?.name}</Heading>
                                <Text
                                    mt='auto'
                                    color='secTextColor'
                                    fontSize={'16px'}
                                >
                                    {allTasks?.[idx]?.data?.length} tasks
                                </Text>
                            </Flex>
                        </GridItem>
                    ))}
                </Grid>
            )}
        </>
    )
}

export default Dashboard

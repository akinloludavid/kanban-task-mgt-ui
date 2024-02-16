import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import { ISubtask } from '../../types'

interface ITaskCard {
    title: string
    subtasks: ISubtask[]
}
const TaskCard = ({ title, subtasks }: ITaskCard) => {
    const taskBgColor = useColorModeValue('light.secBg', 'dark.secBg')
    const titleColor = useColorModeValue(
        'lightMode.textColor',
        'lightMode.textColor',
    )
    const subTaskColor = useColorModeValue('secTextColor', 'secTextColor')

    const doneSubTasks = subtasks.filter(item => item.done).length
    return (
        <Box
            bgColor={taskBgColor}
            borderRadius='8px'
            px='16px'
            py='23px'
            boxShadow='2px 4px 8px rgba(0,0,0,0.05)'
            display={'flex'}
            flexDir='column'
            gap='16px'
        >
            <Heading color={titleColor} variant={'h2'} as='h2'>
                {title}
            </Heading>
            <Text color={subTaskColor}>
                {doneSubTasks} of {subtasks.length} subtasks
            </Text>
        </Box>
    )
}

export default TaskCard

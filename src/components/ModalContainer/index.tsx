import {
    Box,
    Heading,
    Icon,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import { IChildren } from '../../types'
import { IoEllipsisVertical } from 'react-icons/io5'

interface IModalContainer extends IChildren {
    title: string
    isOpen: boolean
    onClose: () => void
    showOptions?: boolean
}
const ModalContainer = ({
    title,
    isOpen,
    onClose,
    showOptions = false,
    children,
}: IModalContainer) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    display={'flex'}
                    alignItems='center'
                    justifyContent={'space-between'}
                >
                    <Heading>{title}</Heading>
                    <Icon
                        display={showOptions ? 'flex' : 'none'}
                        as={IoEllipsisVertical}
                        cursor='pointer'
                    />
                </ModalHeader>
                <ModalBody>{children}</ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalContainer

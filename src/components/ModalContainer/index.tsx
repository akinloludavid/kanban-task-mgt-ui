import {
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
    title?: string
    isOpen: boolean
    onClose: () => void
    showOptions?: boolean
    titleColor?: string
    onClickOptions?: () => void
}
const ModalContainer = ({
    title,
    isOpen,
    onClose,
    showOptions = false,
    children,
    titleColor,
    onClickOptions,
}: IModalContainer) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent py='24px'>
                <ModalHeader
                    display={'flex'}
                    alignItems='center'
                    justifyContent={'space-between'}
                    my='0'
                    py='0'
                    mb={title ? '16px' : 0}
                >
                    <Heading color={titleColor}>{title}</Heading>
                    <Icon
                        display={showOptions ? 'flex' : 'none'}
                        as={IoEllipsisVertical}
                        cursor='pointer'
                        onClick={onClickOptions}
                    />
                </ModalHeader>
                <ModalBody py='0px' px='24px'>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalContainer

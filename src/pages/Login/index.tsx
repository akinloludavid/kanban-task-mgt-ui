import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Input,
    Link,
    Text,
} from '@chakra-ui/react'
import { NavLink, useSearchParams } from 'react-router-dom'
import ModalContainer from '../../components/ModalContainer'
import { SIGNUP_PAGE } from '../../routes/pathnames'
import AuthContainer from '../Auth'

const Login = () => {
    const [searchParams] = useSearchParams()
    const authMode = searchParams.get('step')
    return (
        <Box>
            <AuthContainer>
                <Heading>Login</Heading>
                <Input placeholder='Email' />
                <Input placeholder='Password' />
                <Button w='full'>SUBMIT</Button>
                <Flex align={'center'} gap='8px'>
                    <Text>Don't have an account?</Text>
                    <Link
                        textDecor={'underline'}
                        as={NavLink}
                        fontSize='13px'
                        to={SIGNUP_PAGE}
                    >
                        Sign up
                    </Link>
                </Flex>
            </AuthContainer>
        </Box>
    )
}

export default Login

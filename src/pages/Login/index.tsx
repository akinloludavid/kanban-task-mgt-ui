import {
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    InputGroup,
    Link,
    Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { IoMdEyeOff } from 'react-icons/io'
import { IoEye } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import CustomInput from '../../components/CustomInput'
import { SIGNUP_PAGE } from '../../routes/pathnames'
import { ILoginPayload } from '../../types'
import { useCustomToast } from '../../utils/toast'
import { loginSchema, useCustomFormik } from '../../utils/validations'
import AuthContainer from '../Auth'
import { useAccountLogin } from './api'

const Login = () => {
    const [passwordType, setPasswordType] = useState('password')
    const initialValues = {
        email: '',
        password: '',
    }
    const { errorToast } = useCustomToast()
    const { mutate, isLoading: isLoginLoading } = useAccountLogin()
    const onSubmit = (values: ILoginPayload) => {
        mutate(values, {
            onError: (err: any) => {
                errorToast(
                    err?.response?.data?.message ||
                        err.message ||
                        'Error occurred',
                )
            },
        })
    }
    const { values, handleChange, handleBlur, touched, errors, dirty } =
        useCustomFormik<ILoginPayload>({
            initialValues,
            validationSchema: loginSchema,
            onSubmit,
        })
    return (
        <Box>
            <AuthContainer>
                <Heading>Login</Heading>
                <CustomInput
                    placeholder='Email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email ? errors.email : ''}
                />
                <InputGroup>
                    <CustomInput
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder='Password'
                        type={passwordType}
                        error={
                            touched.password && errors.password
                                ? errors.password
                                : ''
                        }
                    />
                    <Icon
                        display={!values.password ? 'none' : 'block'}
                        as={passwordType === 'text' ? IoMdEyeOff : IoEye}
                        top='50%'
                        right='4%'
                        cursor='pointer'
                        transform='translateY(-50%)'
                        position='absolute'
                        onClick={() =>
                            setPasswordType(prev =>
                                prev === 'password' ? 'text' : 'password',
                            )
                        }
                    />
                </InputGroup>
                <Button
                    isLoading={isLoginLoading}
                    isDisabled={!dirty || Object.keys(errors).length > 0}
                    w='full'
                    _hover={{
                        bgColor: 'secColor',
                    }}
                    variant='primary'
                    onClick={() => onSubmit(values)}
                >
                    Submit
                </Button>
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

import {
    Heading,
    Input,
    Button,
    Box,
    Flex,
    Link,
    Text,
    InputGroup,
    Icon,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { LOGIN_PAGE } from '../../routes/pathnames'
import AuthContainer from '../Auth'
import { IoMdEyeOff } from 'react-icons/io'
import { IoEye } from 'react-icons/io5'
import { useState } from 'react'
import { signUpSchema, useCustomFormik } from '../../utils/validations'
import { ISignUpPayload } from '../../types'
import CustomInput from '../../components/CustomInput'
import { useCreateAccount } from './api'
import { useCustomToast } from '../../utils/toast'

const SignUp = () => {
    const [passwordType, setPasswordType] = useState('password')
    const initialValues = {
        email: '',
        password: '',
    }
    const { successToast, errorToast } = useCustomToast()
    const { mutate, isLoading: isCreateAccountLoading } = useCreateAccount()
    const onSubmit = (values: ISignUpPayload) => {
        mutate(values, {
            onSuccess: () => {
                successToast('Sign up successful')
            },
            onError: (err: any) => {
                errorToast(
                    err?.response?.data?.message ||
                        err.message ||
                        'Error occurred',
                )
            },
        })
    }
    const {
        values,
        handleChange,
        handleBlur,
        touched,
        errors,
        dirty,
        isValid,
    } = useCustomFormik<ISignUpPayload>({
        initialValues,
        validationSchema: signUpSchema,
        onSubmit,
    })

    return (
        <Box>
            <AuthContainer>
                <Flex flexDir={'column'} gap='36px'>
                    <Heading>Create Account</Heading>
                    <CustomInput
                        placeholder='Email'
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                            touched.email && errors.email ? errors.email : ''
                        }
                    />
                    <InputGroup position='relative'>
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
                        w='full'
                        isLoading={isCreateAccountLoading}
                        onClick={() => onSubmit(values)}
                        isDisabled={
                            !dirty || !isValid || isCreateAccountLoading
                        }
                        _hover={{
                            bgColor: 'secColor',
                        }}
                        variant='primary'
                    >
                        Submit
                    </Button>
                    <Flex align={'center'} gap='8px'>
                        <Text>Already have an account?</Text>
                        <Link
                            textDecor={'underline'}
                            as={NavLink}
                            fontSize='13px'
                            to={LOGIN_PAGE}
                        >
                            Log in
                        </Link>
                    </Flex>
                </Flex>
            </AuthContainer>
        </Box>
    )
}

export default SignUp

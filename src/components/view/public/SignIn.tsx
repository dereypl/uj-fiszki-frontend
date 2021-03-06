import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import Input from "../../shared/Input";
import {Heading} from "../../shared/Heading";
import Button from "../../shared/Button";
import {ROUTES} from '../../../routes/index.js';
import {AuthFailedError, Box, InputsWrapper, Paragraph, Wrapper} from './public.styles';
import {useAuth} from "../../../context/AuthContext";
import Loader from "../../shared/Loader";

type Inputs = {
    email: string,
    password: string,
};

const SignInForm = () => {
    const {login} = useAuth()
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const resetAuthError = () => setError(false)
    const handleRegisterRedirect = () => navigate(ROUTES.PUBLIC.REGISTRATION)

    const onSubmit: SubmitHandler<Inputs> = async ({email, password}) => {
        try {
            resetAuthError()
            setLoading(true)
            await login(email, password)
            navigate(ROUTES.PROTECTED.DASHBOARD, {replace: true});
        } catch {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box>
            {loading ? <Loader/> :
                <Wrapper>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Heading margin={'0 0 2rem 0'}>
                            Logowanie
                        </Heading>
                        <InputsWrapper>
                            <Input
                                label="Email"
                                {...register("email", {required: true})}
                                hasError={errors.email}
                                onFocus={resetAuthError}
                                placeholder='jan.kowalski@example.com'
                            />
                            <Input
                                label="Has??o"
                                placeholder={'Wpisz has??o'}
                                {...register("password", {required: true})}
                                type="Password"
                                hasError={errors.password}
                                onFocus={resetAuthError}
                            />
                            <AuthFailedError visible={error}>Email lub has??o nieprawid??owe</AuthFailedError>
                        </InputsWrapper>
                        <Button type="submit" width={'100%'}>Zaloguj si??</Button>
                        <Button
                            width={'100%'}
                            marginTop={'1rem'}
                            outline
                            type='button'
                            onClick={handleRegisterRedirect}
                        >
                            Zarejestruj si??
                        </Button>
                        <Paragraph fontSize={'1.2rem'}>
                            Nie pami??tasz has??a?
                            <Link to={ROUTES.PUBLIC.PASSWORD_RESET} style={{textDecoration: 'none'}}>
                                <span>Zresetuj has??o</span>
                            </Link>
                        </Paragraph>
                    </form>
                </Wrapper>
            }
        </Box>
    );
};

export default SignInForm;
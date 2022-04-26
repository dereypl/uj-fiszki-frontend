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
    confirmPassword: string,
};

const SignUpForm = () => {
    const {signup} = useAuth()
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [passwordNotMatch, setPasswordNotMatch] = useState(false)

    const resetAuthError = () => {
        setError(false)
        setPasswordNotMatch(false)
    }

    const onSubmit: SubmitHandler<Inputs> = async ({email, password, confirmPassword}) => {
        try {
            resetAuthError()

            if (password !== confirmPassword) {
                setPasswordNotMatch(true)
                return
            }

            setLoading(true)
            await signup(email, password)
            navigate("/", {replace: true});
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
                        <Heading margin={'0 0 3rem 0'}>
                            Rejestracja
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
                                label="Hasło"
                                placeholder={'Minimum 6 znaków'}
                                {...register("password", {required: true})}
                                type="Password"
                                hasError={errors.password}
                                onFocus={resetAuthError}
                            />
                            <Input
                                label="Potwierdź hasło"
                                placeholder={'Minimum 6 znaków'}
                                {...register("confirmPassword", {required: true})}
                                type="Password"
                                hasError={errors.confirmPassword}
                                onFocus={resetAuthError}
                            />
                            {error && <AuthFailedError visible>Nie udało się utworzyć konta</AuthFailedError>}
                            <AuthFailedError visible={passwordNotMatch}>Podane hasła nie są identyczne</AuthFailedError>
                        </InputsWrapper>
                        <Button disabled={passwordNotMatch} type="submit" width={'100%'}>Zarejestruj się</Button>
                        <Paragraph fontSize={'1.2rem'}>
                            Posiadasz już konto?
                            <Link to={ROUTES.PUBLIC.LOGIN} style={{textDecoration: 'none'}}>
                                <span>Wróc do logowania</span>
                            </Link>
                        </Paragraph>
                    </form>
                </Wrapper>
            }
        </Box>
    );
};

export default SignUpForm;
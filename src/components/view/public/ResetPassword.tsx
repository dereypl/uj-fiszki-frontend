import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import Input from "../../shared/Input";
import {Heading} from "../../shared/Heading";
import Button from "../../shared/Button";
import {ROUTES} from '../../../routes/index.js';
import {AuthFailedError, Box, InputsWrapper, Paragraph, Wrapper} from './public.styles';
import {useAuth} from "../../../context/AuthContext";
import Loader from "../../shared/Loader";

type Inputs = {
    email: string,
};

const SignUpForm = () => {
    const {resetPassword} = useAuth()
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [passwordNotMatch, setPasswordNotMatch] = useState(false)

    const resetAuthError = () => {
        setError(false)
        setPasswordNotMatch(false)
    }

    const onSubmit: SubmitHandler<Inputs> = async ({email}) => {
        try {
            resetAuthError()
            setLoading(true)
            await resetPassword(email)
            setSuccess(true)
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
                            Resetuj hasło
                        </Heading>
                        <InputsWrapper>
                            <Input
                                label="Email"
                                {...register("email", {required: true})}
                                hasError={errors.email}
                                onFocus={resetAuthError}
                                placeholder='jan.kowalski@example.com'
                                disabled={success}
                            />
                            {error && <AuthFailedError visible>Nie udało się zresetować hasła lub nie znaleziono
                                adresu</AuthFailedError>}
                            {success && <AuthFailedError success visible={success}>Na podany adres wysłano dalsze
                                instrukcje</AuthFailedError>}
                        </InputsWrapper>
                        {!success &&
                            <Button disabled={passwordNotMatch} type="submit" width={'100%'}>Resetuj hasło</Button>}
                        <Paragraph fontSize={'1.2rem'}>
                            Pamiętasz hasło?
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
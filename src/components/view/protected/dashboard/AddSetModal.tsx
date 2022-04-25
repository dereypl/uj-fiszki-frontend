import React, {FC, useState} from 'react';
import Button from "../../../shared/Button";
import {AuthFailedError, InputsWrapper} from "../../public/public.styles";
import Input from "../../../shared/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import Loader from "../../../shared/Loader";
import SetService from "../../../../database/SetService";
import {useAuth} from "../../../../context/AuthContext";
import {ButtonsWrapper, ModalBackground, ModalBox, ModalForm, ModalHeader, StyledCloseIcon} from "./AddSetModal.styles";

type Inputs = {
    name: string,
};

const AddSetModal: FC<{ hideModal: () => void, onSuccess: () => void }> = ({hideModal, onSuccess}) => {
    const {currentUser: {uid}} = useAuth()
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit: SubmitHandler<Inputs> = async ({name}) => {
        try {
            setError(false)
            setLoading(true)
            await SetService.create(name, uid)
            onSuccess()
            hideModal()
        } catch {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <ModalBox>
                {loading ? <Loader/> :
                    <ModalForm onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader>
                            <h3>Dodawanie zbioru</h3>
                            <StyledCloseIcon fontSize={'inherit'} onClick={hideModal}/>
                        </ModalHeader>
                        <InputsWrapper>
                            <Input
                                label="Nazwa"
                                {...register("name", {required: true})}
                                hasError={errors.name}
                                placeholder='Wprowadź nazwę zbioru...'
                            />
                            <AuthFailedError visible={error}>Nie udało się dodać zbioru</AuthFailedError>
                        </InputsWrapper>
                        <ButtonsWrapper>
                            <Button marginRight={'1.5rem'} type={'submit'}>Zapisz</Button>
                            <Button onClick={hideModal} outline>Anuluj</Button>
                        </ButtonsWrapper>
                    </ModalForm>
                }
            </ModalBox>
            <ModalBackground/>
        </>
    );
};

export default AddSetModal;
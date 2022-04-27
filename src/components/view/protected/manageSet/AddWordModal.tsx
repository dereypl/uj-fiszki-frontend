import React, {FC, useState} from 'react';
import Button from "../../../shared/Button";
import {AuthFailedError, InputsWrapper} from "../../public/public.styles";
import Input from "../../../shared/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {
    ButtonsWrapper,
    ModalBackground,
    ModalBox,
    ModalForm,
    ModalHeader,
    StyledCloseIcon
} from "./AddWordModal.styles";
import {useParams} from "react-router-dom";
import WordService from "../../../../database/WordService";
import Loader from "../../../shared/Loader";

type Inputs = {
    word: string,
    definition: string,
};

const AddWordModal: FC<{ hideModal: () => void, onSuccess: () => void }> = ({hideModal, onSuccess}) => {
        const {id} = useParams<{ id: string }>();
        const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();

        const [error, setError] = useState(false)
        const [loading, setLoading] = useState(false)

        const onSubmit: SubmitHandler<Inputs> = async ({word, definition}) => {
            try {
                setError(false)
                setLoading(true)
                await WordService.create(word, definition, id as string)
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
                <ModalBox height={'40rem'}>
                    {loading ? <Loader/> :
                        <ModalForm onSubmit={handleSubmit(onSubmit)}>
                            <ModalHeader>
                                <h3>Dodawanie pojęcia</h3>
                                <StyledCloseIcon fontSize={'inherit'} onClick={hideModal}/>
                            </ModalHeader>
                            <InputsWrapper>
                                <Input
                                    label="Pojęcie"
                                    {...register("word", {required: true})}
                                    hasError={errors.word}
                                    placeholder='Wprowadź pojęcie...'
                                />
                                <Input
                                    label="Definicja"
                                    {...register("definition", {required: true})}
                                    hasError={errors.definition}
                                    placeholder='Wprowadź definicję...'
                                />
                                <AuthFailedError visible={error}>Nie udało się dodać pojęcia</AuthFailedError>
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
    }
;

export default AddWordModal;
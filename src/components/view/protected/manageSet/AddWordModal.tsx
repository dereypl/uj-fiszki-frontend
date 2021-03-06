import React, {FC, useEffect, useState} from 'react';
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
import {TWord} from "../../../../database/DataTypes";

type Inputs = {
    word: string,
    definition: string,
};

type TProps = {
    hideModal: () => void;
    onSuccess: () => void;
    currentlyEditedWordId: string | null;
}

const AddWordModal: FC<TProps> = ({hideModal, onSuccess, currentlyEditedWordId}) => {
        const {id} = useParams<{ id: string }>();
        const {register, handleSubmit, formState: {errors}, setValue} = useForm<Inputs>();

        const editMode = currentlyEditedWordId !== 'new';

        const [error, setError] = useState(false)
        const [loading, setLoading] = useState(false)

        const onSubmit: SubmitHandler<Inputs> = async ({word, definition}) => {
            try {
                setError(false)
                setLoading(true)

                if (editMode) {
                    await WordService.update(word, definition, currentlyEditedWordId as string)
                } else {
                    await WordService.create(word, definition, id as string)
                }
                onSuccess()
                hideModal()
            } catch {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        const loadData = async () => {
            setLoading(true)
            const {word, definition} = await WordService.getOne(currentlyEditedWordId as string) as TWord;
            setValue("word", word)
            setValue("definition", definition)
            setLoading(false)
        }

        useEffect(() => {
            if (editMode) loadData()
        }, [])

        return (
            <>
                <ModalBox height={'40rem'}>
                    {loading ? <Loader/> :
                        <ModalForm onSubmit={handleSubmit(onSubmit)}>
                            <ModalHeader>
                                <h3>{editMode ? 'Edycja poj??cia ' : 'Dodawanie poj??cia'}</h3>
                                <StyledCloseIcon fontSize={'inherit'} onClick={hideModal}/>
                            </ModalHeader>
                            <InputsWrapper>
                                <Input
                                    label="Poj??cie"
                                    {...register("word", {required: true})}
                                    hasError={errors.word}
                                    placeholder='Wprowad?? poj??cie...'
                                />
                                <Input
                                    label="Definicja"
                                    {...register("definition", {required: true})}
                                    hasError={errors.definition}
                                    placeholder='Wprowad?? definicj??...'
                                />
                                <AuthFailedError visible={error}>Nie uda??o si?? doda?? poj??cia</AuthFailedError>
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
import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DataContext } from "./../context/DataContext";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Alert from '@mui/material/Alert';
import './../styles/Form.scss';

const schema = yup.object({
    firstName: yup.string(),
    username: yup.string(),
    email: yup.string(),
    phone: yup.number().positive().integer(),
    web: yup.string()
}).required();

const EditForm = () => {
    const { UpdateData, dataSelected } = useContext(DataContext);
    const [isCreatedUser, setIsCreatedUser] = useState(false);
    const [isErrorCreatedUser, setErrorIsCreatedUser] = useState(false);

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = async (data) => {

        const newUser = {
            id: data.id ?? dataSelected.id,
            name: data.firstName ?? dataSelected.firstName,
            username: data.username ?? dataSelected.username,
            email: data.email ?? dataSelected.email,
            address: {},
            phone: data.phone ?? dataSelected.phone,
            website: data.web ?? dataSelected.web,
            company: {}
        }
        await UpdateData(newUser)
            .then(() => {
                console.log(`Se edito usuario ${newUser.id}`);
                setIsCreatedUser(true);
                const interval = setTimeout(() => {
                  setIsCreatedUser(false);
          
                }, 1000);
                return () => clearInterval(interval);
                reset();
            })
            .catch((error) => {
                console.log(`No se edito ${newUser.id}`, error);
                setIsCreatedUser(false);
                setErrorIsCreatedUser(true);
                const interval = setTimeout(() => {
                  setErrorIsCreatedUser(false);
          
                }, 1000);
                return () => clearInterval(interval);
            })

    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="Form-update">

                <Controller
                    name="firstName"
                    control={control}
                    className="materialUIInput"
                    render={({ field }) =>
                        <>
                            <TextField
                                {...field}
                                label="Nombre"
                                color="secondary"
                                defaultValue={dataSelected.firstName} className="Form-update__item "
                            />
                            <span className="Form__error">{errors.firstName?.message}</span>

                        </>
                    }


                />

                <Controller
                    render={({ field }) =>
                        <>
                            <TextField {...field} color="secondary" defaultValue={dataSelected.username} className="Form-update__item " />
                            <span className="Form__error">{errors.username?.message}</span>

                        </>
                    }
                    name="username"
                    control={control}
                    className="materialUIInput"
                />


                <Controller
                    render={({ field }) =>
                        <>
                            <TextField {...field} label="Email" type="email" defaultValue={dataSelected.email} className="Form-update__item " />
                            <span className="Form__error">{errors.email?.message}</span>

                        </>

                    }
                    name="email"
                    control={control}
                    className="materialUIInput"
                />

                <Controller
                    render={({ field }) =>
                        <>
                            <TextField {...field} label="Teléfono" type="number"
                                color="secondary" defaultValue={dataSelected.phone} className="Form-update__item " />
                            <span className="Form__error">{errors.phone?.message}</span>

                        </>

                    }
                    name="phone"
                    control={control}
                    className="materialUIInput"
                />

                <Controller
                    render={({ field }) =>
                        <>
                            <TextField {...field} label="Web"
                                color="secondary" defaultValue={dataSelected.website} className="Form-update__item " />
                            <span className="Form__error">{errors.web?.message}</span>

                        </>

                    }
                    name="web"
                    control={control}
                    className="materialUIInput"
                />

                <Button type="submit" variant="contained" size="large" color="secondary" endIcon={<SendIcon />}>Actualizar</Button>
            </form>
            {
                isCreatedUser &&
                <Alert severity="success">Se actualizo el usuario exitosamente</Alert>
            }
            {
                isErrorCreatedUser &&
                <Alert severity="error">Hubo un error al actualizar el usuario</Alert>

            }
        </>
    );
}

export default EditForm;

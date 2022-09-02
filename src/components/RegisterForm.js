import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import uuid from 'react-uuid';
import { DataContext } from "./../context/DataContext";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import './../styles/Form.scss';

const schema = yup.object({
  firstName: yup.string().required(),
  username: yup.string().required(),
  email:yup.string().required(),
  phone: yup.number().positive().integer().required(),
  web: yup.string().required()
}).required();

const RegisterForm = () => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
	const { CreateData, dataSelected } = useContext(DataContext);
  const [ isCreatedUser, setIsCreatedUser ] = useState(false);
  const [ isErrorCreatedUser, setErrorIsCreatedUser ] = useState(false);

  const onSubmit = async (data) => {

    const newUser = {
      id: uuid(),
      name: data.firstName,
      username: data.username,
      email: data.email,
      address: {},
      phone: data.phone,
      website: data.web,
      company: {}
    }
    await CreateData(newUser)
    .then(() => {
      console.log(`Se creo nuevo usuario ${newUser.id}`);
      setIsCreatedUser(true);
      const interval = setTimeout(() => {
        setIsCreatedUser(false);

      }, 1000);
      return () => clearInterval(interval);
      reset();
    })
    .catch((error) => {
      console.log(`No se actualizo ${newUser.id}`, error);
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
        <form onSubmit={handleSubmit(onSubmit)} className="Form">
          {/* <label htmlFor="firstName">Name: </label> */}
    
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
                  className="Form__item "
              />
            <span className="Form__error">{errors.firstName?.message}</span>

            </>
          }
    
    
          />
    
          <Controller
    
            render={({ field }) => 
            <>
              <TextField {...field}                 label="Usuario"
            color="secondary"  className="Form__item "/>
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

            <TextField {...field} label="Email" type="email"
            color="secondary" className="Form__item "/>

            </>
          }
            name="email"
            control={control}
            defaultValue=""
            className="materialUIInput "
          />
    
          <Controller
            render={({ field }) =>
            <>
            <TextField {...field}  label="Teléfono" type="number"
            color="secondary"  className="Form__item "/>
            <span className="Form__error">{errors.phone?.message}</span>

            </>

          }
            name="phone"
            control={control}
            defaultValue=""
            className="materialUIInput"
          />
    
          <Controller
            render={({ field }) => 
            <>

            <TextField {...field} label="Web"
            color="secondary"  className="Form__item "/>
            <span className="Form__error">{errors.phone?.message}</span>

            </>
          }
            name="web"
            control={control}
            defaultValue=""
            className="materialUIInput"
          />
    
          <Button type="submit" variant="contained" size="large" color="secondary" endIcon={<SendIcon />}>Enviar</Button>
        </form>
        {
          isCreatedUser &&
          <Alert severity="success">Se creo el usuario exitosamente</Alert>
        }
        {
          isErrorCreatedUser &&
          <Alert severity="error">Hubo un error al crear el usuario</Alert>

        }

    </>
  );
}

export default RegisterForm;

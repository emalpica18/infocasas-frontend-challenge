import React, { useContext, useState, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';

import EditForm from './EditForm';
import { DataContext } from "./../context/DataContext";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #9c27b0',
  boxShadow: 24,
  p: 6,
};

const ListTable = () => {

	const { list, DeleteData, SelectData } = useContext(DataContext);
	const [data, setData] = useState('');
	const [dataRows, setDataRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ isDeleteUser, setIsDeleteUser ] = useState(false);
  const [ isErrorDeleteUser, setErrorIsDeleteUser ] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'Nombre', width: 130 },
        { field: 'username', headerName: 'Usuario', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'phone', headerName: 'Telefono',  type: 'number', width: 110, editable: true,},
        { field: 'website', headerName: 'Web', width: 130 },
        {
          headerName: 'Accion',
          field: 'actions',
          type: 'actions',
          getActions: (params) => [
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => deleteUser(params.id)}
            />,
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              onClick={() => selectData(params)}
            />
          ]
        }
    ];

    useEffect(() => {
      setData(list);
    }, [list]);

    useEffect(() => {
        if(data != null && data.length>0){
            let rows = data.map(item => (
                {
                    id: item.id, 
                    firstName: item.name,
                    username: item.username,
                    email: item.email,
                    phone: item.phone, 
                    website: item.website
                }
            ));
            console.log('rows',rows)
              setDataRows(rows);
        }
    }, [data]);

    const deleteUser = async (id) => {
      await DeleteData(id)
      .then(() => {
        console.log(`Se elimino usuario ${id}`);
        setIsDeleteUser(true);
        const interval = setTimeout(() => {
          setIsDeleteUser(false);
  
        }, 1000);
        return () => clearInterval(interval);
      })
      .catch((error) => {
        console.log(`No se elimino ${id}`, error);
        setIsDeleteUser(false);
        setErrorIsDeleteUser(true);
        const interval = setTimeout(() => {
          setErrorIsDeleteUser(false);
  
        }, 1000);
        return () => clearInterval(interval);
      })
    }

    const selectData = (data) => {
      SelectData(data.row);
      handleOpen();
    }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={dataRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={(newSelectionModel) => {
          console.log('newSelectionModel',newSelectionModel)
          // setSelectionModel(newSelectionModel);
        }}
        // selectionModel={selectionModel}
        loading={loading}
      />
        {
          isDeleteUser &&
          <Alert severity="success">Se eliminó usuario exitosamente</Alert>
        }
        {
          isErrorDeleteUser &&
          <Alert severity="error">Hubo un error al eliminar el usuario</Alert>

        }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="sm" sx={style}>
          <EditForm/>
        </Container>
      </Modal>
    </div>
  );
}

export default ListTable;

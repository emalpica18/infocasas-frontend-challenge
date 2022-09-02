import React, { useEffect, useState, createContext } from "react";

export const DataContext = createContext();

export default  ({ children }) => {

	const [list, setList] = useState([]);
	const [dataSelected, setSelectData] = useState([]);

    useEffect(() => {
        loadData();
	}, []);

    const loadData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            });
            await response.json().then(res => {
                setList(res);
            });
        } catch (e) {
            console.log('error:', e);
        }
    }

    const CreateData = async (data) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
            });
            await response.json().then(res => {
                setList([...list, data]);
                // console.log('CreateData dataEvent:', list);
            });
            } catch (e) {
            console.log('error:', e);
        }
    }

 	const UpdateData = async (data) => {
         try {
            console.log('newList data', data);

             const response = await fetch(`https://jsonplaceholder.typicode.com/users/${data.id}`, {
             method: 'PUT',
             headers: { 'Content-Type': 'application/json' }
             });
             await response.json().then(res => {
                if(res != undefined){
                    let newList = list.map(item => item.id == data.id ? data : item);
                    setList(newList);
                }
             });
             } catch (e) {
             console.log('error:', e);
         }
    }

    const DeleteData = async (data) => {
        try {
             const response = await fetch(`https://jsonplaceholder.typicode.com/users/${data.id}`, {
             method: 'DELETE'
             });
              let newList = list.filter(item => item.id != data);
              setList(newList);
        } catch (e) {
             console.log('error:', e);
        }
    }

    const SelectData = async (data) => {
        setSelectData(data);
    }

    return (
        <DataContext.Provider 
            value={{ list, CreateData, UpdateData, DeleteData, SelectData, dataSelected }}
        >
            {children}
        </DataContext.Provider>
    );
};
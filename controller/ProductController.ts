import {responseApiProductos} from '../models/ResponseApi';
//Obtener todos los productos
export const getData = async () => {
    const res = await fetch('http://localhost:5086/api/Products')
    const data: responseApiProductos= await res.json()
    return data;
}

//Obtener un producto por id
export const getDataById = async (id: number) => {
    const res = await fetch(`http://localhost:5086/api/Products/${id}`)
    const data : responseApiProductos = await res.json()
    return data;
}

//Crear un producto
export const postData = async (product: responseApiProductos) => {
    const res = await fetch('http://localhost:5086/api/Products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
  
}

//Actualizar un producto

export const putData = async (id: number, product: responseApiProductos) => {
    
    console.log(product, id) 
    const res = await fetch(`http://localhost:5086/api/Products?id=${id}`, {
       
    method: 'PUT',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//Eliminar un producto

export const deleteData = async (id: number) => {
    try{
        const res = await fetch(`http://localhost:5086/api/Products/${id}`, {
            method: 'DELETE'
        })
    }
   
    catch(e){
        console.log(e)
    }
    
}
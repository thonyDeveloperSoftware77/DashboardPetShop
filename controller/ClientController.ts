import {responseApiClientes} from '../models/ResponseApi';
//Obtener todos los productos
export const getData = async () => {
    const res = await fetch('http://localhost:5086/api/v1/PetShop')
    const data: responseApiClientes= await res.json()
    return data;
}

//Obtener un producto por id
export const getDataById = async (id: number) => {
    const res = await fetch(`http://localhost:5086/api/v1/PetShop/${id}`)
    const data : responseApiClientes = await res.json()
    return data;
}

//Crear un producto
export const postData = async (product: responseApiClientes) => {
    const res = await fetch('http://localhost:5086/api/v1/PetShop', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
  
}

//Actualizar un producto

export const putData = async (id: number, product: responseApiClientes) => {
    
    console.log(product, id) 
    const res = await fetch(`http://localhost:5086/api/v1/PetShop?id=${id}`, {
       
    method: 'PUT',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//Eliminar un producto
export const deleteData = async (id: number) => {
    const res = await fetch(`http://localhost:5086/api/v1/PetShop/${id}`, {
        method: 'DELETE'
    })
    if (res.ok && res.status >= 200 && res.status < 300) {
        const data = await res.json()
    } else {
        // handle error
    }
}
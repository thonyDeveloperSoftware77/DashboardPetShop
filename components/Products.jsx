import React, { useEffect, useState } from "react";
import EditProduct from "./EditProduct";
import { getData, postData, deleteData } from "../controller/ProductController"
export default function Products({ }) {

    const [data, setData] = useState([]);
    const [change, setChange] = useState(true);
    useEffect(() => {
        getData().then((res) => {
            setData(res);
        });
    }, [change]);

    const [productToEdit, setProductToEdit] = useState(null);
    const [newProduct, setNewProduct] = useState({
        nombre: "",
        escripcion: "",
        precio: "",
        category: "",
    });
    const handleAdd = async (newProduct) => {
        try {
            await postData(newProduct);
            setChange(!change);
        } catch (error) {
            console.error(error);
        }
    };


    const handleChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAdd(newProduct);
    };

    const handleDelete = async (id) => {
        try {
            await deleteData(id);
            setChange(!change);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (product) => {
        setProductToEdit(product);
    };

    const handleSave = () => {
        setChange(!change);
    };

    const handleCancel = () => {
        setProductToEdit(null);
    };

    return (
        <>
            <div className="boxComponent">
                <center > <h1>Productos</h1> </center>
                <div style={{ width: "85%", margin: "2%", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "center" }}>
                    <div><h2 >Añadir un nuevo producto</h2></div>
                    <div></div>
        
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="nombre"
                            value={newProduct.nombre}
                            onChange={handleChange}
                            placeholder="Nombre"
                        />
                        <input
                            type="text"
                            name="precio"
                            value={newProduct.precio}
                            onChange={handleChange}
                            placeholder="Precio"
                        />
                        <input
                            type="text"
                            name="escripcion"
                            value={newProduct.escripcion}
                            onChange={handleChange}
                            placeholder="Descripción"
                        />
                        //crea un select para elegir la categoria
                        <select name="category" onChange={handleChange}>
                            <option value="1">Perros</option>
                            <option value="2">Gatos</option>
                            <option value="3">Aves</option>
                            <option value="4">Hamnsters</option>
                            <option value="5">Peces</option>
                        </select>
                        
                        
                        <button type="submit">Añadir</button>
                    </form>
                </div>
                <hr />

                <table className="products">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nombre}</td>
                                <td>{item.escripcion}</td>
                                <td>${item.precio}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleEdit(item)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {productToEdit && (
                    <EditProduct product={productToEdit} onEdit={handleSave} onCancel={handleCancel} />
                )}
            </div>
        </>
    );
}

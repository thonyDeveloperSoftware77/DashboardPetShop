import React, { useEffect, useState } from "react";
import EditProduct from "./EditProduct";
import { getData, postData, deleteData } from "../controller/ClientController"
export default function Clients({ }) {

    const [data, setData] = useState([]);
    const [change, setChange] = useState(true);
    useEffect(() => {
        getData().then((res) => {
            setData(res);
        });
    }, [change]);

    const [productToEdit, setProductToEdit] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: "",
        email: "",
        phoneNumber: "",
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
            <h2>Añadir un nuevo cliente</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                />

                <input
                    type="text"
                    name="email"
                    value={newProduct.email}
                    onChange={handleChange}
                    placeholder="Precio"
                />
                <input
                    type="text"
                    name="phoneNumber"
                    value={newProduct.phoneNumber}
                    onChange={handleChange}
                    placeholder="Descripción"
                />
                <button type="submit">Añadir</button>
            </form>
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
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber}</td>
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


        </>
    );
}

import React, { useEffect, useState } from "react";
import { getData, postData, deleteData } from "../controller/ClientController"
import EditClient from "../components/EditClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Clients({ }) {
    const [data, setData] = useState([]);
    const [change, setChange] = useState(true);
    const notify = () => toast("Wow so easy!");
    const notifyAdd = () => toast("Cliente añadido!");
    const notifyDelete = () => toast("Cliente eliminado!");
    const notifyError = () => toast("Error!");


    useEffect(() => {
        getData().then((res) => {
            setData(res);
        });
    }, [change]);

    const [clientToEdit, setClientToEdit] = useState(null);
    const [newClient, setNewClient] = useState({
        name: "",
        email: "",
        phoneNumber: "",
    });

    const handleAdd = async (newClient) => {
        try {
            await postData(newClient);
            setChange(!change);
            notifyAdd();
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setNewClient({
            ...newClient,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAdd(newClient);
    };


    const handleDelete = async (id) => {
        try {
            await deleteData(id);
            setChange(!change);
            notifyDelete();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (client) => {
        setClientToEdit(client);
    };

    const handleSave = () => {
        setChange(!change);
    };

    const handleCancel = () => {
        setClientToEdit(null);
    };

    return (
        <>
            <div className="boxComponent">
                <center><h1>Clientes</h1></center>

                <div>

                    <ToastContainer />
                </div>

                <div style={{ width:"85%",margin:"2%", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "center" }}>
                    <div>
                        <h3  >Añadir un nuevo cliente</h3>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                value={newClient.name}
                                onChange={handleChange}
                                placeholder="Nombre"
                            />

                            <input
                                type="text"
                                name="email"
                                value={newClient.email}
                                onChange={handleChange}
                                placeholder="email"
                            />

                            <input
                                type="text"
                                name="phoneNumber"
                                value={newClient.phoneNumber}
                                onChange={handleChange}
                                placeholder="celular"
                            />
                            <button type="submit">Añadir</button>
                        </form>
                    </div>


                </div>
                <hr />

                <table className="products">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Teléfono</th>
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
                {clientToEdit && (
                    <EditClient client={clientToEdit} onEdit={handleSave} onCancel={handleCancel} />
                )}
            </div>
        </>
    );
}

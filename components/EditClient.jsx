import React, { useState } from "react";
import { putData } from "../controller/ClientController"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditClient = ({ client, onEdit }) => {

  const [editClient, setEditedProduct] = useState(client);
 const notifyEdit = () => toast("Cliente editado!");

  const handleEdit = (e) => {
    e.preventDefault();
    putData(editClient.id, editClient).then((res) => {
      onEdit(res);
    });
    notifyEdit();
  };

  const handleChange = (e) => {
    setEditedProduct({
      ...editClient,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleEdit}>
      <div>
        <ToastContainer />
      </div>
      <h3>Editar Producto</h3>
      <input type="text" name="name" value={editClient.name} onChange={handleChange} />
      <input type="text" name="email" value={editClient.email} onChange={handleChange} />
      <input type="text" name="phoneNumber" value={editClient.phoneNumber} onChange={handleChange} />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default EditClient;

import React, { useState } from "react";
import {putData} from "../controller/ProductController"
import {responseApiProductos} from '../models/ResponseApi';

const EditProduct = ({ product, onEdit }) => {
  const [editedProduct, setEditedProduct] = useState(product );

  const handleEdit = (e) => {
    e.preventDefault();
    putData(editedProduct.id ,editedProduct).then((res) => {
      onEdit(res);
    }
    );

  };

  const handleChange = (e) => {
    setEditedProduct({
      ...editedProduct,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleEdit}>
      <h3>Editar Producto</h3>
      <input type="text" name="nombre" value={editedProduct.nombre} onChange={handleChange} />
      <input type="text" name="escripcion" value={editedProduct.escripcion} onChange={handleChange} />
      <input type="text" name="precio" value={editedProduct.precio} onChange={handleChange} />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default EditProduct;

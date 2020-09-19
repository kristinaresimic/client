import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://localhost:5000/api/products/";
const AddProductForm = ({ updateProducts, selectedProduct }) => {
  const [name, setName] = useState();
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [productId, setProductId] = useState();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (Object.keys(selectedProduct).length > 0) {
      setName(selectedProduct.naziv);
      setPrice(selectedProduct.cena);
      setUnit(selectedProduct.jedinicaMere);
      setProductId(selectedProduct._id);
      setIsUpdating(true);
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !price || !unit) return;
    axios
      .post(`${baseUrl}createProduct`, {
        naziv: name,
        cena: price,
        jedinicaMere: unit,
      })
      .then((res) => updateProducts())
      .catch((err) => console.log(err));
  };
  const updateHandler = (e) => {
    e.preventDefault();
    if (!name || !price || !unit) return;
    axios
      .patch(`${baseUrl}updateProduct/${productId}`, {
        naziv: name,
        cena: price,
        jedinicaMere: unit,
      })
      .then((res) => updateProducts())
      .catch((err) => console.log(err));
  };
  return (
    <form className='addMarket' onSubmit={isUpdating ? updateHandler : submitHandler}>
      <div className='inputGroup'>
        <label htmlFor='name'>Naziv</label>
        <input
          type='text'
          name='name'
          placeholder='Naziv'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='inputGroup'>
        <label htmlFor='price'>Cena u dinarima</label>
        <input
          type='text'
          name='price'
          placeholder='Cena'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className='inputGroup'>
        <label htmlFor='unit'>Jedinica mere</label>
        <input
          type='text'
          name='unit'
          placeholder='Jedinica Mere'
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
      </div>

      <input type='submit' value={isUpdating ? "Azuriraj" : "Dodaj"} className='addMarketBtn' />
    </form>
  );
};

export default AddProductForm;

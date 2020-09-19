import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://localhost:5000/api/suppliers/";
const AddSuppliersForm = ({ updateSuppliers, selectedSupplier }) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [supplierId, setSupplierId] = useState();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (Object.keys(selectedSupplier).length > 0) {
      setName(selectedSupplier.naziv);
      setCity(selectedSupplier.mesto);
      setAddress(selectedSupplier.adresa);
      setSupplierId(selectedSupplier._id);
      setIsUpdating(true);
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name, city, address);
    if (!name || !city || !address) return;
    axios
      .post(`${baseUrl}createSupplier`, {
        naziv: name,
        mesto: city,
        adresa: address,
      })
      .then((res) => updateSuppliers())
      .catch((err) => console.log(err));
  };
  const updateHandler = (e) => {
    e.preventDefault();
    if (!name || !city || !address) return;
    axios
      .patch(`${baseUrl}updateSupplier/${supplierId}`, {
        naziv: name,
        mesto: city,
        adresa: address,
      })
      .then((res) => updateSuppliers())
      .catch((err) => console.log(err));
  };
  return (
    <form className='addMarket' onSubmit={isUpdating ? updateHandler : submitHandler}>
      <div className='inputGroup'>
        <label htmlFor='name'>Naziv dobavljaca</label>
        <input
          type='text'
          name='name'
          placeholder='Naziv dobavljaca'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='inputGroup'>
        <label htmlFor='grad'>Grad</label>
        <input
          type='text'
          name='grad'
          placeholder='Grad'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className='inputGroup'>
        <label htmlFor='adresa'>Adresa</label>
        <input
          type='text'
          name='adresa'
          placeholder='Adresa'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <input type='submit' value={isUpdating ? "Azuriraj" : "Dodaj"} className='addMarketBtn' />
    </form>
  );
};

export default AddSuppliersForm;

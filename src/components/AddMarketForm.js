import React, { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://localhost:5000/api/markets/";
const AddMarketForm = ({ updateMarkets, selectedMarket }) => {
  const [name, setName] = useState();
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [marketId, setMarketId] = useState();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (Object.keys(selectedMarket).length > 0) {
      setName(selectedMarket.naziv);
      setCity(selectedMarket.grad);
      setAddress(selectedMarket.adresa);
      setMarketId(selectedMarket._id);
      setIsUpdating(true);
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !city || !address) return;
    axios
      .post(`${baseUrl}createMarket`, {
        naziv: name,
        grad: city,
        adresa: address,
      })
      .then((res) => updateMarkets())
      .catch((err) => console.log(err));
  };
  const updateHandler = (e) => {
    e.preventDefault();
    if (!name || !city || !address) return;
    axios
      .patch(`${baseUrl}updateMarket/${marketId}`, {
        naziv: name,
        grad: city,
        adresa: address,
      })
      .then((res) => updateMarkets())
      .catch((err) => console.log(err));
  };
  return (
    <form className='addMarket' onSubmit={isUpdating ? updateHandler : submitHandler}>
      <div className='inputGroup'>
        <label htmlFor='name'>Ime Lokala</label>
        <input
          type='text'
          name='name'
          placeholder='Ime marketa'
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

export default AddMarketForm;

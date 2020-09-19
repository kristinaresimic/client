import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineUnorderedList, AiOutlineCloseCircle } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import axios from "axios";
import PopupForm from "./PopupForm";
import AddMarketForm from "./AddMarketForm";
const baseUrl = "http://localhost:5000/api/markets/";
const Markets = () => {
  const [markets, setMarkets] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [selectedMarket, setSelectedMarket] = useState({});
  const getMarkets = () => {
    axios
      .get(`${baseUrl}getMarkets`)
      .then((res) => {
        setMarkets(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getMarkets();
  }, []);
  const handlerDelete = (id) => {
    axios
      .delete(`${baseUrl}deleteMarket/${id}`)
      .then((res) => getMarkets())
      .catch((err) => console.log(err));
  };
  const openFormHandler = () => {
    setSelectedMarket({});
    setIsFormOpen((c) => !c);
  };
  const addNewHandler = () => {
    getMarkets();
    setIsFormOpen(false);
  };
  let form = (
    <PopupForm>
      <AddMarketForm updateMarkets={addNewHandler} selectedMarket={selectedMarket} />
    </PopupForm>
  );

  return markets ? (
    <div className='rightContent'>
      <div className='add'>
        {isFormOpen && form}
        <div onClick={openFormHandler}>
          {isFormOpen ? <AiOutlineCloseCircle size={25} /> : <GrAddCircle size={25} />}
        </div>
      </div>
      {markets.map((market) => (
        <div className='market' key={market._id}>
          <div className='data'>
            <div>{market.naziv}</div>
            <div>{market.grad}</div>
            <div>{market.adresa}</div>
          </div>
          <div className='actions'>
            <div className='edit'>
              <BiEdit
                size={22}
                onClick={() => {
                  openFormHandler();
                  setSelectedMarket(market);
                }}
              />
            </div>
            <div className='delete' onClick={() => handlerDelete(market._id)}>
              <RiDeleteBin5Line size={22} />
            </div>
            <div className='all'>
              <AiOutlineUnorderedList size={22} />
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>Nema nista</div>
  );
};

export default Markets;

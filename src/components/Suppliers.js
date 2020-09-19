import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineUnorderedList, AiOutlineCloseCircle } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import axios from "axios";
import PopupForm from "./PopupForm";
import AddPro from "./AddMarketForm";
import AddProductForm from "./AddProductForm";
import AddMarketForm from "./AddMarketForm";
import AddSuppliersForm from "./AddSupplierForm";

const baseUrl = "http://localhost:5000/api/suppliers/";
const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [selectedSupplier, setSelectedSuplier] = useState({});
  const getSuppliers = () => {
    axios
      .get(`${baseUrl}getSuppliers`)
      .then((res) => {
        setSuppliers(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getSuppliers();
  }, []);
  const handlerDelete = (id) => {
    axios
      .delete(`${baseUrl}deleteSupplier/${id}`)
      .then((res) => getSuppliers())
      .catch((err) => console.log(err));
  };
  const openFormHandler = () => {
    setSelectedSuplier({});
    setIsFormOpen((c) => !c);
  };
  const addNewHandler = () => {
    getSuppliers();
    setIsFormOpen(false);
  };
  let form = (
    <PopupForm>
      <AddSuppliersForm updateSuppliers={addNewHandler} selectedSupplier={selectedSupplier} />
    </PopupForm>
  );

  return suppliers ? (
    <div className='rightContent'>
      <div className='add'>
        {isFormOpen && form}
        <div onClick={openFormHandler}>
          {isFormOpen ? <AiOutlineCloseCircle size={25} /> : <GrAddCircle size={25} />}
        </div>
      </div>
      {suppliers.map((supplier) => (
        <div className='market' key={supplier._id}>
          <div className='data'>
            <div>{supplier.naziv}</div>
            <div>{supplier.mesto}</div>
            <div>{supplier.adresa}</div>
          </div>
          <div className='actions'>
            <div className='edit'>
              <BiEdit
                size={22}
                onClick={() => {
                  openFormHandler();
                  setSelectedSuplier(supplier);
                }}
              />
            </div>
            <div className='delete' onClick={() => handlerDelete(supplier._id)}>
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

export default Suppliers;

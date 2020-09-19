import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineUnorderedList, AiOutlineCloseCircle } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import axios from "axios";
import PopupForm from "./PopupForm";
import AddPro from "./AddMarketForm";
import AddProductForm from "./AddProductForm";

const baseUrl = "http://localhost:5000/api/products/";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState({});
  const getProducts = () => {
    axios
      .get(`${baseUrl}getProducts`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getProducts();
  }, []);
  const handlerDelete = (id) => {
    axios
      .delete(`${baseUrl}deleteProduct/${id}`)
      .then((res) => getProducts())
      .catch((err) => console.log(err));
  };
  const openFormHandler = () => {
    setSelectedProduct({});
    setIsFormOpen((c) => !c);
  };
  const addNewHandler = () => {
    getProducts();
    setIsFormOpen(false);
  };
  let form = (
    <PopupForm>
      <AddProductForm updateProducts={addNewHandler} selectedProduct={selectedProduct} />
    </PopupForm>
  );

  return products ? (
    <div className='rightContent'>
      <div className='add'>
        {isFormOpen && form}
        <div onClick={openFormHandler}>
          {isFormOpen ? <AiOutlineCloseCircle size={25} /> : <GrAddCircle size={25} />}
        </div>
      </div>
      {products.map((product) => (
        <div className='market' key={product._id}>
          <div className='data'>
            <div>{product.naziv}</div>
            <div>
              {product.cena} <small>dinara</small>
            </div>
            <div>{product.jedinicaMere}</div>
          </div>
          <div className='actions'>
            <div className='edit'>
              <BiEdit
                size={22}
                onClick={() => {
                  openFormHandler();
                  setSelectedProduct(product);
                }}
              />
            </div>
            <div className='delete' onClick={() => handlerDelete(product._id)}>
              <RiDeleteBin5Line size={22} />
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>Nema nista</div>
  );
};

export default Products;

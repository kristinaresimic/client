import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import SideBar from "./components/SideBar";
import TableData from "./components/TableData";

function App() {
  const [activeItem, setActiveItem] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:5000/api/suppliers/getSuppliers").then((res) => console.log(res));
  }, []);
  return (
    <div className='app'>
      <div className='content'>
        <SideBar active={activeItem} setActiveItem={setActiveItem} />
        <TableData active={activeItem} />
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";

const SideBar = ({ active, setActiveItem }) => {
  return (
    <div className='sideBar'>
      <ul className='sideList'>
        <button className={`listItem ${active === 0 && "active"}`} onClick={() => setActiveItem(0)}>
          <li>Prodavnice</li>
        </button>
        <button className={`listItem ${active === 1 && "active"}`} onClick={() => setActiveItem(1)}>
          <li>Proizvodi</li>
        </button>
        <button className={`listItem ${active === 2 && "active"}`} onClick={() => setActiveItem(2)}>
          <li>Dobavljaci</li>
        </button>
      </ul>
    </div>
  );
};

export default SideBar;

import React from "react";
import Markets from "./Markets";
import Products from "./Products";
import Suppliers from "./Suppliers";

const TableData = ({ active }) => {
  let componentToDisplay = <Markets />;
  switch (active) {
    case 0:
      componentToDisplay = <Markets />;
      break;
    case 1:
      componentToDisplay = <Products />;
      break;
    case 2:
      componentToDisplay = <Suppliers />;
      break;
    default:
      componentToDisplay = <Markets />;
  }
  return <div className='dataContainer'>{componentToDisplay}</div>;
};

export default TableData;

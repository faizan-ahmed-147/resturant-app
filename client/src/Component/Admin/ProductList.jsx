import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../Home/MetaData/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";

import { deleteProduct, getAdminProduct } from "../../Actions/Product";


const ProductList = () => {
  const dispatch = useDispatch();
   
  const alert = useAlert();

  const { error, products } = useSelector(state => state.products);

  const { error: deleteError, message } = useSelector(
    state => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  
  };



  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const {id}  = params
        return (
          <Fragment>
        
            <Link to={`/admin/product/${id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(id)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  useEffect(() => {
    if (error) {
        alert.error(error)
        dispatch({ type: "CLEAR_ERROR" })
      }

      if (deleteError) {
        alert.error(deleteError)
        dispatch({ type: "CLEAR_ERROR" })
      }

    if (message) {
      alert.success(message);
      dispatch({ type: "CLEAR_MESSAGE" })
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError,  message]);
  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
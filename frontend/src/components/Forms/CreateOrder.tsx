import React, { useState } from "react";
import { API_URL } from "../../shared/constants";
import { useCommerceStore } from "../../store";

function CreateOrder() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderStatus, setOrderStatus] = useState("Pending");

  const { token } = useCommerceStore();

  const [orders, setOrders] = useState([]);

  async function handleSubmit() {
    const endpoint = API_URL + "/orders/create";

    const requestBody = {
      products: [
        {
          product: selectedProduct,
          quantity: parseInt(quantity),
        },
      ],
      status: orderStatus,
    };

    // type post
    // body: selectedProduct & quantity
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        // needed so that the backend knows that the request has JSON
        headers: {
          // 'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // check if responsehas status 200 first
      if (response.status === 200) {
        const content = await response.json();
        console.log(content);
        // @ts-ignore
        setOrders([...orders, content]);
        console.log(
          "\n working \nworking \nworking \nworking \nworking \nworking \n"
        );
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
    console.log("smthg working");
  }
  return (
    <>
      <form className="border bg-purple-700/80 h-80 rounded-lg w-72 p-5 items-center flex flex-col justify-around">
        <h2 className="text-xl font-bold">Create Order</h2>
        <label htmlFor="product">Select Product:</label>
        {products.map((product: any) => (
          <option key={product._id} value={product._id}>
            {product.name}
          </option>
        ))}
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <label htmlFor="status">Order Status: {orderStatus}</label>
        <button
          onClick={handleSubmit}
          className="border border-purple-900 bg-pink-500"
          type="button"
        >
          Create Order
        </button>
      </form>
    </>
  );
}

export default CreateOrder;

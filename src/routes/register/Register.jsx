import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authenticity from "../../hooks";
import "./Register.css";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [productInfo, setProductInfo] = useState({
    name: "",
    date: "",
    expiry: "",
    serial: 0,
    batch: 0,
    ingredients: "",
  });
  const setField = (key, value) =>
    setProductInfo({ ...productInfo, [key]: value });
  const navigate = useNavigate();

  return (
    <div className="whole">
      <form>
        <h1>Enter Information about the product below:</h1>
        <label>Name of Product:</label>
        <br />
        <input
          value={productInfo.name}
          onChange={(e) => {
            setField("name", e.target.value);
          }}
          type="text"
          placeholder="Name of Product"
        />
        <br />
        <br />
        <label>Manufacturing Date:</label>
        <br />
        <input
          value={productInfo.date}
          onChange={(e) => {
            setField("date", e.target.value);
          }}
          type="date"
          placeholder="Manufacturing Date"
        />
        <br />
        <br />
        <label>Expiry Date:</label>
        <br />
        <input
          value={productInfo.expiry}
          onChange={(e) => {
            setField("expiry", e.target.value);
          }}
          type="date"
          placeholder="Expiry Date"
        />
        <br />
        <br />
        <label>Serial Number:</label>
        <br />
        <input
          value={productInfo.serial}
          onChange={(e) => {
            (e.target.value === "" || !isNaN(parseInt(e.target.value))) &&
              setField("serial", e.target.value);
          }}
          type="text"
          placeholder="Serial Number"
        />
        <br />
        <br />
        <label>Batch Number:</label>
        <br />
        <input
          value={productInfo.batch}
          onChange={(e) => {
            (e.target.value === "" || !isNaN(parseInt(e.target.value))) &&
              setField("batch", e.target.value);
          }}
          type="text"
          placeholder="Batch Number"
        />
        <br />
        <br />
        <label>Drug Ingredients:</label>
        <br />
        <input
          value={productInfo.ingredients}
          onChange={(e) => {
            setField("ingredients", e.target.value);
          }}
          type="text"
          placeholder="Drug Ingredients"
        />
        <br />
        <br />

        <button
          onClick={async (e) => {
            e.preventDefault();
            const { contract } = await authenticity({ getRequest: false });
            console.log(productInfo);
            await contract.createProduct([
              productInfo.name,
              productInfo.date,
              productInfo.expiry,
              parseInt(productInfo.serial),
              parseInt(productInfo.batch),
              productInfo.ingredients,
            ]);
            setLoading(true)

            setTimeout(async () => {
              const productId = Number(await contract.productCount());
              navigate(`/products/${productId}`);
            }, 15000);
          }}

          disabled={loading}
        >
          {loading ? "SUBMITTING..." : "SUBMIT"}
        </button>
      </form>
    </div>
  );
}

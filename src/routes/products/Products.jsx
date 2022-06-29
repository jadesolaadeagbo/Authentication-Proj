import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import QRCode from "qrcode";
import { useNavigate, useParams } from "react-router-dom";
import authenticity from "../../hooks";

export default function Products(props) {
  const [productInfo, setProductInfo] = useState(null);
  const [src, setSrc] = useState(null);
  const params = useParams();
  useEffect(() => {
    const loadData = async () => {
      const { contract, address } = await authenticity({ getRequest: false });
      const product = await contract.getProduct(params.id);
      const productCreate = contract.filters.ProductCreate(address);
      console.log(productCreate);
      setProductInfo(product);
      QRCode.toDataURL(`address: ${address} | id: ${params.id}`).then(
        (data) => {
          setSrc(data);
        }
      );
    };
    loadData();
  }, [params.id]);

  return (
    <div>
      {productInfo && (
        <div>
          <ul>
            <li>Name of Product: {productInfo[0]}</li>
            <li>Manufacture: {productInfo[1]}</li>
            <li>Expiry: {productInfo[2]}</li>
            <li>Serial: {Number(productInfo[3])}</li>
            <li>Batch: {Number(productInfo[4])}</li>
            <li>Ingredients: {productInfo[5]}</li>
            <li>Owner: {productInfo[6]}</li>
          </ul>
          {src && <img src={src} />}
          <h6>Supply chain</h6>
        </div>
      )}
    </div>
  );
}

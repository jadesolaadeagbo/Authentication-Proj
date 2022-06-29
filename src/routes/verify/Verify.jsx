import jsQR from "jsqr";
import { useState } from "react";
// import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { QrReader } from "react-qr-reader";
import "./Verify.css";

const Verify = () => {
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const [data, setData] = useState("Not Found");
  const [products, setProducts] = useState([
    {
      id: "100",
      name: "Syrup",
      image:
        "https://images.pexels.com/photos/1275893/pexels-photo-1275893.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ]);
  const [currentProduct, setCurrentProduct] = useState([]);
  // jsQR()
  return (
    <div className="verify-page">
      <div className="container">
        <h1>Verify Product</h1>
        <div className="wrapper flex">
          <div className="scan">
            {/* <QrReader
                        onResult={(result, error) => {
                        if (!!result) {
                            setData(result?.text);
                            setCurrentProduct(products.filter(product => product.id === result?.text))
                            // console.log(result.text)
                        }

                        if (!!error) {
                            console.info(error);
                        }
                        }}
                        style={{ width: '100%'}}
                    /> */}
            <input
              type="file"
              onChange={async (e) => {
                if (e.target.files.length !== 0) {
                  console.log(e.target.files[0]);
                  const img = new Image();
                  img.src = await toBase64(e.target.files[0]);
                  img.onload = () => {
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0 );
                    var myData = context.getImageData(0, 0, img.width, img.height);
                    console.log(myData.data)
                    const code = jsQR(myData.data, img.width, img.height)
                    if (code) {
                        alert("Found QR code " + code.data);
                      }
                    // console.log(img);
                    // console.log(img.width);
                    // console.log(img.height);
                  };
                }
              }}
            />
            <h2>Value: {data}</h2>
          </div>

          <div className="product-info">
            <h2>Product details</h2>
            <div className="details">
              {currentProduct[0]?.id ? (
                <div className="detail-item flex">
                  <div>
                    <p>
                      <b>Product Id:</b> {currentProduct[0]?.id}
                    </p>
                    <p>
                      <b>Product name:</b> {currentProduct[0]?.name}
                    </p>
                  </div>
                  <div className="product-image">
                    <img src={currentProduct[0]?.image} alt="image" />
                  </div>
                </div>
              ) : (
                "No data yet"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;

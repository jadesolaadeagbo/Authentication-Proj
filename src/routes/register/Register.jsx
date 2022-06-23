import React from "react"
import authenticity from "../../hooks"
import './Register.css'


export default function Register() {
    return (
        <div className="whole">
            <form>
                <h1>Enter Information about the product below:</h1>
                <label>Name of Product:</label><br />
                <input type="text" placeholder="Name of Product" /><br /><br />
                <label>Manufacturing Date:</label><br />
                <input type="date" placeholder="Manufacturing Date" /><br /><br />
                <label>Expiry Date:</label><br />
                <input type="date" placeholder="Expiry Date" /><br /><br />
                <label>Serial Number:</label><br />
                <input type="text" placeholder="Serial Number" /><br /><br />
                <label>Batch Number:</label><br />
                <input type="text" placeholder="Batch Number" /><br /><br />
                <label>Drug Ingredients:</label><br />
                <input type="text" placeholder="Drug Ingredients" /><br /><br />

                <button onClick={async (e) => {
                    e.preventDefault();
                    const { contract } = await authenticity({ getRequest: false });
                    await contract.createProduct(
                        ["", "", "", 0, 0, ""]
                    )
                }}>SUBMIT</button>

            </form>

        </div>
    )
}
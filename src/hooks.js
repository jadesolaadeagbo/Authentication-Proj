import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Authenticity from "./contracts/Authenticity.json";

const authenticity = async ({ getRequest = true }) => {
  const address = "0xB8BE8567aEC5B20319922314CA033Dd8f2749f5D"; // Put contract address here
  if (getRequest) {
    const provider = new ethers.providers.JsonRpcProvider({
      url: "https://rinkeby.infura.io/v3/", // Put Correct url here
    });
    const contract = new ethers.Contract(
      address,
      Authenticity.abi,
      provider
    );
    return { address, contract };
  } else {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      address,
      Authenticity.abi,
      signer
    );
    return { address, contract };
  }
};

export default authenticity;
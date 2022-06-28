// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Authenticity {
    using Counters for Counters.Counter;

    Counters.Counter private _productIds;

    struct CompanyInfo {
        string companyName;
        string companyLocation;
    }

    struct ProductInfo {
        string nameOfProduct;
        string manufacturingDate;
        string expiryDate;
        uint256 serialNumber;
        uint256 batchNo;
        string ingredients;
        address currentOwner;
    }

    struct ProductInfoInput {
        string nameOfProduct;
        string manufacturingDate;
        string expiryDate;
        uint256 serialNumber;
        uint256 batchNo;
        string ingredients;
    }

    mapping(uint256 => ProductInfo) public products;
    mapping(address => CompanyInfo) public companies;

    //Declare an Event
    event ProductCreate(address indexed _creator, uint256 indexed _productId);
    event OwnershipTransfer(address indexed _from, address indexed _to, uint256 indexed _productId);


    function fillInfo(CompanyInfo memory _companyInfo) public {
        CompanyInfo storage newCompanyInfo = companies[msg.sender];
        newCompanyInfo.companyName = _companyInfo.companyName;
        newCompanyInfo.companyLocation = _companyInfo.companyLocation;
    }

    function createProduct(ProductInfoInput memory product) public returns (uint256 count){
        _productIds.increment();

        // Adding the product
        ProductInfo storage newProductInfo = products[_productIds.current()];
        newProductInfo.nameOfProduct = product.nameOfProduct;
        newProductInfo.manufacturingDate = product.manufacturingDate;
        newProductInfo.expiryDate = product.expiryDate;
        newProductInfo.serialNumber = product.serialNumber;
        newProductInfo.batchNo = product.batchNo;
        newProductInfo.ingredients = product.ingredients;
        newProductInfo.currentOwner = msg.sender;

        // Emit Info Fill
        emit ProductCreate(msg.sender, _productIds.current());

        return _productIds.current();
    }

    function getProduct(uint256 _productId) public view returns (ProductInfo memory _product){
        return products[_productId];
    }

    function getCompanyInfo(address _companyId) public view returns (CompanyInfo memory _company){
        return companies[_companyId];
    }

    function transferOwnership(address newOwner, uint256 productId) public {
        require(
            msg.sender == products[productId].currentOwner,
            "Only the owner can access this function"
        );
        products[productId].currentOwner = newOwner;
        emit OwnershipTransfer(msg.sender, newOwner, _productIds.current());
    }

    function productCount() public view returns (uint256 count) {
        return _productIds.current();
    }
}

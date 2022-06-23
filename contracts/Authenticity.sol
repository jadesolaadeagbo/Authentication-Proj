// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/utils/Counters.sol";

contract Authenticity{       
    using Counters for Counters.Counter;
    
    Counters.Counter private _productId;

    struct CompanyInfo{
        string company_name;
        string company_location;
    }

    struct ProductInfo{
        string name_of_product;
        string manufacturing_date;
        string expiry_date; 
        uint serial_number;
        uint batch_no;
        string ingredients;
        address current_owner;
    

    }

    struct ProductInfoInput{
        string name_of_product;
        string manufacturing_date;
        string expiry_date; 
        uint serial_number;
        uint batch_no;
        string ingredients;
    }

    mapping(uint=> ProductInfo) public products;
    mapping(address=> CompanyInfo) public  companies;

    function fillInfo(CompanyInfo memory _companyInfo) public {
        CompanyInfo storage newCompanyInfo = companies[msg.sender];
        newCompanyInfo.company_name = _companyInfo.company_name;
        newCompanyInfo.company_location = _companyInfo.company_location;
    }

    function createProduct (ProductInfoInput memory product) public {
       _productId.increment();
        // Adding the poll
        ProductInfo storage newProductInfo = products[_productId.current()];
        newProductInfo.manufacturing_date = product.manufacturing_date;
        newProductInfo.expiry_date = product.expiry_date;
        newProductInfo.serial_number = product.serial_number;
        newProductInfo.batch_no = product.batch_no;
        newProductInfo.ingredients = product.ingredients;
        newProductInfo.current_owner = msg.sender;
    }

    function transferOwnership(address newOwner, uint productId) public{
        
        require(msg.sender==products[productId].current_owner, "Only the owner can access this function");
        products[productId].current_owner = newOwner;
}
}
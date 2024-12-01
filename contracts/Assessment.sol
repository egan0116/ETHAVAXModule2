// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public foodSupply;

    event FoodAdded(uint256 amount);
    event CatFed(uint256 amount);

    constructor(uint initFoodSupply) payable {
        owner = payable(msg.sender);
        foodSupply = initFoodSupply;
    }

    function getFoodSupply() public view returns (uint256) {
        return foodSupply;
    }

    function addFood(uint256 _amount) public payable {
        require(msg.sender == owner, "Only the owner can add food");
        uint _previousSupply = foodSupply;
        if (foodSupply > 10){
            revert("Too much FOOD!");
        }
        else{
        foodSupply += _amount;
        assert(foodSupply == _previousSupply + _amount);
        }
        emit FoodAdded(_amount);
    }

    error NotEnoughFood(uint256 foodSupply, uint256 requestedAmount);

    function feedCat(uint256 _amount) public {
        require(msg.sender == owner, "Only the owner can feed the cat");
        uint _previousSupply = foodSupply;
        if (foodSupply < _amount) {
            revert NotEnoughFood(foodSupply, _amount);
        }
        foodSupply -= _amount;
        assert(foodSupply == _previousSupply - _amount);
        emit CatFed(_amount);
    }
}

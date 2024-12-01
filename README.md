# CatFeeder with Solidity and JavaScript

A simple Solidity and JavaScript program that integrats Metamask into operations

## Description

A cat feeding program where you look at an image of a cute cat and feed it as much as you want

## Getting Started

### Executing program

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

## Functions

1. getFoodSupply
   - Returns the supply to the JavaScript UI
2. addFood
   - Add to the supply to feed the cat
3. feedCat
   - Reduce the supply by feeding the cat
  
##Author

Francis L. Chuegan FEU Institute of Technology 202111700@fit.edu.ph Egan

var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = require("./connection");
require("console.table");

// Connect to the server
connection.connect(function(err) {
  if (err) console.error("error connecting: " + err);
  productLoad();
});

// Load data & create console table
function productLoad() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table("\nBamazon Current Inventory", res);
    itemPrompt(res);
  });
}

// Ask the customer for a product
function itemPrompt(inventory) {
  // Ask the user what they want to buy
  inquirer.prompt([{
    type: "input",
    name: "choice",
    message: "What would you like to buy? (Enter the product ID or press Q to quit)",
    validate: function(val) { return !isNaN(val) || val.toUpperCase() === "Q";}
  }]).then(function(val) {
    // Check if the user wants to quit the program
    exitCheck(val.choice);
    var choiceId = parseInt(val.choice);
    var product = checkInventory(choiceId, inventory);
    // Prompt the user for quantity if item exists
    if (product) {
      // Pass to quantityPrompt
      quantityPrompt(product);
    }
    else {
      // Run loadProducts again if product does not exist
      console.log("\nWe don't have that item. Please search for a different product.");
      productLoad();
    }
  });
}

// Prompt for quantity
function quantityPrompt(product) {
  inquirer.prompt([{
    type: "input",
    name: "quantity",
    message: "How many? (Enter a number or press Q to quit)",
    validate: function(val) { return val > 0 || val.toUpperCase() === "Q";}
  }]).then(function(val) {
    // Check if user wants to quit
    exitCheck(val.quantity);
    var quantity = parseInt(val.quantity);
    // Run loadProducts again if product does not exist
    if (quantity > product.quantity) {
      console.log("\nInsufficient quantity!");
      productLoad();
    }
    else {
      // Give the product and quantity to purchase
      makePurchase(product, quantity);
    }
  });
}

// Make the purchase
function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET quantity = quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      // Log that it was successful
      console.log("\nSuccessfully purchased " + quantity + " " + product.product + "'s!");
      productLoad();
    }
  );
}

// Check if product is in inventory
function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      // Return the product if match
      return inventory[i];
    }
  }
  // Return null if no match
  return null;
}

// Check if you want to quit
function exitCheck(choice) {
  if (choice.toUpperCase() === "Q") {
    // Log and exit
    console.log("Thank you for shopping with Bamazon! Please come again.");
    process.exit(0);
  }
}

var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});
var inStockProducts = [];
var cartTotal = 0;
function ProductWithInfo(prodName, prodId, price, stockQty) {
  this.prodName = prodName;
  this.prodId = prodId;
  this.Price = price;
  this.isInStock = stockQty > 0 ? true : false;
}

function getProductsFromDb() {
  connection.query("SELECT * FROM products", function(err, results) {
    console.log(
      `---------------------------------------------------------------------------------------------------------`
    );
    results.forEach(e => {
      var { product_name, item_id, price, stock_qty } = e;
      productWithInfo = new ProductWithInfo(
        product_name,
        item_id,
        price,
        stock_qty
      );
      if (productWithInfo.isInStock) {
        inStockProducts.push({
          name: `${product_name}: $${price}`,
          value: item_id
        });
        console.log(`Item #${item_id}: ${product_name}
    Price: $${price}`);
      }
    });
    console.log(
      `---------------------------------------------------------------------------------------------------------\n`
    );

    gatherUserInput();
  });
}
function gatherUserInput() {
  inquirer
    .prompt([
      {
        name: "itemIdAddToCart",
        message: "Please enter the item ID you'd like to purchase!",
        type: "list",
        choices: inStockProducts
      },
      {
        name: "reqQty",
        message: "How many would you like?",
        type: "input",
        filter: function(answer) {
          return parseInt(answer);
        },
        validate: function(answer) {
          if (isNaN(parseInt(answer)) || parseInt(answer) < 1) {
            return "Please enter a positive integer";
          } else {
            return true;
          }
        }
      }
    ])
    .then(answer => {
      transaction(answer);
    });
}

function transaction(userQuer) {
  var { itemIdAddToCart, reqQty } = userQuer;
  connection.query(
    "SELECT * FROM products WHERE ?",
    {
      item_id: itemIdAddToCart
    },
    function(err, res) {
      if (reqQty > res[0].stock_qty) {
        console.log("Insufficient quantity available. Please try again!");
        gatherUserInput();
      } else {
        cartTotal = (reqQty * res[0].price).toFixed(2);
        console.log(`Excellent. Your total will be $${cartTotal}`);
        updateProdDB(res[0].item_id, res[0].stock_qty, reqQty);
      }
    }
  );
}

function updateProdDB(item_id, currentStock, reqQty) {
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [{ stock_qty: currentStock - reqQty }, { item_id: item_id }],
    function(err, res) {
      //this is the update call back.
      anotherOrder();
    }
  );
}

function anotherOrder() {
  inquirer
    .prompt([
      {
        name: "anotherOrder",
        message: "Would you like to place another order?",
        type: "list",
        choices: ["Yes", "No"]
      }
    ])
    .then(function(answer) {
      if (answer.anotherOrder === "Yes") {
        gatherUserInput();
      } else {
        console.log("Goodbye!");
        connection.end();
      }
    });
}
getProductsFromDb();

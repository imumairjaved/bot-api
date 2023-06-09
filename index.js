const express = require("express");
const app = express();
var request = require("request");

app.get("/api/getPrices", (req, res) => {
  request(
    "https://globalmetals.xignite.com/xGlobalMetals.json/GetRealTimeExtendedMetalQuote?Symbol=XAUKG&Currency=USD&_token=35E4CB5CDB5A4E77956AADE88CC385B8",
    (error, response, body) => {
      let data = JSON.parse(body);

      var bid_price = parseFloat(
        (data.Bid / 1000 / 1.011).toFixed(2)
      ).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        currencySign: "accounting",
      });

      var ask_price = parseFloat(
        ((data.Ask / 1000) * 1.011).toFixed(2)
      ).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        currencySign: "accounting",
      });
      var low_price = parseFloat(
        (data.Low / 1000 / 1.011).toFixed(2)
      ).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        currencySign: "accounting",
      });
      var high_price = parseFloat(
        ((data.High / 1000) * 1.011).toFixed(2)
      ).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        currencySign: "accounting",
      });

      var priceObj = {
        ask: ask_price ? `US${ask_price}` : 0,
        bid: bid_price ? `US${bid_price}` : 0,
        low: low_price ? `US${low_price}` : 0,
        high: high_price ? `US${high_price}` : 0,
      };
      res.send(priceObj);
    }
  );
});

app.post("/api/totalPrice", function (req, res) {
  var query = req.query;
  var totalPrice = parseFloat(
    (query.price * query.quantity).toFixed(2)
  ).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    currencySign: "accounting",
  });

  return res.json(`US${totalPrice}`);
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running"));

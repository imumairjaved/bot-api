const express = require("express");
const app = express();
var request = require("request");

app.get("/", (req, res) => {
  request(
    "https://globalmetals.xignite.com/xGlobalMetals.json/GetRealTimeExtendedMetalQuote?Symbol=XAUKG&Currency=USD&_token=35E4CB5CDB5A4E77956AADE88CC385B8",
    (error, response, body) => {
      let data = JSON.parse(body);
      var bid_price = parseInt(
        (data.Bid / 1000 / 1.011).toFixed(2)
      ).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        currencySign: "accounting",
      });

      var ask_price = parseInt(
        ((data.Ask / 1000) * 1.011).toFixed(2)
      ).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        currencySign: "accounting",
      });
      var low_price = parseInt(
        (data.Low / 1000 / 1.011).toFixed(2)
      ).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        currencySign: "accounting",
      });
      var high_price = parseInt(
        ((data.High / 1000) * 1.011).toFixed(2)
      ).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        currencySign: "accounting",
      });

      var priceObj = {
        ask: ask_price,
        bid: bid_price,
        low: low_price,
        high: high_price,
      };
      res.send(priceObj);
    }
  );
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running"));

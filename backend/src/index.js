const Koa = require("koa");
const router = require("koa-router")();
const cors = require("kcors");
const axios = require("axios");
require("dotenv").config();

const appId = process.env.APPID;

const port = process.env.PORT;

const app = new Koa();

app.use(cors());

router.get("/weather/:city", async (ctx) => {
  const city = ctx.params.city;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${appId}&units=metric`;
  const response = await axios.get(url);
  ctx.body = response.data;
  ctx.type = "application/json; charset=utf-8";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);

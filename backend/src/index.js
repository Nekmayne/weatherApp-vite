const Koa = require("koa");
const router = require("koa-router")();
const cors = require("kcors");
const fetch = require("node-fetch");
require("dotenv").config();

const appId = process.env.APPID;

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

router.get("/weather/:city", async (ctx) => {
  const city = ctx.params.city;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${appId}&units=metric`
    );
    const data = await response.json();
    ctx.body = data;
    ctx.type = "application/json; charset=utf-8";
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 500;
  }
});

router.get("/location", async (ctx) => {
  const { lat, lon } = ctx.query;
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`
    );
    const data = await response.json();
    ctx.body = data;
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 500;
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);

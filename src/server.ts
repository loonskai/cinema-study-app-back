import * as Koa from "koa";
import * as Router from "koa-router";
import * as helmet from "koa-helmet";

var app = new Koa();
const router = new Router();

app.use(helmet());

router.get("/", async ctx => {
  ctx.body = "Init app";
});

app.use(router.routes());

app.listen(5000);

import express, { Express } from "express";
import morgan from "morgan";

const app: Express = express();

app.use(express.json());

app.use(morgan("dev"))

app.get("/", (_req, res) => {
  res.send("Hello, World!");
});

app.get("/pocki", (_req, res) => {
  res.status(200).json({
    message: "Pocki is here!",
  });
});

app.post("/webhook", async (req, res): Promise<any> => {
  const body = req.body;
  //console.log(body);
  try {
    if (!body.id) {
      return res.status(400).json({
        error: "ID is required",
      });
    }

    if (body.amount === -1 || body.amount === 0) {
      return res
        .status(422)
        .json({ error: "El monto no puede ser negativo o 0" });
    }

    return res.status(200).json({
      message: "Webhook received successfully",
      data: body,
    });
  } catch (error) {
    console.log(error);
  }
});

export default app;

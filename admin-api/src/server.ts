// src/server.ts
import "dotenv/config";
import { app } from "./app";

const port = Number(process.env.PORT ?? 4000);

app.listen(port, () => {
  console.log(`Zennyx Local CMS API running at http://localhost:${port}`);
});
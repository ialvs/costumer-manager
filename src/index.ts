import app from "./server";
import { Request, Response } from "express";
import { db } from "./db/connection";
import { users } from "./db/schema";

const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
    const tb = await db.select().from(users);
    return res.json(tb).status(200);
});

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));

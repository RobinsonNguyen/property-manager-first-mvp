import express from "express";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;
const sql = postgres(process.env.DATABASE_URL);
app.use(express.static("public"));
app.use(express.static("../images"));
// app.use(express.json());

app.get("/properties", async (req, res) => {
  const response =
    await sql`SELECT * FROM properties INNER JOIN property_managers ON properties.manager_id = property_managers.manager_id`;
  res.send(response);
  // sql`SELECT * FROM properties`.then((data) => {
  //     res.json(data);
  // });
});
app.get("/property-manager", async (req, res) => {
  const response = await sql`SELECT * FROM property_managers`;
  res.send(response);
});
app.post("/property-manager", async (req, res) => {
  const response = await sql`SELECT * FROM property_managers`;
  // const hashedPassword = await bcrypt.hash(req.body.password,10);
  res.send(response);
});

app.post("/properties", async (req, res) => {
  const { name, description, price, street, city, state, zip } = req.body;
  // const response =
  await sql`INSERT INTO properties(name, description, price, street, city, state, zip, manager_id)
  VALUES(${name},${description},${price},${street},${city}, ${state}, ${zip}, 1) RETURNING *`;
  const response =
    await sql`SELECT * FROM properties INNER JOIN property_managers ON properties.manager_id = property_managers.manager_id WHERE properties.property_id = (SELECT MAX(property_id) FROM properties)`;
  res.send(response);
});

app.delete("/properties", async (req, res) => {
  const id = req.body.property_id;
  try {
    await sql`DELETE FROM properties WHERE property_id = ${id}`;
    res.send({ message: "success" });
  } catch {}
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

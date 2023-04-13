import express from "express";
import postgres from "postgres";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
const PORT = process.env.PORT || 8080;
const sql = postgres(process.env.DATABASE_URL);

app.get("/properties", async (req, res) => {
  const response =
    await sql`SELECT * FROM properties INNER JOIN property_managers ON properties.manager_id = property_managers.manager_id`;
  res.send(response);
});

app.get("/properties/:id", async (req, res) => {
  const response =
    await sql`SELECT * FROM properties WHERE property_id = ${req.params.id}`;
  res.send(response);
});

app.get("/property-manager", async (req, res) => {
  const response = await sql`SELECT * FROM property_managers`;
  res.send(response);
});

app.post("/property-manager", async (req, res) => {
  try {
    const { username, password } = req.body;
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // const response = await sql`INSERT INTO property_managers(password) VALUES(${hashedPassword}) RETURNING *`;
    // res.json({users:response.rows[0]});
    res.send("success");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/properties", authenticateToken, async (req, res) => {
  try {
    const { name, description, price, street, city, state, zip } = req.body;
    const response =
      await sql`INSERT INTO properties(name, description, price, street, city, state, zip, manager_id)
    VALUES(${name},${description},${price},${street},${city}, ${state}, ${zip}, 1) RETURNING *`;
    res.send(response);
  } catch (error) {
    res.status(500).send(false);
  }
});

app.patch("/properties", authenticateToken, async (req, res) => {
  try {
    const { property_id, name, description, price, street, city, state, zip } =
      req.body;
    const response = await sql`UPDATE properties SET name = ${name},
    description = ${description},
    price = ${price},
    street = ${street},
    city = ${city},
    state = ${state},
    zip = ${zip}
    WHERE property_id = ${property_id} RETURNING *`;
    res.send(response);
  } catch (error) {
    res.status(500).send(false);
  }
});

app.delete("/properties", authenticateToken, async (req, res) => {
  const id = req.body.property_id;
  try {
    await sql`DELETE FROM properties WHERE property_id = ${id}`;
    res.send(true);
  } catch {
    res.status(401).send(false);
  }
});

//auth login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const response =
      await sql`SELECT * FROM property_managers WHERE username = ${username}`;
    if (response.length === 0) return res.status(401).send(false);
    //password check
    // const validPassword = await bcrypt.compare(password, response.password);
    // if (!validPassword) {
    //   return res.status(401).json({ error: "Incorrect password" });
    // }
    //then JWT
    let tokens = jwtTokens(response[0]);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.json({ name: username, accessToken: tokens.accessToken });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

app.get("/refresh_token", (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken === null) {
      return res.status(401).json({ error: "null refresh token" });
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) {
          return res.status(403).json({ error: error.message });
        }
        let tokens = jwtTokens(user);
        res.cookie("refresh_token", tokens.refreshToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        res.json(tokens.accessToken);
      }
    );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.delete("/logout", (req, res) => {
  try {
    res.clearCookie("refresh_token");
    res.status(204).send(true);
  } catch (error) {
    res.status(401).send(false);
  }
});

function jwtTokens({ username, email }) {
  const user = { username, email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10s",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  return { accessToken, refreshToken };
}
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; //Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).send(false);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.status(403).send(false);
    }
    req.user = user;
    next();
  });
}
app.listen(PORT, () => console.log(`listening on ${PORT}`));

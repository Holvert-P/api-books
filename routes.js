const express = require("express");
const routes = express.Router();
let cors = require("cors");
const LibraryModel = require("./Library.model");
const { mongoose } = require("mongoose");

const password = "Holvert1998",
  dbName = "library";
const URI = `mongodb+srv://HolvertP:${password}@cluster0.o1jff.mongodb.net/${dbName}?retryWrites=true&w=majority&ssl=true`;
const conection = () =>
  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log("conected!"))
    .catch((err) => console.log(err));

routes.use(cors());
routes.get("/", async (req, res) => {
  // req.getConnection((err, conn) => {
  //   try {
  //     conn.query("SELECT * FROM books", (err, rows) => {
  //       res.json(rows);
  //     });
  //   } catch (err) {
  //     return res.end(err);
  //   }
  // });
  // req.getConnection(async (err, conn) => {
  try {
    await conection();
    const allLibrarys = await LibraryModel.find();
    res.send(allLibrarys);
    console.log("data loaded!");
  } catch (error) {
    res.send({
      error: { status: "404", statusText: "Error, informacion no obtenida" },
    });
    console.log(error);
  }
  // });
});

routes.get("/:book/:author", (req, res) => {
  req.getConnection((err, conn) => {
    try {
      conn.query(
        "SELECT *  FROM books WHERE books.auth=? AND books.title=?",
        [[req.params.author], [req.params.book]],
        (err, rows) => {
          res.json(rows);
        }
      );
    } catch (err) {
      return res.end(err);
    }
  });
});
routes.post("/", async (req, res) => {
  // req.getConnection((err, conn) => {
  //   try {
  //     conn.query("INSERT INTO books SET ?", [req.body], (err, rows) => {
  //       res.json(req.body);
  //       console.log(req);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });

  // await newRegistry
  //   .save()
  //   .then((result) => (result ? res.json(req.body) : null))
  //   .catch((err) => console.log(err));

  try {
    const newRegistry = new LibraryModel(req.body);
    const result = await newRegistry.save();
    res.status(200).json(result);
    console.log("saved!");
  } catch (err) {
    console.log(err);
    res.send({ error: { status: "500", statusText: "Error al agregar" } });
  }

  // res.json({
  //   title: "El yerno millonario lcoo",
  //   auth: "desconocido",
  //   edition: "6",
  //   id: "1655165165",
  // });
});

routes.delete("/:id", async (req, res) => {
  // req.getConnection((err, conn) => {
  //   try {
  //     conn.query(
  //       "DELETE FROM books WHERE id=?",
  //       [req.params.id],
  //       (err, rows) => {
  //         res.send("Delete Done!");
  //       }
  //     );
  //   } catch (err) {
  //     res.send(err);
  //   }
  // });
  try {
    await LibraryModel.deleteOne({ _id: req.params.id });
    console.log("record deleted!");
  } catch (err) {
    console.log(err);
    res.send({ error: { status: 500, statusText: "Error al eliminar" } });
  }
});

routes.put("/:id", async (req, res) => {
  // req.getConnection((err, conn) => {
  //   try {
  //     conn.query(
  //       "UPDATE books SET ? WHERE id=?",
  //       [req.body, req.params.id],
  //       (err, rows) => {
  //         res.send("Update Done!");
  //       }
  //     );
  //   } catch (err) {
  //     res.send(err);
  //   }
  // });
  try {
    const result = await LibraryModel.updateOne(
      { _id: req.params.id },
      { ...req.body }
    );
    res.json(req.body);
    console.log("Updated!");
    console.log(result);
  } catch (err) {
    res.send({ error: { status: "500", statusText: "Error al actualizar" } });
  }
});
module.exports = routes;

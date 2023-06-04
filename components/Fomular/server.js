const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const employees = [
  { id: 1, name: "Max Mustermann", position: "Manager" },
  { id: 2, name: "Erika Musterfrau", position: "Supervisor" },
  { id: 3, name: "Hans Müller", position: "Developer" },
  { id: 4, name: "Lisa Schmidt", position: "Designer" },
  { id: 5, name: "Peter Schulz", position: "Sales Representative" },
  { id: 6, name: "Sarah Meier", position: "Marketing Specialist" },
  { id: 7, name: "Thomas Fischer", position: "Accountant" },
  { id: 8, name: "Laura Keller", position: "Human Resources" },
  { id: 9, name: "Janine Wagner", position: "Customer Support" },
  { id: 10, name: "Markus Becker", position: "IT Administrator" },
];

app.get("/employees", (req, res) => {
  res.json(employees);
});

const port = 3000;
app.listen(port, () => {
  console.log(`API-Server läuft auf Port ${port}`);
});

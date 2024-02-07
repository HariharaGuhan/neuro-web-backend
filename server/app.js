const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const mycon = require('mysql');

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static('public'));

const c = mycon.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Msd@007,",
    database: "neuro_website"
})

c.connect(function (error) {
    if (error) { console.log(error); }
    else { console.log('Database Connected');}
})
app.post("/contact_form", (req, res) => {
  const { username, email, messages } = req.body;

  
  if (!username || !email || !messages) {
    res.status(400).json({ success: false, error: "Please provide username, email, and messages" });
    return;
  }

  const sql = "INSERT INTO contacts (username, email, messages) VALUES (?, ?, ?)";
  c.query(sql, [username, email, messages], (err, result) => {
    if (err) {
      console.error("Error inserting data into MySQL:", err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
      return;
    }
    res.status(200).json({ success: true, message: "Data inserted successfully" });
  });
});

app.post("/bookDemo", (req, res) => {
  const { username, email_id, job_title, comments } = req.body;

  
  if (!username || !email_id || !job_title || !comments) {
    res.status(400).json({ success: false, error: "Please provide username, email_id, job_title, and comments" });
    return;
  }

  const sql = "INSERT INTO demo_requests (username, email_id, job_title, comments) VALUES (?, ?, ?, ?)";
  c.query(sql, [username, email_id, job_title, comments], (err, result) => {
    if (err) {
      console.error("Error inserting data into MySQL:", err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
      return;
    }
    res.status(200).json({ success: true, message: "Demo request submitted successfully" });
  });
});

app.listen(3003, () => { console.log('3003 port number is running'); });


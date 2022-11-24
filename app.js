const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('./connect');
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))
  
app.get('/' , (req, res) => {
    res.render('index.html');
})

app.get('/account', (req, res) => {
  if (req.session.loggedin) {
    res.json({
      username: req.session.username,
      id: req.session.accountid
      });
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if(err) throw err;
  });
  
  res.redirect('/');
})

app.post('/register', (req, res) => {
  const data = req.body;
  console.log(data);
  for(let key in data) {
    if (!data[key]) {
      return res.status(400).send({ status: 'failed' })
    }
  }

  const sql1 = 'INSERT INTO accounts (username, email, password) VALUES (?)';
  const hash = bcrypt.hashSync(data.password, saltRounds);
  const query1 = [data].map(field => [field.username, field.email, hash]);
  
  const sql2 = 'INSERT INTO customers (name, phoneNumber, address, creditCard, supportAgent) VALUES (?)';
  const employeeID = Math.floor(Math.random() * 3 + 1);
  const query2 = [data].map(field => [field.name, field.phone, field.address, field.credit, employeeID]);

  db.query(sql1, query1, function(err) {
    if (err) {
      throw err;
    } else {
      db.query(sql2, query2, function(err) {
        if (err) throw err;
      });
    }
  });

  res.redirect('/');
})

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
		db.query('SELECT customerNumber, password FROM accounts WHERE username = ?', username, function(err, results) {
			if (err) throw err;
			if (results.length > 0 && bcrypt.compareSync(password, results[0].password)) {
				req.session.loggedin = true;
				req.session.username = username;
        req.session.accountid = results[0].customerNumber;
				res.redirect('/');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
})
  
// Server setup
app.listen(port , () => {
    console.log(`Server running on port ${port}.`);
});
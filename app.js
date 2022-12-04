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
      id: req.session.accountID
    });
  } else {
    res.status(300).send();
  }
})

app.get('/accountInfo/', (req, res) => {
  if (req.session.loggedin) {
    const sql = "SELECT name, phoneNumber, address FROM customers WHERE customerNumber = ?";
    db.query(sql, [req.session.accountID], function(err, result) {
      if (err) throw err;
      res.json(result[0]);
    })
  } else {
    res.status(300).send();
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if(err) throw err;
  });
  res.status(300).send({status: 'sucess'});
})

app.post('/tabs', (req, res) => {
  const shoesData = req.body;
  if(!shoesData) {
    return res.status(400).send({status: 'failed'});
  }

  const sql = 'SELECT * FROM shoes INNER JOIN properties USING (shoesID) WHERE shoesID = ?';

  (async() => {
    const data = [];
    await db.promise().query(sql, [shoesData.id])
    .then(([result]) => {
      for(const key in result) {
        data.push(result[key]);
      }
    })

    return data;
  })().then((data) => {
    res.json(data);
  });
})

app.post('/shoes', (req, res) => {
  const shoesData = req.body;
  for(const key in shoesData) {
    if(!shoesData[key]) {
      return res.status(400).send({status: 'failed'});
    }
  }

  const sql = 'SELECT * FROM shoes INNER JOIN properties USING (shoesID) WHERE shoesID = ? AND color = ? AND size = ?';

  (async() => {
    const data = [];
    for(const key in shoesData) {
      await db.promise().query(sql, [shoesData[key].id, shoesData[key].color, shoesData[key].size])
      .then(([result]) => data.push(result[0]));
    }
    return data;
  })().then((data) => {
    res.json(data);
  });
})

app.post('/register', (req, res) => {
  const data = req.body;
  for(let key in data) {
    if (!data[key]) {
      res.status(400).send({ status: 'failed' })
      return;
    }
  }

  const sql1 = 'INSERT INTO accounts (username, email, password) VALUES (?)';
  const hashedPass = bcrypt.hashSync(data.password, saltRounds);
  const query1 = [data].map(field => [field.username, field.email, hashedPass]);
  
  const sql2 = 'INSERT INTO customers (customerNumber, name, phoneNumber, address, creditCard, supportAgent) VALUES (LAST_INSERT_ID(), ?)';
  const hashedCredit = bcrypt.hashSync(data.credit, saltRounds);
  const employeeID = Math.floor(Math.random() * 3 + 1);
  const query2 = [data].map(field => [field.name, field.phone, field.address, hashedCredit, employeeID]);

  (async() => {
    const sql = 'SELECT * FROM accounts WHERE username = ? OR email = ?';
    await db.promise().query(sql, [data.username, data.email])
    .then(([result]) => {
      if (result.length > 0) {
        res.status(400).json({status: 'Username or email already exists!'});
        throw new Error('err');
      }
    })
    }) ()
  .then(() => {
      db.query(sql1, query1, function(err) {
        if (err) {
          throw err;
        } else {
          db.query(sql2, query2, function(err) {
            if (err) throw err;
            res.redirect('/');
          });
        }
      });
  })
  .catch(err => console.log(err));
})

app.post('/update', (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).send({ status: 'failed' })
  }
  for(const key in data) {
    if (data[key] === '') {
      data[key] = undefined;
    }
  }

  const sql1 = 'UPDATE accounts SET email = COALESCE(?, email), password = COALESCE(?, password) WHERE customerNumber = ?';
  const hashedPass = data.password ? bcrypt.hashSync(data.password, saltRounds) : undefined;
  
  const sql2 = 'UPDATE customers SET name = COALESCE(?, name), phoneNumber = COALESCE(?, phoneNumber), address = COALESCE(?, address), creditCard = COALESCE(?, creditCard) WHERE customerNumber = ?';
  const hashedCredit = data.credit ? bcrypt.hashSync(data.credit, saltRounds) : undefined;

  (async() => {
    const sql = 'SELECT * FROM accounts WHERE email = ?';
    await db.promise().query(sql, [data.email])
    .then(([result]) => {
      if (result.length > 0) {
        res.status(400).json({status: 'Email already exists!'});
        throw new Error('err');
      }
    })
    }) ()
  .then(() => {
    db.query(sql1, [data.email, hashedPass, req.session.accountID], function(err) {
      if (err) {
        throw err;
      } else {
        db.query(sql2, [data.name, data.phone, data.address, hashedCredit, req.session.accountID], function(err) {
          if (err) throw err;
          res.redirect('/');
        });
      }
    });
  })
  .catch(err => console.log(err));
})

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
		db.query('SELECT customerNumber, password FROM accounts WHERE username = ?', username, function(err, result) {
			if (err) throw err;
			if (result.length > 0 && bcrypt.compareSync(password, result[0].password)) {
				req.session.loggedin = true;
				req.session.username = username;
        req.session.accountID = result[0].customerNumber;
				res.redirect('back');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
})

app.post('/order', function(req, res) {
  const data = req.body;
  if (!data) {
    return res.result(400).send({status: "failed"});
  }
  
  const sql1 = "INSERT INTO orders (customerNumber, orderDate, requiredDate) VALUES (?, CURDATE(), COALESCE(?, CURDATE() + 7))";
  const sql2 = "INSERT INTO orderdetails (orderNumber, shoesPropety, quantityOrdered) VALUES (LAST_INSERT_ID(), ?)";
  const sql3 = "UPDATE properties SET quantityInStock = quantityInStock - ? WHERE id = ? AND quantityInStock > 0";
  const sql = "INSERT INTO payments (customerNumber, paymentDate, amount) VALUES(?, CURDATE(), ?)";

  (async() => {
    const requiredDate = data.requiredDate ? data.requiredDate : undefined;
    await db.promise().query(sql1, [req.session.accountID, requiredDate], function(err) {
      if (err) throw err;
    })
    .then(() => {
      for (const key in data.shoes) {
        db.query(sql2, [[data.shoes[key].id, data.shoes[key].quantity]], function(err) {
          if(err) throw err;
        });
        db.query(sql3, [data.shoes[key].quantity, data.shoes[key].id], function(err) {
          if (err) throw err;
        })
      }
    })
  }) ();

  db.query(sql, [req.session.accountID, data.amount], function(err) {
    if(err) throw err;
  })
})
  
// Server setup
app.listen(port , () => {
    console.log(`Server running on port ${port}.`);
});
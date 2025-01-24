const express = require('express');
const {json, response} = require("express");
const app = express();
const sqlite3=require('sqlite3').verbose();
let sql;

app.use(express.json());
const cors = require('cors');
app.use(cors());
// app.use(bodyParser.json());

const db=new sqlite3.Database('Database.db',err=>{
    if(err){
        return console.error(err.message);
    }
});
//tworzenie tabel
// sql= `CREATE TABLE products(id INTEGER PRIMARY KEY, title,price,category,description,image,rating)`;
// db.run(sql);
// sql= `CREATE TABLE comments(id INTEGER PRIMARY KEY, userID, userName, productID,body,rating)`
// db.run(sql);
// sql=`CREATE TABLE users(id INTEGER PRIMARY KEY, username,password)`
// db.run(sql);
// sql=`CREATE TABLE productsInBuckets(userID,productID)`
// db.run(sql);
// sql= `CREATE TABLE comments(id INTEGER PRIMARY KEY,userID,productID,data,body,rating)`;
// db.run(sql);
// sql=`CREATE TABLE productsInCarts(userID,productID,quantity)`;
// sql = `CREATE TABLE orders(id INTEGER PRIMARY KEY, userID, productID,quantity,data,price)`;
// db.run(sql);


// USERS

//rejestrowanie uzytkowników
app.post('/register',async (req,res)=>{
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({message:"Username and password are required."})
    }
    sql= `INSERT INTO users (username,password) VALUES (?,?)`;
    db.run(sql,[username,password],function (err){
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Error registering user." });
        }
        res.status(201).json({ message: "User registered successfully!", userId: this.lastID });
    });
});
// wszyscy uzytkownicy
app.get('/api/users',(req,res)=>{
    sql='SELECT * FROM users';
    db.all(sql,[],(err,rows)=>{
        if(err){
            return console.log(err.message);
        }
        res.status(200).json({
            message: 'Wszyscy użytkownicy: ',
            users: rows
        })
    })
})
// wszystkie produkty
app.get('/api/products',(req,res)=>{
    sql='SELECT * FROM products';
    db.all(sql,[],(err,rows)=>{
        if(err){
            return console.log(err.message);
        }
        res.status(200).json({
            message: 'Wszystkie produkty: ',
            products: rows
        })
    })
})
//usuwanie uzytkownika
app.delete('/api/users/:id',(req, res)=>{
    const userid = parseInt(req.params.id,10);
    sql = `DELETE FROM users WHERE id = ?`;
    db.run(sql,[userid],err => {
        if(err){
            return console.error(err.message);
        }
        res.status(200).json({
            message: 'Usunięto uzytkownika o id: ' + userid
        })
    })
})

// PRODUCTS

// dodanie początkowe produktów
app.post('/api/products',(req,res)=> {

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            const promises = data.map(product => {
                const {title, price, category, description, image, rating} = product;
                const ratingCount = rating.count; // Wyciągnięcie liczby ocen
                sql = `INSERT INTO products(title, price, category, description, image, rating)
                       VALUES (?, ?, ?, ?, ?, ?)`;
                return new Promise((resolve, reject) => {
                    db.run(sql, [title, price, category, description, image, ratingCount], function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(this.lastID)
                        }
                    });
                });
            });
            return Promise.all(promises);
        })
        .then(ids => {
            res.status(200).json({message: 'Produkty zostały dodane', ids});
        })
});
//usuwanie produktu
app.delete('/api/products/:id',(req, res)=>{

    const prodid = parseInt(req.params.id,10);
    sql = `DELETE FROM products WHERE id = ?`;
    db.run(sql,[prodid],(err,rows) => {
        if(err){
            return console.error(err.message);
        }
        res.status(200).json({
            message: 'Usunięto produkt o id: ' + prodid
        })
    })
})
//usuwanie wszystkich produktów
app.delete('/api/products',(req, res) => {
    sql = `DELETE FROM products`;
    db.all(sql,(err) => {
        if(err){
            return console.error(err.message);
        }
        res.status(200).json({
            message: 'Usunięto produkty'
        })
    })
})
//PRODUCTS IN BUCKETS

// dodanie do koszyka
app.post('/productsInCarts',async (req,res)=>{
    const {userid,productid,quantity }=req.body;
    if(!userid || !productid || !quantity ){
        // console.log(userid,productid)
        return res.status(400).json({message:"userID, quantity and productID are required."})
    }
    sql= `INSERT INTO productsInCarts (userID,productID,quantity) VALUES (?,?,?)`;
    db.run(sql,[userid,productid,quantity ],function (err){
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Error appending product to bucket." });
        }
        res.status(201).json({ message: "product appended successfully!"});
    });
});
// wszysktkie produkty w koszykach
app.get('/api/productsInCarts',(req, res)=>{
    sql='SELECT * FROM productsInCarts';
    db.all(sql,[],(err,rows)=>{
        if(err){
            return console.log(err.message);
        }
        res.status(200).json({
            message: 'Wszystkie produkty z koszyków Carts: ',
            productsInCarts: rows
        });
    });
});
// produkty z koszyka użytkownika
app.get('/api/productsInCarts/:uid',(req, res)=>{
    const userId=parseInt(req.params.uid, 10);
    sql='SELECT * FROM productsInCarts WHERE userID = ?';
    db.all(sql,[userId],((err,rows)=>{
        if(err){
            return console.error(err.message);
        }
        res.status(200).json({
            products: rows
        })
    }))
})
//usuwanie z koszyka
app.delete('/productsInCarts/:id/:uid',(req, res)=> {

    const prodid = parseInt(req.params.id, 10);
    const userid = parseInt(req.params.uid,10)
    sql = `DELETE FROM productsInCarts WHERE productID = ? AND userID = ?`;
    db.run(sql, [prodid,userid], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.status(200).json({
            message: 'Usunięto produkt z koszyka o id: ' + prodid + 'dla uzytkownika: ' + userid
        })
    })
})

// COMMENTS

// dodawanie opinii do produktu
app.post('/api/comments',(req, res) => {
    const {userid,productid,data,body,rating}=req.body;
    if(!userid || !productid || !body || !rating){
        return res.status(400).json({message:"userid,productid,data,body and rating are required."})
    }
    sql= `INSERT INTO comments (userID,productID,data,body,rating) VALUES (?,?,?,?,?)`;
    db.run(sql,[userid,productid,data,body,rating],function (err){
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Error adding a comment." });
        }
        res.status(201).json({ message: "comment appended successfully!"});
    });
})
//pobranie wszystkich opinii
app.get('/api/comments',(req, res)=>{
    sql='SELECT * FROM comments';
    db.all(sql,[],(err,rows)=>{
        if(err){
            return console.log(err.message);
        }
        res.status(200).json({
            message: 'Wszystkie opinie: ',
            productsInBuckets: rows
        });
    })
})
//pobieranie opini o konkretnym produkcie
app.get('/api/comments/:id',(req, res) => {
    const prodId=parseInt(req.params.id,10);
    sql=`SELECT * FROM comments WHERE productID = ?`;
    db.all(sql,[prodId],(err,rows)=>{
        if(err){
            return console.error(err.message);
        }
        res.status(200).json({
            productId: prodId,
            comments: rows
        })
    })
})
//usuwanie komentarzy po id
app.delete('/api/comments/:id',(req, res)=>{
    const commentId = parseInt(req.params.id,10);

    sql = 'DELETE FROM comments WHERE id = ?';
    db.run(sql,[commentId],(err,row)=>{
        if(err){
            return console.error(err.message);
        }
        res.status(200).json({
            message: 'Usunięto opinie o id: ' + commentId
        })
    })
})
//edytowanie komentarzy
app.put('/api/comments/:uid/:pid', async (req, res) => {
    const userID = parseInt(req.params.uid,10);
    const productID = parseInt(req.params.pid,10);
    const { newBody, newRating, data } = req.body;

    sql ='UPDATE comments SET body = ?, rating = ?, data = ? WHERE userID = ? AND productID = ?';
    db.run(sql,[newBody, newRating, data, userID, productID],function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Error editing the comment." });
        }
    res.status(201).json({ message: "opinion edited successfully!"});
});
})


//usuwanie komentarzy po userid i productid
app.delete('/api/comments/:uid/:pid',(req, res)=>{
    const userID = parseInt(req.params.uid,10);
    const productID = parseInt(req.params.pid,10);


    sql = 'DELETE FROM comments WHERE userID = ? AND productID=?';
    db.run(sql,[userID,productID],(err,row)=>{
        if(err){
            return console.error(err.message);
        }
        res.status(200).json({
            message: 'Usunięto opinie'
        })
    })
})
// ORDERS
//wszystkie zamówienia
app.get('/api/orders',(req, res)=>{
    sql = `SELECT * FROM orders`;
    db.all(sql,[],(err,rows)=>{
        if(err){
            return console.log(err.message);
        }
        res.status(200).json({
            message: 'Wszystkie zamównia: ',
            orders: rows
        });
    })
})
// dodawanie zamówienia
app.post('/api/orders',(req, res)=>{
    const {userID, productID,quantity,data,price} = req.body;
    if(!userID || !productID || !quantity || !data || !price){
        return res.status(400).json({message:"userid,productid,data,quantity and price are required."})
    }
    sql = `INSERT INTO orders (userID, productID,quantity,data,price) VALUES (?,?,?,?,?)`;
    db.run(sql,[userID,productID,quantity,data,price],function (err){
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Error adding an order." });
        }
        res.status(201).json({ message: "order appended successfully!"});
    });
})
// usuwanie zamówienia
app.delete('/api/orders/:id',(req, res)=>{
    const orderID = parseInt(req.params.id,10);

    sql = 'DELETE FROM orders WHERE id = ?';
    db.run(sql,[orderID],(err,row)=>{
        if(err){
            return console.error(err.message);
        }
        res.status(200).json({
            message: 'Usunięto zamówienie o id: ' + orderID
        })
    })
})


const PORT = 4000;
app.listen(PORT,()=>{
    console.log("Serwer włączony!");
});



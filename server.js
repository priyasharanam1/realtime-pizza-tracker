const express = require('express')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 3000

//Assets

app.use(express.static('public')) //serves static files from public folder

//set template engine
app.use(expressLayouts)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

app.get('/', (req,res)=>{
    res.render("home")  //the file inside views folder
})

app.get('/cart', (req,res)=>{
   res.render('customers/cart')
})

app.get('/login', (req,res)=>{
    res.render('auth/login')
 })

 app.get('/register', (req,res)=>{
    res.render('auth/register')
 })

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})
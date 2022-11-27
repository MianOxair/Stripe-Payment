const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()
 
var Publishable_Key = 'pk_test_51M7AI1HKy0DIp4AuVydJTpikDXhCgniWpNe6RLuKtjS1Q2GfB0vuPySL9BAxmW6K47co1DGPsVkWfJG1KE7o4L4g00DAJbpGPf'
var Secret_Key = 'sk_test_51M7AI1HKy0DIp4Au147KAFjnS22Kw1D9ySXKcYmHtpuNb1lEcidAAHrCDK5PkFgG8vxtFmjpUtRu79Ng8EGvnsGB00QM4wbjqv'
 
const stripe = require('stripe')(Secret_Key)
 
const port = process.env.PORT || 3000
 
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
 

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
 
app.get('/', function(req, res){
res.render('Home', {
key: Publishable_Key
})
})
 
app.listen(port, function(error){
if(error) throw error
console.log("Server created Successfully")
})
app.post('/payment', function(req, res){
 
    stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
    name: 'Bahman Rezaie',
    address: {
    line1: 'Burnaby, 17th Ave',
    postal_code: 'V3M1N4',
    city: 'Burnaby',
    state: 'British Cloumbia',
    country: 'Canada',
    }
    })
    .then((customer) => {
     
    return stripe.charges.create({
    amount: 100000, 
    description: 'Dell Laptop, Latitude E640, 18"',
    currency: 'USD',
    customer: customer.id
    });
    })
    .then((charge) => {
    res.send("Success") 
    })
    .catch((err) => {
    res.send(err)
    });
    })
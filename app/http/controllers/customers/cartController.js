function cartController(){
    return{
        index(req,res){
            res.render('customers/cart')
        },
        update(req,res){
            // let cart = {
            //     items: {
            //         pizzaId : {item : pizzaObject, qty : 0}
            //     },
            //     totalQty: 0,
            //     totalPrice: 0
            // }

            //creating cart for the first time and adding object structure
            if(!req.session.cart){
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart

            //check if item does not exist in the cart
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalQty += 1
                cart.totalPrice += req.body.price
            }
            //if the pizza that we want to add is already in the cart
            else{
                cart.items[req.body._id].qty += 1
                cart.totalQty += 1
                cart.totalPrice += req.body.price
            }

            return res.json({totalQty : req.session.cart.totalQty})
        }
    }
}

module.exports = cartController
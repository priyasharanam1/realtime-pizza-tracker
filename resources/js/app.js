 import axios from 'axios'
 import toastr from 'toastr'
 import 'toastr/build/toastr.min.css';
 import { initAdmin } from './admin'

 let addToCart = document.querySelectorAll('.add-to-cart')
 let cartCounter = document.querySelector('#cartCounter')

 function updateCart(pizza){
axios.post('/update-cart', pizza).then(res => {
    console.log(res)
    cartCounter.innerText = res.data.totalQty
    toastr.success('Item added to cart', 'Success', { timeOut: 1000 });
}).catch(err => {
    toastr.error('Something went wrong', 'Error', { timeOut: 1000 });
})
 }

 addToCart.forEach((btn)=>{
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)  //data-pizza attribute se jo data mil raha
        updateCart(pizza)
    })
 })

 const alertMsg = document.querySelector('#success-alert')
 if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove()
    },2000)
 }

 initAdmin()
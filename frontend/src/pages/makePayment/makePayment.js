

import React from 'react'
import {useLocation} from 'react-router-dom'
import logo from '../../images/ictaklogo.png'
import axios from 'axios'
import Header from '../../components/header/Header'


function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const useQuery=()=>{
    return new URLSearchParams(useLocation().search) 
}

function MakePayment() {
 const query=useQuery()

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

			const {data}=await axios.post('/razorpays',{id:query.get('id')}).then(data=>data).catch(err=>console.log(err.response))
		console.log(data,"ppppp")

		const options = {
			key: 'rzp_test_5xX1QVWb8qAfgL', 
			currency:data?.currency,
			amount:data?.amount,
			order_id:data?.id,
			name: 'Course Fee',
			description: 'please make your payment for your course',
			image: logo,
			handler:async function ({razorpay_payment_id,razorpay_order_id,razorpay_signature}) {
				// alert(response.razorpay_payment_id)
				// alert(response.razorpay_order_id)
				// alert(response.razorpay_signature)

				console.log(razorpay_payment_id,razorpay_order_id,razorpay_signature)
			},
			prefill: {
				name:data.name,
				email: data.email,
				contact: data.phone
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

 
 
    return (
    <div>
		<Header/>
        <button onClick={displayRazorpay}>click here to pay your fees</button>
    </div>
  )
}

export default MakePayment








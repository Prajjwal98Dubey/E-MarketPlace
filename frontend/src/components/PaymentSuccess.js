import axios from 'axios'
import React, { useEffect, useRef } from 'react'

import { Link } from 'react-router-dom'
const SHOW_PRODUCTS = 'http://localhost:5001/showOrders'
const MY_ORDERS_HISTORY = 'http://localhost:5001/myOrdersHistory'
const REMOVE_CURRENT_ORDER='http://localhost:5001/remove-current-order/'
const PaymentSuccess = () => {
  const isMounted = useRef(false)
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      const config = {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userDetails")).token}`
        }
      }
      let currToken = JSON.parse(localStorage.getItem("userDetails")).token
      const createHistory = async () => {
        const { data } = await axios.post(SHOW_PRODUCTS, {
          token: currToken
        }, config)
        await axios.post(MY_ORDERS_HISTORY, {
          token: currToken,
          products: Array.of(data.allProducts)
        }, config)
        // console.log(data)
        await axios.delete(REMOVE_CURRENT_ORDER+data.allProducts[0].user,config)
      }
      createHistory()
    }

  }, [])

  return (
    <>
      <div className='flex justify-center mt-[75px] font-Roboto animate-fade'>
        <div>
          <div><img className='w-[250px] h-[200px] rounded-full ml-[130px]' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAhFBMVEX///9s0Dhr0Db+//1nzzBkzin4/fVhzSX1/PJq0DNayxjj9tpt0Dqx5ZrT8Mfp+OLy++1x0UHv+urd89SU23Sp4o+i4Ia256Cs45PB6q2L2WfE67PY8c181FTs+eVy0USQ2mxXygvK7buE11t81k+66Kef34OA1VWf34SX3XfC67CG12CfhPpUAAAD00lEQVR4nO3bW3uiMBAGYA4JMRDxrIhWbMV2Xf///9vgaV0LclhsHsfv7U3bq8k8kzBJwLIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF6W2+8Fo+VyOQp6fdd0MCZ4YTR+G0jGNTl4G0ehZzqkn7VaxMIXzNaU/rGVw/Tf8WJlOrAf05sknDlK2deUzgNPJj3Twf2IYOpz+9/xX/Jgc38amA7w4TozhxVk4JgF5sw6poN8rOBNFI7/TKSUS8HdMllcA5dakGxL91E5LS+CI39iOtQH8daivAhOpSDWNCthzaumQCeBj02H+wDuuHIVHCthTK8SohpVcKyErumQ2/bxXi8FOgnvH6aDbldvUDMDmjOg1ThvWP0c2GxvOuw2Lfy6MyGjfEKzoZ86DVKgZ0PaNx16a7pV+8NbdJ4NntOsDHQhMCpNwrxWd3RN+XPTwbfDi2XDFOhCWNM4ZRw1XQ2yQuAj0+G3ovGKmCGyKm4qTgVu5zRSLDUdfhtW1TKgRLcz5TlJGJoeQAvCnIHl8LeWtfw+a5QITQ+gBdsqm+bDTrkff58Mim9ND+D/uZ8VtkvqXY/U2+dlixE4WvTWFZZEdqiC3IKRBDoE76s0B8rXKXBzq0B3SZvnv3LpJHmbBZnIy79Pa0HBskFh79gZ5OSAjfuhcM5VMNEbo6IU2E5CNAdCL4HBaTeZVUGnMAU0cpA3F5xBoLsB5mTPf10F7p2rBwpzwcs9Q5LZXihgUomo5AKKwppYsHN2BjoJSyWm2e3LvS5Kxk//bHTdXX6P5GSVMIpcXQV3G0n2i8BR0qzooaeWOkWWt7t7yqT4zPQAWvBR+NQTQdlEyNZMCufrQWGf6DhhSRVonMJlk5sWJ0GVVIFeEgem429F3snIOQmle0o+NR1+K0K/bKB3kDhC0Z3iW9MrFl0oX8/fIR10a75+8ZcSNI6VLWtV7UQxj//8m4WTXdMk8E+LQJd40HMaTgZFoTk46Ta6dVWCQp985somjwapnn7LeC1s9D4Sjd7gIqo9GxS9l5ZjVvMdTbY2HXLrhmm96cASCpetN4ZJjUpQLCWYAssKaiSBJYQ6g2vDTcWNg+IbklWQ6eyqvZYjxqQagxtzXjofFBO/qWwS8gVrfnfzoCRfU/6s7cBdpH7hx21K+umCdhEcufP99099Tx/77olPg7+8cMd9Ie1LHvQvUvhs91rfvrthFCeHD/8PWBJH4auUwBVvFYTz7mQy6c7DYPVSFQC33IzpIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABM+gMNQS0zqAqMnQAAAABJRU5ErkJggg==" alt="" /></div>
          <div className=' font-bold mt-8 text-3xl'>Payment Successfully Completed...</div>
          <Link to='/'><div className=' mt-[20px] text-xl flex justify-center hover:underline hover:cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-left"><path d="M6 8L2 12L6 16" /><path d="M2 12H22" /></svg>Continue Shopping</div></Link>
        </div>
      </div>

    </>
  )
}

export default PaymentSuccess
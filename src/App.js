import { useEffect, useState } from 'react'
import moneyImg from './img/money.png'

// Components
import Currency from './Components/Currency'
import './App.css'

function App() {
	const [currencyChoice, setCurrencyChoice] = useState([])

	const [fromCurrency, setFromCurrency] = useState("USD")
	const [toCurrency, setToCurrency] = useState("THB")

	const [amount, setAmount] = useState(1)
	const [exchangeRate, setExchangeRate] = useState(0)

	const [checkFromCurrency, setCheckFromCurrency] = useState(true)

	let fromAmount, toAmount
	if (checkFromCurrency) {
		fromAmount = amount
		toAmount = (amount * exchangeRate).toFixed(2)
	} else {
		toAmount = amount
		fromAmount = (amount / exchangeRate).toFixed(2)
	}

	useEffect(() => {
		const url = `https://open.er-api.com/v6/latest/${fromCurrency}`
		fetch(url)
		.then(response => response.json())
		.then(data => {
			setCurrencyChoice([...Object.keys(data.rates)])
			setExchangeRate(data.rates[toCurrency])
		})
	}, [fromCurrency, toCurrency])

	const amountFromCurrency = (e) => {
		setAmount(e.target.value)
		setCheckFromCurrency(true)
	}

	const amountToCurrency = (e) => {
		setAmount(e.target.value)
		setCheckFromCurrency(false)
	}

	return (
		<div>
		<img className='image' src={moneyImg} alt='logo'/>
		<h1>แอปแปลงสกุลเงิน (API)</h1>
		<div className='container'>
			<Currency 
			currencyChoice={currencyChoice} 
			seletCurrency={fromCurrency} 
			changeCurrency={(e) => setFromCurrency(e.target.value)}
			amount={fromAmount}
			onChangeAmount={amountFromCurrency}
			/>
			<span className='equal'>=</span>
			<Currency 
			currencyChoice={currencyChoice} 
			seletCurrency={toCurrency} 
			changeCurrency={(e) => setToCurrency(e.target.value)}
			amount={toAmount}
			onChangeAmount={amountToCurrency}
			/>
		</div>
		</div>
	);
}
export default App;

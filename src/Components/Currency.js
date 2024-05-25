/* eslint-disable array-callback-return */
import './Currency.css'

const Currency = ({currencyChoice, seletCurrency, changeCurrency, amount, onChangeAmount}) => {
    return (
        <div className='currency'>
            <select value={seletCurrency} onChange={changeCurrency}>
                {currencyChoice.map((choice) =>
                    <option key={choice} value={choice}>{choice}</option>
                )}
            </select>
            <input type='number' value={amount} onChange={onChangeAmount}/>
        </div>
    );
};

export default Currency;
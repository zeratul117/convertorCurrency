import classes from './Result.module.css';

const Result = (props) => {

    let { inputValue, selectFromValue: from, selectToValue: to, result } = props.result;

    let additionalDecimals = 0;

    const addComas = (value) => {

        value = parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");    
    
        return value;
    }

    if (Math.trunc(result).toString().length < 4) {

        additionalDecimals = (result % 1).toFixed(6).substring(2).substring(2);

    } else if (Math.trunc(result).toString().length <= 6) {

        additionalDecimals = (result % 1).toFixed(6).substring(2).substring(4);

    } else {

        additionalDecimals = (result % 1).toFixed(6).substring(2).substring(6);
    }
    
    result = addComas(result);
    inputValue = addComas(inputValue);

    return (
    <div className={classes.result}>
        <div>
            <p className={classes.inputAmount}>{`${inputValue} ${from.value} =`}</p>
            <p className={classes.equals}>{result}<span className={classes.span}>{additionalDecimals}</span> {to.value}</p>
        </div>
        <div className={classes.newLine}></div>
        <div> 
            <p>1 {from.currencyID} = {parseFloat(from.currencyRate / to.currencyRate).toFixed(6)} {to.currencyID}</p>
            <p>1 {to.currencyID} = {parseFloat(to.currencyRate / from.currencyRate).toFixed(6)}  {from.currencyID}</p>
        </div>
    </div>
    )
}

export default Result;
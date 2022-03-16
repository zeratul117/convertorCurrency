import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Card from '../UI/Card';
import Result from './Result';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './MainConverter.module.css';
import { components } from 'react-select';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { currencyAction } from '../../store/currency-slice-action';
import { useSelector, useDispatch } from 'react-redux';


const MainConverter = (props) => {

    const [selectFromValue, setSelectFromValue] = useState();
    const [selectToValue, setSelectToValue] = useState();
    const [inputValue, setInputValue] = useState("1.00");
    const [resultObject, setResultObject] = useState({});
    const [resetInput, setResetInput] = useState(false);
    const isSubmittingResult = useSelector(state => state.currency.isPostingData);
    const [showResult, setShowResult] = useState(false);
    const dispatch = useDispatch();

    //Custom style for the Select component
    const customStyles = {
        control: base => ({
          ...base,
          height: 45,
          minHeight: 35
        })
      };

      useEffect(() => {
        //Replaces all characters inside the input everytime the convertion happens
        setInputValue(parseFloat(inputValue.toString().replace(/[^0-9.]/g, '')).toFixed(2));

        setResetInput(false);
      }, [resultObject]);

    
    const onChangeSelectFrom = (currencyObject) =>{
        setSelectFromValue(currencyObject)
    }
    const onChangeSelectTo = (currencyObject) =>{
        setSelectToValue(currencyObject)
    }

    //Changes the value that has been selected for the select fiels
    const swapValues = () => {
        let from = selectFromValue;
        let to = selectToValue;

        if (typeof from === "undefined") {
            from = null;
        } else if (typeof to === "undefined") {
            to = null;
        }

        setSelectFromValue(to);
        setSelectToValue(from);
    }

    const valueToCalculate = (e) => {

        let value = e.target.value;

        //This repeats here to make sure that everytime the input changes, the value of it does not contain unwanted data.
        setInputValue(parseFloat(value.replace(/[^0-9.]/g, '')));
    }
    
    const submitConvertedData = () => {
        dispatch(currencyAction.setPostLoading(true));
        
        if(
        typeof selectFromValue === "undefined" || selectFromValue === null ||
        typeof selectToValue === "undefined" || selectToValue === null) {
            dispatch(currencyAction.setPostLoading(false));
            return;
        }

        let result = (selectToValue.currencyRate.value / selectFromValue.currencyRate.value ) * inputValue

        const objectToShow = {
            inputValue: Math.round(parseFloat(inputValue).toFixed(6) * 100) / 100,
            selectToValue,
            selectFromValue,
            result,
        }

        //This was a test to push data into an API and Database.
        //props.onSaveConvetion(objectToShow);

        setInputValue(parseFloat(inputValue).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        setResetInput(true);
        setResultObject(objectToShow);
        setShowResult(true);
        dispatch(currencyAction.setPostLoading(false));
    }


    return (
        <Card>
            <div className={classes.allInputs}>
                <div className={classes.labels}>
                    <label>Amount</label>
                </div>
                <div className="currency-flag currency-flag-usd"></div>
                        <InputGroup className={`mb-3 ${classes.inputGroup}`}>
                        <InputGroup.Text className={classes.symbol}>{!!selectFromValue ? selectFromValue.currencySymbol : "$"}</InputGroup.Text>
                                {resetInput ? 
                                <FormControl
                                onChange={valueToCalculate}
                                value={inputValue}
                                defaultValue={inputValue}
                                aria-label="Username"
                                aria-describedby= "basic-addon1"
                                /> :
                                <FormControl
                                onChange={valueToCalculate}
                                defaultValue={inputValue}
                                aria-label="Username"
                                aria-describedby= "basic-addon1"
                                />}

                        </InputGroup>
                    </div>
                <div className={classes.allInputs}>
                    <div className={classes.allInputs}>
                        <div className={classes.labels}>
                            <label>From</label>
                        </div>
                        <Select
                            value={selectFromValue}
                            onChange={onChangeSelectFrom}
                            className="basic-single"
                            classNamePrefix="select"
                            // defaultValue={props.currencyArray[0]}
                            name="color"
                            options={props.currencyArray}
                            styles={customStyles}
                            isClearable={true}
                            components={{
                                Menu: (props) => <components.Menu {...props} className={classes.menu} />
                            }}
                        />
                    </div>
                    <div className={classes.swap}>
                    <Button className={classes.buttonSwap} onClick={swapValues} variant="light">
                        <div className={classes.arrowLeft}></div>
                        <div className={classes.arrowRight}></div>
                    </Button>{' '}
                </div>
                <div className={classes.allInputs}>
                    <div className={classes.labels}>
                        <label>To</label>
                    </div>
                    <Select
                        value={selectToValue}
                        onChange={onChangeSelectTo}
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={props.currencyArray[0]}
                        name="color"
                        options={props.currencyArray}
                        isClearable={true}
                        styles={customStyles}
                        components={{
                            Menu: (props) => <components.Menu {...props} className={classes.menu} />
                        }}
                    />
                </div>
                </div>

                <div className={classes.convert}>
                   <Button onClick={submitConvertedData} disabled={isSubmittingResult} variant="primary">{isSubmittingResult ? 'Calculating...' : 'Convert'}</Button>{' '}
                </div>
                {!isSubmittingResult && showResult && <Result result={resultObject}/>}
        </Card>
    );
};

export default MainConverter;
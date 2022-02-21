import { createSlice } from "@reduxjs/toolkit";
import currencyNames from '../currencyNames';
import axios from 'axios';


const initialCurrencyState = {
    currencyRates: [],
    date: "",
    isPostingData: false
}


const currencySlice = createSlice({
    name: 'currency',
    initialState: initialCurrencyState,
    reducers: {
        replaceCurrency(state, action) {
  
            let newCurrencyArray = []

            for (const [key, values] of Object.entries(action.payload.data)) {

                let nameAndSymbol = currencyNames.find(value => value.code === key)

                //In case the currency names do not match with what the API brought
                if(typeof nameAndSymbol === "undefined") {
                    nameAndSymbol = {
                        name: "NOT FOUND",
                        code: 'ZZZ',
                        symbol: "$"
                    };
                }

                let currencyObject = {
                    currencyFlagURL: "https://wise.com/public-resources/assets/flags/rectangle/aed.png",
                    currencyID: key,
                    currencyRate: values,
                    currencySymbol: nameAndSymbol.symbol,
                    value: nameAndSymbol.name
                  };
                newCurrencyArray.push(currencyObject);

            }

            state.currencyRates = newCurrencyArray;
            
        },

        setPostLoading(state, action) {
            state.isPostingData = action.payload;
        }
    }
});


export const currencyAction = currencySlice.actions;

export const getCurrencyData = () => {
    return async dispatch => {
        const fetchData = async () => {

            //The API that gets the current values for the currency
            const response = await axios.get("https://freecurrencyapi.net/api/v2/latest?apikey=f0bb2a50-87b5-11ec-b07b-6fd7c46b25ee");

            if(response.statusText !== 'OK' && response.status !== 200) {
                console.log("There was an error", response);
            }
            return response.data;
        }

        try {
            const currencyData = await fetchData();
            dispatch(currencyAction.replaceCurrency(currencyData));
        } catch (error) {
            console.log(error, 'GET ERROR');
        }
    }
}

//This was a test to push data into an API and Database.
export const submitUserCalculation = (convertionObject) => {
    return async dispatch => {
        const saveData = async () => {

            const response = await axios.post("https://localhost:44318/api/Convertions", convertionObject);

            if(response.statusText !== 'OK' && response.status !== 200) {
                console.log("There was an error", response);
                dispatch(currencyAction.setPostLoading(false));
            } else {
                console.log(response);
                dispatch(currencyAction.setPostLoading(false));
            }
        }

        await saveData().catch(err => {
            console.log(err, 'POST ERROR');
            dispatch(currencyAction.setPostLoading(false));
        });
   
    }
}

export default currencySlice.reducer;
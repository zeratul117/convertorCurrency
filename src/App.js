import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrencyData, submitUserCalculation } from './store/currency-slice-action';
import Layout from './components/Layout/Layout';
import MainConverter from './components/Converter/MainConverter';
import { Spinner } from 'react-bootstrap';

function App() {

/*
Rate formular:

("TO" rate / "FROM" rate) * amount

*/


  const dispatch = useDispatch();
  const currencyData = useSelector(state => state.currency.currencyRates);
  const [value, setValue] = useState([]);
  const [showConverter, setShowConverter] = useState(false);

  useEffect(() => {

    dispatch(getCurrencyData());

  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      
      setValue(() => {
        let newArray = [];
        
        currencyData.forEach(element => {
          
          //This is to add a new value to the currency objects where you can have a DIV with the image of the currency + the ID of it + the name of the currency
          newArray.push({...element, label: (
            <div>
              <img 
              src={`https://wise.com/public-resources/assets/flags/rectangle/${element.currencyID.toLowerCase()}.png`} 
              height="20px" 
              width="30px"
              onError={(e) => e.target.src = "/netrual_flag.png"}
              /> {element.currencyID} - {element.value}
            </div>
          )});
        });
          return newArray;
      })
      
      setShowConverter(true);
    }, 1000);
  
  }, [currencyData]);

  //This was a test to push data into an API and Database.
  const handleSaveConvertion = (convertionObject) => {

    const objectToSave = {
      amountConverted: convertionObject.inputValue.toString(),
      currencyFrom: convertionObject.selectFromValue.value,
      currencyFromRate: convertionObject.selectFromValue.currencyRate.toString(),
      currencyTo: convertionObject.selectToValue.value,
      currencyToRate: convertionObject.selectToValue.currencyRate.toString(),
      userAgent: navigator.userAgent
    }

    dispatch(submitUserCalculation(objectToSave))

  }


  return (
    <div className="App">
      <Layout>
        {showConverter && <MainConverter currencyArray={value} onSaveConvetion={handleSaveConvertion}/>}
        {!showConverter && 
        <div className="loadingSpinner">
          <Spinner animation="border" variant="primary" />
        </div>
        }
      </Layout>
    </div>
  );
}

export default App;

import classes from './MainHeader.module.css';

const MainHeader = (props) => {
    return (
        <header className={classes.header}>
            <img src="https://cdn.iconscout.com/icon/free/png-256/currency-conversion-1824292-1545914.png" alt="image" />
            <h1>Currency Converter</h1>
        </header>
    );
};

export default MainHeader;
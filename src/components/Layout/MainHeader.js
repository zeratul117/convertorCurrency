import classes from './MainHeader.module.css';

const MainHeader = (props) => {
    return (
        <header className={classes.header}>
            <img src="/logo.png" alt="image" />
            <h1>Currency Converter</h1>
        </header>
    );
};

export default MainHeader;
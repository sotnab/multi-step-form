const Switch = ({ value, setValue }) => {
    const handleClick = () => {
        if (value === 0) {
            setValue(1)
        } else {
            setValue(0)
        }
    }

    const classes = ['switch']

    if (value === 1) {
        classes.push('switch--active')
    }

    return (
        <button className={classes.join(' ')} onClick={handleClick}>
            <div className="switch__btn"></div>
        </button>
    )
}

export default Switch
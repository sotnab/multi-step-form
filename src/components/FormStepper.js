import useFormContext from '../hooks/useFormContext'

const FormStepper = () => {
    const { state, steps, dispatch } = useFormContext()

    const handleClick = (index) => {
        dispatch({ type: 'SET_STEP', payload: index })
    }

    return (
        <div className="stepper">
            {steps.map((item, index) => {
                const classes = ['stepper__step']

                if (index === state.step) {
                    classes.push('stepper__step--active')
                }

                return (
                    <div className={classes.join(' ')} key={item.title} onClick={() => handleClick(index)}>
                        <span className="stepper__number">{index + 1}</span>
                        <div className="stepper__col">
                            <small className="stepper__small">STEP {index + 1}</small>
                            <strong className="stepper__strong">{item.title}</strong>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default FormStepper
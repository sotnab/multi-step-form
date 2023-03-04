import Switch from './Switch'

import useFormContext from '../hooks/useFormContext'

const SelectPlan = () => {
    const { state, plans, dispatch } = useFormContext()

    const handleClick = (index) => {
        dispatch({ type: 'SET_PLAN', payload: index })
    }

    return (
        <>
            <div className="select">
                {plans.map((item, index) => {
                    const classes = ['select__item']

                    if (index === state.plan) {
                        classes.push('select__item--active')
                    }

                    return (
                        <div className={classes.join(' ')} key={item.name} onClick={() => handleClick(index)}>
                            <img className="select__icon" src={item.icon} alt="plan icon" />
                            <strong className="select__name">{item.name}</strong>

                            {state.billing === 0 && (
                                <small className="select__price">${item.monthlyPrice}/mo</small>
                            )}

                            {state.billing === 1 && (
                                <>
                                    <small className="select__price">${item.yearlyPrice}/yr</small>
                                    <span className="select__discount">2 months free</span>
                                </>
                            )}
                        </div>
                    )
                })}
            </div>

            <div className="billing">
                <span className={['billing__name', state.billing === 0 ? 'billing__name--active' : ''].join(' ')}>
                    Monthly
                </span>

                <Switch
                    value={state.billing}
                    setValue={(value) => dispatch({ type: 'SET_BILLING', payload: value })}
                />

                <span className={['billing__name', state.billing === 1 ? 'billing__name--active' : ''].join(' ')}>
                    Yearly
                </span>
            </div>
        </>

    )
}

export default SelectPlan
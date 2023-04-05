import useFormContext from '../hooks/useFormContext'

const Summary = () => {
    const { state, plans, addOns, dispatch } = useFormContext()

    const selectedPlan = plans[state.plan]
    const selectedAddOns = Array.from(state.addOns).map(item => addOns[item])

    const goToPlans = (e) => {
        e.preventDefault()

        dispatch({ type: 'SET_STEP', payload: 1 })
    }

    const getTotalPrice = () => {
        let total = 0

        if (state.billing === 0) {
            total += selectedPlan.monthlyPrice
            total += selectedAddOns.reduce((a, b) => a + b.monthlyPrice, 0)
        }
        if (state.billing === 1) {
            total += selectedPlan.yearlyPrice
            total += selectedAddOns.reduce((a, b) => a + b.yearlyPrice, 0)
        }

        return total
    }

    return (
        <div className="summary">
            <div className="summary__options">
                <div className="summary__plan">
                    <div className="summary__details">
                        <strong className="summary__strong">
                            {selectedPlan.name}
                            ({state.billing === 0 ? 'Monthly' : 'Yearly'})
                        </strong>
                        <a href="/" className="summary__link" onClick={goToPlans}>Change</a>
                    </div>
                    <strong className="summary__strong">
                        {state.billing === 0 && `+$${selectedPlan.monthlyPrice}/mo`}
                        {state.billing === 1 && `+$${selectedPlan.yearlyPrice}/yr`}
                    </strong>
                </div>

                <hr className="summary__line" />

                {selectedAddOns.map((item) => (
                    <div className="summary__option" key={item.name}>
                        <span className="summary__small">{item.name}</span>
                        <span className="summary__option-price">
                            {state.billing === 0 && `+$${item.monthlyPrice}/mo`}
                            {state.billing === 1 && `+$${item.yearlyPrice}/yr`}
                        </span>
                    </div>
                ))}

                {selectedAddOns.length === 0 && (
                    <small className="summary__info">No Add Ons selected</small>
                )}
            </div>

            <div className="summary__total">
                <small className="summary__small">Total (per month)</small>
                <span className="summary__total-price">
                    +${getTotalPrice()}/{state.billing === 0 ? 'mo' : 'yr'}
                </span>
            </div>
        </div>
    )
}

export default Summary
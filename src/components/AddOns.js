import useFormContext from '../hooks/useFormContext'

import checkmark from '../images/icon-checkmark.svg'

const AddOns = () => {
    const { state, addOns, dispatch } = useFormContext()

    const handleClick = (index) => {
        dispatch({ type: 'TOGGLE_ADDON', payload: index })
    }

    return (
        <div className="addons">
            {addOns.map((item, index) => {
                const classes = ['addons__item']

                if(state.addOns.has(index)) {
                    classes.push('addons__item--active')
                }

                return (
                    <div className={classes.join(' ')} key={item.name} onClick={() => handleClick(index)}>
                        <img src={checkmark} alt="checkmark icon" className="addons__checkmark" />
                        <strong className="addons__name">{item.name}</strong>
                        <small className="addons__caption">{item.caption}</small>

                        {state.billing === 0 ? (
                            <span className="addons__price">+${item.monthlyPrice}/mo</span>
                        ) : (
                            <span className="addons__price">+${item.yearlyPrice}/yr</span>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default AddOns
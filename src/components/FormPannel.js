import useFormContext from '../hooks/useFormContext'

import PersonalData from './PersonalData'
import SelectPlan from './SelectPlan'
import AddOns from './AddOns'
import Summary from './Summary'
import Finish from './Finish'

const FormPannel = () => {
    const { state, steps, dispatch } = useFormContext()
    const { step, finished } = state

    const activeStep = steps[step]
    const isLastStep = step === steps.length - 1

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            {!finished && (<>
                <h1 className="form__title">{activeStep.subtitle}</h1>
                <p className="form__paragraph">{activeStep.caption}</p>

                <div className="form__main">
                    {(step === 0) && <PersonalData />}
                    {(step === 1) && <SelectPlan />}
                    {(step === 2) && <AddOns />}
                    {(step === 3) && <Summary />}
                </div>

                <div className="form__buttons">
                    {step > 0 && (
                        <button className="btn btn--outlined" onClick={() => dispatch({ type: 'GO_BACK' })}>
                            Go back
                        </button>
                    )}

                    {!isLastStep && (
                        <button className="btn btn--next" onClick={() => dispatch({ type: 'NEXT_STEP' })}>
                            Next Step
                        </button>
                    )}

                    {isLastStep && (
                        <button className="btn btn--confirm" onClick={() => dispatch({ type: 'FINISH' })}>
                            Confirm
                        </button>
                    )}
                </div>

            </>)}

            {finished && <Finish />}
        </form>
    )
}

export default FormPannel
import { useRef } from 'react'

import useFormContext from '../hooks/useFormContext'

import PersonalData from './PersonalData'
import SelectPlan from './SelectPlan'
import AddOns from './AddOns'
import Summary from './Summary'
import Finish from './Finish'

const FormPannel = () => {
    const { state, steps, dispatch } = useFormContext()
    const { step, finished } = state

    const form = useRef(null)

    const activeStep = steps[step]
    const isLastStep = step === steps.length - 1

    const sleep = (ms) => {
        return new Promise((resolve, reject) => setTimeout(resolve, ms))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleGoBack = async () => {
        animateSlideOut(0, 100)
        await sleep(200)
        animateSlideIn(-100, 0)
        dispatch({ type: 'GO_BACK' })
    }

    const handleGoForward = async () => {
        animateSlideOut(0, -100)
        await sleep(200)
        animateSlideIn(100, 0)
        dispatch({ type: 'NEXT_STEP' })
    }

    const handleFinish = () => {
        if (!state.name || !state.email || !state.phoneNumber) {
            dispatch({ type: 'SET_TRIED_TO_FINISH', payload: true })
            dispatch({ type: 'SET_STEP', payload: 0 })
        } else {
            dispatch({ type: 'FINISH' })
        }
    }

    const animateSlideIn = (from, to) => {
        form.current.animate(
            [{ transform: `translateX(${from}%)`, opacity: 0 },
            { transform: `translateX(${to}%)`, opacity: 1 }],
            { duration: 250, iterations: 1 }
        )
    }

    const animateSlideOut = (from, to) => {
        form.current.animate(
            [{ transform: `translateX(${from}%)`, opacity: 1 },
            { transform: `translateX(${to}%)`, opacity: 0 }],
            { duration: 250, iterations: 1 }
        )
    }

    return (
        <form className="form" onSubmit={handleSubmit} ref={form}>
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
                        <button className="btn btn--outlined" onClick={handleGoBack}>
                            Go back
                        </button>
                    )}

                    {!isLastStep && (
                        <button className="btn btn--next" onClick={handleGoForward}>
                            Next Step
                        </button>
                    )}

                    {isLastStep && (
                        <button className="btn btn--confirm" onClick={handleFinish}>
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
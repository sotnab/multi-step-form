import { createContext, useReducer } from 'react'

import arcadeIcon from '../images/icon-arcade.svg'
import advancedIcon from '../images/icon-advanced.svg'
import proIcon from '../images/icon-pro.svg'

export const FormContext = createContext({})

const steps = [
    { title: 'Your Info', subtitle: 'Personal info', caption: 'Please provide your name, email address, and phone number.' },
    { title: 'Select Plan', subtitle: 'Select your plan', caption: 'You have the option of monthly or yearly billing.' },
    { title: 'Add-Ons', subtitle: 'Pick add-ons', caption: 'Add-ons help enhance gaming experience.' },
    { title: 'Summary', subtitle: 'Finishing up', caption: 'Double-check everything looks OK before confirming.' },
]

const plans = [
    { name: 'Arcade', monthlyPrice: 9, yearlyPrice: 90, icon: arcadeIcon },
    { name: 'Advanced', monthlyPrice: 12, yearlyPrice: 120, icon: advancedIcon },
    { name: 'Pro', monthlyPrice: 15, yearlyPrice: 150, icon: proIcon }
]

const addOns = [
    { name: 'Online service', caption: 'Access to multiplayer games', monthlyPrice: 1, yearlyPrice: 10 },
    { name: 'Larger storage', caption: 'Extra 1TB of cloud save', monthlyPrice: 2, yearlyPrice: 20 },
    { name: 'Customizable profile', caption: 'Custom theme on your profile', monthlyPrice: 2, yearlyPrice: 20 }
]

const defaultData = {
    step: 0,
    finished: false,
    name: '',
    email: '',
    phoneNumber: '',
    plan: 0,
    billing: 0,
    addOns: new Set()
}


const formContextReducer = (state, action) => {
    if(state.finished) {
        return state
    }

    switch (action.type) {
        case 'NEXT_STEP':
            if (state.step < steps.length - 1) {
                state.step++
            }
            break

        case 'GO_BACK':
            if (state.step > 0) {
                state.step--
            }
            break

        case 'SET_STEP':
            if (action.payload >= 0 && action.payload < steps.length) {
                state.step = action.payload
            }
            break

        case 'SET_NAME':
            console.log('change')
            state.name = action.payload
            break

        case 'SET_EMAIL':
            state.email = action.payload
            break

        case 'SET_PHONE_NUMBER':
            state.phoneNumber = action.payload
            break

        case 'SET_PLAN':
            state.plan = action.payload
            break

        case 'SET_BILLING':
            state.billing = action.payload
            break

        case 'TOGGLE_ADDON':
            if(state.addOns.has(action.payload)) {
                state.addOns.delete(action.payload)
            } else {
                state.addOns.add(action.payload)
            }
            break

        case 'FINISH':
            state.finished = true
            break

        default:
            break
    }

    return { ...state }
}

const FormContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(formContextReducer, defaultData)

    return (
        <FormContext.Provider value={{ state, steps, plans, addOns, dispatch }}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContextProvider
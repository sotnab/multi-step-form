import { useEffect, useState } from 'react'
import useFormContext from '../hooks/useFormContext'

const PersonalData = () => {
    const { state, dispatch } = useFormContext()

    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')

    const validateName = () => {
        setNameError('')

        if (!state.name) {
            setNameError('This field is required')
        }
    }

    const validateEmail = () => {
        setEmailError('')

        if (!state.email) {
            setEmailError('This field is required')
        }
    }

    const validatePhoneNumber = () => {
        setPhoneNumberError('')

        if (!state.phoneNumber) {
            setPhoneNumberError('This field is required')
        }
    }

    useEffect(() => {
        if(!state.triedToFinish) {
            return
        }
        
        setTimeout(() => {
            validateName()
            validateEmail()
            validatePhoneNumber()
        }, 500)
    }, [])

    return (
        <div className="personal-data">
            <div className={['personal-data__field', nameError ? 'personal-data__field--error' : ''].join(' ')}>
                <div className="personal-data__bar">
                    <label className="personal-data__label" htmlFor="name-control">Name</label>
                    <span className="personal-data__error">{nameError}</span>
                </div>

                <input
                    type="text"
                    className="personal-data__control"
                    id="name-control"
                    placeholder="e.g. Stephen King"
                    value={state.name}
                    onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
                    onBlur={validateName}
                />
            </div>

            <div className={['personal-data__field', emailError ? 'personal-data__field--error' : ''].join(' ')}>
                <div className="personal-data__bar">
                    <label className="personal-data__label" htmlFor="email-control">Email Address</label>
                    <span className="personal-data__error">{emailError}</span>
                </div>

                <input
                    type="text"
                    className="personal-data__control"
                    id="email-control"
                    placeholder="e.g. stephenking@lorem.com"
                    value={state.email}
                    onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
                    onBlur={validateEmail}
                />
            </div>

            <div className={['personal-data__field', phoneNumberError ? 'personal-data__field--error' : ''].join(' ')}>
                <div className="personal-data__bar">
                    <label className="personal-data__label" htmlFor="phone-number-control">Phone Number</label>
                    <span className="personal-data__error">{phoneNumberError}</span>
                </div>

                <input
                    type="text"
                    className="personal-data__control"
                    id="phone-number-control"
                    placeholder="e.g. +1 234 567 890"
                    value={state.phoneNumber}
                    onChange={(e) => dispatch({ type: 'SET_PHONE_NUMBER', payload: e.target.value })}
                    onBlur={validatePhoneNumber}
                />
            </div>
        </div >
    )
}

export default PersonalData
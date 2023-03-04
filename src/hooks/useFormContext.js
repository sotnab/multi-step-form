import { useContext } from 'react'

import { FormContext } from '../context/FormContext'

const useFormContext = () => {
    const context = useContext(FormContext)

    if(!context) {
        throw Error('Unexpected usage of FormContext outside FormContext.Provider')
    }

    return context
}

export default useFormContext
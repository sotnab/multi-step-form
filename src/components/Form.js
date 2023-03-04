import FormContextProvider from '../context/FormContext'

import FormStepper from './FormStepper'
import FormPannel from './FormPannel'

const Form = () => {
    return (
        <div className="wrapper">
            <FormContextProvider>
                <FormStepper />
                <FormPannel />
            </FormContextProvider>
        </div>
    )
}

export default Form
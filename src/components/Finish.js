import finishIcon from '../images/icon-thank-you.svg'

const Finish = () => {
    return (
        <div className="finish">
            <img src={finishIcon} alt="Finish icon" className="finish__icon" />
            <h2 className="finish__title">Thank you!</h2>
            <p className="finish__text">
                Thanks for confirming your subscription! We hope you have
                fun using out platform. If you ever need support, please feel
                free to email us at support@loremgaming.com.
            </p>
        </div>
    )
}

export default Finish
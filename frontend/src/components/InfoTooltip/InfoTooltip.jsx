import union from "../../images/Union.svg"
import error from "../../images/UnionError.svg"

export const InfoTooltip = ({ isOpen, isError, onClose, name }) => {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup__opened" : ""}`}
    >
      <div className='popup__form'>
        <button
          type='button'
          className='popup__close'
          onClick={onClose}
        ></button>
        <div className='popup__form_inner'>
          <img
            className='popup__form_inner-img'
            alt='галочка'
            src={!isError ? union : error}
          />
          <p className='popup__header'>
            {!isError
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так!\nПопробуйте ещё раз."}
          </p>
        </div>
      </div>
    </div>
  )
}

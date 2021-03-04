import React from 'react';
import yesPath from '../images/yes.svg';
import noPath from '../images/no.svg';

function InfoTooltip({ isSuccess, isOpen, onClose }) {

  const className = `popup popup_type_input ${isOpen && 'popup_opened'}`;
  const centeredText = { textAlign: 'center' };
  return (
    <div className={className}>
      <div className='popup__forms popup__forms_type_input popup__forms_type_info'>
        <img src={isSuccess ? yesPath : noPath} alt="успешно" />
        <p className='popup__title' style={centeredText} >
          {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}
        </p>
        <button
          type="reset"
          className="popup__close-button popup__close-button_type_input"
          onClick={onClose}>
        </button>
      </div>
    </div>
  )
}
export default InfoTooltip;
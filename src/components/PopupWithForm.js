import React from 'react';

function PopupWithForm({title,name,submitText, isOpen, onClose, onSubmit, children}) {
    const className=`popup popup_type_${name} ${isOpen&& 'popup_opened'}`;
    return (
      <div className={className}>
        <form 
        name={name} 
        onSubmit={onSubmit}
        className="popup__forms popup__forms_type_input" 
        noValidate>
          <p className="popup__title">{title}</p>
          {children}
          <button type="submit" 
          className="popup__submit popup__submit_edit">
          {submitText}
          </button>
          <button type="reset" 
          className="popup__close-button popup__close-button_type_input" 
          onClick={onClose}/>
        </form>
      </div>
    );
}
export default PopupWithForm;
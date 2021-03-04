import React from 'react';


function ImagePopup({card, onClose}) {
  const className= `popup popup_type_image ${(Object.keys(card).length !==0) && 'popup_opened'}`;
  return (
    <div className={className}>
      <div className="popup__forms popup__forms_type_image">
        <button className="popup__close-button popup__close-button_type_image" type="reset" onClick={onClose}/>
        <img src={card.link} alt="Картинка в большом размере" className="popup__image" />
        <p className="popup__subtitle">{card.name}</p>
      </div>
    </div>
);
}
export default ImagePopup;
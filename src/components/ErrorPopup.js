import React from 'react';

function ErrorPopup({message}) {
  const className = `popup popup_type_error ${(message.length !==0) && 'popup_opened'}`;
  return (
    <div className={className}>
      <p className="popup__message">{message}</p>
    </div>
  );
}
export default ErrorPopup;
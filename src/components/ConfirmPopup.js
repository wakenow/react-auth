import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose, onConfirm }) {
  const [submitButtonText, setSubmitButtonText] = React.useState('Да');

  function handleSubmit(e) {
    setSubmitButtonText('Удаление...');
    e.preventDefault();
    onConfirm();
  }
  React.useEffect(() => {
    setSubmitButtonText('Да');
  }, [isOpen, setSubmitButtonText]);

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      submitText={submitButtonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  )
}
export default ConfirmPopup;
import React from 'react';
import PopupWithForm from './PopupWithForm';
import { Validator, validationConfig } from '../utils/Validator';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();
  const validatorRef = React.useRef();
  const [submitButtonText, setSubmitButtonText] = React.useState('Сохранить');

  React.useEffect(() => {
    setSubmitButtonText('Сохранить');
  }, [isOpen, setSubmitButtonText]);

  React.useEffect(() => {
    const form = document.forms.avatar;
    validatorRef.current = new Validator(validationConfig, form);
    validatorRef.current.enableValidation();
  }, []);

  function handleSubmit(e) {
    setSubmitButtonText('Сохранение...');
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }
  function handleClose() {
    avatarRef.current = '';
    validatorRef.current.clearErrors();
    onClose();
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      submitText={submitButtonText}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <input
        ref={avatarRef}
        name="link"
        className="popup__form popup__form_type_link"
        type="url"
        required
        placeholder="ссылка на картинку"
        autocomplete="off"
      />
      <span className="popup__error popup__error_type_link"></span>
    </PopupWithForm>
  )
}
export default EditAvatarPopup;
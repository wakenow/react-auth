import React from 'react';
import PopupWithForm from './PopupWithForm';
import { Validator, validationConfig } from '../utils/Validator';

function AddPlacePopup({ isOpen, submitButtonText, onClose, onAddPlace }) {
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');
  const validatorRef = React.useRef();

  React.useEffect(() => {
    setTitle('');
    setLink('');
  }, [isOpen, setTitle, setLink]);

  React.useEffect(() => {
    const form = document.querySelector('form[name="new-card"]');
    validatorRef.current = new Validator(validationConfig, form);
    validatorRef.current.enableValidation();
  }, []);

  function handleTitleInput(e) {
    setTitle(e.target.value);
  }
  function handleLinkInput(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(title, link);
  }
  function handleClose() {
    validatorRef.current.clearErrors();
    onClose();
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="new-card"
      submitText={submitButtonText}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <input
        value={title}
        onChange={handleTitleInput}
        name="place"
        className="popup__form popup__form_type_place"
        type="text"
        placeholder="название"
        required
        minLength="1"
        maxLength="30"
        autocomplete="off"
      />
      <span className="popup__error popup__error_type_place"></span>
      <input
        value={link}
        onChange={handleLinkInput}
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
export default AddPlacePopup;
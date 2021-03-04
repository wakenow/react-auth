import React from 'react';
import PopupWithForm from './PopupWithForm';
import { Validator, validationConfig } from '../utils/Validator';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [submitButtonText, setSubmitButtonText] = React.useState('Сохранить');
  const validatorRef = React.useRef();

  React.useEffect(() => {
    const form = document.forms.edit;
    validatorRef.current = new Validator(validationConfig, form);
    validatorRef.current.enableValidation();
  }, []);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setSubmitButtonText('Сохранить');
  }, [currentUser]);

  React.useEffect(() => {
    setSubmitButtonText('Сохранить');
  }, [isOpen]);

  function handleNameInput(e) {
    setName(e.target.value);
  }
  function handleDescriptionInput(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    setSubmitButtonText('Сохранение...');
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  function handleClose() {
    setName(currentUser.name);
    setDescription(currentUser.about);
    validatorRef.current.clearErrors();
    onClose();
  }

return (
  <PopupWithForm
  title="Редактировать профиль"
  name="edit"
  submitText={submitButtonText}
  onClose={handleClose}
  onSubmit={handleSubmit}
  isOpen={isOpen}
  >
       <input
        name="name"
        className="popup__form popup__form_type_name"
        type="text"
        required
        minLength="2"
        maxLength="40"
        autocomplete="off"
        value={name}
        onChange={handleNameInput}
      />
      <span className="popup__error popup__error_type_name"></span>
      <input
        name="bio"
        className="popup__form popup__form_type_bio"
        type="text"
        required
        minLength="2"
        maxLength="200"
        autocomplete="off"
        value={description}
        onChange={handleDescriptionInput}
      />
      <span className="popup__error popup__error_type_bio"></span>
    </PopupWithForm>
  )
}
export default EditProfilePopup;
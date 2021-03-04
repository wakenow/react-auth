import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import * as auth from '../utils/Auth.js';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import ErrorPopup from './ErrorPopup';
import InfoTooltip from './InfoTooltip';

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [addPlacePopupSubmitButtonText, setAddPlacePopupSubmitButtonText] = React.useState('Сохранить');
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [willBeDeletedCard, setWillBeDeletedCard] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '' });
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isInfoBoxOpened, setIsInfoBoxOpened] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);


  React.useEffect(() => {
    const userFromServer = api.getUserData();
    const cardsFromServer = api.getInitialCards();
    const dataDownload = [userFromServer, cardsFromServer];
    Promise.all(dataDownload)
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        setErrorMessage('Не удалось загрузить данные');
        setTimeout(() => { setErrorMessage('') }, 2000);
      });
  }, []);

  React.useEffect(() => {
    checkAuth();
  }, [])

  function checkAuth() {
    auth.checkToken()
      .then((res) => {
        setIsLoggedIn(true);
        setEmail(res.data.email);
        history.push('/');
      })
      .catch((err) => {
        console.log(err)
        history.push('/sign-in');
      });
  }
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        setErrorMessage('Ошибка связи с сервером');
        setTimeout(() => { setErrorMessage('') }, 2000);
      });
  }

  function handleCardDelete(card) {
    setIsConfirmPopupOpen(true);
    setWillBeDeletedCard(card);
  }

  function handleDeleteCardConfirmation() {
    const isOwn = willBeDeletedCard.owner._id === currentUser._id;
    if (isOwn) {
      api.deleteCard(willBeDeletedCard._id)
        .then(() => {
          const newCards = cards.filter((c) => {
            return (c._id !== willBeDeletedCard._id);
          });
          setCards(newCards);
          closeAllPopups();
        })
        .catch((err) => {
          setErrorMessage('Не удалось удалить карточку');
          setIsConfirmPopupOpen(false); 
          setIsConfirmPopupOpen(true);  
          setTimeout(() => { setErrorMessage('') }, 2000);
        });
    }
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
    setWillBeDeletedCard({});
  }

  function handleUpdateUser({ name, about }) {
    api.uploadUserProfileData(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        setErrorMessage('Не удалось обновить данные на сервере')
        setIsEditProfilePopupOpen(false);
        setIsEditProfilePopupOpen(true); 
        setTimeout(() => { setErrorMessage('') }, 2000);

      });
  }

  function handleUpdateAvatar(link) {
    api.avatarUpload({ link: link })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        setErrorMessage('Не удалось обновить фото профиля');
        setIsEditAvatarPopupOpen(false); 
        setIsEditAvatarPopupOpen(true);  
        setTimeout(() => { setErrorMessage('') }, 2000);
      })
  }

  function handleAddPlaceSubmit(title, link) {
    setAddPlacePopupSubmitButtonText('Сохранение...')
    api.addCard(title, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        setErrorMessage('Ошибка связи с сервером');
        setTimeout(() => { setErrorMessage('') }, 2000);
      })
      .finally(() => {
        setAddPlacePopupSubmitButtonText('Сохранить');
      });
  }

  function handleLogin(data) {
    setIsLoggedIn(true);
    setEmail(data.email);
    auth.login(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          history.push('/');
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoBoxOpened(true)
        console.log(err);
      })
  }

  function handleRegister(data) {
    auth.register(data)
      .then((res) => {
        setIsSuccess(true);
        setIsInfoBoxOpened(true);
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoBoxOpened(true)
      })
  }

  function handleCloseInfoBox() {
    setIsInfoBoxOpened(false);
    isSuccess && history.push('/sign-in');
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
       <div className="App">
        <div className="wrapper">
          <div className="page">
          <Switch>
            <Route exact path='/'>
              <Header email={email} onLogout={handleLogout} />
            </Route>
            <Route path='/:page'>
              <Header />
            </Route>
          </Switch>
          <Switch>
            <Route path='/sign-up'>
              <Register handleRegister={handleRegister} />
            </Route>
            <Route path='/sign-in'>
              <Login handleLogin={handleLogin} />
            </Route>
            <ProtectedRoute
              path='/'
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={isLoggedIn}
              component={Main}
            />
          </Switch>
          <Footer />
          <InfoTooltip isOpen={isInfoBoxOpened} isSuccess={isSuccess} onClose={handleCloseInfoBox} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            submitButtonText={addPlacePopupSubmitButtonText}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ConfirmPopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onConfirm={handleDeleteCardConfirmation}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <ErrorPopup
            message={errorMessage}
          />
        </div>
      </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

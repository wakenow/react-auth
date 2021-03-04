class Api {
    constructor({ userURL, cardsURL, token }) {
        this._userURL = userURL;
        this._cardsURL = cardsURL;
        this._token = token;
    }
    getUserData() {
        return fetch(this._userURL, {
                method: 'GET',
                headers: {
                    authorization: this._token
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка загрузки данных пользователя ${res.status}`);
                }
            });
    }

    getInitialCards() {
        return fetch(this._cardsURL, {
                method: 'GET',
                headers: {
                    authorization: this._token
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка связи с сервером ${res.status}`);
                }

            })
    }

    uploadUserProfileData(name, about) {
        return fetch(this._userURL, {
                method: 'PATCH',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка загрузки данных пользователя на сервер ${res.status}`);
                }
            })
    }
    addCard(name, link) {
        return fetch(this._cardsURL, {
                method: 'POST',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка загрузки карточки на сервер ${res.status}`);
                }
            })
    }

    deleteCard(id) {
        const cardDeleteURL = (this._cardsURL + `/${id}`);
        return fetch(cardDeleteURL, {
                method: 'DELETE',
                headers: {
                    authorization: this._token
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject('Ошибка удаления карточки');
                }
            })
    }
    changeLikeCardStatus(id, isLiked){
        const cardLikeURL = (this._cardsURL + `/likes/${id}`);
        console.log(cardLikeURL);
       if(isLiked){
          return fetch(cardLikeURL, {
                  method: 'DELETE',
                  headers: {
                      authorization: this._token
                  }
              })
              .then(res => {
                  if (res.ok) {
                      return res.json();
                  } else {
                      return Promise.reject('Ошибка связи с сервером');
                  }
              })
      }else{
       return fetch(cardLikeURL, {
               method: 'PUT',
               headers: {
                   authorization: this._token
               }
           })
           .then(res => {
               if (res.ok) {
                   return res.json();
               } else {
                   return Promise.reject('Ошибка связи с сервером');
               }
           })
       }
      }

    avatarUpload(url) {
        return fetch((this._userURL + `/avatar`), {
                method: 'PATCH',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: url.link,
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject('Ошибка загрузки аватара');
                }
            })
    }
}

const apiConfig = {
    userURL: 'https://mesto.nomoreparties.co/v1/cohort-17/users/me',
    cardsURL: 'https://mesto.nomoreparties.co/v1/cohort-17/cards',
    token: '9c5efa47-3aee-400f-b0b8-aef1a353a938'
}

const api = new Api(apiConfig);
export default api;
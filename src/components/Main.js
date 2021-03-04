import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
  

return (
    <main className="content">
    <section className="profile">
        <img src={currentUser.avatar}  alt="Фото профиля" className="profile__avatar" onClick={onEditAvatar}/>
            <div className="profile__profile-info">
                <div className="profile__name-wrapper">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="profile__profile-button" aria-label="Редактировать профиль" onClick={onEditProfile}/>
                </div>
                <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" aria-label="Добавить" onClick={onAddPlace}/>
    </section>
    <section>
       <ul className="elements">
            {cards.map((item)=>(
            <Card 
            key={item._id} 
            card={item} 
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
        />
        ))}
        </ul>
    </section>
    </main>
    );
}
export default Main;

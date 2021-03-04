import React from 'react';
import CurrentUserContext  from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser= React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__remove-button ${isOwn ? 'element__remove-button_visible' : 'element__remove-button_hidden'}`
  );
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${isLiked&& 'element__like-button_pressed'}`;
    function handleClick(){
        onCardClick(card);
    }
    function handleLike(){
      onCardLike(card);
  }
  function handleDelete(){
    onCardDelete(card);
}
    return (
      <li className="element">
        <img src={card.link} alt="Новая картинка" className="element__image" onClick={handleClick}/>
        <button className={cardDeleteButtonClassName} type="button" onClick={handleDelete}/>
        <div className="element__name">
          <h2 className="element__text">{card.name}</h2>
          <div className="element__like-container">
            <button className={cardLikeButtonClassName} type="button" onClick={handleLike}/>
            <p className="element__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </li>
    );
}
export default Card;

import React, {useState} from 'react';
import css from './SearchData.module.css';
import {Link} from 'react-router-dom';
import heartIcon from "../../assets/images/like.svg"
import heartFillIcon from "../../assets/images/heartFilled.png"
import {Rating} from "@mui/material";

const SearchData = (props) => {
  const {name, image, price, discountPrice, description, sold, id, rating} = props;
  const [value, setValue] = React.useState(0);

  // Initialize state for the like status
  const [isLiked, setIsLiked] = useState(() => {
    // Get existing liked items from localStorage
    const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
    // Check if the current item is liked
    return likedItems.some((item) => item.id === id);
  });

  // Function to handle the like button click
  const handleLike = () => {
    // Toggle the like status
    setIsLiked(!isLiked);

    // Get existing liked items from localStorage
    const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];

    // Add or remove the current item from the likedItems array
    if (isLiked) {
      // Remove the item from likedItems
      const updatedLikedItems = likedItems.filter((item) => item.id !== id);
      localStorage.setItem('likedItems', JSON.stringify(updatedLikedItems));
    } else {
      // Add the item to likedItems
      const newItem = {id, name, image, price, discountPrice, description, sold};
      const updatedLikedItems = [...likedItems, newItem];
      localStorage.setItem('likedItems', JSON.stringify(updatedLikedItems));
    }

    // ...
  };

  return (
      <div className={css.wrapper}>
        <div className={css.main}>
          <div className={css.image}>
            <img src={`${import.meta.env.VITE_BACK_URL}${image}`} alt={`${name}'s image`}/>
          </div>
          <div className={css.mainSection}>
            <h4 className={css.text}>{name}</h4>
            <div className={css.prices}>
              <p className={css.price}>${discountPrice}</p>
              <p className={css.discountPrice}>${price}</p>
            </div>
            <div className={css.ratingSection}>
              <Rating
                  value={rating}
                  readOnly
              />
              <div className={css.sold}>{sold} orders</div>
            </div>
            <div className={css.description}>{description.slice(0, 150)}</div>
            <Link to={`/products/${id}`}>
              <p className={css.details}>View details</p>
            </Link>
          </div>
        </div>
        <div className={css.buttonSection}>
          <button className={css.likeButton} onClick={handleLike}>
            <img src={isLiked ? heartFillIcon : heartIcon} alt="Heart icon"
                 className={isLiked ? css.likedIcon : css.unlikedIcon}/>
          </button>
        </div>
      </div>
  );
};

export default SearchData;
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import './LikeButton.css';

function LikeButton({ initialLikes = 0, onLike }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleClick = () => {
    if (!liked) {
      setLikes((prev) => prev + 1);
      setLiked(true);
      if (onLike) onLike(); // Compatible with older browsers
    }
  };

  return (
    <button
      className={`like-button ${liked ? 'is-liked' : ''}`}
      onClick={handleClick}
      aria-label={liked ? 'Unlike post' : 'Like post'}
    >
      <motion.div
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        className="like-button__icon-container"
      >
        <svg viewBox="0 0 24 24" className="like-button__icon">
          <motion.path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={liked ? '#ff4b4b' : 'none'}
            stroke={liked ? '#ff4b4b' : 'currentColor'}
            strokeWidth="2"
            initial={false}
            animate={{
              scale: liked ? [1, 1.2, 1] : 1,
              transition: { duration: 0.3 },
            }}
          />
        </svg>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.span
          key={likes} // Changes the key to trigger animations when likes change
          className="like-button__count"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          {likes}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

LikeButton.propTypes = {
  initialLikes: PropTypes.number,
  onLike: PropTypes.func,
};

export default LikeButton;

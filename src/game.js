import React, { useState, useEffect } from 'react';
import './game.css';

const Game = () => {
  const [playerPosition, setPlayerPosition] = useState(50);
  const [obstaclePosition, setObstaclePosition] = useState(100);
  const [isJumping, setIsJumping] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 500);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setObstaclePosition((prev) => (prev > 0 ? prev - 1 : 100));
      setBackgroundPosition((prev) => (prev - 1));
    }, 20);

    return () => {
        console.log('clearing interval');
        clearInterval(interval);
    }

  }, []);

  useEffect(() => {
    const checkCollision = () => {
      const playerLeft = playerPosition;
      const playerRight = playerPosition + 5; // Assuming player width is 5%
      const obstacleLeft = obstaclePosition;
      const obstacleRight = obstaclePosition + 5; // Assuming obstacle width is 5%

      if (
        playerRight > obstacleLeft &&
        playerLeft < obstacleRight &&
        !isJumping
      ) {
        setIsGameOver(true);
      }
    };

    const collisionInterval = setInterval(checkCollision, 20);
    return () => clearInterval(collisionInterval);
  }, [playerPosition, obstaclePosition, isJumping]);

//   if (isGameOver) {
//     return <div className="game-over">Game Over</div>;
//   }

  return (
    <div className="game-area" style={{ backgroundPositionX: `${backgroundPosition}%` }}>
        <h1>{backgroundPosition}</h1>
      <div className={`player ${isJumping ? 'jump' : ''}`} style={{ left: `${playerPosition}%` }}></div>
      <div className="obstacle" style={{ left: `${obstaclePosition}%` }}></div>
    </div>
  );
};

export default Game;
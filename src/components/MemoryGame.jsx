import { useState } from "react";

const createGameImages = (images) => {
  const imagePairs = images.concat(images);
  const shuffledImagePairs = imagePairs.sort(() => Math.random() - 0.5);
  return shuffledImagePairs;
};

const MemoryGame = ({ images: initialImage }) => {
  const [shuffledImagePairs, setShuffledImagePairs] = useState(
    createGameImages(initialImage)
  );

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Memory Game</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "150px 150px 150px 150px",
          gridTemplateRows: "150px 150px 150px 150px",
          columnGap: "20px",
          rowGap: "20px",
          margin: "auto",
          width: "660px",
        }}
      >
        {shuffledImagePairs.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Memory card ${index}`}
            style={{
              width: "100%",
              height: "100%",
              margin: "5px",
              objectFit: "cover",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;

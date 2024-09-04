import { useState } from "react";

const createGameImages = (images) => {
  const imagePairs = [...images, ...images];
  const shuffledImagePairs = imagePairs.sort(() => Math.random() - 0.5);
  return shuffledImagePairs.map((image, index) => ({
    id: index,
    src: image,
    isTurned: false,
    isMatched: false,
  }));
};

const MemoryGame = ({ images: initialImages }) => {
  const [gameImages, setGameImages] = useState(createGameImages(initialImages));

  const flipImage = (image) => {
    setGameImages((prevImages) => {
      const newImages = prevImages.map((prevImage) =>
        prevImage.id === image.id ? { ...prevImage, isTurned: true } : prevImage
      );
      return newImages;
    });
  };

  const markImagesAsMatched = (imageSource) => {
    setGameImages((prevImages) => {
      const newImages = prevImages.map((prevImage) =>
        prevImage.src === imageSource
          ? { ...prevImage, isMatched: true, isTurned: false }
          : prevImage
      );
      return newImages;
    });
  };

  const resetBoardAndFlipImage = (image) => {
    setGameImages((prevImages) => {
      const newImages = prevImages.map((prevImage) =>
        prevImage.id === image.id
          ? { ...prevImage, isTurned: true }
          : { ...prevImage, isTurned: false }
      );
      return newImages;
    });
  };

  const handleImageClick = (image) => {
    if (image.isTurned || image.isMatched) {
      // if user clicked an already visible image, do nothing
      return;
    }
    const imagesAlreadyTurned = gameImages.filter((image) => image.isTurned);
    if (imagesAlreadyTurned.length === 0) {
      // new round: just turn image and wait for the user to click another image
      flipImage(image);
      return;
    } else if (imagesAlreadyTurned.length === 1) {
      if (imagesAlreadyTurned[0].src === image.src) {
        // if user clicked the matching image, turn it around and keep it visible
        markImagesAsMatched(image.src);
      } else {
        // we don't have a match: reset
        flipImage(image);
      }
    } else {
      resetBoardAndFlipImage(image);
    }
  };

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
        {gameImages.map((image) =>
          image.isTurned || image.isMatched ? (
            <img
              key={image.id}
              src={image.src}
              style={{
                width: "100%",
                height: "100%",
                margin: "5px",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              key={image.id}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                margin: "5px",
                backgroundColor: "lightgray",
              }}
              onClick={() => handleImageClick(image)}
            ></div>
          )
        )}
      </div>
    </div>
  );
};

export default MemoryGame;

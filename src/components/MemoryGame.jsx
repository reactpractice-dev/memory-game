const MemoryGame = ({ images }) => {
  return (
    <div>
      <h1>Memory Game</h1>
      <p>Build your memory game!</p>
      <p>Here are the sample images you can use:</p>
      <div>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Memory card ${index}`}
            style={{
              width: "100px",
              height: "100px",
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

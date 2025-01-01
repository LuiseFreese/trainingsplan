const getRandomPhrase = (phrases) => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  };
  
  module.exports = getRandomPhrase;
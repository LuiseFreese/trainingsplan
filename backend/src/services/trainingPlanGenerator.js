const {
  longRunPhrases,
  tempoRunPhrases,
  intervalPhrases,
  easyRunPhrases,
  restPhrases,
  yogaPhrases
} = require('./phrases');

const generateTrainingPlan = require('./generateTrainingPlan');

module.exports = { generateTrainingPlan };
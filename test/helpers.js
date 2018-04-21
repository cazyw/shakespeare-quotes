const { ObjectID } = require('mongodb');

const quotes = [{
  _id: new ObjectID(),
  work: 'The Taming of the Shrew',
  act: '1',
  scene: '2',
  quote: 'O this learning, what a thing it is!',
  tags: ['learning', 'education', 'teaching']
},
{
  _id: new ObjectID(),
  work: 'Hamlet',
  act: '3',
  scene: '2',
  quote: 'Where love is great, the littlest doubts are fear. Where little fears grow great, great love grows there.',
  tags: ['love', 'fear', 'doubt', 'protect']
},
{
  _id: new ObjectID(),
  work: 'Henry IV Part 1',
  act: '1',
  scene: '2',
  quote: 'If all the year were playing holidays, to sport would be as tedious as to work; But when they seldom come, they wished-for come, and nothing pleaseth but rare accidents.',
  tags: ['holiday', 'accidents', 'rare', 'work', 'suprise']
}];

const validQuotes = [{
  work: 'Sonnet 50',
  act: '',
  scene: '',
  quote: 'For that same groan doth put this in my mind; My grief lies onward, and my joy behind.',
  tags: ['grief', 'joy']
},
{
  work: 'Henry V',
  act: '4',
  scene: '1',
  quote: 'I am afeard there are few die well that die in a battle...',
  tags: ['death', 'battle', 'war']
}];

const invalidQuotes = [
  {
    work: '',
    act: '',
    scene: '',
    quote: '',
    tags: []
  },
];

const caseQuotes = {
  work: 'Sonnet 50',
  act: '',
  scene: '',
  quote: 'For that same groan doth put this in my mind; My grief lies onward, and my joy behind.',
  tags: ['Grief', 'Joy']
};

const updatedQuotes = {
  work: 'Henry IV Part 1',
  act: '1',
  scene: '2',
  quote: 'If all the year were playing holidays, to sport would be as tedious as to work; But when they seldom come, they wished-for come, and nothing pleaseth but rare accidents.',
  tags: ['holiday', 'accidents', 'rare', 'work', 'suprise', 'hollow crown']
};

module.exports = {
  quotes,
  validQuotes,
  invalidQuotes,
  caseQuotes,
  updatedQuotes,
};
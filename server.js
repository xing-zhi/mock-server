const faker = require('faker');
const _ = require('lodash');
const express = require('express');

const app = express();

const { random: { uuid, words, word, number, image }, date, internet } = faker;
const { range } = _;

faker.locale = 'zh_CN';

const generateDistributeScore = () => ([
  { score: 1, count: number(10) },
  { score: 2, count: number(10) },
  { score: 3, count: number(10) },
  { score: 4, count: number(10) },
  { score: 5, count: number(10) }
]);

const generateEvaluation = () => ({
  content: words(),
  creator: {
    id: uuid(),
    name: '评价人名'
  },
  id: uuid(),
  score: number(5),
  createTime: date.past()
});

const generateEvaluations = () => {
  return range(number(10)).map(() => generateEvaluation());
};

app.get('/api/extranet/search', (req, res) => {
  const data = _.range(number(20)).map(() => ({
    id: faker.random.uuid(),
    cover: faker.random.image(),
    title: faker.random.words(),
    persons: ['分享者'],
    range: ['lesson', 'share'][number(1)]
  }));
  res.send({ code: 0, items: data });
});

app.get('/api/extranet/shares', (req, res) => {
  const shares = _.range(number(20)).map((_, index) => ({
    id: index,
    cover: image(),
    title: words(),
    persons: ['分享人'],
    type: 'share'
  }));
  res.send({ code: 0, shares, total: 50 });
});
app.get('/api/extranet/shareinfo', (req, res) => {
  const share = {
    id: uuid(),
    cover: image(),
    collectors: range(number(10)).map(() => uuid()),
    title: words(),
    brief: range(number(10)).map(() => words()).join('\n'),
    principals: [{
      id: uuid(),
      name: '负责人',
      email: internet.email()
    }],
    documents: range(number(5)).map(() => ({
      id: uuid(),
      cover: image(),
      name: words(),
      path: faker.internet.url(),
      type: 'pdf',
      persons: ['分享人']
    })),
    videos: range(number(5)).map(() => ({
      id: uuid(),
      cover: image(),
      name: words(),
      type: 'mp4',
      persons: ['分享人']
    })),
    evaluation: null
    //evaluation: generateEvaluation()
  };
  res.send({ code: 0, share });
});
app.get('/api/shares/:id/statistics', (req, res) => {
  const distributeScore = generateDistributeScore();

  res.send({ code: 0, distributeScore });
});
app.get('/api/shares/:id/evaluations', (req, res) => {
  const evaluations = generateEvaluations();

  res.send({ code: 0, evaluations, total: number(10) });
});
app.post('/api/shares/:id/evaluations', (req, res) => {
  const evaluation = generateEvaluation();
  res.send({ code: 0, evaluation });
});
app.put('/api/shares/:id/evaluations/:id', (req, res) => {
  const evaluation = generateEvaluation();
  res.send({ code: 0, evaluation });
});
app.delete('/api/shars/:id/evaluations/:id', (req, res) => {
  res.send({ code: 0 });
});

app.get('/api/extranet/lessons/mobile', (req, res) => {
  const lessons = _.range(number(20)).map((_, index) => ({
    id: index,
    cover: image(),
    title: words(),
    persons: ['分享人']
  }));
  res.send({ code: 0, lessons, total: 50 });
});

app.get('/api/open-courses/types', (req, res) => {
  const rootLessonType = {
    id: uuid(),
    children: range(number(5)).map((_, index) => ({
      id: index,
      label: word(),
      lessonCount: number(),
      children: range(number(10)).map(() => ({
        id: number(20),
        label: word(),
        lessonCount: number()
      }))
    }))
  };
  res.send({ code: 0, rootLessonType });
});

app.get('/api/extranet/lessoninfo', (req, res) => {
  const openCourse = {
    id: uuid(),
    cover: image(),
    collectors: range(number(10)).map(() => uuid()),
    title: words(),
    brief: range(number(10)).map(() => words()).join('\n'),
    principals: [{
      id: uuid(),
      name: '负责人',
      email: internet.email()
    }],
    documents: range(number(5)).map(() => ({
      id: uuid(),
      name: words(),
      path: faker.internet.url(),
      type: 'pdf'
    })),
    videos: range(number(5)).map(() => ({
      id: uuid(),
      cover: image(),
      name: words(),
      type: 'mp4'
    })),
    evaluation: null
    //evaluation: generateEvaluation()
  };
  res.send({ code: 0, openCourse });
});

app.get('/api/extranet/userinifo', (req, res) => {
  const user = {
    portrait: image(),
    Name: word()
  };
  res.send({ code: 0, user });
});

app.get('/api/extranet/user/collections', (req, res) => {
  const collections = _.range(number(20)).map((_, index) => ({
    id: index,
    cover: faker.random.image(),
    title: faker.random.words(),
    persons: ['分享人'],
    lessonType: {
      id: number(10),
      title: word()
    },
    range: ['lesson', 'share'][number(1)]
  }));
  res.send({ code: 0, collections });
});

app.get('/api/extranet/user/lessons', (req, res) => {
  const lessonsInCampOrTrain = _.range(number(20)).map((_, index) => ({
    guid: index,
    brief: words(),
    cover: image(),
    endTime: date.future(),
    title: words(),
    persons: ['分享者'],
    type: ['camp', 'train'][number(1)]
  }));
  res.send({ code: 0, lessonsInCampOrTrain });
});

app.get('/api/extranet/user/lessonInfo', (req, res) => {
  const lesson = {
    id: uuid(),
    cover: image(),
    collectors: range(number(10)).map(() => uuid()),
    title: words(),
    brief: range(number(10)).map(() => words()).join('\n'),
    principals: [{
      id: uuid(),
      name: '负责人',
      email: internet.email()
    }],
    documents: range(number(5)).map(() => ({
      id: uuid(),
      cover: image(),
      name: words(),
      path: faker.internet.url(),
      type: 'pdf'
    })),
    videos: range(number(5)).map(() => ({
      id: uuid(),
      cover: image(),
      name: words(),
      type: 'mp4'
    })),
    evaluation: null
    // evaluation: generateEvaluation()
  };
  res.send({ code: 0, lesson });
});

app.get('/api/extranet/actionlesson', (req, res) => {
  res.send({
    code: 0,
    collectors: range(number(10)).map(() => uuid())
  });
});
app.get('/api/extranet/actionshare', (req, res) => {
  res.send({
    code: 0,
    collectors: range(number(10)).map(() => uuid())
  });
});

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000');
});

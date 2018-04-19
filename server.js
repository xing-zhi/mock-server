const path = require('path');
const faker = require('faker');
const _ = require('lodash');
const express = require('express');

const pathResolve = (...p) => path.resolve(__dirname, ...p);

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

app.use(express.static(pathResolve('public')));

app.get('/out_dyschool/Search', (req, res) => {
  const data = _.range(number(20)).map(() => ({
    id: faker.random.uuid(),
    cover: '/static/imgs/test.jpg',
    title: faker.random.words(),
    persons: ['分享者'],
    range: ['lesson', 'share'][0]
  }));
  res.send({ code: 0, data: { results: data } });
});

app.get('/out_dyschool/Shares', (req, res) => {
  const shares = _.range(number(20)).map((_, index) => ({
    id: index,
    cover: '/static/imgs/test.jpg',
    title: words(),
    persons: ['分享人'],
    type: 'share',
    idForClient: 'share-1',
    hasMaterial: true
  }));
  res.send({ code: 0, data: { shares, total: 50 } });
});
app.get('/out_dyschool/ShareInfoV2', (req, res) => {
  const share = {
    id: uuid(),
    cover: '/static/imgs/test.jpg',
    collectors: range(number(10)).map(() => uuid()),
    title: words(),
    brief: range(number(10)).map(() => words()).join('\n'),
    speakers: [{
      id: uuid(),
      name: '负责人',
      email: internet.email()
    }],
    documents: [],// range(number(5)).map(() => ({
    //   id: uuid(),
    //   cover: '/static/imgs/test.jpg',
    //   name: words(),
    //   path: faker.internet.url(),
    //   type: 'pdf',
    //   persons: ['分享人']
    // })),
    videos: [],// range(number(5)).map(() => ({
    //   id: uuid(),
    //   cover: '/static/imgs/test.jpg',
    //   name: words(),
    //   type: 'mp4',
    //   persons: ['分享人'],
    //   publicPath: '/out_dyschool/video'
    // })),
    outsideSpeakers: [],
    //evaluation: null
    evaluation: generateEvaluation()
  };
  res.send({ code: 0, data: { share } });
});
app.get('/out_dyschool/ShareStatistics', (req, res) => {
  const distributeScore = generateDistributeScore();

  res.send({ code: 0, data: { distributeScore } });
});
app.get('/out_dyschool/LessonStatistics', (req, res) => {
  const distributeScore = generateDistributeScore();

  res.send({ code: 0, data: { distributeScore } });
});
app.get('/out_dyschool/UserLessonStatistics', (req, res) => {
  const distributeScore = generateDistributeScore();

  res.send({ code: 0, data: { distributeScore } });
});
app.get('/out_dyschool/ShareEvaluations', (req, res) => {
  const evaluations = generateEvaluations();

  res.send({ code: 0, data: { evaluations, total: number(10) } });
});
app.delete('/out_dyschool/ShareDeleteEvaluation', (req, res) => {
  res.send({ code: 0 });
});
app.get('/out_dyschool/LessonEvaluations', (req, res) => {
  const evaluations = generateEvaluations();

  res.send({ code: 0, data: { evaluations, total: number(10) } });
});
app.get('/out_dyschool/UserLessonEvaluations', (req, res) => {
  const evaluations = generateEvaluations();

  res.send({ code: 0, data: { evaluations, total: number(10) } });
});
app.post('/out_dyschool/ShareAddEvaluation', (req, res) => {
  const evaluation = generateEvaluation();
  res.send({ code: 0, data: { evaluation } });
});
app.post('/out_dyschool/LessonAddEvaluation', (req, res) => {
  const evaluation = generateEvaluation();
  res.send({ code: 0, data: { evaluation } });
});
app.post('/out_dyschool/UserLessonAddEvaluation', (req, res) => {
  const evaluation = generateEvaluation();
  res.send({ code: 0, data: { evaluation } });
});
app.get('/out_dyschool/UserLessonEvaluationsMine', (req, res) => {
  const myEvaluation = {
    id: uuid(),
    createTime: date.past(),
    lessonEvaluation: {
      content: words(),
      evaluationItems: _.range(number(4)).map(() => ({
        id: uuid(),
        score: number(5),
        title: '一二三四五六'
      }))
    },
    teacherEvaluations: _.range(number(3)).map(() => ({
      evaluationItems: _.range(number(3)).map(() => ({
        id: uuid(),
        score: number(5),
        title: word()
      })),
      teacher: {
        id: uuid(),
        name: word()
      }
    })),
    templateCode: number()
  };
  res.send({ code: 0, data: { myEvaluation } });
});
app.delete('/out_dyschool/shars/:id/evaluations/:id', (req, res) => {
  res.send({ code: 0 });
});

app.get('/out_dyschool/LessonsOpenMobile', (req, res) => {
  const lessons = _.range(number(20)).map((_, index) => ({
    id: index,
    cover: '/static/imgs/test.jpg',
    title: words(),
    persons: ['分享人'],
    idForClient: 'openlesson-1',
    hasMaterial: true
  }));
  res.send({ code: 0, data: { lessons, total: 50 } });
});
app.get('/LessonsOpenMobile', (req, res) => {
  const lessons = _.range(number(20)).map((_, index) => ({
    id: index,
    cover: '/static/imgs/test.jpg',
    title: words(),
    persons: ['分享人'],
    idForClient: 'openlesson-1'
  }));
  res.send({ code: 0, data: { lessons, total: 50 } });
});
app.get('/out_dyschool/LessonsOpenPC', (req, res) => {
  const lessons = _.range(number(20)).map((_, index) => ({
    id: index,
    cover: '/static/imgs/test.jpg',
    title: words(),
    persons: ['分享人'],
    idForClient: 'openlesson-1'
  }));
  res.send({ code: 0, data: { lessons, total: 50 } });
});

app.get('/out_dyschool/LessonTypes', (req, res) => {
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
  res.send({ code: 0, data: { rootLessonType } });
});

app.get('/out_dyschool/LessonInfo', (req, res) => {
  const lesson = {
    id: uuid(),
    cover: '/static/imgs/test.jpg',
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
      cover: '/static/imgs/test.jpg',
      name: words(),
      type: 'mp4',
      publicPath: '/out_dyschool/video'
    })),
    evaluation: null
    //evaluation: generateEvaluation()
  };
  res.send({ code: 0, data: { lesson } });
});

app.get('/out_dyschool/UserInfomation', (req, res) => {
  const user = {
    portrait: '/static/imgs/test.jpg',
    Name: word()
  };
  res.send({ code: 0, data: { user } });
});

app.get('/out_dyschool/UserCollections', (req, res) => {
  const collections = _.range(number(20)).map((_, index) => ({
    id: index,
    cover: '/static/imgs/test.jpg',
    title: faker.random.words(),
    persons: ['分享人'],
    lessonType: {
      id: number(10),
      title: word()
    },
    hasMaterial: true,
    range: ['lesson', 'share'][number(1)]
  }));
  res.send({ code: 0, data: { collections } });
});

app.get('/out_dyschool/UserLessons', (req, res) => {
  const lessonsInCampOrTrain = _.range(number(20)).map((_, index) => ({
    guid: index,
    brief: words(),
    cover: '/static/imgs/test.jpg',
    endTime: date.future(),
    title: words(),
    persons: ['分享者'],
    type: ['camp', 'train'][number(1)],
    idForClient: 'camp-1-lesson-1'
  }));
  res.send({ code: 0, data: { lessonsInCampOrTrain } });
});

app.get('/out_dyschool/UserLessonInfo', (req, res) => {
  const lesson = {
    id: uuid(),
    cover: '/static/imgs/test.jpg',
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
      cover: '/static/imgs/test.jpg',
      name: words(),
      path: faker.internet.url(),
      type: 'pdf'
    })),
    videos: range(number(5)).map(() => ({
      id: uuid(),
      cover: '/static/imgs/test.jpg',
      name: words(),
      type: 'mp4',
      publicPath: '/out_dyschool/video'
    })),
    evaluation: null
    // evaluation: generateEvaluation()
  };
  res.send({ code: 0, data: { lesson } });
});

app.get('/out_dyschool/ActionOnLesson', (req, res) => {
  res.send({
    code: 0,
    data: { collectors: range(number(10)).map(() => uuid()) }
  });
});
app.get('/out_dyschool/ActionOnShareV2', (req, res) => {
  res.send({
    code: 0,
    data: { collectors: range(number(10)).map(() => uuid()) }
  });
});

app.get('/out_dyschool/GetAllOfflinelessonByStudent', (req, res) => {
  const offlineLessons = _.range(number(20)).map((_, index) => ({
    id: index,
    lessonTitle: words(),
    lessonType: 1,
    time:{
      start: [new Date(), new Date('2018/2/23'), new Date('2018/3/25'), new Date('2018/3/04'), new Date('2018/3/10'), new Date('2018/4/10')][number(4)],
      end: date.future()
    },
    location: word(),
    lecturers: [{ id: 1, name: '分享者'}],
    campOrTrainName: words()
  })).sort((a, b) => {
    return a.time.start.getTime() - b.time.end.getTime();
  });
  res.send({ code: 0, data: { offlineLessons } });
});

app.get('/out_dyschool/video/cover.jpg', (req, res) => {
  res.sendFile(pathResolve('./test.jpg'));
})


app.listen(3000, () => {
  console.log('http://127.0.0.1:3000');
});

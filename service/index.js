const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// Rewards are saved in memory and disappear whenever the service is restarted.
let rewards = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    await DB.updateUserRemoveAuth(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// GetGoals
apiRouter.get('/goals', verifyAuth, async (req, res) => {
  const goals = await DB.getUserGoals(req.user);
  res.send(goals);
});

// SubmitGoal
apiRouter.post('/goal', verifyAuth, async (req, res) => {
  const goals = await updateGoals(req.body, req.user);
  res.send(goals);
});

// UpdateGoal updates progress for one of the authenticated user's goals.
apiRouter.put('/goal/:id', verifyAuth, async (req, res) => {
  const progress = Number(req.body.progress);
  if (!Number.isFinite(progress) || progress < 0) return res.status(400).send({ msg: 'Invalid progress' });

  const goal = await DB.updateGoal(req.params.id, req.user.email, progress);
  if (!goal) return res.status(404).send({ msg: 'Goal not found' });

  if (goal.completed) {
    const goalId = goal._id.toString();
    rewards = rewards.map((reward) => (
      reward.goal === goalId && reward.username === req.user.email
        ? { ...reward, status: 'unlocked' }
        : reward
    ));
  }

  res.send(await DB.getUserGoals(req.user));
});

// GetRewards
apiRouter.get('/rewards', verifyAuth, async (req, res) => {
  const rewards = await DB.getUserRewards(req.user);
  res.send(rewards);
});

// SubmitReward
apiRouter.post('/reward', verifyAuth, async (req, res) => {
  const rewards = await updateRewards(req.body, req.user);
  res.send(rewards);
});

// DeleteReward removes an authenticated user's reward after it is enjoyed.
apiRouter.delete('/reward/:id', verifyAuth, (req, res) => {
  const reward = rewards.find((savedReward) => (
    savedReward.id === req.params.id && savedReward.username === req.user.email
  ));
  if (!reward) return res.status(404).send({ msg: 'Reward not found' });

  rewards = rewards.filter((savedReward) => savedReward !== reward);
  res.status(204).end();
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// updateGoals adds a new goal to goals.
async function updateGoals(newGoal, user) {
  await DB.addGoal({ ...newGoal, username: user.email });
  return DB.getUserGoals(user);
}

// updateRewards adds a new reward to rewards.
async function updateRewards(newReward, user) {
  await DB.addReward({ ...newReward, username: user.email });
  return DB.getUserRewards(user);
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: false, //TO-DO: change to true before deploying to production
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const { MongoClient, ObjectId } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const goalCollection = db.collection('goal');
const rewardCollection = db.collection('reward');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

async function addGoal(goal) {
  return goalCollection.insertOne(goal);
}

function getUserGoals(user) {
  const query = { username: user.email };
  const options = {};
  const cursor = goalCollection.find(query, options);
  return cursor.toArray();
}

async function updateGoal(id, username, value) {
  if (!ObjectId.isValid(id)) return null;

  const result = await goalCollection.findOneAndUpdate(
    { _id: new ObjectId(id), username },
    { $set: { progress: value } },
    { returnDocument: 'after' },
  );

  if (result && value >= Number(result.target)) {
    await goalCollection.deleteOne({ _id: result._id, username });
    result.completed = true;
  }

  return result;
}

async function addReward(reward) {
  return rewardCollection.insertOne(reward);
}

async function unlockRewards(goalId, username) {
  const result = await rewardCollection.updateMany(
    { goalId, username },
    { $set: { status: 'unlocked' } },
  );
  return result.modifiedCount;
}

async function deleteReward(id, username) {
  if (!ObjectId.isValid(id)) return false;
  const result = await rewardCollection.deleteOne({ _id: new ObjectId(id), username });
  return result.deletedCount === 1;
}

function getUserRewards(user) {
  const query = { username: user.email };
  const options = {};
  const cursor = rewardCollection.find(query, options);
  return cursor.toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  addGoal,
  getUserGoals,
  updateGoal,
  addReward,
  unlockRewards,
  getUserRewards,
  deleteReward,
};

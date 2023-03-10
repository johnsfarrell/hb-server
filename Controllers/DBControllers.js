const { MongoClient, ObjectId } = require("mongodb");

const url = process.env.MONGODBURL;
const client = new MongoClient(url);

const db = async (req, res) => {
  const httpMethod = req.method;
  let id2 = Math.floor(Math.random() * (10000000000 - 1000000000) + 1000000000);
  try {
    await client.connect();
    switch (httpMethod) {
      case "GET":
        const id = req.params.id;
        if (!id) {
          (await client.db("stories").collection("stories").find()).then(
            (info) => {
              res.status(200).json({ result: info });
            }
          );
        } else {
          (
            await client.db("stories").collection("stories").find({ name: id })
          ).then((info) => {
            res.status(200).json({ result: info });
          });
        }
        break;
      case "POST":
        postStory(
          client,
          req.body.title,
          req.body.story,
          req.body.views,
          id2,
          new Date()
        ).then((info) => {
          res.status(200).json({ result: id2 });
        });
        break;
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end();
    }
  } catch (e) {
    console.error(e);
  }
};

async function postStory(client, title, story, views, id, date) {
  const entry = {
    title: title,
    story: story,
    views: views,
    id: id,
    date: date,
  };
  const result = await client
    .db("stories")
    .collection("stories")
    .insertOne(entry);
  console.log("entry added with id: " + String(result.insertedID));
  return result;
}

const getStory = async (req, res) => {
  await client.connect();
  const id = req.params.id;
  client
    .db("stories")
    .collection("stories")
    .findOne({ id: parseInt(id) })
    .then((info) => {
      res.status(200).json({ result: info });
    })
    .catch((err) => {
      res.status(400);
    });
};

const incrementStoryViews = async (req, res) => {
  await client.connect();
  const id = req.params.id;
  client
    .db("stories")
    .collection("stories")
    .findOneAndUpdate(
      { id: parseInt(id) },
      { $inc: { views: 1 } },
      { returnOriginal: false }
    )
    .then((info) => {
      res.status(200).json({ result: info });
    })
    .catch((err) => {
      res.status(400);
    });
};

const getRecentStory = async (req, res) => {
  try {
    await client.connect();
    const info = await client
      .db("stories")
      .collection("stories")
      .find({})
      .sort({ date: -1 })
      .limit(6)
      .toArray();
    res.status(200).json({ result: info });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const getPopularStory = async (req, res) => {
  try {
    await client.connect();
    const info = await client
      .db("stories")
      .collection("stories")
      .find({})
      .sort({ views: -1 })
      .limit(3)
      .toArray();
    res.status(200).json({ result: info });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = {
  db,
  getRecentStory,
  getPopularStory,
  getStory,
  incrementStoryViews,
};

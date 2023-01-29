const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://admin1:1234@cluster0.dxyq9u6.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

const db = async (req, res) => {
  const httpMethod = req.method;

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
          String(new Date())
        ).then((info) => {
          res.status(200).json({ result: info });
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

async function postStory(client, title, story, views, date) {
  const entry = { title: title, story: story, views: views, date: date };
  const result = await client
    .db("stories")
    .collection("stories")
    .insertOne(entry);
  console.log("entry added with id: " + String(result.insertedID));
  return result;
}

const getStory = async (req, res) => {
  const id = req.params.id;
  client
    .db("stories")
    .collection("stories")
    .find({ _id: id })
    .then((info) => {
      res.status(200).json({ result: info });
    })
    .catch((err) => {
      res.status(400);
    });
};

const getRecentStory = async (req, res) => {
  client
    .db("stories")
    .collection("stories")
    .find()
    .sort({ date: -1 })
    .limit(10)
    .then((info) => {
      res.status(200).json({ result: info });
    })
    .catch((err) => {
      res.status(400);
    });
};

module.exports = {
  db,
  getRecentStory,
  getStory,
};

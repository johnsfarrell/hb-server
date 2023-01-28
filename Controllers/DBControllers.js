const {MongoClient} = require('mongodb');

const url = "mongodb+srv://admin:Olgl4r2lEkYvlr3c@cluster0.dxyq9u6.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

const db = async (req, res) => {
   const httpMethod = req.method;

   try{
    await client.connect();
    switch(httpMethod)
    {
        case "GET":
            const id = req.params.id;
            break;
        case "POST":
            await postStory(client, req.body.title, req.body.story, req.body.views, String( new Date())).then((info) =>   
            {
                res.status(200).json({result: info});
            })
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end();
    }
   } 
   catch (e)
   {
    console.error(e);
   }
   finally{
    await client.close();

   }
    
};

async function postStory(client, title, story, views, date)
{
    const entry = { title: title, story: story, views: views, date: date};
    const result = await client.db("stories").collection("stories").insertOne(entry);
    console.log("entry added with id: " + String(result.insertedID))
    return result;
}

module.exports = {
    db,
};
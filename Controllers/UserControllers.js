const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const test = async (req, res) => {
  let name = req.body.name;
  let activity = req.body.activity;
  let location = req.body.location;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(name, activity, location),
      temperature: 0.9,
      max_tokens: 4000,
    });

    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with Generative AI request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
};

function generatePrompt(name, activity, location) {
  const capitalName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return `Write a very scary ghost story about a person named 
  ${capitalName} who likes to do ${activity} in ${location}. Also generate a title for the story`;
}

//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
module.exports = {
  test,
};

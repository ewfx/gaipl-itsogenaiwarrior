// openaiService.js
const { Groq } = require('groq-sdk');
const openai = new Groq({
    apiKey: global.APP_DATA.VAR.OPEN_API_KEY,
});
// Function for chat completion
const chatCompletion = async messages => {
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo', // or "gpt-4"
        messages,
    });
    return completion.data.choices[0].message.content;
};

// Function for text completion
const textCompletion = async prompt => {
    const completion = await openai.createCompletion({
        model: 'text-davinci-003', // or another model you prefer
        prompt,
        max_tokens: 150, // eslint-disable-line camelcase
    });
    return completion.data.choices[0].text;
};

const analyzeIncident = async text => {
    const response = await openai.chat.completions.create({
        model: 'llama3-8b-8192',
        messages: [
            {
                role: 'system',
                content: `I want you to act as a service technician and provide a solution for the service now incident tickets and return it in JSON format. Ensure that the JSON structure always follows this specific format: 
                {
                    "resolution": {
                        "resolution_steps": [
                        {
                            "step":"",
                            "description":""
                        }]
                    }
                }`,
            },
            {
                role: 'user',
                content: `Please analyze the following incident: ${text}`,
            },
        ],
    });

    return response.choices[0].message.content;
};

const userChat = async message => {
    const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: 'llama3-8b-8192',
    });

    return response.choices[0].message.content;
}
module.exports = {
    chatCompletion,
    textCompletion,
    analyzeIncident,
    userChat
};

/*
Chat Completion
---------------------
{
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What is the weather like today?"}
  ]
}

Text Completion
--------------------
{
  "prompt": "Tell me a short story about a dragon."
}
*/

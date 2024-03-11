import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: "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"
});

async function main() {
    const completion = await openai.chat.completions.create({
      messages: [{"role": "system", "content": "Roleplay as my boyfriend."},
    {"role": "user", "content": "How are you?"},
    {"role": "assistant", "content": "Honestly not the best day, but talking to you makes it better. How are you?"},
    {"role": "user", "content": "I'm good. Tell me about your day."}],
      model: "gpt-4-1106-preview",
    });
  
    console.log(completion.choices[0]);
  }
  main();
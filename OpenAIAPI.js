import OpenAI from "openai";

const openai = new OpenAI();

const apiKey = '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';

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": "Roleplay as my boyfriend."},
        {"role": "user", "content": "How are you today?"}],
    model: "gpt-4-1106-preview",
  });

  console.log(completion.choices[0]);
}
main();
// Import OpenAI
import OpenAI from 'openai';

// Initialize OpenAI with your API key
const openai = new OpenAI({
    apiKey: "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"
});

// Function to handle sending messages
async function sendMessage() {
    // Get user input
    var userInput = document.getElementById("userInput").value;
    
    // Display user message in chat history
    displayMessage(userInput, 'user');

    // Call function to generate AI response and display it
    await generateResponse(userInput);
}

// Function to display messages in the chat history
function displayMessage(message, sender) {
    var chatHistory = document.querySelector('.chat-history');
    var messageElement = document.createElement('div');
    messageElement.classList.add('message');

    if (sender === 'user') {
        messageElement.classList.add('user-message');
    } else {
        messageElement.classList.add('bot-message');
    }

    messageElement.textContent = message;
    chatHistory.appendChild(messageElement);
}

// Function to generate AI response
async function generateResponse(userInput) {
    try {
        // Call the API function to get AI response
        const response = await AIResponse(userInput);
        
        // Display AI response in chat history
        displayMessage(response, 'bot');
    } catch (error) {
        console.error("Error generating AI response:", error);
    }
}

// Function to call OpenAI API and get response
async function AIResponse(userInput) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {"role": "system", "content": "Roleplay as my boyfriend."},
                {"role": "user", "content": userInput}
            ],
            model: "gpt-4-1106-preview",
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Error getting AI response:", error);
        throw error;
    }
}


// Scroll chat history to the bottom when the page loads
window.onload = function() {
    var chatHistory = document.querySelector('.chat-history');
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function getTime()
{
    var d = new Date();
    var n = d.toLocaleTimeString();
    return n;
}

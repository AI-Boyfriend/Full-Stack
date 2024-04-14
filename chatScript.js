// Function to handle sending messages
function sendMessage() {
    // Get user input
    var userInput = document.getElementById("userInput").value;
    
    // Display user message in chat history
    displayMessage(userInput, 'user');

    // Call function to generate AI response
    generateResponse(userInput);
}

// Function to display messages in the chat history
function displayMessage(message, sender) {
    var chatHistory = document.querySelector('.chat-history');
    var messageElement = document.createElement('div');
    messageElement.classList.add('message');

    if (sender === 'user') {
        messageElement.classList.add('msg.sent');
    } else {
        messageElement.classList.add('msg.rcvd');
    }

    messageElement.textContent = message;
    chatHistory.appendChild(messageElement);
}


// Function to generate AI response
function generateResponse(userInput) {
    // Dummy response for now
    var response = "That's sweet!";
    
    // Display AI response in chat history
    displayMessage(response, 'bot');
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

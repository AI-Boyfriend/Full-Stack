const chatbox = document.querySelector(".chat-container .chat-box");
const inputRecorder = document.querySelector(".input-recorder .input-msg");
const chatInput = document.querySelector(".input-container textarea");
const sendChatBtn = document.querySelector(".input-container span");


var bfName = localStorage.getItem('boyfriendName');

var spanElement = document.getElementById("bf-name").getElementsByTagName("span")[0];
spanElement.innerHTML = bfName;

var spanElement = document.getElementById("bf-name-bg").getElementsByTagName("span")[0];
spanElement.innerHTML = bfName;

var personalities = localStorage.getItem('personalities');
var talk = localStorage.getItem('talk');
var hobbies = localStorage.getItem('hobbies');
var emotion = localStorage.getItem('emotion');

var bfImageNew = localStorage.getItem('bfImage');
var bfImage = document.getElementById("bf");
bfImage.src = bfImageNew;

let userMessage = null; // Variable to store user's message
const API_KEY = "ASK BRANDON FOR API KEY";
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("p");
    chatLi.classList.add("chat", `${className}`);
    chatLi.textContent = message;
    return chatLi; // return chat <li> element
}

let conversationMemory = [];
const MAX_MEMORY_SIZE = 5;

const generateResponse = (userMessage) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4-1106-preview",
            //model: "gpt-3.5-turbo",
            messages: [{role: "system", content: "Roleplay as my boyfriend. Your name is " + bfName + ". The user's name is Brandon. Your personalities are " 
            + personalities + ". The ways you talk to the user are " + talk + ". The users hobbies are " + hobbies + ". Make conversations around their hobbies. "
            + "The emotional supprt you give is " + emotion + ". Respond with at most 2 sentences."},
            {role: "assistant", content: conversationMemory.join('')},
            {role: "user", content: userMessage}],
        })
    }

    // Send POST request to API, get response and append the response to the chatbox
    fetch(API_URL, requestOptions)
    .then(res => res.json())
    .then(data => {

        conversationMemory.push(userMessage);
        conversationMemory.push(data.choices[0].message.content);
        

        if (conversationMemory.length > 2 * MAX_MEMORY_SIZE) {
            conversationMemory.splice(0, conversationMemory.length - 2 * MAX_MEMORY_SIZE);
        }
        //console.log(conversationMemory);
        // Clear existing messages in the chat container
        chatbox.innerHTML = "";

        // Create a <p> element to hold the incoming message
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", "incoming");
        const chatParagraph = document.createElement("p");
        chatLi.appendChild(chatParagraph);
        chatbox.appendChild(chatLi);

        // Split the message into individual characters
        const characters = data.choices[0].message.content.trim().split('');
        let i = 0;

        // Create a function to append characters one by one with a delay
        const textSpeed = () => {
            if (i < characters.length) {
                chatParagraph.textContent += characters[i];
                chatbox.scrollTo(0, chatbox.scrollHeight);
                i++;
                setTimeout(textSpeed, 10); // Adjust the delay between characters (in milliseconds)
            }
        }

        // Start the typewriter effect
        textSpeed();
    })
    .catch(() => {
        const errorMessage = "[Connection Issue] Womp Womp... Your boyfriend is having problems :(";
        const chatLi = createChatLi(errorMessage, "error");
        chatbox.appendChild(chatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
    });
}



const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the input recorder
    const userMessageLi = createChatLi(userMessage, "outgoing");
    inputRecorder.innerHTML = "";
    inputRecorder.appendChild(userMessageLi);

    // Generate response and append it to the chatbox
    generateResponse(userMessage);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

var showText = function (target, message, index, interval) {
    if (index < message. length) {
        $(target).append(message[index++]);
        setTimeout(function () {showText(target, message, index, interval); }, interval);
    }
}

sendChatBtn.addEventListener("click", handleChat);

const inputRecorderContainer = document.getElementById("input-recorder");
const showUserBtn = document.getElementById("show-user-btn");

let isClosed = false;

showUserBtn.addEventListener("click", () => {
    isClosed = !isClosed;
    inputRecorderContainer.classList.toggle("closed", isClosed);
    showUserBtn.classList.toggle("closed", isClosed);
});
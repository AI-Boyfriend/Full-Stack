//const chatbotToggler = document.querySelector(".chatbot-toggler");
//const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chat-container .chatbox");
const chatcontainer = document.querySelector(".chat-container");
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
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined"></span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

let conversationMemory = [];
const MAX_MEMORY_SIZE = 5;

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

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

    // Send POST request to API, get response and set the reponse as paragraph text
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        conversationMemory.push(userMessage);
        conversationMemory.push(data.choices[0].message.content);
        

        if (conversationMemory.length > 2 * MAX_MEMORY_SIZE) {
            conversationMemory.splice(0, conversationMemory.length - 2 * MAX_MEMORY_SIZE);
        }
        console.log(conversationMemory);

        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "[Connection Issue] Womp Womp... Your boyfriend is having problems :(";
    }).finally(() => chatcontainer.scrollTo(0, chatcontainer.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatcontainer.scrollTo(0, chatcontainer.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatcontainer.scrollTo(0, chatcontainer.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
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

sendChatBtn.addEventListener("click", handleChat);
//closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
//chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
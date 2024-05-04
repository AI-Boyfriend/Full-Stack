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
const API_KEY = "broodno";
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






/*
---------------------------------------------------------------------------------------------------------------
CHAT DATA MANAGER
---------------------------------------------------------------------------------------------------------------
*/


/* const saveChatData = (data) => {
    localStorage.setItem("chatData", JSON.stringify(data));
} */

const loadChatData = () => {
    const data = localStorage.getItem("chatData");
    return data ? JSON.parse(data) : null;
}

let chatData = loadChatData() || {
    botName: bfName,
    botSettings: {
        personalities: personalities,
        talk: talk,
        hobbies: hobbies,
        emotion: emotion
    },
    conversations: []
};

// Function to add a new chat bot and save to localStorage
const addChatBot = (botId, botName, botSettings, botImage) => {
    chatData[botId] = {
        botName,
        botSettings,
        botImage,
        conversations: []
    };
    saveChatData(chatData);
}

// Example usage to add a new chat bot
// Call this function whenever a new chat bot is created
addChatBot("bot1", "Bot 1", {
    personalities: "Default",
    talk: "Default",
    hobbies: "Default",
    emotion: "Default"
}, "path/to/bot1/image.jpg");

// Function to update bot settings of a specific bot and save to localStorage
const updateBotSettings = (botId, newSettings) => {
    if (!chatData[botId]) return; // Bot not found
    chatData[botId].botSettings = { ...chatData[botId].botSettings, ...newSettings };
    saveChatData(chatData);
}

// Function to update bot image of a specific bot and save to localStorage
const updateBotImage = (botId, newImage) => {
    if (!chatData[botId]) return; // Bot not found
    chatData[botId].botImage = newImage;
    saveChatData(chatData);
}

// Example usage to update bot settings of a specific bot
// Call this function whenever bot settings are changed
updateBotSettings("bot1", {
    personalities: "New personalities",
    talk: "New talk style",
    hobbies: "New hobbies",
    emotion: "New emotional support"
});
// Now you can access and manipulate chatData object as needed,
// and the changes will be automatically saved to localStorage.

// Function to generate a unique bot ID
const generateUniqueBotId = () => {
    let id = "bot"; // Initial ID prefix
    let count = 1; // Initial numeric suffix
    while (chatData[id + count]) {
        count++;
    }
    return id + count;
}

// Example usage to generate a unique bot ID
const newBotId = generateUniqueBotId();


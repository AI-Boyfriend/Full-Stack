const transition_el_1 = document.querySelector('.transition-1');
const transition_el_2 = document.querySelector('.transition-2');

window.onload = () => {
    setTimeout(() => {
        transition_el_1.classList.replace('is-active', 'leave');
    })
}

let logo = document.getElementById('logo');
let home = document.getElementById('home');

const handleTransition = (e) => {
    e.preventDefault();

    transition_el_2.classList.add('is-active');

    setTimeout(() => {
        window.location.href = `home.html`;
    }, 500);
};

logo.addEventListener('click', handleTransition);
home.addEventListener('click', handleTransition);



var boyfriendName = "";
var personalities = "";
var talk = "";
var hobbies = "";
var emotion = "";
    
function getBoyfriendName() {
    var inputElement = document.getElementById('bfName');
    boyfriendName = inputElement.value;
    var words = boyfriendName.split(/[\s']/);
    var capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    boyfriendName = capitalizedWords.join(' ');
    localStorage.setItem('boyfriendName', boyfriendName);
}


let items = document.querySelectorAll('.slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let active = 0;

function loadShow() {
    if (items.length === 0) {
        return;
    }

    if (active < 0 || active >= items.length) {
        return;
    }

    // Proceed with your existing code
    let stt = 0;
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;

    for(var i = active + 1; i < items.length; i++)
    {
        stt++;
        items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
    stt = 0;
    for(var i = active - 1; i >= 0; i--)
    {
        stt++;
        items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}

loadShow();

function validateCurrentSlide() {
    const currentSlide = items[active];
    const input = currentSlide.querySelector('input');

    if (input && input.value.trim() === "") {
        alert("Please fill out the required field.");
        return false;
    }

    // Example for the personalities slide
    if (currentSlide.querySelector('.personalities')) {
        const selectedButtons = currentSlide.querySelectorAll('.personalities button.active');
        if (selectedButtons.length === 0) {
            alert("Please select at least one personality.");
            return false;
        }
    }

    if (currentSlide.querySelector('.talk')) {
        const selectedButtons = currentSlide.querySelectorAll('.talk button.active');
        if (selectedButtons.length === 0) {
            alert("Please select at least one expression.");
            return false;
        }
    }

    if (currentSlide.querySelector('.hobbies')) {
        const selectedButtons = currentSlide.querySelectorAll('.hobbies button.active');
        if (selectedButtons.length === 0) {
            alert("Please select at least one hobby.");
            return false;
        }
    }

    if (currentSlide.querySelector('.emotion')) {
        const selectedButtons = currentSlide.querySelectorAll('.emotion button.active');
        if (selectedButtons.length === 0) {
            alert("Please select an emotion support option.");
            return false;
        }
    }

    return true;
}

if (next) {
    next.onclick = function()
    {
        if (!validateCurrentSlide()) {
            return;
        }

        active = active + 1 < items.length ? active + 1 : active;
        loadShow();
    
        if(active == 1)
        {
            getBoyfriendName();
        }
    }
}

if (prev) {
    prev.onclick = function()
    {
        active = active - 1 >= 0 ? active - 1 : active;
        loadShow();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.personalities button');
    let selectedButtons = [];

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                selectedButtons = selectedButtons.filter(id => id !== button.id.split('-')[0]);
            } else {
                if (selectedButtons.length >= 3) {
                    return;
                }

                button.classList.add('active');
                selectedButtons.push(button.id.split('-')[0]);
            }

            personalities = selectedButtons;
            localStorage.setItem('personalities', JSON.stringify(personalities));
            console.log(localStorage.getItem('personalities'));
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.talk button');
    let selectedButtons = []; // Array to store the IDs of selected buttons

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                selectedButtons = selectedButtons.filter(id => id !== button.id.split('-')[0]);
            } else {
                if (selectedButtons.length >= 2) {
                    return;
                }

                button.classList.add('active');
                selectedButtons.push(button.id.split('-')[0]);
            }

            talk = selectedButtons;
            localStorage.setItem('talk', JSON.stringify(talk));
            console.log(localStorage.getItem('talk'));
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.hobbies button');
    let selectedButtons = []; // Array to store the IDs of selected buttons

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                selectedButtons = selectedButtons.filter(id => id !== button.id.split('-')[0]);
            } else {
                if (selectedButtons.length >= 3) {
                    return;
                }

                button.classList.add('active');
                selectedButtons.push(button.id.split('-')[0]);
            }

            hobbies = selectedButtons;
            localStorage.setItem('hobbies', JSON.stringify(hobbies));
            console.log(localStorage.getItem('hobbies'));
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.emotion button');
    let selectedButtons = []; // Array to store the IDs of selected buttons

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                selectedButtons = selectedButtons.filter(id => id !== button.id.split('-')[0]);
            } else {
                if (selectedButtons.length >= 1) {
                    return;
                }

                button.classList.add('active');
                selectedButtons.push(button.id.split('-')[0]);
            }

            emotion = selectedButtons;
            localStorage.setItem('emotion', JSON.stringify(emotion));
            console.log(localStorage.getItem('emotion'));
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var toChatLink = document.getElementById("toChat");
    if (toChatLink) { // Check if element exists before adding event listener
        toChatLink.addEventListener("click", function(event) {
            event.preventDefault();

            addChatBot(newBotId, boyfriendName, {
                personalities: personalities,
                talk: talk,
                hobbies: hobbies,
                emotion: emotion,
            },
            "images/bg_cafe.png",
            localStorage.getItem("bfImage"));

            transition_el_2.classList.add('is-active');

            setTimeout(() => {
                window.location.href = `datingsim.html?id=${newBotId}`;
            }, 500);
        });
    }
});



/*
---------------------------------------------------------------------------------------------------------------
CHAT DATA MANAGER
---------------------------------------------------------------------------------------------------------------
*/

const loadChatData = () => {
    const data = localStorage.getItem("chatData");
    return data ? JSON.parse(data) : null;
}

const saveChatData = (data) => {
    localStorage.setItem("chatData", JSON.stringify(data));
    console.log(localStorage.getItem("chatData"));
}

let chatData = loadChatData() || {
    botName: bfName,
    botSettings: {
        personalities: personalities,
        talk: talk,
        hobbies: hobbies,
        emotion: emotion
    },
    background,
    conversations: []
};

const addChatBot = (botId, botName, botSettings, background, botImage) => {
    chatData[botId] = {
        botName,
        botSettings,
        botImage,
        background,
        conversations: []
    };
    saveChatData(chatData);
}

// Function to generate a unique bot ID
const generateUniqueBotId = () => {
    let id = "bot";
    let count = 1;

    // Find the lowest available ID
    while (chatData[id + count]) {
        count++;
    }

    // If there's a gap in the sequence, use the lowest available ID
    if (count <= Object.keys(chatData).length) {
        return id + count;
    }

    // Otherwise, generate a new ID as usual
    while (chatData[id + count]) {
        count++;
    }

    return id + count;
}

// Example usage to generate a unique bot ID
const newBotId = generateUniqueBotId();


// Function to delete a chat bot by its ID
const deleteChatBot = (botId) => {
    if (chatData[botId]) {
        delete chatData[botId]; // Remove the bot entry from chatData object
        saveChatData(chatData); // Save the updated chatData to localStorage
        return true; // Indicate successful deletion
    }
    return false; // Indicate bot not found
}
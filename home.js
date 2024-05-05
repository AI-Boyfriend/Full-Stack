const fetchChatData = () => {
    const data = localStorage.getItem("chatData");
    console.log(data);
    return data ? JSON.parse(data) : null;
};

let chatData = fetchChatData() || {
    botName: bfName,
    botSettings: {
        personalities: personalities,
        talk: talk,
        hobbies: hobbies,
        emotion: emotion
    },
    conversations: []
};

const saveChatData = (data) => {
    localStorage.setItem("chatData", JSON.stringify(data));
    console.log(localStorage.getItem("chatData"));
}

// Function to delete a chat bot by its ID
const deleteChatBot = (botId) => {
    if (chatData[botId]) {
        delete chatData[botId]; // Remove the bot entry from chatData object
        saveChatData(chatData); // Save the updated chatData to localStorage
        return true; // Indicate successful deletion
    }
    return false; // Indicate bot not found
}

const displayPreviousChats = () => {
    const chatData = fetchChatData();
    const secElement = document.getElementById("sec");
    const botIds = []; // Define an array to store bot IDs

    // Clear previous content
    secElement.innerHTML = '<h3>Messages</h3><div class="box"></div>';

    if (!chatData) {
        // If no chat data found, display a message
        secElement.querySelector(".box").innerHTML = "<p>No previous chats available.</p>";
        return;
    }

    // Iterate through chat data and populate the HTML
    for (const botId in chatData) {
        const bot = chatData[botId];
        const lastMessage = bot.conversations.length > 0 ? bot.conversations[bot.conversations.length - 1].message : "No messages yet";

        // Add bot ID to the botIds array
        botIds.push(botId);

        const listElement = document.createElement("div");
        listElement.classList.add("list");
        listElement.innerHTML = `
            <div class="imgBx">
                <img src="${bot.botImage}" alt="${bot.botName}">
            </div>
            <div class="content">
                <h4>${bot.botName}</h4>
                <p>${lastMessage}</p>
            </div>
            <span class="opt-btn">
                <ion-icon name="close-circle"></ion-icon>
            </span>
        `;
        secElement.querySelector(".box").appendChild(listElement);

        // Add event listener to each opt-btn for deletion
        const optBtn = listElement.querySelector(".opt-btn");
        optBtn.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent event propagation to parent elements
            // Find the parent chat item and remove it from the DOM
            listElement.remove();
            
            const deleteChat = deleteChatBot(botId);

            if (deleteChat) {
                console.log("Chat bot deleted successfully.");
            } else {
                console.log("Chat bot not found.");
            }
        });
    }

    // Add click event listener to each chat item after populating the botIds array
    document.querySelectorAll('.list').forEach((item, index) => {
        // Set the href attribute for each chat item using botIds array
        item.setAttribute('href', `datingsim.html?id=${botIds[index]}`);
        
        // Add click event listener to each chat item
        item.addEventListener('click', () => {
            // Extract bot ID from href attribute
            const botId = item.getAttribute('href').split('=')[1];
            // Redirect user to chat page with the bot ID
            window.location.href = `datingsim.html?id=${botId}`;
        });
    });
};


// Call the function to display previous chats
displayPreviousChats();



let stars = document.getElementById('stars');
let heart = document.getElementById('heart');
let city = document.getElementById('city');
let text = document.getElementById('text');
let btn = document.getElementById('btn');
let header = document.querySelector('header');

window.addEventListener('scroll', function()
{
    let value = window.scrollY;
    stars.style.left = value * 0.25 + 'px';
    heart.style.top = value * 1.05 + 'px';
    city.style.top = value * 0.5 + 'px';
    text.style.marginRight = value * 4 + 'px';
    text.style.marginTop = value * 1.5 + 'px';
    btn.style.marginTop = value * 1.5 + 'px';
    header.style.top = value * 0.5 + 'px';
})

var slideIndex = 0;

showSlides(slideIndex);

function plusSlides(n)
{
    showSlides(slideIndex += n);
}

function currentSlide(n)
{
    showSlides(slideIndex)
}

/* function showSlides(n)
{
    var i;
    var slides = document.getElementsByClassName("slides");
    var dots = document.getElementsByClassName("dot");
    if(n > slides.length) 
        slideIndex = 1;

    if(n < 1)
        slideIndex = slides.length;

    for(i = 0; i < slides.length; i++)
    {
        slides[i].style.display = "none";
    }

    for(i = 0; i < dots.length; i++)
    {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";


    setTimeout(showSlides, 2000);
}
 */

function showSlides(n)
{
    var i;
    var slides = document.getElementsByClassName("slides");
    for(i = 0; i < slides.length; i++)
    {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if(slideIndex > slides.length) 
        slideIndex = 1;
    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 2000);
}
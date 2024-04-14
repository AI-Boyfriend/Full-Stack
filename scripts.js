document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the 'Create New Bot' button
    document.getElementById('create-new-bot').addEventListener('click', function() {
        window.location.href = 'createai.html'; // Redirects to the 'Create New AI' page
    });

    // Event listener for the listed bot
    document.getElementById('bot_1').addEventListener('click', function() {
        window.location.href = 'chatpage.html'; // Redirects to the chat page for this bot
    });

    // If you have more bots, you'd add more event listeners similar to 'bot_1'
});
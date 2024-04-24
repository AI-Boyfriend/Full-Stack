let items = document.querySelectorAll('.slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let active = 0;
function loadShow()
{
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

next.onclick = function()
{
    active = active + 1 < items.length ? active + 1 : active;
    loadShow();
}

prev.onclick = function()
{
    active = active - 1 >= 0 ? active - 1 : active;
    loadShow();
}

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.personalities button');
    let selectedButtons = []; // Array to store the IDs of selected buttons

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            // If the clicked button is already selected, remove it from the array
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                selectedButtons = selectedButtons.filter(id => id !== button.id);
            } else {
                // If the maximum number of selected buttons (3) is reached, return
                if (selectedButtons.length >= 3) {
                    return;
                }

                // Otherwise, add the button ID to the array and mark it as selected
                button.classList.add('active');
                selectedButtons.push(button.id);
            }

            // Log the selected buttons for testing
            console.log(selectedButtons);
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.talk button');
    let selectedButtons = []; // Array to store the IDs of selected buttons

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            // If the clicked button is already selected, remove it from the array
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                selectedButtons = selectedButtons.filter(id => id !== button.id);
            } else {
                // If the maximum number of selected buttons (3) is reached, return
                if (selectedButtons.length >= 3) {
                    return;
                }

                // Otherwise, add the button ID to the array and mark it as selected
                button.classList.add('active');
                selectedButtons.push(button.id);
            }

            // Log the selected buttons for testing
            console.log(selectedButtons);
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.hobbies button');
    let selectedButtons = []; // Array to store the IDs of selected buttons

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            // If the clicked button is already selected, remove it from the array
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                selectedButtons = selectedButtons.filter(id => id !== button.id);
            } else {
                // If the maximum number of selected buttons (3) is reached, return
                if (selectedButtons.length >= 3) {
                    return;
                }

                // Otherwise, add the button ID to the array and mark it as selected
                button.classList.add('active');
                selectedButtons.push(button.id);
            }

            // Log the selected buttons for testing
            console.log(selectedButtons);
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.emotion button');
    let selectedButtons = []; // Array to store the IDs of selected buttons

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            // If the clicked button is already selected, remove it from the array
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                selectedButtons = selectedButtons.filter(id => id !== button.id);
            } else {
                // If the maximum number of selected buttons (3) is reached, return
                if (selectedButtons.length >= 3) {
                    return;
                }

                // Otherwise, add the button ID to the array and mark it as selected
                button.classList.add('active');
                selectedButtons.push(button.id);
            }

            // Log the selected buttons for testing
            console.log(selectedButtons);
        });
    });
});


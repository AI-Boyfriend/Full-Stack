var boyfriendName = "";
var personalities = "";
var talk = "";
var hobbies = "";
var emotion = "";
    
function getBoyfriendName() {
    var inputElement = document.getElementById('bfName');
    boyfriendName = inputElement.value;
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

if (next) {
    next.onclick = function()
    {
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

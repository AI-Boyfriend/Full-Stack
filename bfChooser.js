const track = document.getElementById("image-track");
const bftrack = document.getElementById("bf-track");
const bf = document.querySelectorAll('bf-track .image');
const confirmBtn = document.getElementById('choosebtn');

const handleOnDown = e => {
  track.dataset.mouseDownAt = e.clientX;
  track.dataset.percentage = 0;
}

const transition_el_1 = document.querySelector('.transition-1');
const transition_el_2 = document.querySelector('.transition-2');

let indexInRange = -1;

window.onload = function() {
  setTimeout(() => {
    transition_el_1.classList.replace('is-active', 'leave');
  })

  const mouseDelta = parseFloat(track.dataset.mouseDownAt),
        maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  for(const [index, image] of Array.from(bftrack.getElementsByClassName("image")).entries()) {
    const offset = index * 11 - 50;
    const individualPercentage = nextPercentage + offset;
    image.animate({
      objectPosition: `${100 + individualPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;

  //console.log(track.dataset.percentage);
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });

  bftrack.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }

  for(const [index, image] of Array.from(bftrack.getElementsByClassName("image")).entries()) {
      const offset = index * 11 - 50;
      const individualPercentage = nextPercentage + offset;

      if (individualPercentage >= -56 && individualPercentage <= -45) 
      {
        indexInRange = index;
        image.style.transform = "scale(1.5)";
        image.style.filter = "drop-shadow(10px 0 0px white)";
        
        const srcValue = image.getAttribute("src");
        localStorage.setItem('bfImage', srcValue.toString())
        console.log(localStorage.getItem('bfImage'));
      } 
      else 
      {
        image.style.transform = "scale(1)";
        image.style.filter = "none";
      }

      image.animate({
          objectPosition: `${100 + individualPercentage}% center`
      }, { duration: 1200, fill: "forwards" });
  }
}

confirmBtn.addEventListener('click', e => {
  if(indexInRange != -1)
  {
    e.preventDefault();

    transition_el_2.classList.add('is-active');

    setTimeout(() => {
        window.location.href = `bfCreator.html`;
    }, 500);
  }
})

if (indexInRange === -1) {
  confirmBtn.disabled = true;
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



window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);
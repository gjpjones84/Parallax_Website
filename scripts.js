//get all elements with class parallax
const parallex_el = document.querySelectorAll(".parallax");

//variables
let xValue = 0, yValue = 0;
let rotateDegreee = 0;

function update(cursorPosition){
    //iterate through parallax elements and apply individual axis speeds to css transform
    parallex_el.forEach((el) => {
        //variables
        let speedx = el.getAttribute("data-speedX");
        let speedY = el.getAttribute("data-sppedY");
        let speedZ = el.getAttribute("data-speedZ");
        let speedRotation = el.getAttribute("data-speedRotate");
        //check to see if element is on left or right of screen this for resizing 
        //left or right z-axis depending on mouse movement
        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        // multiple by 0.1 to slow transition down
        let valueZ = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1; 

        el.style.transform = `rotateY(${rotateDegreee * speedRotation}deg) translateX(calc(-50% + 
            ${-xValue * speedx}px)) translateY(calc(-50% + ${yValue * speedY}px)) 
            perspective(2300px) translateZ(${valueZ * speedZ}px)`;
    }); 
};

update(0);

//obtain mouse position and offset position reference to center of page 
//rotate variable use x to find side of screen 1 / -1 and multiple by 20 for degrees of roatation
window.addEventListener("mousemove", (e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;
    rotateDegreee = xValue / (window.innerWidth / 2) * 20; 
    update(e.clientX);
});
function hamburg(){
    const navbar = document.querySelector('.dropdown');
    navbar.style.transform = 'translateY(0px)';
}

function cancel(){
    const navbar = document.querySelector('.dropdown');
    navbar.style.transform = 'translateY(-500px)';
}

const texts = [
    "DEVELOPER",
    "DESIGNER",
    "PROGRAMMER"
];

let speed = 100;

const textElements = document.querySelector('.typewriter-text');

let textIndex = 0;
let characterIndex = 0;

function typeWriter(){
    if(characterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(characterIndex);
        characterIndex++;
        setTimeout(typeWriter, speed);
    }
    else{
        setTimeout(eraseText, 1000);
    }
}

function eraseText(){
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0, -1);
        setTimeout(eraseText, 50);
    }
    else{
        textIndex = (textIndex + 1) % texts.length;
        characterIndex = 0;
        setTimeout(typeWriter, 500);
    }
}

window.onload = typeWriter;
// CV Modal Functionality
document.addEventListener("DOMContentLoaded", function() {
    console.log("Page loaded - checking CV button...");
    
    const openBtn = document.getElementById("openCV");
    const cvModal = document.getElementById("cvModal");
    const requestModal = document.getElementById("requestModal");
    const closeCV = document.getElementById("closeCV");
    const closeRequest = document.getElementById("closeRequest");
    
    if (!openBtn) {
        console.error("CV button not found!");
        return;
    }
    
    console.log("CV button found, adding event listener...");
    
    // open win CV
    openBtn.addEventListener("click", function(e) {
        e.preventDefault();
        console.log("CV button clicked!");
        cvModal.style.display = "block";
        document.body.style.overflow = "hidden"; // Hide scrollbar
    });
    
    // close win CV
    if (closeCV) {
        closeCV.addEventListener("click", function() {
            cvModal.style.display = "none";
            document.body.style.overflow = "auto";
        });
    }
    
    // closse req
    if (closeRequest) {
        closeRequest.addEventListener("click", function() {
            requestModal.style.display = "none";
            document.body.style.overflow = "auto";
        });
    }
    
    // click outside modal to close
    window.addEventListener("click", function(e) {
        if (e.target === cvModal) {
            cvModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
        if (e.target === requestModal) {
            requestModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
});

// Password for CV access
const ACCESS_CODE = "ZiyedCV2026";

function checkPassword() {
    const input = document.getElementById("cvPassword").value;
    const cvModal = document.getElementById("cvModal");
    
    if (input === ACCESS_CODE) {
        // win CV
        cvModal.style.display = "none";
        document.body.style.overflow = "auto";
        
        // link CV
        window.location.href = "https://drive.google.com/drive/folders/1XJeDu3PeP-EGn45cd4HcjqLRSouWN47B?usp=sharing";
    } else {
        alert("Invalid access code. Please try again or request access.");
        document.getElementById("cvPassword").value = "";
        document.getElementById("cvPassword").focus();
    }
}

function openRequest() {
    const cvModal = document.getElementById("cvModal");
    const requestModal = document.getElementById("requestModal");
    
    cvModal.style.display = "none";
    requestModal.style.display = "block";
}
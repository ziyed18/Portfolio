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
// ================================
// IMPROVED VERSION WITH BETTER FEEDBACK
// ================================
const setupForm = () => {
    const form = document.querySelector('form[action*="formspree"]');
    if (!form) {
        console.log('No Formspree form found');
        return;
    }
    
  
    if (!form.id) form.id = 'cvRequestForm';
    

    let messageDiv = document.getElementById('formMsg');
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'formMsg';
        messageDiv.style.cssText = `
            margin: 15px 0;
            padding: 14px 18px;
            border-radius: 8px;
            display: none;
            font-size: 15px;
            line-height: 1.5;
            transition: all 0.3s ease;
        `;
        form.querySelector('.btn').before(messageDiv);
    }
    
    form.onsubmit = async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('.btn');
        const msg = messageDiv;
        const originalText = btn.textContent;
        const originalBg = btn.style.background;
        

        msg.style.display = 'none';
        msg.textContent = '';
        

        btn.textContent = '🔄 Sending...';
        btn.disabled = true;
        
        try {
            console.log('🚀 Form submission started');
            
            
            const formData = new FormData(form);
            

            formData.append('_subject', 'CV Access Request from Portfolio');
            formData.append('_format', 'plain');
            
    
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                redirect: 'follow',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            console.log('📨 Formspree response:', {
                status: response.status,
                statusText: response.statusText,
                url: response.url,
                ok: response.ok
            });

            let responseData;
            try {
                responseData = await response.json();
                console.log('📊 Response data:', responseData);
            } catch (jsonError) {
                console.log('📄 Response is not JSON, might be HTML redirect');
            }
            
            const isSuccess = response.ok || 
                            response.status === 302 || 
                            response.status === 0 ||
                            (response.url && response.url.includes('formspree.io/thanks'));
            
            if (isSuccess) {

                msg.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 20px;">✅</span>
                        <div>
                            <strong style="display: block; margin-bottom: 5px;">Successfully Sent!</strong>
                            <small>I received your request and will contact you within 24 hours.</small>
                        </div>
                    </div>
                `;
                msg.style.display = 'block';
                msg.style.background = '#d4edda';
                msg.style.color = '#0f5132';
                msg.style.border = '1px solid #badbcc';
                
                btn.textContent = '✅ Sent Successfully';
                btn.style.background = '#28a745';
                

                setTimeout(() => form.reset(), 500);
                
                setTimeout(() => {
                    const modal = document.getElementById('requestModal');
                    if (modal) {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                }, 3000);
                
            } else {
        
                throw new Error(`Formspree error: ${response.status}`);
            }
            
        } catch (error) {
            console.error('🔥 Form submission error:', error);
            msg.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 20px;">⚠️</span>
                    <div>
                        <strong style="display: block; margin-bottom: 5px;">Request Received!</strong>
                        <small>
                            There was a technical response issue, but I received your email.
                            <br>
                            I'll contact you soon at the email you provided.
                        </small>
                    </div>
                </div>
            `;
            msg.style.display = 'block';
            msg.style.background = '#fff3cd';
            msg.style.color = '#856404';
            msg.style.border = '1px solid #ffeaa7';
            
            btn.textContent = '📧 Sent Anyway';
            btn.style.background = '#ffc107';
            
        } finally {
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = originalBg;
                btn.disabled = false;
            }, 4000);
        }
    };
    
    console.log('✅ Form handler setup complete');
};

setTimeout(setupForm, 100);
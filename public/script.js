gsap.from(".navbar", {
    backgroundColor: "#0000",
    duration: 1.5,
    height: "80vh",
    delay: 1,
  });
  
  gsap.to(".main", {
    backgroundColor: "#ffffff",
    scrollTrigger: {
      trigger: "main",
      scroller: "body",
      start: "top -50%",
      end: "top -100%",
      scrub: 2,
    },
  });
  gsap.from(".box", {
    x: 500,
    y: 100,
    scale: 8,
    duration: 2,
    ease: "power2.inOut",
  });
  

  gsap.from(".navbar,.main-img", {
    duration: 2.5,
    autoAlpha: 0,
    ease: "power2.inOut",
  });

  // Chatbot  Script

  document.getElementById('send-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    const userMsg=document.createElement("div");
    userMsg.className="message user-message";
    userMsg.textContent=userInput;
    document.getElementById('user-input').value=""

    document.getElementById("chat-messages").appendChild(userMsg);
    // Send the user input to the backend API
    fetch('http://127.0.0.1:5000/predictu', {  // Replace with your backend URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(data["answer"]);
        // Display the AI's response in the chat

        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.textContent = data.answer;

        document.getElementById('chat-messages').appendChild(botMessage);
    })
    .catch(error => console.error('Error:', error));
});

let chatBotIcon=document.getElementsByClassName("chatBoat");
// let chatBox=document.querySelector(".chat-container");
// chatBotIcon[0].addEventListener("click",function(){
//     chatBox.classList.add("chatContTransition");
// })

// chatBox.children[0].children[2].addEventListener("click",()=>{
//   chatBox.classList.remove("chatContTransition")
// })

function chatBotTransition() {
  let chatBox = document.querySelector(".chat-container");
  let chatIcon=document.querySelector(".chatBoat");
  chatIcon.classList.toggle("chatBot2");
  chatBox.classList.toggle("chatContTransition");

}

const userProf=document.querySelector("#userProf");
const userDropdown=document.querySelector(".userDropdown");
userProf.addEventListener("click",()=>{
    if(userDropdown.style.display=="flex"){
      userDropdown.style.display="none";
    }else{
      userDropdown.style.display="flex"
    }
})
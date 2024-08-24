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
    fetch('http://127.0.0.1:5000/predict', {  // Replace with your backend URL
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
let chatBox=document.querySelector(".chat-container");
chatBotIcon[0].addEventListener("click",function(){
  if(chatBotIcon[0].style.display!=="none"){
    chatBotIcon[0].style.display="none";
    chatBox.style.display="flex";
  }else{
    chatBotIcon[0].style.display="inline-block";
    chatBox.style.display="none";
  }
})
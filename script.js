//VARIABLES
let form = document.getElementById('form')
let user1 = document.getElementById('user1-button')
let user2 = document.getElementById('user2-button')
let user = document.getElementById('user')
let textBox = document.getElementById('text')
let newMessage = ""
let message = document.getElementById('messages')
let time = new Date().toLocaleString('en-US', {hour : 'numeric', minute : 'numeric', hour12: true})
let username = "Emmanuel"
let savedMessages = JSON.parse(localStorage.getItem('messages'))||[]
let deleteButton = document.querySelector('.delete-button')

//FUNCTIONS
function changeUser(name){
    username = name
    if(username == 'Emmanuel'){
        user2.classList.remove('active')
        user1.classList.add('active')
       
    }
    else{
        user1.classList.remove('active')
        user2.classList.add('active')
    }
    user.innerText = `${username}`
    textBox.placeholder = `Type here, ${username}`
    
}

user1.addEventListener('click', ()=>{
    changeUser('Emmanuel')
})
user2.addEventListener('click', ()=>{
    changeUser('Blessing')
})

function submit(e){
    e.preventDefault()
    newMessage += `
    <div class="user-message ${username == 'Emmanuel' ? 'active-message' : 'inactive-message'}" id="user-messages">
        <div class="content">
            <p class="username">${username}</p>
            <p>${textBox.value}</p>
        </div>
        <p class="time">${time}</p>
    </div>
    `;
    let messagesInfo = {
        user: username,
        content: textBox.value,
        time: time
    }
    savedMessages.push(messagesInfo)
    localStorage.setItem('messages', JSON.stringify(savedMessages))

    message.innerHTML = newMessage
    textBox.value = ''
    textBox.focus()
    message.scrollTop = message.scrollHeight
}

//EVENT LISTENER
form.addEventListener('submit', submit)

deleteButton.addEventListener('click', ()=>{
    savedMessages = JSON.parse(localStorage.getItem('messages'))
    savedMessages = []
    message.innerHTML = ''
    localStorage.setItem('messages', JSON.stringify(savedMessages))  
})

window.onload = (e)=>{ 
    for(let i = 0; i < savedMessages.length; i++){
        newMessage += `
        <div class="user-message ${savedMessages[i].user == 'Emmanuel' ? 'active-message' : 'inactive-message'}" id="user-messages">
            <div class="content">
                <p class="username">${savedMessages[i].user}</p>
                <p>${savedMessages[i].content}</p>
            </div>
            <p class="time">${savedMessages[i].time}</p>
        </div>
    `;
    }
    message.innerHTML = newMessage
}

let typingTimer

textBox.addEventListener('keydown', () => {
    clearTimeout(typingTimer);
    user.innerText = `${username} chatting...`;
  });
  
textBox.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(function() {
      user.innerText = `${username}`;
}, 1000); 
  });

  textBox.addEventListener('input', ()=>{
    textBox.style.height = 'auto'; 
    textBox.style.height = textBox.scrollHeight + 'px'
  })
  
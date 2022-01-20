// enfatiza que a função io é uma função injetada ao objeto window do DOM da página
const socket = window.io();

const messageBox = document.getElementById('message-box');
const sendButton = document.getElementById('send-button');

const nicknameBox = document.getElementById('nickname-box');
const nicknameButton = document.getElementById('nickname-button');

const onlineUser = document.getElementById('online-user');

// https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
const randomNickname = Array.from(Array(16), 
() => Math.floor(Math.random() * 36).toString(36)).join('');

onlineUser.innerHTML = sessionStorage.getItem('nickname') || randomNickname;

sendButton.addEventListener('click', () => {
  socket.emit('message', { chatMessage: messageBox.value, nickname: onlineUser.innerHTML });
  messageBox.value = '';
});

nicknameButton.addEventListener('click', () => {
  const newNickname = nicknameBox.value;
  nicknameBox.value = '';
  onlineUser.innerHTML = newNickname;
  sessionStorage.setItem('nickname', newNickname);
});

const messageUl = document.querySelector('.messages');

function messageCreation(message) {
  const messageLi = document.createElement('li');
  messageLi.classList.add('message');
  messageLi.setAttribute('data-testid', 'message');
  messageLi.innerText = message;

  messageUl.appendChild(messageLi);
}

socket.on('message', (message) => messageCreation(message));
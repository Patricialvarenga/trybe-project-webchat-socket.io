// enfatiza que a função io é uma função injetada ao objeto window do DOM da página
const socket = window.io();

const messageBox = document.getElementById('message-box');
const sendButton = document.getElementById('send-button');
const nicknameBox = document.getElementById('nickname-box');
const nicknameButton = document.getElementById('nickname-button');
const onlineUser = document.getElementById('online-user');
const messageUl = document.querySelector('.messages');
const onlineUsersElem = document.getElementById('users-list');

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

function messageCreation(message) {
  const messageLi = document.createElement('li');
  messageLi.classList.add('message');
  messageLi.setAttribute('data-testid', 'message');
  messageLi.innerText = message;

  messageUl.appendChild(messageLi);
}

socket.on('message', (message) => messageCreation(message));

// retirada do repositório do colega Kevin Oliveira
// https://github.com/tryber/sd-012-project-webchat/pull/1
socket.on('onlineUsers', (onlineUsers) => {
  onlineUsersElem.innerHTML = '';
  onlineUsers.forEach(({ nickname }) => {
    const currentNickName = onlineUser.innerHTML;
    if (currentNickName === nickname) return;
    const li = document.createElement('li');
    li.innerHTML = nickname;
    li.setAttribute('data-testid', 'online-user');
    onlineUsersElem.appendChild(li);  
  });
});
window.onbeforeunload = () => {
socket.disconnect();
};
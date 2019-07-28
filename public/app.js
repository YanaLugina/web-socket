const status = document.getElementById('status');
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

const ws = new WebSocket('ws://localhost:3000');


function setStatus(value) {
    status.innerHTML = value;
}

function printMessage(value) {
    const li = document.createElement('li');
    li.innerHTML = value;
    messages.appendChild(li);

}
// Перехватываем данные отправленные пользователем по http
// Получаем значения введенные в поле формы
// И отправляем на сервер через WebSocket

// Подписаться на событие submit у формы
form.addEventListener('submit', event => {
    event.preventDefault();

    ws.send(input.value);
    input.value = '';
});

ws.onopen = () => setStatus('ONLINE');

ws.onclose = () => setStatus('DISCONNECTED');

ws.onmessage = response => printMessage(response.data);
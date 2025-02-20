<!-- script.js -->
let queue = JSON.parse(localStorage.getItem('queue')) || [];

document.addEventListener('DOMContentLoaded', function () {
    const submissionForm = document.getElementById('submissionForm');
    if (submissionForm) {
        submissionForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const link = document.getElementById('link').value;
            queue.push({ name, link, played: false });
            localStorage.setItem('queue', JSON.stringify(queue));
            submissionForm.reset();
        });
    }

    const queueList = document.getElementById('queueList');
    if (queueList) {
        updateQueueUI();
    }
});

function updateQueueUI() {
    const queueList = document.getElementById('queueList');
    if (!queueList) return;
    queueList.innerHTML = '';
    queue.forEach((entry, index) => {
        if (!entry.played) {
            const li = document.createElement('li');
            li.innerHTML = `${entry.name}: <a href="${entry.link}" target="_blank">${entry.link}</a> ` +
                `<button onclick="markPlayed(${index})">Mark as Played</button>`;
            queueList.appendChild(li);
        }
    });
}

function markPlayed(index) {
    queue[index].played = true;
    localStorage.setItem('queue', JSON.stringify(queue));
    updateQueueUI();
}

function clearQueue() {
    queue = [];
    localStorage.setItem('queue', JSON.stringify(queue));
    updateQueueUI();
}

function checkPassword() {
    const password = prompt("Enter Manager Password:");
    if (password !== "manager123") {
        alert("Access Denied");
        window.location.href = "index.html";
    }
}

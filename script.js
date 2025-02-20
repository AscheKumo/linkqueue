<!-- script.js -->
document.addEventListener('DOMContentLoaded', function () {
    const submissionForm = document.getElementById('submissionForm');
    if (submissionForm) {
        submissionForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const link = document.getElementById('link').value;
            await db.collection('queue').add({ name, link, played: false });
            submissionForm.reset();
        });
    }

    const queueList = document.getElementById('queueList');
    if (queueList) {
        db.collection('queue').where("played", "==", false).onSnapshot(snapshot => {
            queueList.innerHTML = '';
            snapshot.forEach(doc => {
                const data = doc.data();
                const li = document.createElement('li');
                li.innerHTML = `${data.name}: <a href="${data.link}" target="_blank">${data.link}</a> ` +
                    `<button onclick="markPlayed('${doc.id}')">Mark as Played</button>`;
                queueList.appendChild(li);
            });
        });
    }
});

async function markPlayed(id) {
    await db.collection('queue').doc(id).update({ played: true });
}

async function clearQueue() {
    const snapshot = await db.collection('queue').get();
    snapshot.forEach(doc => db.collection('queue').doc(doc.id).delete());
}

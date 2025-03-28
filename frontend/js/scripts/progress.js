const API_URL = 'http://localhost:5000/api/quiz';

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!token || !user) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('username').textContent = user.username;

    try {
        const response = await fetch(`${API_URL}/progress`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const progress = await response.json();
        
        if (response.ok) {
            updateStats(progress);
            updateActivityList(progress);
        } else {
            alert('Failed to fetch progress data');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load progress data');
    }

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    });
});

function updateStats(progress) {
    const quizCount = progress.length;
    const avgScore = progress.reduce((acc, curr) => acc + curr.score, 0) / quizCount || 0;
    
    document.getElementById('quizCount').textContent = quizCount;
    document.getElementById('avgScore').textContent = `${Math.round(avgScore)}%`;
    
    const bloomsLevels = progress.reduce((acc, curr) => {
        acc[curr.actualBloomLevel] = (acc[curr.actualBloomLevel] || 0) + 1;
        return acc;
    }, {});
    
    const bloomsHTML = Object.entries(bloomsLevels)
        .map(([level, count]) => `
            <div class="blooms-bar">
                <span>${level}</span>
                <div class="bar" style="width: ${(count/quizCount)*100}%"></div>
                <span>${count}</span>
            </div>
        `).join('');
    
    document.getElementById('bloomsProgress').innerHTML = bloomsHTML || 'No data available';
}

function updateActivityList(progress) {
    const activityHTML = progress
        .slice(0, 10)
        .map(activity => `
            <div class="activity-item">
                <h4>${activity.question}</h4>
                <p><strong>Subject:</strong> ${activity.subject}</p>
                <p><strong>Difficulty:</strong> ${activity.difficulty}</p>
                <p><strong>Score:</strong> ${activity.score}%</p>
                <p><strong>Bloom's Level:</strong> ${activity.actualBloomLevel}</p>
                <p><strong>Feedback:</strong> ${activity.feedback}</p>
                <small>${new Date(activity.createdAt).toLocaleDateString()}</small>
            </div>
        `).join('');
    
    document.getElementById('activityList').innerHTML = activityHTML || 'No activities yet';
}
// BNM AI System - Multi-Model Avatars & Claude Sun Timer Logic
let ws;
const chatArea = document.getElementById('chatArea');
const messagesList = document.getElementById('messagesList');
const promptInput = document.getElementById('promptInput');
const sendBtn = document.getElementById('sendBtn');
const heroSection = document.getElementById('heroSection');

let currentMode = "extended";
let currentModel = "qwen-coder";
let currentAvatar = "⚡";
let thinkingTimerInterval = null;

function connect() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    ws = new WebSocket(`${protocol}//${window.location.host}/ws/chat`);
    
    ws.onopen = () => console.log('🟢 BNM Connected');
    
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        removeLoading();
        
        if (data.type === 'response') {
            appendAiMessage(data.html, data.latency, data.model, data.mode);
        }
        updateSendBtn();
    };
    
    ws.onclose = () => {
        setTimeout(connect, 3000);
    };
}
connect();

function sendMessage(text) {
    if (!text.trim()) return;
    
    heroSection.classList.add('hidden');
    
    appendUserMessage(text.trim());
    promptInput.value = '';
    promptInput.style.height = 'auto';
    updateSendBtn();
    showLoading();
    
    ws.send(JSON.stringify({ 
        type: 'query', 
        text: text.trim(),
        model: currentModel,
        mode: currentMode
    }));
}

function appendUserMessage(text) {
    const row = document.createElement('div');
    row.className = 'msg-row user';
    row.innerHTML = `<div class="msg-bubble">${text}</div>`;
    messagesList.appendChild(row);
    scrollToBottom();
}

function appendAiMessage(htmlContent, latency, model, mode) {
    const row = document.createElement('div');
    row.className = 'msg-row ai';
    row.innerHTML = `
        <div class="msg-bubble">${htmlContent}</div>
    `;
    messagesList.appendChild(row);
    scrollToBottom();
}

function showLoading() {
    const row = document.createElement('div');
    row.className = 'msg-row ai loading-msg';
    row.innerHTML = `
        <div class="claude-thinking-loader">
            <span class="claude-sun-sparkle">✹</span>
            <span class="thinking-live-timer" id="liveTimerText">0.0s</span>
        </div>
    `;
    messagesList.appendChild(row);
    scrollToBottom();

    clearInterval(thinkingTimerInterval);
    const startTime = Date.now();
    thinkingTimerInterval = setInterval(() => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        const timerEl = document.getElementById('liveTimerText');
        if (timerEl) {
            timerEl.textContent = `${elapsed}s`;
        }
    }, 100);
}

function removeLoading() {
    clearInterval(thinkingTimerInterval);
    const loading = document.querySelector('.loading-msg');
    if (loading) loading.remove();
}

function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function clearChat() {
    messagesList.innerHTML = '';
    heroSection.classList.remove('hidden');
}

function quickPrompt(text) {
    sendMessage(text);
}

function toggleThinkingMenu(e) {
    e.stopPropagation();
    document.getElementById('modelDropdown').classList.remove('show');
    document.getElementById('thinkingDropdown').classList.toggle('show');
}

function toggleModelMenu(e) {
    e.stopPropagation();
    document.getElementById('thinkingDropdown').classList.remove('show');
    document.getElementById('modelDropdown').classList.toggle('show');
}

function selectThinkingMode(mode, label, icon) {
    currentMode = mode;
    document.getElementById('currentModeLabel').textContent = label;
    document.getElementById('currentModeIcon').textContent = icon;
    document.getElementById('thinkingDropdown').classList.remove('show');
}

function selectModel(label, modelKey, avatar) {
    currentModel = modelKey;
    currentAvatar = avatar;
    document.getElementById('currentModelLabel').textContent = label;
    document.getElementById('currentModelAvatar').textContent = avatar;
    document.getElementById('modelDropdown').classList.remove('show');
}

document.addEventListener('click', () => {
    document.getElementById('thinkingDropdown').classList.remove('show');
    document.getElementById('modelDropdown').classList.remove('show');
});

promptInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
    updateSendBtn();
});

promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(promptInput.value);
    }
});

sendBtn.addEventListener('click', () => {
    sendMessage(promptInput.value);
});

function updateSendBtn() {
    if (promptInput.value.trim().length > 0) {
        sendBtn.classList.add('active');
    } else {
        sendBtn.classList.remove('active');
    }
}

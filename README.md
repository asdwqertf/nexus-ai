
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google-site-verification" content="XfGXklRd67Mn1aQXAhhxGdR7QdVeoJLbSBnJNoP7nHs" />
    <title>NEXUS AI · الذكاء الاصطناعي الخارق</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    
    <style>
        :root {
            --bg-main: #191817;
            --bg-box: #242220;
            --bg-box-border: #3b3835;
            --bg-capsule: #22201d;
            --bg-capsule-hover: #2e2c28;
            --text-main: #faf8f5;
            --text-muted: #a39f99;
            --text-sub: #78756f;
            --claude-sun: #cc785c;
            --border-color: rgba(255, 255, 255, 0.08);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Tajawal', 'Inter', sans-serif; }
        body { background-color: var(--bg-main); color: var(--text-main); min-height: 100vh; display: flex; justify-content: center; overflow-x: hidden; }
        .app-container { width: 100%; max-width: 860px; min-height: 100vh; display: flex; flex-direction: column; position: relative; padding: 0 16px; }
        .top-nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; }
        .plan-badge { background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-color); padding: 5px 14px; border-radius: 20px; font-size: 0.85rem; color: var(--text-muted); }
        .upgrade-link { color: #a78bfa; text-decoration: none; font-weight: 500; }
        .icon-btn { background: transparent; border: none; color: var(--text-muted); font-size: 1.1rem; cursor: pointer; padding: 8px; border-radius: 8px; transition: all 0.2s; }
        .icon-btn:hover { color: var(--text-main); background: rgba(255, 255, 255, 0.05); }
        .chat-area { flex: 1; display: flex; flex-direction: column; padding-bottom: 230px; }
        .hero-section { margin-top: 15vh; margin-bottom: 6vh; text-align: center; }
        .hero-section.hidden { display: none; }
        .hero-title { font-size: 2.2rem; font-weight: 500; color: var(--text-main); letter-spacing: -0.5px; display: inline-flex; align-items: center; gap: 8px; }
        .claude-sun { color: var(--claude-sun); font-size: 2rem; }
        .messages-list { display: flex; flex-direction: column; gap: 20px; margin-top: 20px; }
        .msg-row { display: flex; flex-direction: column; gap: 8px; width: 100%; }
        .msg-row.user { align-items: flex-end; }
        .msg-bubble { max-width: 85%; padding: 12px 18px; border-radius: 16px; font-size: 1rem; line-height: 1.7; }
        .msg-row.user .msg-bubble { background: #2b2926; color: var(--text-main); border-bottom-right-radius: 4px; }
        .msg-row.ai .msg-bubble { background: transparent; color: var(--text-main); padding: 0; max-width: 100%; }
        .claude-thinking-loader { display: flex; align-items: center; gap: 12px; padding: 8px 0; }
        .claude-sun-sparkle { color: var(--claude-sun); font-size: 1.7rem; display: inline-block; animation: claudeSparklePulse 1.8s infinite; }
        .thinking-live-timer { font-size: 0.88rem; font-weight: 500; color: var(--claude-sun); }
        @keyframes claudeSparklePulse { 0% { transform: rotate(0deg) scale(0.85); opacity: 0.5; } 50% { transform: rotate(180deg) scale(1.15); opacity: 1; } 100% { transform: rotate(360deg) scale(0.85); opacity: 0.5; } }
        .prompt-container { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); width: 100%; max-width: 860px; padding: 0 16px; display: flex; flex-direction: column; gap: 14px; z-index: 100; }
        .prompt-box { background: var(--bg-box); border: 1px solid var(--bg-box-border); border-radius: 20px; padding: 14px 16px 12px 16px; box-shadow: 0 12px 35px rgba(0, 0, 0, 0.45); display: flex; flex-direction: column; gap: 10px; }
        textarea { width: 100%; background: transparent; border: none; outline: none; color: var(--text-main); font-size: 1.05rem; resize: none; min-height: 48px; }
        textarea::placeholder { color: var(--text-sub); }
        .box-footer { display: flex; justify-content: space-between; align-items: center; }
        .send-btn { background: #383632; color: var(--text-main); border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .send-btn.active { background: var(--text-main); color: var(--bg-main); }
        .suggestions-bar { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }
        .capsule-btn { background: var(--bg-capsule); border: 1px solid var(--border-color); padding: 7px 13px; border-radius: 12px; color: var(--text-muted); font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 7px; }
        .capsule-btn:hover { background: var(--bg-capsule-hover); color: var(--text-main); }
    </style>
</head>
<body>
    <div class="app-container">
        <header class="top-nav">
            <div class="user-tier">
                <span class="plan-badge">NEXUS AI · <a href="#" class="upgrade-link">Groq Cloud Edition</a></span>
            </div>
            <div class="nav-actions">
                <button class="icon-btn" onclick="clearChat()" title="جلسة جديدة"><i class="fa-solid fa-rotate-right"></i></button>
            </div>
        </header>

        <main class="chat-area" id="chatArea">
            <div class="hero-section" id="heroSection">
                <h1 class="hero-title">دردشة تحت ضوء القمر؟ <span class="claude-sun">✹</span></h1>
            </div>
            <div class="messages-list" id="messagesList"></div>
        </main>

        <div class="prompt-container">
            <div class="prompt-box">
                <textarea id="promptInput" rows="1" placeholder="كيف يمكن لـ NEXUS مساعدتك اليوم في البرمجة والاستدلال؟" dir="auto"></textarea>
                <div class="box-footer">
                    <span style="font-size:0.8rem; color:var(--text-sub);">⚡ مدعوم بـ Groq Llama-3 70B</span>
                    <button class="send-btn" id="sendBtn"><i class="fa-solid fa-arrow-up"></i></button>
                </div>
            </div>
            <div class="suggestions-bar">
                <button class="capsule-btn" onclick="quickPrompt('اكتب لي كود بايثون احترافي')"><i class="fa-solid fa-code"></i><span>كتابة كود &lt;/&gt;</span></button>
                <button class="capsule-btn" onclick="quickPrompt('نصائح لتنظيم الوقت اليومي')"><i class="fa-solid fa-mug-hot"></i><span>أمور الحياة</span></button>
                <button class="capsule-btn" onclick="quickPrompt('اشرح لي الذكاء الاصطناعي ببساطة')"><i class="fa-solid fa-graduation-cap"></i><span>تعلّم</span></button>
            </div>
        </div>
    </div>

    <script>
        const GROQ_KEY = "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";
        const messagesList = document.getElementById('messagesList');
        const promptInput = document.getElementById('promptInput');
        const sendBtn = document.getElementById('sendBtn');
        const heroSection = document.getElementById('heroSection');
        let thinkingTimerInterval = null;

        async function sendMessage(text) {
            if (!text.trim()) return;
            heroSection.classList.add('hidden');
            appendUserMessage(text.trim());
            promptInput.value = '';
            showLoading();

            try {
                const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + GROQ_KEY
                    },
                    body: JSON.stringify({
                        model: "llama-3.3-70b-versatile",
                        messages: [
                            { role: "system", content: "You are NEXUS AI, a super fast and brilliant AI engine. Respond helpfully in Arabic." },
                            { role: "user", content: text.trim() }
                        ],
                        temperature: 0.7,
                        max_tokens: 2048
                    })
                });
                const data = await res.json();
                removeLoading();
                if (data.choices && data.choices[0]) {
                    appendAiMessage(marked.parse(data.choices[0].message.content));
                } else {
                    appendAiMessage("عذراً، حدث خطأ في معالجة الرد.");
                }
            } catch (err) {
                removeLoading();
                appendAiMessage("خطأ في الاتصال: " + err.message);
            }
        }

        function appendUserMessage(text) {
            const row = document.createElement('div');
            row.className = 'msg-row user';
            row.innerHTML = <div class="msg-bubble"></div>;
            messagesList.appendChild(row);
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }

        function appendAiMessage(htmlContent) {
            const row = document.createElement('div');
            row.className = 'msg-row ai';
            row.innerHTML = <div class="msg-bubble"></div>;
            messagesList.appendChild(row);
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }

        function showLoading() {
            const row = document.createElement('div');
            row.className = 'msg-row ai loading-msg';
            row.innerHTML = <div class="claude-thinking-loader"><span class="claude-sun-sparkle">✹</span><span class="thinking-live-timer" id="liveTimerText">0.0s</span></div>;
            messagesList.appendChild(row);
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            const startTime = Date.now();
            thinkingTimerInterval = setInterval(() => {
                const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
                const timerEl = document.getElementById('liveTimerText');
                if (timerEl) timerEl.textContent = elapsed + 's';
            }, 100);
        }

        function removeLoading() {
            clearInterval(thinkingTimerInterval);
            const loading = document.querySelector('.loading-msg');
            if (loading) loading.remove();
        }

        function clearChat() { messagesList.innerHTML = ''; heroSection.classList.remove('hidden'); }
        function quickPrompt(t) { sendMessage(t); }

        promptInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(promptInput.value); }
        });
        sendBtn.addEventListener('click', () => sendMessage(promptInput.value));
        promptInput.addEventListener('input', function() {
            if (this.value.trim().length > 0) sendBtn.classList.add('active');
            else sendBtn.classList.remove('active');
        });
    </script>
</body>
</html>

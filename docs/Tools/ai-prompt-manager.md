---
title: AI Prompt Manager
nav:false
---

# AI 提示词管理器
基于 Just The Docs 的轻量化提示词编辑、优化、存储工具

<style>
/* 全局JTD基础规范 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

:root {
    --jtd-bg: #ffffff;
    --jtd-text: #212121;
    --jtd-border: #e5e7eb;
    --jtd-primary: #2383e2;
    --jtd-card: #f9fafb;
    --jtd-btn-bg: #2383e2;
    --jtd-btn-text: #fff;
}

[data-theme="dark"] {
    --jtd-bg: #1f2937;
    --jtd-text: #f3f4f6;
    --jtd-border: #374151;
    --jtd-primary: #60a5fa;
    --jtd-card: #273444;
    --jtd-btn-bg: #60a5fa;
    --jtd-btn-text: #111827;
}

body {
    background-color: var(--jtd-bg);
    color: var(--jtd-text);
    line-height: 1.6;
    transition: all 0.3s ease;
}

/* JTD 页面容器 */
.jtd-container {
    max-width: 1200px;
    margin: 20px auto;
}

/* JTD 头部导航 */
.jtd-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid var(--jtd-border);
    margin-bottom: 24px;
}

.jtd-title {
    font-size: 22px;
    font-weight: 600;
    color: var(--jtd-primary);
}

/* 主题切换按钮 */
.theme-btn {
    padding: 8px 16px;
    border: 1px solid var(--jtd-border);
    border-radius: 6px;
    background: var(--jtd-card);
    color: var(--jtd-text);
    cursor: pointer;
    transition: 0.2s;
}

.theme-btn:hover {
    border-color: var(--jtd-primary);
}

/* 主体布局：侧边分类 + 编辑区 */
.jtd-main {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 24px;
}

/* 侧边栏分类 */
.jtd-sidebar {
    border: 1px solid var(--jtd-border);
    border-radius: 8px;
    padding: 16px;
    background: var(--jtd-card);
    height: fit-content;
}

.sidebar-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--jtd-border);
}

.category-item {
    padding: 8px 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 4px;
    font-size: 14px;
    transition: 0.2s;
}

.category-item:hover, .category-item.active {
    background: var(--jtd-primary);
    color: var(--jtd-btn-text);
}

/* 编辑卡片 */
.jtd-card {
    border: 1px solid var(--jtd-border);
    border-radius: 8px;
    padding: 20px;
    background: var(--jtd-card);
}

.card-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
}

/* 操作按钮组 */
.btn-group {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    flex-wrap: wrap;
}

.jtd-btn {
    padding: 10px 20px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    transition: 0.2s;
}

.btn-primary {
    background: var(--jtd-btn-bg);
    color: var(--jtd-btn-text);
}

.btn-default {
    background: transparent;
    border: 1px solid var(--jtd-border);
    color: var(--jtd-text);
}

.jtd-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
}

/* 提示词编辑框 */
#promptEditor {
    width: 100%;
    min-height: 400px;
    padding: 16px;
    border: 1px solid var(--jtd-border);
    border-radius: 6px;
    background: var(--jtd-bg);
    color: var(--jtd-text);
    font-size: 14px;
    line-height: 1.8;
    resize: vertical;
    outline: none;
    transition: 0.2s;
}

#promptEditor:focus {
    border-color: var(--jtd-primary);
}

/* 提示弹窗 */
.toast {
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 12px 24px;
    background: var(--jtd-primary);
    color: #fff;
    border-radius: 6px;
    display: none;
    z-index: 999;
}

/* 响应式适配 */
@media (max-width: 768px) {
    .jtd-main {
        grid-template-columns: 1fr;
    }
}
</style>

<div class="jtd-container">
    <header class="jtd-header">
        <div class="jtd-title">AI 提示词管理器 | JTD 极简版</div>
        <button class="theme-btn" id="themeBtn">切换暗夜模式</button>
    </header>

    <div class="jtd-main">
        <aside class="jtd-sidebar">
            <div class="sidebar-title">快速模板库</div>
            <div class="category-item active" data-tpl="empty">空白创作</div>
            <div class="category-item" data-tpl="copywriting">文案创作</div>
            <div class="category-item" data-tpl="code">编程开发</div>
            <div class="category-item" data-tpl="office">办公辅助</div>
            <div class="category-item" data-tpl="study">学习答疑</div>
        </aside>

        <section class="jtd-card">
            <div class="card-title">提示词编辑工作台</div>
            <div class="btn-group">
                <button class="jtd-btn btn-primary" id="optimizeBtn">✨ AI一键优化</button>
                <button class="jtd-btn btn-default" id="cleanBtn">🧹 格式净化</button>
                <button class="jtd-btn btn-default" id="copyBtn">📋 一键复制</button>
                <button class="jtd-btn btn-default" id="clearBtn">🗑️ 清空内容</button>
            </div>
            <textarea id="promptEditor" placeholder="在此输入/粘贴你的提示词，支持实时编辑、自动保存..."></textarea>
        </section>
    </div>
</div>

<div class="toast" id="toast">操作成功！</div>

<script>
    /* 全局变量 */
    const editor = document.getElementById('promptEditor');
    const toast = document.getElementById('toast');
    const themeBtn = document.getElementById('themeBtn');

    /* 1. 主题切换功能 */
    let isDark = false;
    themeBtn.addEventListener('click', () => {
        isDark = !isDark;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeBtn.innerText = isDark ? '切换明亮模式' : '切换暗夜模式';
        showToast('主题切换成功');
    });

    /* 2. 本地自动存储 */
    window.onload = () => {
        const saveData = localStorage.getItem('jtd-prompt-data');
        if (saveData) editor.value = saveData;
    }
    editor.addEventListener('input', () => {
        localStorage.setItem('jtd-prompt-data', editor.value);
    });

    /* 3. 模板快速调用 */
    const tplList = {
        empty: '',
        copywriting: '请你作为专业文案师，根据我的需求创作优质内容，要求逻辑通顺、语句优美、贴合场景，输出结构化成品内容。我的需求：',
        code: '请你作为资深开发工程师，帮我编写、优化、解析代码，要求代码简洁、无bug、注释清晰、适配场景。我的开发需求：',
        office: '请你作为专业办公助手，帮我处理文案排版、总结、汇报、表格整理等办公工作，输出规范、正式、可用的内容。我的需求：',
        study: '请你作为专业讲师，通俗易懂、细致全面地解答我的问题，循序渐进讲解知识点，适合新手学习。我的问题：'
    };
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            editor.value = tplList[item.dataset.tpl];
            localStorage.setItem('jtd-prompt-data', editor.value);
            showToast('模板加载成功');
        });
    });

    /* 4. AI一键优化（Demo模拟核心优化逻辑） */
    document.getElementById('optimizeBtn').addEventListener('click', () => {
        let text = editor.value.trim();
        if (!text) return showToast('请输入提示词内容！');
        let optimizeText = `【角色设定】专业AI助手，严格按照用户指令执行任务，输出精准、合规、高质量内容\n【任务指令】${text}\n【约束规则】1. 严格贴合用户核心需求，不冗余、不跑偏；2. 输出逻辑清晰、结构规整；3. 内容真实有效，无虚假信息\n【输出要求】结构化输出，排版整洁，适配主流AI对话场景`;
        editor.value = optimizeText;
        localStorage.setItem('jtd-prompt-data', editor.value);
        showToast('AI优化完成！');
    });

    /* 5. 格式净化（去除冗余空格、空行） */
    document.getElementById('cleanBtn').addEventListener('click', () => {
        let text = editor.value;
        text = text.replace(/\n+/g, '\n').replace(/ +/g, ' ').trim();
        editor.value = text;
        localStorage.setItem('jtd-prompt-data', editor.value);
        showToast('格式净化完成！');
    });

    /* 6. 一键纯净复制 */
    document.getElementById('copyBtn').addEventListener('click', async () => {
        let text = editor.value.trim();
        if (!text) return showToast('暂无内容可复制！');
        await navigator.clipboard.writeText(text);
        showToast('纯净内容已复制！');
    });

    /* 7. 清空内容 */
    document.getElementById('clearBtn').addEventListener('click', () => {
        editor.value = '';
        localStorage.setItem('jtd-prompt-data', '');
        showToast('内容已清空');
    });

    /* 弹窗提示工具 */
    function showToast(msg) {
        toast.innerText = msg;
        toast.style.display = 'block';
        setTimeout(() => toast.style.display = 'none', 2000);
    }
</script>
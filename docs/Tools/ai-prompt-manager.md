---
title: AI-Prompt-Manager
nav:false
---

# AI 提示词管理器 | 本地永久存储版
{: .no_toc }

## 目录
{: .no_toc .text-delta }
1. TOC
{:toc}

<style>
.prompt-container { margin: 2rem 0; }
.prompt-card {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 1rem;
}
.prompt-title { font-size: 1.1rem; font-weight: bold; margin-bottom: 0.5rem; }
.prompt-content {
    background: #fff;
    padding: 0.8rem;
    border-radius: 6px;
    font-family: monospace;
    white-space: pre-wrap;
    margin-bottom: 0.6rem;
    border: 1px solid #e5e7eb;
}
.prompt-tag {
    display: inline-block;
    background: #dbeafe;
    color: #1d4ed8;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 0.75rem;
    margin-right: 4px;
}
.prompt-btn {
    padding: 6px 10px;
    font-size: 0.85rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    margin-right: 6px;
}
.btn-copy { background: #2563eb; color: white; }
.btn-delete { background: #ef4444; color: white; }
.btn-save { background: #16a34a; color: white; padding: 8px 16px; }
.prompt-editor {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    padding: 1.2rem;
    border-radius: 10px;
    margin-bottom: 2rem;
}
.prompt-editor input,
.prompt-editor textarea,
.prompt-editor select {
    width: 100%;
    padding: 10px;
    margin-bottom: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
}
.prompt-editor textarea { min-height: 140px; }
.search-bar {
    padding: 10px 14px;
    width: 100%;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    margin-bottom: 1rem;
}
.empty-tip {
    color: #6b7280;
    padding: 2rem;
    text-align: center;
}
</style>

<div class="prompt-container">
    <input class="search-bar" id="searchInput" placeholder="🔍 搜索提示词..." oninput="renderList()">

    <div class="prompt-editor">
        <h3>✏️ 创建/编辑提示词</h3>
        <input id="editTitle" placeholder="标题：例如 编程助手">
        <input id="editTag" placeholder="标签：例如 开发 / 文案 / 办公">
        <textarea id="editContent" placeholder="输入你的提示词内容..."></textarea>
        <button class="prompt-btn btn-save" onclick="savePrompt()">💾 保存到本地（永久存储）</button>
        <button class="prompt-btn" onclick="clearEditor()">🧹 清空编辑器</button>
    </div>

    <h3>📋 我的提示词库</h3>
    <div id="promptList"></div>
</div>

<script>
/* 本地存储 KEY */
const STORAGE_KEY = "jtd-ai-prompts";
let currentEditId = null;

/* 加载所有提示词 */
function loadPrompts() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("加载失败", e);
        return [];
    }
}

/* 保存（带防溢出保护） */
function savePrompts(list) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        return true;
    } catch (e) {
        if (e.name === "QuotaExceededError") {
            alert("❌ 本地存储已满！请删除一些提示词再保存。");
        } else {
            alert("❌ 保存失败：" + e.message);
        }
        return false;
    }
}

/* 渲染列表 */
function renderList() {
    const list = loadPrompts();
    const search = document.getElementById("searchInput").value.toLowerCase();
    const container = document.getElementById("promptList");

    const filtered = list.filter(item =>
        item.title?.toLowerCase().includes(search) ||
        item.content?.toLowerCase().includes(search) ||
        item.tag?.toLowerCase().includes(search)
    );

    if (filtered.length === 0) {
        container.innerHTML = `<div class="empty-tip">暂无提示词，开始创建吧～</div>`;
        return;
    }

    let html = "";
    filtered.forEach((item, idx) => {
        html += `
        <div class="prompt-card">
            <div class="prompt-title">${item.title || "无标题"}</div>
            ${item.tag ? `<span class="prompt-tag">${item.tag}</span>` : ""}
            <div class="prompt-content">${item.content}</div>
            <button class="prompt-btn btn-copy" onclick="copyPrompt(${idx})">📋 复制</button>
            <button class="prompt-btn btn-delete" onclick="deletePrompt(${idx})">🗑 删除</button>
        </div>`;
    });

    container.innerHTML = html;
}

/* 保存提示词 */
function savePrompt() {
    const title = document.getElementById("editTitle").value.trim();
    const tag = document.getElementById("editTag").value.trim();
    const content = document.getElementById("editContent").value.trim();

    if (!title || !content) {
        alert("请填写标题和内容！");
        return;
    }

    const list = loadPrompts();
    list.push({
        title,
        tag,
        content,
        time: new Date().toLocaleString()
    });

    const ok = savePrompts(list);
    if (ok) {
        clearEditor();
        renderList();
    }
}

/* 复制 */
function copyPrompt(index) {
    const list = loadPrompts();
    const content = list[index].content;
    navigator.clipboard.writeText(content);
    alert("✅ 已复制到剪贴板");
}

/* 删除 */
function deletePrompt(index) {
    if (!confirm("确定删除？")) return;
    const list = loadPrompts();
    list.splice(index, 1);
    savePrompts(list);
    renderList();
}

/* 清空编辑器 */
function clearEditor() {
    document.getElementById("editTitle").value = "";
    document.getElementById("editTag").value = "";
    document.getElementById("editContent").value = "";
    currentEditId = null;
}

/* 初始化 */
window.onload = renderList;
</script>
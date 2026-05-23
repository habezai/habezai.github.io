---
title: AI-Prompt-Manager
nav:false
---

# AI 提示词管理器 | 本地存储

<style>
.prompt-container { margin: 2rem 0; }

.search-bar {
    padding: 10px 14px;
    width: 100%;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    margin-bottom: 1rem;
}

.create-btn {
    display: inline-block;
    background: #2563eb;
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 1.2rem;
    font-size: 0.95rem;
}

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

.empty-tip {
    color: #6b7280;
    padding: 2rem;
    text-align: center;
}

/* 弹窗遮罩 + 窗口 */
.modal-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.5);
    z-index: 9998;
    display: none;
}
.modal {
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 90%; max-width: 650px;
    background: white;
    border-radius: 12px;
    padding: 1.8rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    z-index: 9999;
    display: none;
}
.modal h3 { margin-top: 0; margin-bottom: 1rem; }
.modal input, .modal textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
}
.modal textarea { min-height: 160px; }
.modal-buttons {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}
.modal-save {
    background: #16a34a;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
}
.modal-close {
    background: #999;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
}
</style>

<div class="prompt-container">
    <input
        class="search-bar"
        id="searchInput"
        placeholder="🔍 搜索过滤提示词... 可搜 标题|标签|内容"
        oninput="renderList()"
    >

    <button class="create-btn" onclick="openModal()">➕ 创建新提示词</button>

    <h3>📋 我的提示词库</h3>
    <div id="promptList"></div>
</div>

<!-- 弹窗：创建/编辑提示词 -->
<div class="modal-overlay" id="modalOverlay"></div>
<div class="modal" id="modal">
    <h3>✏️ 创建提示词</h3>
    <input id="editTitle" placeholder="标题：例如 编程助手">
    <input id="editTag" placeholder="标签：例如 开发 / 文案 / 办公">
    <textarea id="editContent" placeholder="输入你的提示词内容..."></textarea>

    <div class="modal-buttons">
        <button class="modal-close" onclick="closeModal()">取消</button>
        <button class="modal-save" onclick="savePrompt()">保存</button>
    </div>
</div>

<script>
const STORAGE_KEY = "jtd-ai-prompts";

/* 加载原始数据 */
function loadPrompts() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

/* 保存到本地 */
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

/* 渲染列表（已修复索引问题） */
function renderList() {
    const originalList = loadPrompts();
    const search = document.getElementById("searchInput").value.toLowerCase();
    const container = document.getElementById("promptList");

    /* 过滤 */
    const filteredList = originalList.filter((item, realIndex) =>
        (item.title || "").toLowerCase().includes(search) ||
        (item.content || "").toLowerCase().includes(search) ||
        (item.tag || "").toLowerCase().includes(search)
    );

    if (filteredList.length === 0) {
        container.innerHTML = `<div class="empty-tip">暂无提示词，开始创建吧～</div>`;
        return;
    }

    let html = "";
    filteredList.forEach((item) => {
        /* 关键：获取这条数据在原始数组中的真实索引 */
        const realIndex = originalList.findIndex(i => 
            i.title === item.title && 
            i.content === item.content && 
            i.time === item.time
        );

        html += `
        <div class="prompt-card">
            <div class="prompt-title">${item.title || "无标题"}</div>
            ${item.tag ? `<span class="prompt-tag">${item.tag}</span>` : ""}
            <div class="prompt-content">${item.content}</div>
            <button class="prompt-btn btn-copy" onclick="copyPrompt(${realIndex})">📋 复制</button>
            <button class="prompt-btn btn-delete" onclick="deletePrompt(${realIndex})">🗑 删除</button>
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
    list.push({ title, tag, content, time: new Date().toLocaleString() });

    const ok = savePrompts(list);
    if (ok) {
        closeModal();
        clearEditor();
        renderList();
    }
}

/* 复制（使用真实索引） */
function copyPrompt(realIndex) {
    const list = loadPrompts();
    navigator.clipboard.writeText(list[realIndex].content);
    alert("✅ 已复制到剪贴板");
}

/* 删除（使用真实索引） */
function deletePrompt(realIndex) {
    if (!confirm("确定删除？")) return;
    const list = loadPrompts();
    list.splice(realIndex, 1);
    savePrompts(list);
    renderList();
}

/* 清空编辑器 */
function clearEditor() {
    document.getElementById("editTitle").value = "";
    document.getElementById("editTag").value = "";
    document.getElementById("editContent").value = "";
}

/* 弹窗控制 */
function openModal() {
    document.getElementById("modal").style.display = "block";
    document.getElementById("modalOverlay").style.display = "block";
}
function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";
}

window.onload = renderList;
</script>
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
    color: white;
}

/* 按钮颜色：你要的配色 */
.btn-copy   { background: #16a34a; } /* 绿色 */
.btn-edit   { background: #2563eb; } /* 蓝色 */
.btn-delete { background: #f97316; } /* 浅红色（橘红，更柔和） */

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
/* 轻量级悬浮提示条 */
.toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #1f2937;
    color: white;
    padding: 10px 20px;
    border-radius: 6px;
    font-size: 14px;
    z-index: 9999;
    opacity: 0;
    transition: all 0.3s ease;
}
.toast.show {
    opacity: 1;
    transform: translateY(0);
}
/* 批量选择样式 */
.prompt-card.selected {
  background: #dcfce7 !important;
  border: 1px solid #16a34a;
}
.dark-mode .prompt-card.selected {
  background: #166534 !important;
}
.batch-bar {
  margin: 10px 0;
  display: flex;
  gap: 8px;
}
.batch-btn {
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  color: white;
}
.btn-select-all { background: #2563eb; }
.btn-select-none { background: #64748b; }
.btn-batch-delete { background: #ef4444; }
.btn-export { background: #0891b2; }
.btn-import { background: #8b5cf6; }
#import-file { display: none; }
/* 右键菜单 */
.context-menu {
    position: fixed;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 9999;
    padding: 6px 0;
    display: none;
}
.context-menu-item {
    padding: 6px 16px;
    cursor: pointer;
    font-size: 14px;
}
.context-menu-item:hover {
    background: #f0f0f0;
}
</style>

<div class="prompt-container">
    <input
        class="search-bar"
        id="searchInput"
        placeholder="🔍 以搜索关键词...过滤提示词库"
        oninput="renderList()"
    >
    <h3>💡 使用说明</h3>
    <ul> 
        <li>常用用法: 直接搜索关键词, 基于关键字在标题or标签or内容中的匹配检索prompt词</li>
        <li>高阶技巧(多关键词同时匹配): 搜索时以+号连接多个关键词,例如 搜 "myTitle+myTag+myContent" 即检索标题含有myTitle,且标签含有myTag,且内容含有myContent的提示词。(且俩+中间的关键词可以省略)</li>
    </ul>

    <button class="create-btn" onclick="openModal()">➕ 创建新提示词</button>
    <button class="create-btn" onclick="exportAll()" style="background:#0891b2;">💾 导出全体数据(.json file)</button>
    <button class="create-btn" onclick="document.getElementById('import-file').click()" style="background:#8b5cf6;">📥 导入数据(.json file)</button>
    <button class="create-btn" onclick="openImportTextModal()" style="background:#10b981;">📥 导入数据(.json text)</button>

<input type="file" id="import-file" accept=".json" onchange="importFile(event)">
    <input type="file" id="import-file" accept=".json" onchange="importFile(event)">

    <!-- 批量操作栏 -->
    <div class="batch-bar">
    <button class="batch-btn btn-select-all" onclick="selectAll()">全选</button>
    <button class="batch-btn btn-select-none" onclick="selectNone()">取消全选</button>
    </div>

    <h3>📋 我的提示词库</h3>
    <div id="promptList"></div>
</div>

<!-- 弹窗：创建/编辑提示词 -->
<div class="modal-overlay" id="modalOverlay"></div>
<div class="modal" id="modal">
    <h3 id="modalTitle">✏️ 创建提示词</h3>
    <input id="editTitle" placeholder="标题：例如 编程助手">
    <input id="editTag" placeholder="标签：例如 开发 / 文案 / 办公">
    <textarea id="editContent" placeholder="输入你的提示词内容..."></textarea>

    <div class="modal-buttons">
        <button class="modal-close" onclick="closeModal()">取消</button>
        <button class="modal-save" onclick="savePrompt()">保存</button>
    </div>
</div>

<!-- 导入JSON文本弹窗 -->
<div class="modal-overlay" id="importTextOverlay"></div>
<div class="modal" id="importTextModal">
    <h3>📥 导入数据（JSON文本）</h3>
    <textarea id="jsonTextArea" style="min-height:220px;" placeholder='示例：[
  {
    "title": "标题1",
    "tag": "标签1",
    "content": "内容1",
    "time": "2026/5/23 21:14:45"
  },
  {
    "title": "标题2",
    "tag": "标签2",
    "content": "内容2",
    "time": "2026/5/23 21:19:49"
  }
]'></textarea>
    <div class="modal-buttons">
        <button class="modal-close" onclick="closeImportTextModal()">取消</button>
        <button class="modal-save" onclick="confirmImportText()">确认导入</button>
    </div>
</div>

<!-- 右键菜单 -->
<div class="context-menu" id="contextMenu">
    <div class="context-menu-item" id="cmDelete">删除</div>
    <div class="context-menu-item" id="cmBatchDelete">批量删除</div>
    <div class="context-menu-item" id="cmExportSingle">导出选中项到json</div>
    <div class="context-menu-item" id="cmExportBatch">批量导出到json</div>
</div>

<script>
const STORAGE_KEY = "jtd-ai-prompts";
let currentEditRealIndex = null;
let selectedIndexes = []; /* 批量选择ID集合 */

/* 轻量级提示：1秒自动消失 */
function toast(msg) {
    const el = document.createElement("div");
    el.className = "toast";
    el.innerText = msg;
    document.body.appendChild(el);

    setTimeout(() => el.classList.add("show"), 10);
    setTimeout(() => {
        el.classList.remove("show");
        setTimeout(() => el.remove(), 300);
    }, 1000);
}

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
            toast("❌ 本地存储已满！请删除一些提示词再保存。");
        } else {
            toast("❌ 保存失败：" + e.message);
        }
        return false;
    }
}

/* 渲染列表（100%修复索引） */
function renderList() {
    const originalList = loadPrompts();
    const search = document.getElementById("searchInput").value.toLowerCase();
    const container = document.getElementById("promptList");

    /* 高级多条件搜索 */
    const searchText = search.trim();
    const parts = searchText.split('+');
    let titleKey = '', tagKey = '', contentKey = '';

    if (parts.length === 0) {
        titleKey = tagKey = contentKey = '';
    } else if (parts.length === 1) {
        /* 无加号：全字段 OR 搜索 */
        titleKey = tagKey = contentKey = parts[0].trim().toLowerCase();
    } else if (parts.length === 2) {
        /* 1个加号：标题 + 标签 */
        titleKey = parts[0].trim().toLowerCase();
        tagKey = parts[1].trim().toLowerCase();
        contentKey = '';
    } else {
        /* ≥2个加号：只取前两个作为分隔，标题+标签+内容 */
        titleKey = parts[0].trim().toLowerCase();
        tagKey = parts[1].trim().toLowerCase();
        contentKey = parts[2].trim().toLowerCase();
    }

    const filteredList = originalList.filter(item => {
        const t = (item.title || '').toLowerCase();
        const g = (item.tag || '').toLowerCase();
        const c = (item.content || '').toLowerCase();

        if (parts.length === 1) {
            /* OR：任意匹配 */
            return t.includes(titleKey) || g.includes(tagKey) || c.includes(contentKey);
        } else if (parts.length === 2) {
            /* AND：标题 + 标签 */
            return t.includes(titleKey) && g.includes(tagKey);
        } else {
            /* AND：标题 + 标签 + 内容 */
            return t.includes(titleKey) && g.includes(tagKey) && c.includes(contentKey);
        }
    }).reverse();

    if (filteredList.length === 0) {
        container.innerHTML = `<div class="empty-tip">暂无提示词，开始创建吧～</div>`;
        return;
    }

    let html = "";
    filteredList.forEach((item, idx) => {
        /* 关键：获取真实索引，永不出错 */
        const realIndex = originalList.findIndex(
            i => i.title === item.title && i.content === item.content && i.time === item.time
        );

        html += `
        <div class="prompt-card ${selectedIndexes.includes(realIndex) ? 'selected' : ''}" onclick="toggleSelect(${realIndex})" data-real-index="${realIndex}">
            <div class="prompt-title">${item.title || "无标题"}</div>
            ${item.tag ? `<span class="prompt-tag">${item.tag}</span>` : ""}
            <div class="prompt-content">${item.content}</div>
            <button class="prompt-btn btn-copy" onclick="copyPrompt(${realIndex})">📋 复制</button>
            <button class="prompt-btn btn-edit" onclick="editPrompt(${realIndex})">✏️ 编辑</button>
            <button class="prompt-btn btn-delete" onclick="deletePrompt(${realIndex})">🗑 删除</button>
        </div>`;
    });

    container.innerHTML = html;
}

/* 打开弹窗（创建） */
function openModal() {
    currentEditRealIndex = null;
    document.getElementById("modalTitle").innerText = "✏️ 创建提示词";
    clearEditor();
    document.getElementById("modal").style.display = "block";
    document.getElementById("modalOverlay").style.display = "block";
}

/* 打开弹窗（编辑） */
function editPrompt(realIndex) {
    const list = loadPrompts();
    const item = list[realIndex];
    currentEditRealIndex = realIndex;

    document.getElementById("modalTitle").innerText = "✏️ 编辑提示词";
    document.getElementById("editTitle").value = item.title || "";
    document.getElementById("editTag").value = item.tag || "";
    document.getElementById("editContent").value = item.content || "";

    document.getElementById("modal").style.display = "block";
    document.getElementById("modalOverlay").style.display = "block";
}

/* 关闭弹窗 */
function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";
}

/* 保存（创建 / 编辑 通用） */
function savePrompt() {
    const title = document.getElementById("editTitle").value.trim();
    const tag = document.getElementById("editTag").value.trim();
    const content = document.getElementById("editContent").value.trim();

    if (!title || !content) {
        toast("请填写标题和内容！");
        return;
    }

    const list = loadPrompts();
    const data = { title, tag, content, time: new Date().toLocaleString() };

    if (currentEditRealIndex === null) {
        /* 创建 */
        list.push(data);
    } else {
        /* 编辑 */
        list[currentEditRealIndex] = data;
    }

    const ok = savePrompts(list);
    if (ok) {
        closeModal();
        clearEditor();
        renderList();
    }
}

/* 复制 */
function copyPrompt(realIndex) {
    const list = loadPrompts();
    navigator.clipboard.writeText(list[realIndex].content);
    toast("✅ 已复制到剪贴板");
}

/* 删除 */
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

/* ====================== 导入导出 ====================== */
function exportAll() {
  const list = loadPrompts();
  const blob = new Blob([JSON.stringify(list, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'prompt-backup-' + new Date().toISOString().slice(0,10) + '.json';
  a.click();
  toast('✅ 导出成功');
}

function importFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
        try {
            const data = JSON.parse(evt.target.result);
            if (!Array.isArray(data)) throw new Error("格式错误");

            const curr = loadPrompts();
            const merged = [...curr];

            for (const item of data) {
                const exist = curr.some(i =>
                    i.title === item.title &&
                    i.tag === item.tag &&
                    i.content === item.content
                );
                if (!exist) merged.push(item);
            }

            savePrompts(merged);
            renderList();
            toast(`✅ 导入成功！新增 ${merged.length - curr.length} 条`);
        } catch (e) {
            toast("❌ 导入失败：" + e.message);
        }
        e.target.value = "";
    };
    reader.readAsText(file);
}

/* 导入JSON文本 */
function openImportTextModal() {
    document.getElementById("importTextModal").style.display = "block";
    document.getElementById("importTextOverlay").style.display = "block";
}
function closeImportTextModal() {
    document.getElementById("importTextModal").style.display = "none";
    document.getElementById("importTextOverlay").style.display = "none";
}
function confirmImportText() {
    try {
        const text = document.getElementById("jsonTextArea").value.trim();
        const data = JSON.parse(text);
        if (!Array.isArray(data)) throw new Error("必须是数组格式");

        const curr = loadPrompts();
        const merged = [...curr];

        for (const item of data) {
            const exist = curr.some(i =>
                i.title === item.title && i.tag === item.tag && i.content === item.content
            );
            if (!exist) merged.push(item);
        }

        savePrompts(merged);
        closeImportTextModal();
        renderList();
        toast(`✅ 导入成功！新增 ${merged.length - curr.length} 条`);
    } catch (e) {
        toast("❌ JSON格式错误：" + e.message);
    }
}

/* 右键菜单 */
let currentContextTarget = null;
const cm = document.getElementById("contextMenu");
const cmDelete = document.getElementById("cmDelete");
const cmBatchDelete = document.getElementById("cmBatchDelete");
const cmExportSingle = document.getElementById("cmExportSingle");
const cmExportBatch = document.getElementById("cmExportBatch");

document.addEventListener("contextmenu", (e) => {
    const card = e.target.closest(".prompt-card");
    if (!card) return;
    e.preventDefault();

    const realIndex = parseInt(card.dataset.realIndex);
    currentContextTarget = card;

    const selCount = selectedIndexes.length;
    const isSingle = selCount === 0 || (selCount === 1 && selectedIndexes.includes(realIndex));

    cm.style.left = e.clientX + "px";
    cm.style.top = e.clientY + "px";
    cm.style.display = "block";

    cmDelete.style.display = isSingle ? "block" : "none";
    cmBatchDelete.style.display = !isSingle && selCount > 0 ? "block" : "none";
    cmExportSingle.style.display = isSingle ? "block" : "none";
    cmExportBatch.style.display = !isSingle && selCount > 0 ? "block" : "none";
});

document.addEventListener("click", () => {
    cm.style.display = "none";
});

/* 右键 - 删除单条 */
cmDelete.onclick = () => {
    const card = currentContextTarget;
    const realIndex = parseInt(card.dataset.realIndex);
    if (confirm("确定删除？")) {
        const list = loadPrompts();
        list.splice(realIndex, 1);
        savePrompts(list);
        renderList();
        toast("✅ 删除成功");
    }
    cm.style.display = "none";
};

/* 右键 - 批量删除 */
cmBatchDelete.onclick = () => {
    if (selectedIndexes.length === 0) return;
    if (!confirm("确定删除选中的 " + selectedIndexes.length + " 条？")) return;
    let list = loadPrompts();
    selectedIndexes.sort((a, b) => b - a);
    selectedIndexes.forEach(i => list.splice(i, 1));
    savePrompts(list);
    selectedIndexes = [];
    renderList();
    toast("✅ 批量删除成功");
    cm.style.display = "none";
};

/* 右键 - 导出单条 */
cmExportSingle.onclick = () => {
    const card = currentContextTarget;
    const realIndex = parseInt(card.dataset.realIndex);
    const list = loadPrompts();
    const item = list[realIndex];
    const blob = new Blob([JSON.stringify([item], null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "prompt-single-" + item.title.slice(0, 10) + ".json";
    a.click();
    toast("✅ 单条导出成功");
    cm.style.display = "none";
};

/* 右键 - 批量导出 */
cmExportBatch.onclick = () => {
    const list = loadPrompts();
    const selectedItems = selectedIndexes.map(i => list[i]);
    const blob = new Blob([JSON.stringify(selectedItems, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "prompt-batch.json";
    a.click();
    toast("✅ 批量导出成功");
    cm.style.display = "none";
};

/* ====================== 批量选择 ====================== */
function toggleSelect(realIndex) {
  const i = selectedIndexes.indexOf(realIndex);
  i === -1 ? selectedIndexes.push(realIndex) : selectedIndexes.splice(i, 1);
  renderList();
}

function selectAll() {
  const list = loadPrompts();
  selectedIndexes = list.map((_, idx) => idx);
  renderList();
  toast('✅ 已全选');
}

function selectNone() {
  selectedIndexes = [];
  renderList();
  toast('✅ 已取消全选');
}

window.onload = renderList;
</script>
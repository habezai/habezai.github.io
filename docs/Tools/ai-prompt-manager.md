---
title: AI-Prompt-Manager
nav:false
---

# AI 提示词管理器 | 本地存储

<style>
.prompt-container { margin: 2rem 0; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }

/* 左侧内容区域 */
.left-content { display: flex; flex-direction: column; }

/* 右侧内容区域 */
.right-content { display: flex; flex-direction: column; }

.search-bar {
    padding: 10px 14px;
    width: 100%;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    margin-bottom: 1rem;
}

.create-btn {
    display: inline-block;
    background: #9cbcffff;
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
    font-size: 0.95rem;
}

/* 菜单区域容器 */
.action-menu-container {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.action-menu-container h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #1f2937;
    font-size: 1.1rem;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 0.5rem;
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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    position: relative;
    max-width: 100%;
}
.prompt-content::after {
    content: '...';
    position: absolute;
    bottom: 0;
    right: 0;
    background: #fff;
    padding-left: 10px;
    display: none;
}
.prompt-content.truncated::after {
    display: block;
}
.prompt-card:hover .prompt-content {
    -webkit-line-clamp: 100;
    max-height: none;
    overflow-y: auto;
    max-height: 400px;
}
.prompt-card:hover .prompt-content::after {
    display: none;
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
.prompt-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 6px;
}
.prompt-left-btns {
    display: flex;
    gap: 6px;
}
.prompt-btn {
    padding: 6px 10px;
    font-size: 0.85rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
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

/* 命令行模式样式 */
.command-line-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #1e1e1e;
    border-top: 2px solid #333;
    z-index: 10000;
    display: none;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.3);
}
.command-line-container.active {
    display: block;
}
.command-line-input {
    width: 100%;
    background: #1e1e1e;
    color: #00ff00;
    border: none;
    padding: 12px 16px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    outline: none;
}
.command-line-input::placeholder {
    color: #666;
}
.command-line-suggestions {
    position: absolute;
    bottom: 45px;
    left: 16px;
    background: #2d2d2d;
    border: 1px solid #444;
    border-radius: 4px;
    padding: 8px 0;
    max-height: 200px;
    overflow-y: auto;
    display: none;
    z-index: 10001;
}
.command-line-suggestions.active {
    display: block;
}
.command-suggestion {
    padding: 6px 16px;
    color: #aaa;
    cursor: pointer;
    font-family: 'Courier New', monospace;
    font-size: 13px;
}
.command-suggestion:hover,
.command-suggestion.selected {
    background: #3d3d3d;
    color: #00ff00;
}
.command-suggestion .cmd {
    color: #00ff00;
    font-weight: bold;
}
.command-suggestion .desc {
    color: #888;
    margin-left: 8px;
}

/* 帮助弹窗样式 */
.help-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #1e1e1e;
    border: 2px solid #333;
    border-radius: 8px;
    padding: 20px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    z-index: 10002;
    display: none;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}
.help-modal.active {
    display: block;
}
.help-modal h3 {
    color: #00ff00;
    margin-top: 0;
    border-bottom: 1px solid #333;
    padding-bottom: 10px;
}
.help-section {
    margin-bottom: 15px;
}
.help-section h4 {
    color: #ff6b6b;
    margin: 10px 0 5px 0;
}
.help-item {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
    color: #ccc;
    font-family: 'Courier New', monospace;
    font-size: 13px;
}
.help-item .key {
    color: #00ff00;
    font-weight: bold;
}
.help-item .desc {
    color: #888;
}
.help-close {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
}
.help-close:hover {
    background: #ff5252;
}
</style>

<div class="prompt-container">
    <!-- 左侧内容：搜索框、全选、提示词库 -->
    <div class="left-content">
        <input
            class="search-bar"
            id="searchInput"
            placeholder="🔍 以搜索关键词...过滤提示词库"
            oninput="renderList()"
        >
        
        <h3>📋 我的提示词库</h3>
        <button class="create-btn" onclick="openModal()">➕ 创建新提示词</button>
        <!-- 批量操作栏 -->
        <div class="batch-bar">
            <button class="batch-btn btn-select-all" onclick="selectAll()">全选</button>
            <button class="batch-btn btn-select-none" onclick="selectNone()">取消全选</button>
        </div>
        <div id="promptList"></div>
    </div>

    <!-- 右侧内容：搜索说明、功能菜单 -->
    <div class="right-content">
        <div class="action-menu-container">
            <h3>📱 功能菜单 </h3>
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:1.2rem;">
                <button class="create-btn" onclick="selectWorkspaceFile()" style="background:#f59e0b; margin-bottom:0;">📂 关联本地工作区(.json file)</button>
                <div id="workspaceTip" style="font-size:14px; color:#666;"></div>
            </div>
            <button class="create-btn" onclick="exportAll()" style="background:#0891b2;">💾 导出全体数据(.json file)</button>
            <button class="create-btn" onclick="document.getElementById('import-file').click()" style="background:#8b5cf6;">📥 导入数据(.json file)</button>
            <button class="create-btn" onclick="openImportTextModal()" style="background:#10b981;">📥 导入数据(.json text)</button>
        </div>

        <div class="action-menu-container">
            <h3>💡 搜索使用说明</h3>
            <ul> 
                <li>常用用法: 直接搜索关键词, 基于关键字在标题or标签or内容中的匹配检索prompt词</li>
                <li>高阶技巧(多关键词同时匹配): 搜索时以+号连接多个关键词,例如 搜 "myTitle+myTag+myContent" 即检索标题含有myTitle,且标签含有myTag,且内容含有myContent的提示词。(且俩+中间的关键词可以省略)</li>
            </ul>
        </div>
        <div class="action-menu-container" id="backupRestoreContainer" style="display:none;">
            <h3>⏰ 历史版本恢复</h3>
            <div style="font-size:13px; color:#666; margin-bottom:1rem;">每偶数整分钟自动备份，可恢复到历史版本</div>
            <button class="create-btn" onclick="restoreToVersion(-2)" style="background:#f59e0b; margin-bottom:0.8rem;">⏪ 倒退回2分钟前的版本</button>
            <button class="create-btn" onclick="restoreToVersion(-4)" style="background:#f59e0b; margin-bottom:0.8rem;">⏪ 倒退回4分钟前的版本</button>
            <button class="create-btn" onclick="restoreToVersion(-8)" style="background:#f59e0b; margin-bottom:0;">⏪ 倒退回8分钟前的版本</button>

        </div>
    </div>
</div>

<input type="file" id="import-file" accept=".json" onchange="importFile(event)">
<input type="file" id="import-file" accept=".json" onchange="importFile(event)">

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

<!-- 命令行模式 -->
<div class="command-line-container" id="commandLineContainer">
    <input type="text" class="command-line-input" id="commandLineInput" placeholder="输入命令 (按 : 进入，按 Esc 退出，输入 :h 查看帮助)">
    <div class="command-line-suggestions" id="commandSuggestions"></div>
</div>

<!-- 帮助弹窗 -->
<div class="help-modal" id="helpModal">
    <h3>🎹 Vim 快捷键帮助</h3>
    <div class="help-section">
        <h4>📜 基础导航</h4>
        <div class="help-item"><span class="key">j</span><span class="desc">向下滚动</span></div>
        <div class="help-item"><span class="key">k</span><span class="desc">向上滚动</span></div>
        <div class="help-item"><span class="key">gg</span><span class="desc">跳转到页面顶部</span></div>
        <div class="help-item"><span class="key">G</span><span class="desc">跳转到页面底部</span></div>
        <div class="help-item"><span class="key">Ctrl + d</span><span class="desc">向下翻半页</span></div>
        <div class="help-item"><span class="key">Ctrl + u</span><span class="desc">向上翻半页</span></div>
        <div class="help-item"><span class="key">Ctrl + f</span><span class="desc">向下翻一页</span></div>
        <div class="help-item"><span class="key">Ctrl + b</span><span class="desc">向上翻一页</span></div>
    </div>
    <div class="help-section">
        <h4>🔍 搜索与操作</h4>
        <div class="help-item"><span class="key">/</span><span class="desc">聚焦搜索框</span></div>
        <div class="help-item"><span class="key">:</span><span class="desc">进入命令行模式</span></div>
        <div class="help-item"><span class="key">Esc</span><span class="desc">退出输入/命令模式</span></div>
        <div class="help-item"><span class="key">Ctrl + Enter</span><span class="desc">创建新提示词</span></div>
    </div>
    <div class="help-section">
        <h4>💻 命令行命令</h4>
        <div class="help-item"><span class="key">:w</span><span class="desc">导出数据</span></div>
        <div class="help-item"><span class="key">:e</span><span class="desc">导入数据</span></div>
        <div class="help-item"><span class="key">:n</span><span class="desc">创建新提示词</span></div>
        <div class="help-item"><span class="key">:d</span><span class="desc">删除选中项</span></div>
        <div class="help-item"><span class="key">:a</span><span class="desc">全选</span></div>
        <div class="help-item"><span class="key">:A</span><span class="desc">取消全选</span></div>
        <div class="help-item"><span class="key">:c</span><span class="desc">清空搜索</span></div>
        <div class="help-item"><span class="key">:h</span><span class="desc">显示帮助</span></div>
        <div class="help-item"><span class="key">:q</span><span class="desc">关闭帮助/退出</span></div>
    </div>
    <div class="help-section">
        <h4>🔢 数字前缀</h4>
        <div class="help-item"><span class="key">10j</span><span class="desc">向下滚动10次</span></div>
        <div class="help-item"><span class="key">5k</span><span class="desc">向上滚动5次</span></div>
    </div>
    <button class="help-close" onclick="closeHelpModal()">关闭</button>
</div>

<script>
const STORAGE_KEY = "jtd-ai-prompts";
let currentEditRealIndex = null;
let selectedIndexes = []; /* 批量选择ID集合 */
let workspaceFileHandle = null; /* 本地文件句柄（核心）*/
let workspaceFileName = null;  /* 保存的文件名*/
let lastToastTime = 0;  /* 上次toast调用时间 */
let historyVersions = {
    '-2': { data: null, timestamp: null },
    '-4': { data: null, timestamp: null },
    '-6': { data: null, timestamp: null },
    '-8': { data: null, timestamp: null }
};

/* 快捷键：完整的 Vim 操作 */
document.addEventListener('keydown', function(e) {
    const activeElement = document.activeElement;
    const isInputFocused = activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' || 
        activeElement.isContentEditable
    );
    
    const isCommandLine = activeElement && activeElement.id === 'commandLineInput';
    
    if (isCommandLine) {
        handleCommandLineInput(e);
        return;
    }
    
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        openModal();
        return;
    }
    
    if (e.key === 'Escape') {
        if (isInputFocused) {
            e.preventDefault();
            activeElement.blur();
        } else if (document.getElementById('helpModal').classList.contains('active')) {
            closeHelpModal();
        }
        return;
    }
    
    if (isInputFocused) return;
    
    const now = Date.now();
    const isNumber = /^[0-9]$/.test(e.key);
    
    if (isNumber) {
        const timeSinceLastKey = now - vimMode.lastKeyPressTime;
        if (timeSinceLastKey < 500) {
            vimMode.numberPrefix += e.key;
        } else {
            vimMode.numberPrefix = e.key;
        }
        vimMode.lastKeyPressTime = now;
        
        setTimeout(() => {
            if (Date.now() - vimMode.lastKeyPressTime >= 500) {
                vimMode.numberPrefix = '';
            }
        }, 500);
        return;
    }
    
    const repeatCount = parseInt(vimMode.numberPrefix) || 1;
    vimMode.numberPrefix = '';
    
    if (e.key === 'g' && vimMode.lastKeyPressTime > 0 && (now - vimMode.lastKeyPressTime) < 300) {
        e.preventDefault();
        window.scrollTo(0, 0);
        vimMode.lastKeyPressTime = 0;
        toast('📍 已跳转到顶部');
        return;
    }
    
    if (e.key === 'g') {
        vimMode.lastKeyPressTime = now;
        setTimeout(() => {
            if (Date.now() - vimMode.lastKeyPressTime >= 300) {
                vimMode.lastKeyPressTime = 0;
            }
        }, 300);
        return;
    }
    
    if (e.key === ':') {
        e.preventDefault();
        enterCommandLineMode();
        return;
    }
    
    if (e.key === '/') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
        return;
    }
    
    if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        window.scrollBy(0, 100 * repeatCount);
        return;
    }
    
    if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        window.scrollBy(0, -100 * repeatCount);
        return;
    }
    
    if (e.key === 'G') {
        e.preventDefault();
        window.scrollTo(0, document.body.scrollHeight);
        toast('📍 已跳转到底部');
        return;
    }
    
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        window.scrollBy(0, window.innerHeight / 2);
        return;
    }
    
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        window.scrollBy(0, -window.innerHeight / 2);
        return;
    }
    
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        window.scrollBy(0, window.innerHeight);
        return;
    }
    
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        window.scrollBy(0, -window.innerHeight);
        return;
    }
    
    if (e.key === 'h') {
        e.preventDefault();
        window.scrollBy(-100, 0);
        return;
    }
    
    if (e.key === 'l') {
        e.preventDefault();
        window.scrollBy(100, 0);
        return;
    }
});

let lastBackupTime = 0;
let backupTimer = null;
let initialVersion = null;

/* Vim模式状态 */
let vimMode = {
    numberPrefix: '',
    lastKeyPressTime: 0,
    commandMode: false,
    selectedSuggestionIndex: -1
};

/* 命令定义 */
const commands = [
    { cmd: ':w', desc: '导出数据', action: () => exportAll() },
    { cmd: ':e', desc: '导入数据', action: () => document.getElementById('import-file').click() },
    { cmd: ':n', desc: '创建新提示词', action: () => openModal() },
    { cmd: ':d', desc: '删除选中项', action: () => deleteSelected() },
    { cmd: ':a', desc: '全选', action: () => selectAll() },
    { cmd: ':A', desc: '取消全选', action: () => selectNone() },
    { cmd: ':c', desc: '清空搜索', action: () => clearSearch() },
    { cmd: ':h', desc: '显示帮助', action: () => showHelpModal() },
    { cmd: ':q', desc: '关闭帮助/退出', action: () => closeHelpModal() },
    { cmd: ':clear', desc: '清空所有数据', action: () => clearAllData() },
    { cmd: ':stats', desc: '显示统计信息', action: () => showStats() }
];

/* 显示帮助弹窗 */
function showHelpModal() {
    document.getElementById('helpModal').classList.add('active');
}

/* 关闭帮助弹窗 */
function closeHelpModal() {
    document.getElementById('helpModal').classList.remove('active');
}

/* 删除选中项 */
function deleteSelected() {
    if (selectedIndexes.length === 0) {
        toast('❌ 请先选择要删除的项目');
        return;
    }
    if (confirm(`确定删除选中的 ${selectedIndexes.length} 个项目？`)) {
        const list = loadPrompts();
        const sortedIndexes = [...selectedIndexes].sort((a, b) => b - a);
        sortedIndexes.forEach(index => list.splice(index, 1));
        savePrompts(list);
        selectedIndexes = [];
        renderList();
        syncToWorkspaceFile();
        toast(`✅ 已删除 ${sortedIndexes.length} 个项目`);
    }
}

/* 清空搜索 */
function clearSearch() {
    document.getElementById('searchInput').value = '';
    renderList();
    toast('✅ 搜索已清空');
}

/* 清空所有数据 */
function clearAllData() {
    if (confirm('确定要清空所有数据吗？此操作不可恢复！')) {
        savePrompts([]);
        selectedIndexes = [];
        renderList();
        syncToWorkspaceFile();
        toast('✅ 所有数据已清空');
    }
}

/* 显示统计信息 */
function showStats() {
    const list = loadPrompts();
    const total = list.length;
    const selected = selectedIndexes.length;
    const tags = [...new Set(list.map(item => item.tag).filter(Boolean))];
    toast(`📊 总数: ${total} | 选中: ${selected} | 标签数: ${tags.length}`);
}

/* 进入命令行模式 */
function enterCommandLineMode() {
    vimMode.commandMode = true;
    const container = document.getElementById('commandLineContainer');
    const input = document.getElementById('commandLineInput');
    container.classList.add('active');
    input.value = ':';
    input.focus();
    showSuggestions('');
}

/* 退出命令行模式 */
function exitCommandLineMode() {
    vimMode.commandMode = false;
    document.getElementById('commandLineContainer').classList.remove('active');
    document.getElementById('commandSuggestions').classList.remove('active');
    document.getElementById('commandLineInput').value = '';
    vimMode.selectedSuggestionIndex = -1;
}

/* 显示命令建议 */
function showSuggestions(filter) {
    const suggestions = document.getElementById('commandSuggestions');
    const filteredCommands = commands.filter(cmd => 
        cmd.cmd.toLowerCase().includes(filter.toLowerCase()) ||
        cmd.desc.toLowerCase().includes(filter.toLowerCase())
    );
    
    if (filteredCommands.length === 0) {
        suggestions.classList.remove('active');
        return;
    }
    
    suggestions.innerHTML = filteredCommands.map((cmd, index) => 
        `<div class="command-suggestion ${index === vimMode.selectedSuggestionIndex ? 'selected' : ''}" 
              onclick="executeCommand('${cmd.cmd}')">
            <span class="cmd">${cmd.cmd}</span>
            <span class="desc">${cmd.desc}</span>
        </div>`
    ).join('');
    
    suggestions.classList.add('active');
}

/* 执行命令 */
function executeCommand(cmdStr) {
    const cmd = commands.find(c => c.cmd.toLowerCase() === cmdStr.toLowerCase());
    if (cmd) {
        exitCommandLineMode();
        cmd.action();
    } else {
        toast('❌ 未知命令: ' + cmdStr);
    }
}

/* 处理命令行输入 */
function handleCommandLineInput(e) {
    const input = e.target;
    const value = input.value;
    
    if (e.key === 'Enter') {
        if (value.startsWith(':')) {
            executeCommand(value);
        }
        e.preventDefault();
    } else if (e.key === 'Escape') {
        exitCommandLineMode();
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const suggestions = document.querySelectorAll('.command-suggestion');
        if (suggestions.length > 0) {
            vimMode.selectedSuggestionIndex = (vimMode.selectedSuggestionIndex + 1) % suggestions.length;
            showSuggestions(value.substring(1));
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const suggestions = document.querySelectorAll('.command-suggestion');
        if (suggestions.length > 0) {
            vimMode.selectedSuggestionIndex = (vimMode.selectedSuggestionIndex + 1) % suggestions.length;
            showSuggestions(value.substring(1));
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const suggestions = document.querySelectorAll('.command-suggestion');
        if (suggestions.length > 0) {
            vimMode.selectedSuggestionIndex = vimMode.selectedSuggestionIndex <= 0 ? suggestions.length - 1 : vimMode.selectedSuggestionIndex - 1;
            showSuggestions(value.substring(1));
        }
    } else {
        vimMode.selectedSuggestionIndex = -1;
        if (value.startsWith(':')) {
            showSuggestions(value.substring(1));
        } else {
            document.getElementById('commandSuggestions').classList.remove('active');
        }
    }
}


/* 轻量级提示：1秒自动消失，至少间隔1000ms */
function toast(msg) {
    const now = Date.now();
    const timeSinceLastToast = now - lastToastTime;
    
    if (timeSinceLastToast < 1000) {
        setTimeout(() => toast(msg), 1000 - timeSinceLastToast);
        return;
    }
    
    lastToastTime = now;
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

        const formatContent = (content) => {
            if (!content) return '';
            const lines = content.split('\n');
            const formattedLines = lines.map(line => {
                if (line.length <= 100) return line;
                const chunks = [];
                for (let i = 0; i < line.length; i += 100) {
                    chunks.push(line.slice(i, i + 100));
                }
                return chunks.join('\n');
            });
            return formattedLines.join('\n');
        };

        const formattedContent = formatContent(item.content);
        const contentLines = formattedContent.split('\n').length;
        const isTruncated = contentLines > 5;

        html += `
        <div class="prompt-card ${selectedIndexes.includes(realIndex) ? 'selected' : ''}" onclick="toggleSelect(${realIndex})" data-real-index="${realIndex}">
            <div class="prompt-title">${item.title || "无标题"}</div>
            ${item.tag ? `<span class="prompt-tag">${item.tag}</span>` : ""}
            <div class="prompt-content ${isTruncated ? 'truncated' : ''}">${formattedContent}</div>
            <div class="prompt-actions">
                <div class="prompt-left-btns">
                    <button class="prompt-btn btn-copy" onclick="copyPrompt(${realIndex})">📋 复制</button>
                    <button class="prompt-btn btn-edit" onclick="editPrompt(${realIndex})">✏️ 编辑</button>
                </div>
                <button class="prompt-btn btn-delete" onclick="deletePrompt(${realIndex})">🗑 删除</button>
            </div>
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
        syncToWorkspaceFile(); 
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
    syncToWorkspaceFile(); 
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
  a.download = 'prompt-export-' + new Date().toISOString().slice(0,10) + '.json';
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
            syncToWorkspaceFile(); 
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
        syncToWorkspaceFile(); 
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
        syncToWorkspaceFile(); 
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
    syncToWorkspaceFile(); 
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

/* ====================== 本地工作区自动同步 ====================== */
async function selectWorkspaceFile() {
    try {
        const [handle] = await window.showOpenFilePicker({
            types: [{ description: 'JSON 文件', accept: { 'application/json': ['.json'] } }],
            multiple: false
        });
        workspaceFileHandle = handle;
        workspaceFileName = handle.name;
        document.getElementById('workspaceTip').innerText = `✅ 已关联工作区：${workspaceFileName}`;
        toast('✅ 本地工作区关联成功！\n后续操作将自动双向同步');

        await loadFromWorkspaceFile();
        
        initializeBackupSystem();
    } catch (e) {
        toast('❌ 未选择文件或不支持');
    }
}


/* 从本地 JSON 文件加载数据 */
async function loadFromWorkspaceFile() {
    if (!workspaceFileHandle) return;
    try {
        const file = await workspaceFileHandle.getFile();
        const text = await file.text();
        const data = JSON.parse(text);
        if (Array.isArray(data)) {
            savePrompts(data);
            renderList();
            toast('✅ 从本地工作区同步数据成功');
            
            if (!initialVersion) {
                initializeBackupSystem();
            }
        }
    } catch (e) {
        toast('❌ 工作区文件读取失败');
    }
}


/* 保存 → 自动同步到本地文件（核心） */
async function syncToWorkspaceFile() {
    if (!workspaceFileHandle) return;
    try {
        const data = loadPrompts();
        const json = JSON.stringify(data, null, 2);
        const writable = await workspaceFileHandle.createWritable();
        await writable.write(json);
        await writable.close();
    } catch (e) {
        console.warn('同步本地文件失败', e);
    }
}

function initializeBackupSystem() {
    const currentData = loadPrompts();
    const now = new Date();
    initialVersion = JSON.parse(JSON.stringify(currentData));
    
    const timestamp = now;
    
    historyVersions['-2'] = { data: JSON.parse(JSON.stringify(currentData)), timestamp: timestamp };
    historyVersions['-4'] = { data: JSON.parse(JSON.stringify(currentData)), timestamp: timestamp };
    historyVersions['-6'] = { data: JSON.parse(JSON.stringify(currentData)), timestamp: timestamp };
    historyVersions['-8'] = { data: JSON.parse(JSON.stringify(currentData)), timestamp: timestamp };
    
    document.getElementById('backupRestoreContainer').style.display = 'block';
    
    updateButtonLabels();
    startBackupTimer();
}


function startBackupTimer() {
    if (backupTimer) clearInterval(backupTimer);
    
    backupTimer = setInterval(() => {
        const now = new Date();
        const minutes = now.getMinutes();
        
        if (minutes % 2 === 0 && now.getSeconds() === 0) {
            updateHistoryVersions();
        }
    }, 1000);
}

function updateHistoryVersions() {
    const currentData = loadPrompts();
    const currentCopy = JSON.parse(JSON.stringify(currentData));
    const now = new Date();
    
    historyVersions['-8'] = historyVersions['-6'];
    historyVersions['-6'] = historyVersions['-4'];
    historyVersions['-4'] = historyVersions['-2'];
    historyVersions['-2'] = { data: currentCopy, timestamp: now };
    
    console.log('历史版本已更新:', now.toLocaleTimeString());
    updateButtonLabels();
}

function updateButtonLabels() {
    const buttons = [
        { offset: '-2', element: null },
        { offset: '-4', element: null },
        { offset: '-8', element: null }
    ];
    
    const container = document.getElementById('backupRestoreContainer');
    const buttonElements = container.querySelectorAll('button[onclick^="restoreToVersion"]');
    
    buttonElements.forEach((btn, index) => {
        const offset = buttons[index].offset;
        const version = historyVersions[offset];
        
        if (version && version.timestamp) {
            const date = version.timestamp;
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            
            btn.textContent = `⏪ 倒退回${year}-${month}${day}-${hours}:${minutes}的版本`;
        } else {
            const minutes = Math.abs(parseInt(offset));
            btn.textContent = `⏪ 倒退回${minutes}分钟前的版本`;
        }
    });
}

async function restoreToVersion(versionOffset) {
    let targetVersion;
    
    switch(versionOffset) {
        case -2:
            targetVersion = historyVersions['-2'];
            break;
        case -4:
            targetVersion = historyVersions['-4'];
            break;
        case -8:
            targetVersion = historyVersions['-8'];
            break;
        default:
            toast('❌ 无效的版本偏移量');
            return;
    }
    
    if (!targetVersion || !targetVersion.data) {
        toast('❌ 该版本暂无数据');
        return;
    }
    
    const restoredData = JSON.parse(JSON.stringify(targetVersion.data));
    
    savePrompts(restoredData);
    renderList();
    
    if (workspaceFileHandle) {
        try {
            const json = JSON.stringify(restoredData, null, 2);
            const writable = await workspaceFileHandle.createWritable();
            await writable.write(json);
            await writable.close();
            
            const date = targetVersion.timestamp;
            const timeStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            toast(`✅ 已恢复到${timeStr}的版本，本地文件已同步`);
        } catch (e) {
            toast(`✅ 已恢复到历史版本，但本地文件同步失败`);
        }
    } else {
        toast(`✅ 已恢复到历史版本`);
    }
}


window.onload = renderList;
</script>
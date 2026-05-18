---
title: (实用工具)密码学工具箱
parent: Tools
---

# 密码工具箱（离线运行）

<style>
.crypto-tool { margin: 2rem 0; }
.section { margin: 16px 0; padding: 10px; border: 1px solid #ddd; border-radius: 8px; background: #fefefe; }
.title { font-size: 16px; font-weight: bold; margin-bottom: 8px; color: #222; }
.label { font-size: 14px; margin: 4px 0; white-space: nowrap; }
textarea, input, select {
    width: 100%; box-sizing: border-box; padding: 8px; margin: 4px 0;
    border: 1px solid #ccc; border-radius: 6px; font-size: 14px;
}
textarea { min-height: 100px; resize: vertical; }
.btn {
    padding: 8px 16px; background: #007bff; color: white;
    border: none; border-radius: 6px; cursor: pointer; margin: 4px;
}
.btn-danger { background: #dc3544; }
.btn-success { background: #28a745; }
.btn-group { display: flex; flex-wrap: wrap; gap: 8px; margin: 8px 0; }
.result {
    background-color: #f6f8fa; padding: 12px; border-radius: 6px;
    font-family: Consolas, monospace; white-space: pre-wrap; word-break: break-all;
    min-height: 60px; margin-top: 10px;
}
.tabbar {
    display: flex; gap: 4px; margin-bottom: 12px; flex-wrap: wrap;
}
.tab {
    padding: 8px 14px; background: #f1f1f1; border: 1px solid #ccc;
    border-radius: 6px 6px 0 0; cursor: pointer;
}
.tab.active {
    background: #007bff; color: white; border-color: #007bff;
}
.tab-content { display: none; }
.tab-content.active { display: block; }
.row { display: flex; gap: 10px; flex-wrap: wrap; margin: 8px 0; align-items: center; }
.col { flex: 1; min-width: 120px; }

.input-error {
    border: 2px solid #ff4444 !important;
    background-color: #fff5f5 !important;
}
.error-hint {
    font-size: 12px;
    color: #ff4444;
    margin: 4px 0;
    display: none;
}

.file-input {
    padding: 6px;
    border: 1px dashed #888;
    background-color: #fafafa;
}
.file-hint {
    font-size: 12px;
    color: #666;
    margin: 4px 0;
}
</style>

<div class="crypto-tool">
<div class="tabbar">
    <div class="tab active" onclick="showTab('hash')">哈希</div>
    <div class="tab" onclick="showTab('hmac')">HMAC</div>
    <div class="tab" onclick="showTab('aes')">AES/SM4</div>
    <div class="tab" onclick="showTab('rsa')">RSA</div>
    <div class="tab" onclick="showTab('random')">随机数</div>
    <div class="tab" onclick="showTab('encode')">编码</div>
</div>

<!-- 哈希模块 -->
<div id="hash" class="tab-content active">
    <div class="section">
        <div class="title">哈希算法（全支持）</div>

        <div class="row">
            <div class="col" style="max-width:140px;">
                <div class="label">输入模式</div>
                <select id="hashInputMode">
                    <option value="hex">HEX 模式</option>
                    <option value="utf8">UTF-8 文本模式</option>
                    <option value="base64">Base64 模式</option>
                    <option value="file">二进制文件模式</option>
                </select>
            </div>
            <div class="col">
                <div id="hashInputArea" style="display: block;">
                    <div class="label">输入内容</div>
                    <textarea id="hashInput" autocomplete="off" spellcheck="false" autocorrect="off" autocapitalize="off"></textarea>
                    <div class="error-hint" id="hashErrorHint"></div>
                </div>
                <div id="hashFileArea" style="display: none;">
                    <div class="label">选择文件</div>
                    <input type="file" id="hashFileInput" class="file-input" />
                    <div class="file-hint">读取原始二进制</div>
                </div>
            </div>
        </div>

        <div class="row" style="margin-top:8px;">
            <div class="col"><select id="hashAlgo"></select></div>
        </div>

        <button class="btn" onclick="doHash()">计算哈希</button>
        <div class="result" id="hashResult"></div>
    </div>
</div>

<!-- HMAC 模块 -->
<div id="hmac" class="tab-content">
    <div class="section">
        <div class="title">HMAC 消息认证码</div>

        <!-- 消息：模式 + 内容 同一行 -->
        <div class="row">
            <div class="col" style="max-width:140px;">
                <div class="label">消息输入模式</div>
                <select id="hmacInputMode">
                    <option value="hex">HEX 模式</option>
                    <option value="utf8">UTF-8 文本模式</option>
                    <option value="base64">Base64 模式</option>
                    <option value="file">二进制文件模式</option>
                </select>
            </div>
            <div class="col">
                <div id="hmacMsgArea" style="display: block;">
                    <div class="label">消息内容</div>
                    <textarea id="hmacMsg" autocomplete="off" spellcheck="false" autocorrect="off" autocapitalize="off"></textarea>
                    <div class="error-hint" id="hmacErrorHint"></div>
                </div>
                <div id="hmacFileArea" style="display: none;">
                    <div class="label">选择文件</div>
                    <input type="file" id="hmacFileInput" class="file-input" />
                    <div class="file-hint">读取原始二进制</div>
                </div>
            </div>
        </div>

        <!-- 密钥：模式 + 密钥 同一行 -->
        <div class="row" style="margin-top:8px;">
            <div class="col" style="max-width:140px;">
                <div class="label">密钥输入模式</div>
                <select id="hmacKeyMode">
                    <option value="hex">HEX 模式</option>
                    <option value="utf8">UTF-8 文本模式</option>
                    <option value="base64">Base64 模式</option>
                </select>
            </div>
            <div class="col">
                <div class="label">密钥</div>
                <input id="hmacKey" autocomplete="off" spellcheck="false" autocorrect="off" autocapitalize="off" />
                <div class="error-hint" id="hmacKeyErrorHint"></div>
            </div>
        </div>

        <div class="label" style="margin-top:8px;">哈希算法</div>
        <select id="hmacAlgo"></select>

        <button class="btn" style="margin-top:8px;" onclick="doHmac()">计算 HMAC</button>
        <div class="result" id="hmacResult"></div>
    </div>
</div>

<!-- AES 对称加密 -->
<div id="aes" class="tab-content">
    <div class="section">
        <div class="title">AES 对称加密（CBC 模式）</div>

        <div class="row">
            <div class="col" style="max-width:140px;">
                <div class="label">算法</div>
                <select id="symAlgo">
                    <option>aes-128-cbc</option>
                    <option>aes-256-cbc</option>
                </select>
            </div>

            <div class="col" style="max-width:140px;">
                <div class="label">输入模式</div>
                <select id="symInputMode">
                    <option value="utf8">UTF-8 文本模式</option>
                    <option value="hex">HEX 模式</option>
                    <option value="base64">Base64 模式</option>
                    <option value="file">二进制文件模式</option>
                </select>
            </div>
        </div>

        <div id="symInputArea" style="display: block;">
            <div class="label">输入内容（加密=明文 / 解密=密文）</div>
            <textarea id="symInput" autocomplete="off" spellcheck="false" autocorrect="off" autocapitalize="off"></textarea>
            <div class="error-hint" id="symErrorHint"></div>
        </div>
        <div id="symFileArea" style="display: none;">
            <div class="label">选择文件</div>
            <input type="file" id="symFileInput" class="file-input" />
            <div class="file-hint">读取原始二进制数据</div>
        </div>

        <div class="label">密钥 (HEX)</div>
        <input id="symKey" spellcheck="false" autocorrect="off" autocapitalize="off" placeholder="AES128=32位 | AES256=64位">
        <div class="error-hint" id="symKeyError"></div>

        <div class="label">IV (HEX)</div>
        <input id="symIv" spellcheck="false" autocorrect="off" autocapitalize="off" placeholder="必须 32 位 HEX">
        <div class="error-hint" id="symIvError"></div>

        <div class="btn-group">
            <button class="btn btn-success" onclick="doSymEnc()">加密</button>
            <button class="btn btn-danger" onclick="doSymDec()">解密</button>
        </div>
        <div class="result" id="symResult"></div>
    </div>
</div>

<!-- RSA 非对称加密 -->
<div id="rsa" class="tab-content">
    <div class="section">
        <div class="title">RSA 加密/解密</div>
        <div class="btn-group">
            <button class="btn" onclick="genRSA()">生成 RSA 2048</button>
        </div>
        <div class="label">公钥</div>
        <textarea id="rsaPub" spellcheck="false" autocorrect="off" autocapitalize="off"></textarea>
        <div class="label">私钥</div>
        <textarea id="rsaPriv" spellcheck="false" autocorrect="off" autocapitalize="off"></textarea>
        <div class="label">明文</div>
        <textarea id="rsaPlain" spellcheck="false" autocorrect="off" autocapitalize="off"></textarea>
        <div class="btn-group">
            <button class="btn" onclick="doRsaEnc()">公钥加密</button>
            <button class="btn" onclick="doRsaDec()">私钥解密</button>
        </div>
        <div class="result" id="rsaResult"></div>
    </div>
</div>

<!-- 安全随机数 -->
<div id="random" class="tab-content">
    <div class="section">
        <div class="title">安全随机数 / 密钥生成</div>
        <div class="label">生成随机数长度（单位：字节）</div>
        <input type="number" id="randLen" value="32" spellcheck="false" autocorrect="off" autocapitalize="off">
        <div class="label">输出编码格式</div>
        <select id="randFormat">
            <option value="hex">HEX 编码</option>
            <option value="base64">Base64 编码</option>
        </select>
        <button class="btn" onclick="doRand()">生成随机数</button>
        <div class="result" id="randResult"></div>
    </div>
</div>

<!-- 编码互转 → 已完整升级：输入模式 + 文件输入 -->
<div id="encode" class="tab-content">
    <div class="section">
        <div class="title">文本 / HEX / Base64 / Base64Url / UTF-8 互转（支持二进制文件）</div>

        <div class="row">
            <div class="col" style="max-width:140px;">
                <div class="label">输入模式</div>
                <select id="encInputMode">
                    <option value="hex">HEX 模式</option>
                    <option value="utf8">UTF-8 文本模式</option>
                    <option value="base64">Base64 模式</option>
                    <option value="file">二进制文件模式</option>
                </select>
            </div>
            <div class="col">
                <div id="encInputArea" style="display: block;">
                    <div class="label">输入内容</div>
                    <textarea id="encInput" autocomplete="off" spellcheck="false" autocorrect="off" autocapitalize="off"></textarea>
                    <div class="error-hint" id="encErrorHint"></div>
                </div>
                <div id="encFileArea" style="display: none;">
                    <div class="label">选择文件</div>
                    <input type="file" id="encFileInput" class="file-input" />
                    <div class="file-hint">读取原始二进制</div>
                </div>
            </div>
        </div>

        <div class="btn-group">
            <button class="btn" onclick="doEnc('hex')">转 HEX</button>
            <button class="btn" onclick="doEnc('b64')">转 Base64</button>
            <button class="btn" onclick="doEnc('b64url')">转 Base64Url</button>
            <button class="btn" onclick="doEnc('utf8')">转 UTF-8</button>
        </div>
        <div class="result" id="encResult"></div>
    </div>
</div>

</div>

<script src="https://cdn.jsdelivr.net/npm/hash-wasm@4.12.0/dist/index.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/node-forge@1.3.1/dist/forge.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/crypto-js@4.2.0/crypto-js.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/crypto-js-sm4@1.0.0/index.min.js"></script>

<script>
/* 基础工具函数 */
function hexToBytes(hex) {
    hex = hex.replace(/^0x/, '').replace(/\s/g, '');
    if (hex.length % 2 !== 0) throw new Error('HEX 长度必须为偶数');
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) bytes.push(parseInt(hex.substr(i, 2), 16));
    return new Uint8Array(bytes);
}
function base64ToBytes(b64) {
    try {
        const bin = atob(b64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return bytes;
    } catch (e) {
        throw new Error('Base64 格式无效');
    }
}
function isValidBase64(str) {
    try {
        btoa(atob(str));
        return true;
    } catch (e) {
        return false;
    }
}
function readFileAsUint8Array(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(new Uint8Array(reader.result));
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}
function bytesToHex(bytes) {
    return Array.from(bytes).map(x => x.toString(16).padStart(2, '0')).join('');
}
function bytesToBase64(bytes) {
    return btoa(String.fromCharCode(...bytes));
}
function bytesToBase64Url(bytes) {
    return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
function bytesToUtf8(bytes) {
    return new TextDecoder().decode(bytes);
}

/* 输入历史上下键记忆 */
const inputHistory = {
    list: [],
    index: -1,
    current: "",
    add(v) {
        v = v.trim();
        if (!v || this.list[0] === v) return;
        this.list = [v, ...this.list.filter(x => x !== v)].slice(0, 30);
        this.index = -1;
    },
    up() {
        if (this.list.length === 0) return "";
        if (this.index === -1) {
            this.current = document.getElementById("hashInput").value;
            this.index = 0;
        } else {
            this.index = Math.min(this.index + 1, this.list.length - 1);
        }
        return this.list[this.index];
    },
    down() {
        if (this.index <= -1) return "";
        this.index--;
        return this.index < 0 ? this.current : this.list[this.index];
    }
};
const hmacMsgHistory = {
    list: [],
    index: -1,
    current: "",
    add(v) {
        v = v.trim();
        if (!v || this.list[0] === v) return;
        this.list = [v, ...this.list.filter(x => x !== v)].slice(0, 30);
        this.index = -1;
    },
    up() {
        if (this.list.length === 0) return "";
        if (this.index === -1) {
            this.current = document.getElementById("hmacMsg").value;
            this.index = 0;
        } else {
            this.index = Math.min(this.index + 1, this.list.length - 1);
        }
        return this.list[this.index];
    },
    down() {
        if (this.index <= -1) return "";
        this.index--;
        return this.index < 0 ? this.current : this.list[this.index];
    }
};
const hmacKeyHistory = {
    list: [],
    index: -1,
    current: "",
    add(v) {
        v = v.trim();
        if (!v || this.list[0] === v) return;
        this.list = [v, ...this.list.filter(x => x !== v)].slice(0, 30);
        this.index = -1;
    },
    up() {
        if (this.list.length === 0) return "";
        if (this.index === -1) {
            this.current = document.getElementById("hmacKey").value;
            this.index = 0;
        } else {
            this.index = Math.min(this.index + 1, this.list.length - 1);
        }
        return this.list[this.index];
    },
    down() {
        if (this.index <= -1) return "";
        this.index--;
        return this.index < 0 ? this.current : this.list[this.index];
    }
};
const encHistory = {
    list: [],
    index: -1,
    current: "",
    add(v) {
        v = v.trim();
        if (!v || this.list[0] === v) return;
        this.list = [v, ...this.list.filter(x => x !== v)].slice(0, 30);
        this.index = -1;
    },
    up() {
        if (this.list.length === 0) return "";
        if (this.index === -1) {
            this.current = document.getElementById("encInput").value;
            this.index = 0;
        } else {
            this.index = Math.min(this.index + 1, this.list.length - 1);
        }
        return this.list[this.index];
    },
    down() {
        if (this.index <= -1) return "";
        this.index--;
        return this.index < 0 ? this.current : this.list[this.index];
    }
};

let hw;

/* 输入格式校验 */
function validateHash() {
    const mode = document.getElementById('hashInputMode').value;
    const input = document.getElementById('hashInput');
    const err = document.getElementById('hashErrorHint');
    const v = input.value.trim();
    input.classList.remove('input-error'); err.style.display = 'none';
    if (mode === 'hex' && !/^[0-9a-fA-F]*$/.test(v)) { input.classList.add('input-error'); err.innerText = '❌ 仅支持 0-9、a-f、A-F'; err.style.display = 'block'; return false; }
    if (mode === 'base64' && v && !isValidBase64(v)) { input.classList.add('input-error'); err.innerText = '❌ Base64 格式无效'; err.style.display = 'block'; return false; }
    return true;
}
function validateHmacMsg() {
    const mode = document.getElementById('hmacInputMode').value;
    if(mode === 'file') return true; /* 文件模式跳过文本校验 */
    
    const input = document.getElementById('hmacMsg');
    const err = document.getElementById('hmacErrorHint');
    const v = input.value.trim();
    input.classList.remove('input-error'); err.style.display = 'none';
    if (mode === 'hex' && !/^[0-9a-fA-F]*$/.test(v)) { input.classList.add('input-error'); err.innerText = '❌ 仅支持 0-9、a-f、A-F'; err.style.display = 'block'; return false; }
    if (mode === 'base64' && v && !isValidBase64(v)) { input.classList.add('input-error'); err.innerText = '❌ Base64 格式无效'; err.style.display = 'block'; return false; }
    return true;
}
function validateHmacKey() {
    const mode = document.getElementById('hmacKeyMode').value;
    const input = document.getElementById('hmacKey');
    const err = document.getElementById('hmacKeyErrorHint');
    const v = input.value.trim();
    input.classList.remove('input-error'); err.style.display = 'none';
    if (mode === 'hex' && !/^[0-9a-fA-F]*$/.test(v)) { input.classList.add('input-error'); err.innerText = '❌ 仅支持 0-9、a-f、A-F'; err.style.display = 'block'; return false; }
    if (mode === 'base64' && v && !isValidBase64(v)) { input.classList.add('input-error'); err.innerText = '❌ Base64 格式无效'; err.style.display = 'block'; return false; }
    return true;
}
function validateEnc() {
    const mode = document.getElementById('encInputMode').value;
    if (mode === 'file') return true;

    const input = document.getElementById('encInput');
    const err = document.getElementById('encErrorHint');
    const v = input.value.trim();
    input.classList.remove('input-error'); err.style.display = 'none';
    if (mode === 'hex' && !/^[0-9a-fA-F]*$/.test(v)) { input.classList.add('input-error'); err.innerText = '❌ 仅支持 0-9、a-f、A-F'; err.style.display = 'block'; return false; }
    if (mode === 'base64' && v && !isValidBase64(v)) { input.classList.add('input-error'); err.innerText = '❌ Base64 格式无效'; err.style.display = 'block'; return false; }
    return true;
}

/* 页面初始化 */
window.onload = async () => {
    hw = window.hashwasm || hashwasm;
    showTab('hash');

    const hashAlgos = ["md5","sha1","sha224","sha256","sha384","sha512","sha3-224","sha3-256","sha3-384","sha3-512","md4","ripemd160","sm3","whirlpool","adler32"];
    const hmacAlgos = ["md5","sha1","sha224","sha256","sha384","sha512","sha3-224","sha3-256","sha3-384","sha3-512","md4","ripemd160","sm3","whirlpool"];
    
    hashAlgos.forEach(a => { const o = document.createElement('option'); o.value = a; o.innerText = a.toUpperCase(); document.getElementById('hashAlgo').appendChild(o); });
    hmacAlgos.forEach(a => { const o = document.createElement('option'); o.value = a; o.innerText = a.toUpperCase(); document.getElementById('hmacAlgo').appendChild(o); });

    /* 哈希文件模式切换 */
    const hashMode = document.getElementById('hashInputMode');
    const hashFileArea = document.getElementById('hashFileArea');
    const hashInputArea = document.getElementById('hashInputArea');
    hashMode.addEventListener('change', () => {
        if (hashMode.value === 'file') { hashInputArea.style.display = 'none'; hashFileArea.style.display = 'block'; }
        else { hashInputArea.style.display = 'block'; hashFileArea.style.display = 'none'; }
        document.getElementById('hashInput').classList.remove('input-error');
        document.getElementById('hashErrorHint').style.display = 'none';
    });

    /* HMAC 文件模式切换（和哈希完全一致） */
    const hmacMode = document.getElementById('hmacInputMode');
    const hmacFileArea = document.getElementById('hmacFileArea');
    const hmacMsgArea = document.getElementById('hmacMsgArea');
    hmacMode.addEventListener('change', () => {
        if (hmacMode.value === 'file') { hmacMsgArea.style.display = 'none'; hmacFileArea.style.display = 'block'; }
        else { hmacMsgArea.style.display = 'block'; hmacFileArea.style.display = 'none'; }
        document.getElementById('hmacMsg').classList.remove('input-error');
        document.getElementById('hmacErrorHint').style.display = 'none';
    });

    /* 编码模块文件模式 */
    const encMode = document.getElementById('encInputMode');
    const encFileArea = document.getElementById('encFileArea');
    const encInputArea = document.getElementById('encInputArea');
    encMode.addEventListener('change', () => {
        if (encMode.value === 'file') { encInputArea.style.display = 'none'; encFileArea.style.display = 'block'; }
        else { encInputArea.style.display = 'block'; encFileArea.style.display = 'none'; }
        document.getElementById('encInput').classList.remove('input-error');
        document.getElementById('encErrorHint').style.display = 'none';
    });

    document.getElementById('hashInput').addEventListener('input', validateHash);
    document.getElementById('hmacMsg').addEventListener('input', validateHmacMsg);
    document.getElementById('hmacKey').addEventListener('input', validateHmacKey);
    document.getElementById('encInput').addEventListener('input', validateEnc);

    document.getElementById('hashInput').addEventListener('keydown', e => {
        if (document.getElementById('hashInputMode').value === 'file') return;
        if (e.key === 'ArrowUp') { e.preventDefault(); document.getElementById('hashInput').value = inputHistory.up(); }
        if (e.key === 'ArrowDown') { e.preventDefault(); document.getElementById('hashInput').value = inputHistory.down(); }
    });
    document.getElementById('hmacMsg').addEventListener('keydown', e => {
        if (document.getElementById('hmacInputMode').value === 'file') return;
        if (e.key === 'ArrowUp') { e.preventDefault(); document.getElementById('hmacMsg').value = hmacMsgHistory.up(); }
        if (e.key === 'ArrowDown') { e.preventDefault(); document.getElementById('hmacMsg').value = hmacMsgHistory.down(); }
    });
    document.getElementById('hmacKey').addEventListener('keydown', e => {
        if (e.key === 'ArrowUp') { e.preventDefault(); document.getElementById('hmacKey').value = hmacKeyHistory.up(); }
        if (e.key === 'ArrowDown') { e.preventDefault(); document.getElementById('hmacKey').value = hmacKeyHistory.down(); }
    });
    document.getElementById('encInput').addEventListener('keydown', e => {
        if (document.getElementById('encInputMode').value === 'file') return;
        if (e.key === 'ArrowUp') { e.preventDefault(); document.getElementById('encInput').value = encHistory.up(); }
        if (e.key === 'ArrowDown') { e.preventDefault(); document.getElementById('encInput').value = encHistory.down(); }
    });

    /* 对称加密文件模式切换 */
    const symMode = document.getElementById('symInputMode');
    const symFileArea = document.getElementById('symFileArea');
    const symInputArea = document.getElementById('symInputArea');
    symMode.addEventListener('change', () => {
        if (symMode.value === 'file') {
            symInputArea.style.display = 'none';
            symFileArea.style.display = 'block';
        } else {
            symInputArea.style.display = 'block';
            symFileArea.style.display = 'none';
        }
        document.getElementById('symInput').classList.remove('input-error');
        document.getElementById('symErrorHint').style.display = 'none';
    });
};

/* 标签页切换 */
function showTab(tabName) {
    const tabMap = { hash:'哈希', hmac:'HMAC', aes:'AES/SM4', rsa:'RSA', random:'随机数', encode:'编码' };
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const tar = document.getElementById(tabName); if (tar) tar.classList.add('active');
    document.querySelectorAll('.tab').forEach(t => t.innerText.trim() === tabMap[tabName] && t.classList.add('active'));
}

/* 编码转换（新版：支持4种输入 → 任意输出） */
async function doEnc(to) {
    const res = document.getElementById('encResult');
    res.innerText = "⏳ 转换中...";
    try {
        const mode = document.getElementById('encInputMode').value;
        const val = document.getElementById('encInput').value.trim();
        let bytes;

        if (!validateEnc()) throw new Error("输入格式错误");

        /* 输入模式 → 统一转为二进制 Uint8Array */
        if (mode === 'hex') {
            bytes = val ? hexToBytes(val) : new Uint8Array();
        } else if (mode === 'utf8') {
            bytes = new TextEncoder().encode(val);
        } else if (mode === 'base64') {
            bytes = val ? base64ToBytes(val) : new Uint8Array();
        } else if (mode === 'file') {
            const f = document.getElementById('encFileInput').files[0];
            if (!f) throw new Error("请选择文件");
            bytes = await readFileAsUint8Array(f);
        }

        /* 输出目标格式 */
        let out;
        switch (to) {
            case 'hex': out = bytesToHex(bytes); break;
            case 'b64': out = bytesToBase64(bytes); break;
            case 'b64url': out = bytesToBase64Url(bytes); break;
            case 'utf8': out = bytesToUtf8(bytes); break;
            default: throw new Error("不支持的输出格式");
        }

        if (mode !== 'file') encHistory.add(val);
        res.innerText = out;
    } catch (e) {
        res.innerText = "❌ 错误：" + e.message;
    }
}

/* 哈希计算 */
async function doHash() {
    const res = document.getElementById('hashResult'); res.innerText = "⏳ 计算中...";
    try {
        const mode = document.getElementById('hashInputMode').value;
        const algo = document.getElementById('hashAlgo').value;
        let data, text = "";

        if (mode === 'hex') { if (!validateHash()) throw new Error("HEX 输入无效"); text = document.getElementById('hashInput').value.trim(); data = text ? hexToBytes(text) : new Uint8Array(); }
        else if (mode === 'utf8') { text = document.getElementById('hashInput').value.trim(); data = new TextEncoder().encode(text); }
        else if (mode === 'base64') { if (!validateHash()) throw new Error("Base64 输入无效"); text = document.getElementById('hashInput').value.trim(); data = text ? base64ToBytes(text) : new Uint8Array(); }
        else if (mode === 'file') { const f = document.getElementById('hashFileInput').files[0]; if (!f) throw new Error("请选择文件"); data = await readFileAsUint8Array(f); }

        if (mode !== 'file') inputHistory.add(text);
        let out = algo.startsWith('sha3-') ? await hw.sha3(data, parseInt(algo.split('-')[1])) : await hw[algo](data);
        res.innerText = out.toUpperCase();
    } catch (e) { res.innerText = "❌ 错误：" + e.message; }
}

/* HMAC */
async function doHmac() {
    const res = document.getElementById('hmacResult'); 
    res.innerText = "⏳ 计算中...";
    try {
        const msgMode = document.getElementById('hmacInputMode').value;
        const keyMode = document.getElementById('hmacKeyMode').value;
        const algo = document.getElementById('hmacAlgo').value;
        const msgVal = document.getElementById('hmacMsg').value.trim();
        const keyVal = document.getElementById('hmacKey').value.trim();

        if (!validateHmacMsg()) throw new Error("消息格式无效");
        if (!validateHmacKey()) throw new Error("密钥格式无效");
        if (!keyVal) throw new Error("密钥不能为空");

        /* 消息转二进制（支持文件） */
        let msg;
        if (msgMode === 'hex') {
            msg = msgVal ? hexToBytes(msgVal) : new Uint8Array();
        } else if (msgMode === 'utf8') {
            msg = new TextEncoder().encode(msgVal);
        } else if (msgMode === 'base64') {
            msg = msgVal ? base64ToBytes(msgVal) : new Uint8Array();
        } else if (msgMode === 'file') {
            const f = document.getElementById('hmacFileInput').files[0];
            if (!f) throw new Error("请选择文件");
            msg = await readFileAsUint8Array(f);
        }

        /* 密钥转二进制 */
        let key;
        if (keyMode === 'hex') {
            key = hexToBytes(keyVal);
        } else if (keyMode === 'utf8') {
            key = new TextEncoder().encode(keyVal);
        } else {
            key = base64ToBytes(keyVal);
        }

        /* 历史记录 */
        if(msgMode !== 'file') hmacMsgHistory.add(msgVal);
        hmacKeyHistory.add(keyVal);

        /* ============================================== */
        /* 官方标准调用方式：createHMAC(创建的哈希实例, key) */
        /* ============================================== */
        let hashCreator;
        switch (algo) {
            case 'md5': hashCreator = hw.createMD5(); break;
            case 'sha1': hashCreator = hw.createSHA1(); break;
            case 'sha224': hashCreator = hw.createSHA224(); break;
            case 'sha256': hashCreator = hw.createSHA256(); break;
            case 'sha384': hashCreator = hw.createSHA384(); break;
            case 'sha512': hashCreator = hw.createSHA512(); break;
            case 'sha3-224': hashCreator = hw.createSHA3_224(); break;
            case 'sha3-256': hashCreator = hw.createSHA3_256(); break;
            case 'sha3-384': hashCreator = hw.createSHA3_384(); break;
            case 'sha3-512': hashCreator = hw.createSHA3_512(); break;
            case 'md4': hashCreator = hw.createMD4(); break;
            case 'ripemd160': hashCreator = hw.createRIPEMD160(); break;
            case 'sm3': hashCreator = hw.createSM3(); break;
            case 'whirlpool': hashCreator = hw.createWhirlpool(); break;
            default: throw new Error("不支持的哈希算法");
        }

        const hmac = await hw.createHMAC(hashCreator, key);
        await hmac.update(msg);
        const resultHexStr = await hmac.digest();
        res.innerText = resultHexStr.toUpperCase();
    } catch (e) { 
        console.error("HMAC error:", e);
        res.innerText = "❌ 错误：" + e.message; 
    }
}

/*
 * AES 加密函数
 * 支持 UTF8 / HEX / Base64 / 文件 输入模式
 * 输出 Base64 + HEX
 */
function doSymEnc() {
    var res = document.getElementById('symResult');
    var keyInput = document.getElementById('symKey');
    var ivInput = document.getElementById('symIv');
    var inputBox = document.getElementById('symInput');
    var keyError = document.getElementById('symKeyError');
    var ivError = document.getElementById('symIvError');
    var errorHint = document.getElementById('symErrorHint');
    var mode = document.getElementById('symInputMode').value;

    res.innerText = "⏳ 加密处理中...";
    keyError.style.display = 'none';
    ivError.style.display = 'none';
    errorHint.style.display = 'none';
    keyInput.classList.remove('input-error');
    ivInput.classList.remove('input-error');
    inputBox.classList.remove('input-error');

    try {
        var algo = document.getElementById('symAlgo').value;
        var inputVal = document.getElementById('symInput').value.trim();
        var keyHex = document.getElementById('symKey').value.trim();
        var ivHex = document.getElementById('symIv').value.trim();

        if (mode !== 'file' && !inputVal) throw new Error("请输入明文内容");
        if (!keyHex) throw new Error("请输入密钥");
        if (!ivHex) throw new Error("请输入IV");

        var expectKeyLen = algo === 'aes-128-cbc' ? 32 : 64;
        if (keyHex.length !== expectKeyLen) {
            keyInput.classList.add('input-error');
            keyError.innerText = "❌ 密钥必须为 " + expectKeyLen + " 位 HEX";
            keyError.style.display = 'block';
            throw new Error("密钥长度错误");
        }

        if (ivHex.length !== 32) {
            ivInput.classList.add('input-error');
            ivError.innerText = "❌ IV 必须为 32 位 HEX";
            ivError.style.display = 'block';
            throw new Error("IV 长度错误");
        }

        if (mode === 'hex') {
            if (!/^[0-9a-fA-F]+$/.test(inputVal)) {
                inputBox.classList.add('input-error');
                errorHint.innerText = "❌ 仅支持 0-9 a-f A-F";
                errorHint.style.display = 'block';
                throw new Error("HEX 格式错误");
            }
        }

        if (mode === 'base64') {
            if (!isValidBase64(inputVal)) {
                inputBox.classList.add('input-error');
                errorHint.innerText = "❌ Base64 格式无效";
                errorHint.style.display = 'block';
                throw new Error("Base64 格式非法");
            }
        }

        var key = CryptoJS.enc.Hex.parse(keyHex);
        var iv = CryptoJS.enc.Hex.parse(ivHex);
        var plainWordArray;

        if (mode === 'utf8') {
            plainWordArray = CryptoJS.enc.Utf8.parse(inputVal);
        } else if (mode === 'hex') {
            plainWordArray = CryptoJS.enc.Hex.parse(inputVal);
        } else if (mode === 'base64') {
            plainWordArray = CryptoJS.enc.Base64.parse(inputVal);
        } else if (mode === 'file') {
            throw new Error("文件模式仅支持解密");
        }

        var encrypted = CryptoJS.AES.encrypt(plainWordArray, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        var b64 = encrypted.toString();
        var hex = encrypted.ciphertext.toString().toUpperCase();
        res.innerText = "✅ 加密完成\nBase64: " + b64 + "\nHEX:    " + hex;

    } catch (e) {
        res.innerText = "❌ 加密失败：" + e.message;
    }
}

/*
 * AES 解密函数
 * 支持 UTF8 / HEX / Base64 / 文件 输入模式
 */
async function doSymDec() {
    var res = document.getElementById('symResult');
    var keyInput = document.getElementById('symKey');
    var ivInput = document.getElementById('symIv');
    var inputBox = document.getElementById('symInput');
    var keyError = document.getElementById('symKeyError');
    var ivError = document.getElementById('symIvError');
    var errorHint = document.getElementById('symErrorHint');
    var mode = document.getElementById('symInputMode').value;

    res.innerText = "⏳ 解密处理中...";
    keyError.style.display = 'none';
    ivError.style.display = 'none';
    errorHint.style.display = 'none';
    keyInput.classList.remove('input-error');
    ivInput.classList.remove('input-error');
    inputBox.classList.remove('input-error');

    try {
        var algo = document.getElementById('symAlgo').value;
        var inputVal = document.getElementById('symInput').value.trim();
        var keyHex = document.getElementById('symKey').value.trim();
        var ivHex = document.getElementById('symIv').value.trim();

        if (mode !== 'file' && !inputVal) throw new Error("请输入密文内容");
        if (!keyHex) throw new Error("请输入密钥");
        if (!ivHex) throw new Error("请输入IV");

        var expectKeyLen = algo === 'aes-128-cbc' ? 32 : 64;
        if (keyHex.length !== expectKeyLen) {
            keyInput.classList.add('input-error');
            keyError.innerText = "❌ 密钥必须为 " + expectKeyLen + " 位 HEX";
            keyError.style.display = 'block';
            throw new Error("密钥长度错误");
        }

        if (ivHex.length !== 32) {
            ivInput.classList.add('input-error');
            ivError.innerText = "❌ IV 必须为 32 位 HEX";
            ivError.style.display = 'block';
            throw new Error("IV 长度错误");
        }

        var cipherBytes;

        if (mode === 'file') {
            var file = document.getElementById('symFileInput').files[0];
            if (!file) throw new Error("请选择文件");
            var buf = await readFileAsUint8Array(file);
            cipherBytes = CryptoJS.lib.WordArray.create(buf, buf.length);
        } else {
            if (mode === 'hex') {
                if (!/^[0-9a-fA-F]+$/.test(inputVal)) {
                    inputBox.classList.add('input-error');
                    errorHint.innerText = "❌ 仅支持 0-9 a-f A-F";
                    errorHint.style.display = 'block';
                    throw new Error("HEX 格式错误");
                }
            }

            if (mode === 'base64') {
                if (!isValidBase64(inputVal)) {
                    inputBox.classList.add('input-error');
                    errorHint.innerText = "❌ Base64 格式无效";
                    errorHint.style.display = 'block';
                    throw new Error("Base64 格式非法");
                }
            }

            if (mode === 'base64') {
                cipherBytes = CryptoJS.enc.Base64.parse(inputVal);
            } else if (mode === 'hex') {
                cipherBytes = CryptoJS.enc.Hex.parse(inputVal);
            } else if (mode === 'utf8') {
                cipherBytes = CryptoJS.enc.Utf8.parse(inputVal);
            }
        }

        var key = CryptoJS.enc.Hex.parse(keyHex);
        var iv = CryptoJS.enc.Hex.parse(ivHex);

        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: cipherBytes
        });

        var decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        var strUtf8 = decrypted.toString(CryptoJS.enc.Utf8);
        var strHex = decrypted.toString(CryptoJS.enc.Hex).toUpperCase();
        var strBase64 = decrypted.toString(CryptoJS.enc.Base64);

        res.innerText = "✅ 解密完成\nUTF8: " + strUtf8 + "\nHEX:  " + strHex + "\nB64:  " + strBase64;

    } catch (e) {
        res.innerText = "❌ 解密失败：" + e.message;
    }
}

/* RSA 工具 */
function genRSA(){const k=forge.pki.rsa.generateKeyPair(2048);document.getElementById('rsaPub').value=forge.pki.publicKeyToPem(k.publicKey);document.getElementById('rsaPriv').value=forge.pki.privateKeyToPem(k.privateKey);}
function doRsaEnc(){try{const p=forge.pki.publicKeyFromPem(document.getElementById('rsaPub').value);const o=p.encrypt(forge.util.encodeUtf8(document.getElementById('rsaPlain').value));document.getElementById('rsaResult').innerText=forge.util.bytesToHex(o);}catch(e){document.getElementById('rsaResult').innerText="❌ 加密失败："+e.message;}}
function doRsaDec(){try{const p=forge.pki.privateKeyFromPem(document.getElementById('rsaPriv').value);const o=p.decrypt(forge.util.hexToBytes(document.getElementById('rsaPlain').value));document.getElementById('rsaResult').innerText=forge.util.decodeUtf8(o);}catch(e){document.getElementById('rsaResult').innerText="❌ 解密失败："+e.message;}}

/* 安全随机数生成 */
function doRand(){try{const l=parseInt(document.getElementById('randLen').value);if(l<1||l>1024)throw new Error("长度 1~1024");const b=crypto.getRandomValues(new Uint8Array(l));const f=document.getElementById('randFormat').value;const o=f==='hex'?Array.from(b).map(x=>x.toString(16).padStart(2,'0')).join(''):btoa(String.fromCharCode(...b));document.getElementById('randResult').innerText=o;}catch(e){document.getElementById('randResult').innerText="❌ 失败："+e.message;}}
</script>
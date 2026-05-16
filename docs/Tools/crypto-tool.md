---
title: 密码工具箱
parent: Tools
---

# 密码工具箱（离线运行）

<style>
.crypto-tool { margin: 2rem 0; }
.section { margin: 16px 0; padding: 10px; border: 1px solid #ddd; border-radius: 8px; background: #fefefe; }
.title { font-size: 16px; font-weight: bold; margin-bottom: 8px; color: #222; }
.label { font-size: 14px; margin: 4px 0; }
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
    background: #f6f8fa; padding: 12px; border-radius: 6px;
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
.row { display: flex; gap: 10px; flex-wrap: wrap; margin: 8px 0; }
.col { flex: 1; min-width: 200px; }

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
    background: #fafafa;
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

<!-- ===================== 哈希模块 ===================== -->
<div id="hash" class="tab-content active">
    <div class="section">
        <div class="title">哈希算法（全支持）</div>

        <div class="label">输入模式</div>
        <select id="hashInputMode">
            <option value="hex">HEX 模式</option>
            <option value="utf8">UTF-8 文本模式</option>
            <option value="base64">Base64 模式</option>
            <option value="file">二进制文件模式</option>
        </select>

        <div id="hashInputArea" style="display: block;">
            <div class="label">输入内容</div>
            <textarea id="hashInput" autocomplete="off" spellcheck="false" autocorrect="off" autocapitalize="off"></textarea>
            <div class="error-hint" id="hashErrorHint"></div>
        </div>

        <div id="hashFileArea" style="display: none;">
            <div class="label">选择二进制文件</div>
            <input type="file" id="hashFileInput" class="file-input" />
            <div class="file-hint">支持任意文件，读取原始二进制计算哈希</div>
        </div>

        <div class="row" style="margin-top:8px;">
            <div class="col"><select id="hashAlgo"></select></div>
        </div>

        <button class="btn" onclick="doHash()">计算哈希</button>
        <div class="result" id="hashResult"></div>
    </div>
</div>

<!-- ===================== HMAC 模块 ===================== -->
<div id="hmac" class="tab-content">
    <div class="section">
        <div class="title">HMAC 消息认证码</div>
        <div class="label">消息</div>
        <textarea id="hmacMsg" spellcheck="false" autocorrect="off" autocapitalize="off"></textarea>
        <div class="label">密钥（HEX）</div>
        <input id="hmacKey" spellcheck="false" autocorrect="off" autocapitalize="off">
        <select id="hmacAlgo">
            <option>sha256</option>
            <option>sha512</option>
            <option>sm3</option>
        </select>
        <button class="btn" onclick="doHmac()">计算 HMAC</button>
        <div class="result" id="hmacResult"></div>
    </div>
</div>

<!-- ===================== AES / SM4 模块 ===================== -->
<div id="aes" class="tab-content">
    <div class="section">
        <div class="title">AES / SM4 对称加密（CBC）</div>
        <div class="row">
            <div class="col"><select id="symAlgo">
                <option>aes-128-cbc</option>
                <option>aes-256-cbc</option>
                <option>sm4-cbc</option>
            </select></div>
        </div>
        <div class="label">明文</div>
        <textarea id="symPlain" spellcheck="false" autocorrect="off" autocapitalize="off"></textarea>
        <div class="label">密钥 (HEX)</div>
        <input id="symKey" spellcheck="false" autocorrect="off" autocapitalize="off">
        <div class="label">IV (HEX)</div>
        <input id="symIv" spellcheck="false" autocorrect="off" autocapitalize="off">
        <div class="btn-group">
            <button class="btn btn-success" onclick="doSymEnc()">加密</button>
            <button class="btn btn-danger" onclick="doSymDec()">解密</button>
        </div>
        <div class="result" id="symResult"></div>
    </div>
</div>

<!-- ===================== RSA 模块 ===================== -->
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

<!-- ===================== 随机数模块 ===================== -->
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

<!-- ===================== 编码模块 ===================== -->
<div id="encode" class="tab-content">
    <div class="section">
        <div class="title">文本 / HEX / Base64 / Base64Url / UTF-8 互转</div>
        <div class="label">输入</div>
        <textarea id="encInput" spellcheck="false" autocorrect="off" autocapitalize="off"></textarea>
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

<script>
/* 工具函数：HEX 转 Uint8Array */
function hexToBytes(hex) {
    hex = hex.replace(/^0x/, '').replace(/\s/g, '');
    if (hex.length % 2 !== 0) throw new Error('HEX 长度必须为偶数');
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return new Uint8Array(bytes);
}

/* 工具函数：Base64 转 Uint8Array */
function base64ToBytes(b64) {
    try {
        const bin = atob(b64);
        const len = bin.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = bin.charCodeAt(i);
        }
        return bytes;
    } catch (e) {
        throw new Error('Base64 格式无效');
    }
}

/* 工具函数：验证 Base64 格式 */
function isValidBase64(str) {
    try {
        btoa(atob(str));
        return true;
    } catch (e) {
        return false;
    }
}

/* 异步读取文件为 Uint8Array */
function readFileAsUint8Array(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(new Uint8Array(reader.result));
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

let hw;

/* 输入历史管理（↑ ↓ 键切换）*/
const inputHistory = {
    list: [],
    index: -1,
    current: "",
    add(value) {
        value = value.trim();
        if (!value) return;
        if (this.list[0] === value) return;
        this.list = [value, ...this.list.filter(item => item !== value)].slice(0, 30);
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
        if (this.index < 0) {
            return this.current;
        }
        return this.list[this.index];
    }
};

/* 初始化页面 */
window.onload = async () => {
    hw = window.hashwasm || hashwasm;
    showTab('hash');

    /* 填充哈希算法 */
    const algoList = [
        "md5", "sha1", "sha224", "sha256", "sha384", "sha512",
        "sha3-224", "sha3-256", "sha3-384", "sha3-512",
        "md4", "ripemd160", "sm3", "whirlpool", "adler32"
    ];
    const sel = document.getElementById('hashAlgo');
    algoList.forEach(a => {
        const opt = document.createElement('option');
        opt.value = a;
        opt.innerText = a.toUpperCase();
        sel.appendChild(opt);
    });

    /* 哈希模式切换 */
    const modeSel = document.getElementById('hashInputMode');
    const inputArea = document.getElementById('hashInputArea');
    const fileArea = document.getElementById('hashFileArea');
    const hashInput = document.getElementById('hashInput');
    const errorHint = document.getElementById('hashErrorHint');

    modeSel.addEventListener('change', () => {
        const m = modeSel.value;
        if (m === 'file') {
            inputArea.style.display = 'none';
            fileArea.style.display = 'block';
        } else {
            inputArea.style.display = 'block';
            fileArea.style.display = 'none';
        }
        hashInput.classList.remove('input-error');
        errorHint.style.display = 'none';
    });

    /* 实时输入校验 */
    function validateInput() {
        const mode = modeSel.value;
        const val = hashInput.value.trim();
        hashInput.classList.remove('input-error');
        errorHint.style.display = 'none';

        if (mode === 'hex') {
            if (!/^[0-9a-fA-F]*$/.test(val)) {
                hashInput.classList.add('input-error');
                errorHint.innerText = '❌ 仅支持 0-9、a-f、A-F';
                errorHint.style.display = 'block';
                return false;
            }
        }
        if (mode === 'base64') {
            if (val && !isValidBase64(val)) {
                hashInput.classList.add('input-error');
                errorHint.innerText = '❌ Base64 格式无效';
                errorHint.style.display = 'block';
                return false;
            }
        }
        return true;
    }

    hashInput.addEventListener('input', validateInput);
    window.validateHashInput = validateInput;

    /* 上下方向键历史输入 */
    hashInput.addEventListener('keydown', (e) => {
        if (modeSel.value === 'file') return;
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            hashInput.value = inputHistory.up();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            hashInput.value = inputHistory.down();
        }
    });
};

/* 标签切换 */
function showTab(tabName) {
    const tabMap = {
        'hash':'哈希','hmac':'HMAC','aes':'AES/SM4','rsa':'RSA','random':'随机数','encode':'编码'
    };
    document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    const target = document.getElementById(tabName);
    if(target) target.classList.add('active');
    const targetText = tabMap[tabName];
    document.querySelectorAll('.tab').forEach(tab=>{
        if(tab.innerText.trim()===targetText) tab.classList.add('active');
    });
}

/* 编码转换 */
function doEnc(to) {
    const i = document.getElementById('encInput').value;
    let u = new TextEncoder().encode(i);
    let r = '';
    if (to === 'hex') r = Array.from(u).map(x=>x.toString(16).padStart(2,'0')).join('');
    if (to === 'b64') r = btoa(String.fromCharCode(...u));
    if (to === 'b64url') r = btoa(String.fromCharCode(...u)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');
    if (to === 'utf8') r = new TextDecoder().decode(u);
    document.getElementById('encResult').innerText = r;
}

/* 哈希计算 */
async function doHash() {
    const res = document.getElementById('hashResult');
    res.innerText = "⏳ 计算中...";
    try {
        const mode = document.getElementById('hashInputMode').value;
        const algo = document.getElementById('hashAlgo').value;
        let data;
        let inputText = "";

        if (mode === 'hex') {
            if (!window.validateHashInput()) throw new Error("HEX 输入无效");
            inputText = document.getElementById('hashInput').value.trim();
            data = inputText ? hexToBytes(inputText) : new Uint8Array();
        } else if (mode === 'utf8') {
            inputText = document.getElementById('hashInput').value.trim();
            data = new TextEncoder().encode(inputText);
        } else if (mode === 'base64') {
            if (!window.validateHashInput()) throw new Error("Base64 输入无效");
            inputText = document.getElementById('hashInput').value.trim();
            data = inputText ? base64ToBytes(inputText) : new Uint8Array();
        } else if (mode === 'file') {
            const fileIn = document.getElementById('hashFileInput');
            if (!fileIn.files?.length) throw new Error("请选择文件");
            data = await readFileAsUint8Array(fileIn.files[0]);
        }

        /* 加入历史 */
        if (mode !== 'file' && inputText) {
            inputHistory.add(inputText);
        }

        let out;
        if (algo.startsWith('sha3-')) {
            const bits = parseInt(algo.split('-')[1]);
            out = await hw.sha3(data, bits);
        } else {
            out = await hw[algo](data);
        }
        res.innerText = out.toUpperCase();
    } catch (e) {
        res.innerText = "❌ 错误：" + e.message;
    }
}

/* HMAC */
async function doHmac() {
    try {
        const msg = new TextEncoder().encode(document.getElementById('hmacMsg').value);
        const key = hexToBytes(document.getElementById('hmacKey').value||'00');
        const r = await hw.hmac(msg, key, document.getElementById('hmacAlgo').value);
        document.getElementById('hmacResult').innerText = r;
    } catch (e) {
        document.getElementById('hmacResult').innerText = "❌ 失败："+e.message;
    }
}

/* AES 加密 */
async function doSymEnc() {
    try {
        const algo = document.getElementById('symAlgo').value;
        const plain = new TextEncoder().encode(document.getElementById('symPlain').value);
        const key = hexToBytes(document.getElementById('symKey').value);
        const iv = hexToBytes(document.getElementById('symIv').value);
        const out = algo.startsWith('aes') ? await hw.aesCbcEncrypt(plain,key,iv) : await hw.sm4Encrypt(plain,key,iv);
        document.getElementById('symResult').innerText = out;
    } catch (e) {
        document.getElementById('symResult').innerText = "❌ 加密失败："+e.message;
    }
}

/* AES 解密 */
async function doSymDec() {
    try {
        const algo = document.getElementById('symAlgo').value;
        const ct = document.getElementById('symPlain').value;
        const key = hexToBytes(document.getElementById('symKey').value);
        const iv = hexToBytes(document.getElementById('symIv').value);
        const out = algo.startsWith('aes') ? await hw.aesCbcDecrypt(ct,key,iv) : await hw.sm4Decrypt(ct,key,iv);
        document.getElementById('symResult').innerText = new TextDecoder().decode(out);
    } catch (e) {
        document.getElementById('symResult').innerText = "❌ 解密失败："+e.message;
    }
}

/* RSA */
function genRSA() {
    const k = forge.pki.rsa.generateKeyPair(2048);
    document.getElementById('rsaPub').value = forge.pki.publicKeyToPem(k.publicKey);
    document.getElementById('rsaPriv').value = forge.pki.privateKeyToPem(k.privateKey);
}
function doRsaEnc() {
    try {
        const pub = forge.pki.publicKeyFromPem(document.getElementById('rsaPub').value);
        const out = pub.encrypt(forge.util.encodeUtf8(document.getElementById('rsaPlain').value));
        document.getElementById('rsaResult').innerText = forge.util.bytesToHex(out);
    } catch (e) {
        document.getElementById('rsaResult').innerText = "❌ 加密失败："+e.message;
    }
}
function doRsaDec() {
    try {
        const priv = forge.pki.privateKeyFromPem(document.getElementById('rsaPriv').value);
        const out = priv.decrypt(forge.util.hexToBytes(document.getElementById('rsaPlain').value));
        document.getElementById('rsaResult').innerText = forge.util.decodeUtf8(out);
    } catch (e) {
        document.getElementById('rsaResult').innerText = "❌ 解密失败："+e.message;
    }
}

/* 随机数 */
function doRand() {
    try {
        const l = parseInt(document.getElementById('randLen').value);
        if(l<1||l>1024) throw new Error("长度 1~1024");
        const buf = crypto.getRandomValues(new Uint8Array(l));
        const fmt = document.getElementById('randFormat').value;
        const out = fmt==='hex' ? Array.from(buf).map(x=>x.toString(16).padStart(2,'0')).join('') : btoa(String.fromCharCode(...buf));
        document.getElementById('randResult').innerText = out;
    } catch (e) {
        document.getElementById('randResult').innerText = "❌ 失败："+e.message;
    }
}
</script>
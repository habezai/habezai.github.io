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
.btn-group { display: flex; wrap: wrap; gap: 8px; margin: 8px 0; }
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

        <div class="label">消息输入模式</div>
        <select id="hmacInputMode">
            <option value="hex">HEX 模式</option>
            <option value="utf8">UTF-8 文本模式</option>
            <option value="base64">Base64 模式</option>
        </select>

        <div class="label" style="margin-top:8px;">消息内容</div>
        <textarea id="hmacMsg" autocomplete="off" spellcheck="false" autocorrect="off" autocapitalize="off"></textarea>
        <div class="error-hint" id="hmacErrorHint"></div>

        <div class="label" style="margin-top:8px;">密钥输入模式</div>
        <select id="hmacKeyMode">
            <option value="hex">HEX 模式</option>
            <option value="utf8">UTF-8 文本模式</option>
            <option value="base64">Base64 模式</option>
        </select>

        <div class="label" style="margin-top:8px;">密钥</div>
        <input id="hmacKey" autocomplete="off" spellcheck="false" autocorrect="off" autocapitalize="off" />
        <div class="error-hint" id="hmacKeyErrorHint"></div>

        <div class="label" style="margin-top:8px;">哈希算法</div>
        <select id="hmacAlgo"></select>

        <button class="btn" style="margin-top:8px;" onclick="doHmac()">计算 HMAC</button>
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
/* 工具函数 */
function hexToBytes(hex) {
    hex = hex.replace(/^0x/, '').replace(/\s/g, '');
    if (hex.length % 2 !== 0) throw new Error('HEX 长度必须为偶数');
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) bytes.push(parseInt(hex.substr(i, 2), 16));
    return new Uint8Array(bytes);
}
function base64ToBytes(b64) { try { const bin = atob(b64); const bytes = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i); return bytes; } catch (e) { throw new Error('Base64 格式无效'); } }
function isValidBase64(str) { try { btoa(atob(str)); return true; } catch (e) { return false; } }
function readFileAsUint8Array(file) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(new Uint8Array(reader.result)); reader.onerror = reject; reader.readAsArrayBuffer(file); }); }

/* 历史记录 */
const inputHistory = { list: [], index: -1, current: "", add(v){ v=v.trim(); if(!v||this.list[0]===v)return; this.list=[v,...this.list.filter(x=>x!==v)].slice(0,30); this.index=-1; }, up(){ if(this.list.length===0)return""; if(this.index===-1){this.current=document.getElementById("hashInput").value;this.index=0;}else this.index=Math.min(this.index+1,this.list.length-1);return this.list[this.index];}, down(){ if(this.index<=-1)return"";this.index--;return this.index<0?this.current:this.list[this.index];} };
const hmacMsgHistory = { list: [], index: -1, current: "", add(v){ v=v.trim(); if(!v||this.list[0]===v)return; this.list=[v,...this.list.filter(x=>x!==v)].slice(0,30); this.index=-1; }, up(){ if(this.list.length===0)return""; if(this.index===-1){this.current=document.getElementById("hmacMsg").value;this.index=0;}else this.index=Math.min(this.index+1,this.list.length-1);return this.list[this.index];}, down(){ if(this.index<=-1)return"";this.index--;return this.index<0?this.current:this.list[this.index];} };
const hmacKeyHistory = { list: [], index: -1, current: "", add(v){ v=v.trim(); if(!v||this.list[0]===v)return; this.list=[v,...this.list.filter(x=>x!==v)].slice(0,30); this.index=-1; }, up(){ if(this.list.length===0)return""; if(this.index===-1){this.current=document.getElementById("hmacKey").value;this.index=0;}else this.index=Math.min(this.index+1,this.list.length-1);return this.list[this.index];}, down(){ if(this.index<=-1)return"";this.index--;return this.index<0?this.current:this.list[this.index];} };

let hw;

/* 全局校验函数 */
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

/* 初始化 */
window.onload = async () => {
    hw = window.hashwasm || hashwasm;
    showTab('hash');

    const hashAlgos = ["md5","sha1","sha224","sha256","sha384","sha512","sha3-224","sha3-256","sha3-384","sha3-512","md4","ripemd160","sm3","whirlpool","adler32"];
    const hmacAlgos = ["md5","sha1","sha224","sha256","sha384","sha512","sha3-224","sha3-256","sha3-384","sha3-512","md4","ripemd160","sm3","whirlpool"];
    
    hashAlgos.forEach(a => { const o = document.createElement('option'); o.value = a; o.innerText = a.toUpperCase(); document.getElementById('hashAlgo').appendChild(o); });
    hmacAlgos.forEach(a => { const o = document.createElement('option'); o.value = a; o.innerText = a.toUpperCase(); document.getElementById('hmacAlgo').appendChild(o); });

    /* 哈希模式切换 */
    const hashMode = document.getElementById('hashInputMode');
    const hashFileArea = document.getElementById('hashFileArea');
    const hashInputArea = document.getElementById('hashInputArea');
    hashMode.addEventListener('change', () => {
        if (hashMode.value === 'file') { hashInputArea.style.display = 'none'; hashFileArea.style.display = 'block'; }
        else { hashInputArea.style.display = 'block'; hashFileArea.style.display = 'none'; }
        document.getElementById('hashInput').classList.remove('input-error');
        document.getElementById('hashErrorHint').style.display = 'none';
    });

    /* 绑定事件 */
    document.getElementById('hashInput').addEventListener('input', validateHash);
    document.getElementById('hmacMsg').addEventListener('input', validateHmacMsg);
    document.getElementById('hmacKey').addEventListener('input', validateHmacKey);

    /* 方向键历史 */
    document.getElementById('hashInput').addEventListener('keydown', e => {
        if (document.getElementById('hashInputMode').value === 'file') return;
        if (e.key === 'ArrowUp') { e.preventDefault(); document.getElementById('hashInput').value = inputHistory.up(); }
        if (e.key === 'ArrowDown') { e.preventDefault(); document.getElementById('hashInput').value = inputHistory.down(); }
    });
    document.getElementById('hmacMsg').addEventListener('keydown', e => {
        if (e.key === 'ArrowUp') { e.preventDefault(); document.getElementById('hmacMsg').value = hmacMsgHistory.up(); }
        if (e.key === 'ArrowDown') { e.preventDefault(); document.getElementById('hmacMsg').value = hmacMsgHistory.down(); }
    });
    document.getElementById('hmacKey').addEventListener('keydown', e => {
        if (e.key === 'ArrowUp') { e.preventDefault(); document.getElementById('hmacKey').value = hmacKeyHistory.up(); }
        if (e.key === 'ArrowDown') { e.preventDefault(); document.getElementById('hmacKey').value = hmacKeyHistory.down(); }
    });
};

/* 标签切换 */
function showTab(tabName) {
    const tabMap = { hash:'哈希', hmac:'HMAC', aes:'AES/SM4', rsa:'RSA', random:'随机数', encode:'编码' };
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const tar = document.getElementById(tabName); if (tar) tar.classList.add('active');
    document.querySelectorAll('.tab').forEach(t => t.innerText.trim() === tabMap[tabName] && t.classList.add('active'));
}

/* 编码 */
function doEnc(to) {
    const i = document.getElementById('encInput').value;
    const u = new TextEncoder().encode(i);
    let r = '';
    if (to === 'hex') r = Array.from(u).map(x => x.toString(16).padStart(2, '0')).join('');
    if (to === 'b64') r = btoa(String.fromCharCode(...u));
    if (to === 'b64url') r = btoa(String.fromCharCode(...u)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    if (to === 'utf8') r = new TextDecoder().decode(u);
    document.getElementById('encResult').innerText = r;
}

/* 哈希 */
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
    const res = document.getElementById('hmacResult'); res.innerText = "⏳ 计算中...";
    try {
        const msgMode = document.getElementById('hmacInputMode').value;
        const keyMode = document.getElementById('hmacKeyMode').value;
        const algo = document.getElementById('hmacAlgo').value;
        const msgVal = document.getElementById('hmacMsg').value.trim();
        const keyVal = document.getElementById('hmacKey').value.trim();

        if (!validateHmacMsg()) throw new Error("消息格式无效");
        if (!validateHmacKey()) throw new Error("密钥格式无效");
        if (!keyVal) throw new Error("密钥不能为空");

        let msg = msgMode === 'hex' ? (msgVal ? hexToBytes(msgVal) : new Uint8Array()) :
                 msgMode === 'utf8' ? new TextEncoder().encode(msgVal) : (msgVal ? base64ToBytes(msgVal) : new Uint8Array());

        let key = keyMode === 'hex' ? hexToBytes(keyVal) :
                  keyMode === 'utf8' ? new TextEncoder().encode(keyVal) : base64ToBytes(keyVal);

        hmacMsgHistory.add(msgVal);
        hmacKeyHistory.add(keyVal);

        const out = await hw.hmac(key, msg, algo);
        res.innerText = out.toUpperCase();
    } catch (e) { res.innerText = "❌ 错误：" + e.message; }
}

/* AES */
async function doSymEnc() { try { const a=document.getElementById('symAlgo').value; const p=new TextEncoder().encode(document.getElementById('symPlain').value); const k=hexToBytes(document.getElementById('symKey').value); const i=hexToBytes(document.getElementById('symIv').value); const o=a.startsWith('aes')?await hw.aesCbcEncrypt(p,k,i):await hw.sm4Encrypt(p,k,i); document.getElementById('symResult').innerText=o; }catch(e){document.getElementById('symResult').innerText="❌ 加密失败："+e.message;}}
async function doSymDec() { try { const a=document.getElementById('symAlgo').value; const c=document.getElementById('symPlain').value; const k=hexToBytes(document.getElementById('symKey').value); const i=hexToBytes(document.getElementById('symIv').value); const o=a.startsWith('aes')?await hw.aesCbcDecrypt(c,k,i):await hw.sm4Decrypt(c,k,i); document.getElementById('symResult').innerText=new TextDecoder().decode(o); }catch(e){document.getElementById('symResult').innerText="❌ 解密失败："+e.message;}}

/* RSA */
function genRSA(){const k=forge.pki.rsa.generateKeyPair(2048);document.getElementById('rsaPub').value=forge.pki.publicKeyToPem(k.publicKey);document.getElementById('rsaPriv').value=forge.pki.privateKeyToPem(k.privateKey);}
function doRsaEnc(){try{const p=forge.pki.publicKeyFromPem(document.getElementById('rsaPub').value);const o=p.encrypt(forge.util.encodeUtf8(document.getElementById('rsaPlain').value));document.getElementById('rsaResult').innerText=forge.util.bytesToHex(o);}catch(e){document.getElementById('rsaResult').innerText="❌ 加密失败："+e.message;}}
function doRsaDec(){try{const p=forge.pki.privateKeyFromPem(document.getElementById('rsaPriv').value);const o=p.decrypt(forge.util.hexToBytes(document.getElementById('rsaPlain').value));document.getElementById('rsaResult').innerText=forge.util.decodeUtf8(o);}catch(e){document.getElementById('rsaResult').innerText="❌ 解密失败："+e.message;}}

/* 随机数 */
function doRand(){try{const l=parseInt(document.getElementById('randLen').value);if(l<1||l>1024)throw new Error("长度 1~1024");const b=crypto.getRandomValues(new Uint8Array(l));const f=document.getElementById('randFormat').value;const o=f==='hex'?Array.from(b).map(x=>x.toString(16).padStart(2,'0')).join(''):btoa(String.fromCharCode(...b));document.getElementById('randResult').innerText=o;}catch(e){document.getElementById('randResult').innerText="❌ 失败："+e.message;}}
</script>
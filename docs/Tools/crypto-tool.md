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
    <div class="tab" onclick="showTab('aes')">AES-XTS</div>
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
        <div class="title">AES-128-XTS 加密解密</div>

        <div class="row">
            <div class="col" style="max-width:180px;">
                <div class="label">算法</div>
                <select id="symAlgo">
                    <option>aes-128-xts</option>
                </select>
            </div>

            <div class="col" style="max-width:160px;">
                <div class="label">输入模式</div>
                <select id="symInputMode">
                    <option value="hex">HEX 模式</option> <!-- 默认改为 HEX -->
                    <option value="utf8">UTF-8 文本模式</option>
                    <option value="base64">Base64 模式</option>
                </select>
            </div>
        </div>

        <div class="label">明文 (HEX)</div>
        <textarea id="symInput" autocomplete="off" spellcheck="false" autocorrect="off" autocapitalize="off">1dd27696c9c501945533f8990c245f74b0c13faf25b349a627d808f46ac77efe</textarea>
        <div class="error-hint" id="symErrorHint"></div>

        <div class="label">密钥 (HEX) → 必须 64 位</div>
        <input id="symKey" spellcheck="false" autocorrect="off" autocapitalize="off" value="b4ea849b02a0cd5b6d32c5c0cbd059a2bfd517ca8f09cbdb90f23b4537e0dc9c">
        <div class="error-hint" id="symKeyError"></div>

        <div class="label">Tweak (HEX) → 必须 32 位</div>
        <input id="symIv" spellcheck="false" autocorrect="off" autocapitalize="off" value="4cbc59b0824f5f6913f50d1155860818">
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

<!-- 编码互转 -->
<div id="encode" class="tab-content">
    <div class="section">
        <div class="title">文本 / HEX / Base64 / Base64Url / UTF-8 互转</div>

        <div class="row">
            <div class="col" style="max-width:140px;">
                <div class="label">输入模式</div>
                <select id="encInputMode">
                    <option value="hex">HEX 模式</option>
                    <option value="utf8">UTF-8 文本模式</option>
                    <option value="base64">Base64 模式</option>
                </select>
            </div>
            <div class="col">
                <div id="encInputArea" style="display: block;">
                    <div class="label">输入内容</div>
                    <textarea id="encInput" autocomplete="off" spellcheck="false" autocorrect="off" autocapitalize="off"></textarea>
                    <div class="error-hint" id="encErrorHint"></div>
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
<script src="https://cdnjs.cloudflare.com/ajax/libs/aes-js/3.1.2/index.min.js"></script>

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
    try { btoa(atob(str)); return true; } catch (e) { return false; }
}
function bytesToHex(bytes) {
    return Array.from(bytes).map(x => x.toString(16).padStart(2, '0')).join('');
}
function bytesToBase64(bytes) {
    return btoa(String.fromCharCode(...bytes));
}
function bytesToUtf8(bytes) {
    return new TextDecoder().decode(bytes);
}

let hw;

/* 页面初始化 */
window.onload = async () => {
    hw = window.hashwasm || hashwasm;
    showTab('hash');
    const hashAlgos = ["md5","sha1","sha224","sha256","sha384","sha512","sha3-224","sha3-256","sha3-384","sha3-512","ripemd160","sm3"];
    const hmacAlgos = ["md5","sha1","sha224","sha256","sha384","sha512","sha3-224","sha3-256","sha3-384","sha3-512","ripemd160","sm3"];
    hashAlgos.forEach(a => { const o = document.createElement('option'); o.value = a; o.innerText = a.toUpperCase(); document.getElementById('hashAlgo').appendChild(o); });
    hmacAlgos.forEach(a => { const o = document.createElement('option'); o.value = a; o.innerText = a.toUpperCase(); document.getElementById('hmacAlgo').appendChild(o); });
};

/* 标签切换 */
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    document.querySelectorAll('.tab').forEach(t => {
        if (tabName === 'hash' && t.innerText.includes('哈希')) t.classList.add('active');
        if (tabName === 'hmac' && t.innerText.includes('HMAC')) t.classList.add('active');
        if (tabName === 'aes' && t.innerText.includes('AES')) t.classList.add('active');
        if (tabName === 'rsa' && t.innerText.includes('RSA')) t.classList.add('active');
        if (tabName === 'random' && t.innerText.includes('随机')) t.classList.add('active');
        if (tabName === 'encode' && t.innerText.includes('编码')) t.classList.add('active');
    });
}

/* 编码转换 */
async function doEnc(to) {
    const res = document.getElementById('encResult');
    res.innerText = "⏳ 转换中...";
    try {
        const mode = document.getElementById('encInputMode').value;
        const val = document.getElementById('encInput').value.trim();
        let bytes;
        if (mode === 'hex') bytes = hexToBytes(val);
        else if (mode === 'utf8') bytes = new TextEncoder().encode(val);
        else bytes = base64ToBytes(val);
        let out;
        if (to === 'hex') out = bytesToHex(bytes);
        else if (to === 'b64') out = bytesToBase64(bytes);
        else if (to === 'b64url') out = bytesToBase64(bytes).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');
        else out = bytesToUtf8(bytes);
        res.innerText = out;
    } catch (e) { res.innerText = "❌ 错误："+e.message; }
}

/* 哈希 */
async function doHash() {
    const res = document.getElementById('hashResult');
    res.innerText = "⏳ 计算中...";
    try {
        const mode = document.getElementById('hashInputMode').value;
        const algo = document.getElementById('hashAlgo').value;
        let data;
        const v = document.getElementById('hashInput').value.trim();
        if (mode === 'hex') data = hexToBytes(v);
        else if (mode === 'utf8') data = new TextEncoder().encode(v);
        else data = base64ToBytes(v);
        let out = await hw[algo](data);
        res.innerText = out.toUpperCase();
    } catch (e) { res.innerText = "❌ 错误："+e.message; }
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
        let msg, key;
        if (msgMode === 'hex') msg = hexToBytes(msgVal);
        else if (msgMode === 'utf8') msg = new TextEncoder().encode(msgVal);
        else msg = base64ToBytes(msgVal);
        if (keyMode === 'hex') key = hexToBytes(keyVal);
        else if (keyMode === 'utf8') key = new TextEncoder().encode(keyVal);
        else key = base64ToBytes(keyVal);
        let h = hw['create'+algo.replace('-','_').toUpperCase()]();
        let out = await hw.createHMAC(h, key).update(msg).digest();
        res.innerText = out.toUpperCase();
    } catch (e) { res.innerText = "❌ 错误："+e.message; }
}

/* ------------------------------ */
/* AES-XTS 加密解密 */
/* ------------------------------ */
function gfMultiply(x) {
    const bytes = new Uint8Array(16);
    for (let i = 15; i >= 0; i--) { bytes[i] = Number(x & 0xffn); x >>= 8n; }
    const res = new Uint8Array(16);
    res[0] = (2*(bytes[0]%128)) ^ (135 * Math.floor(bytes[15]/128));
    for(let k=1;k<16;k++) res[k] = (2*(bytes[k]%128)) ^ Math.floor(bytes[k-1]/128);
    let r = 0n;
    for(let b of res) r = (r<<8n)|BigInt(b);
    return r;
}

class AES_XTS_NATIVE {
    constructor(keyHex){
        const kb = hexToBytes(keyHex);
        if(kb.length!==32) throw new Error("XTS密钥必须64位HEX（32字节）");
        this.k1 = kb.slice(0,16);
        this.k2 = kb.slice(16,32);
        this.aes1 = new aesjs.ModeOfOperation.ecb(this.k1);
        this.aes2 = new aesjs.ModeOfOperation.ecb(this.k2);
    }
    encrypt(data, tweakHex){
        let tweak = hexToBytes(tweakHex);
        if(tweak.length!==16) throw new Error("Tweak必须32位HEX");
        tweak = this.aes2.encrypt(tweak);
        const blocks = [];
        const count = Math.ceil(data.length/16);
        for(let i=0;i<count;i++){
            const b = new Uint8Array(16);
            b.set(data.slice(i*16, Math.min(i*16+16, data.length)));
            const x = b.map((v,j)=>v^tweak[j]);
            const enc = this.aes1.encrypt(x);
            const c = enc.map((v,j)=>v^tweak[j]);
            blocks.push(...c);
            const tbi = BigInt('0x'+bytesToHex(tweak));
            const nt = gfMultiply(tbi);
            const nb = new Uint8Array(16);
            const nv = new DataView(nb.buffer);
            nv.setBigUint64(0, (nt>>64n)&0xFFFFFFFFFFFFFFFFn, false);
            nv.setBigUint64(8, nt&0xFFFFFFFFFFFFFFFFn, false);
            tweak = nb;
        }
        return new Uint8Array(blocks);
    }
    decrypt(data, tweakHex){
        let tweak = hexToBytes(tweakHex);
        if(tweak.length!==16) throw new Error("Tweak必须32位HEX");
        tweak = this.aes2.encrypt(tweak);
        const blocks = [];
        const count = Math.ceil(data.length/16);
        for(let i=0;i<count;i++){
            const b = new Uint8Array(16);
            b.set(data.slice(i*16, Math.min(i*16+16, data.length)));
            const x = b.map((v,j)=>v^tweak[j]);
            const dec = this.aes1.decrypt(x);
            const p = dec.map((v,j)=>v^tweak[j]);
            blocks.push(...p);
            const tbi = BigInt('0x'+bytesToHex(tweak));
            const nt = gfMultiply(tbi);
            const nb = new Uint8Array(16);
            const nv = new DataView(nb.buffer);
            nv.setBigUint64(0, (nt>>64n)&0xFFFFFFFFFFFFFFFFn, false);
            nv.setBigUint64(8, nt&0xFFFFFFFFFFFFFFFFn, false);
            tweak = nb;
        }
        const trimmed = blocks.slice(0, data.length);
        return new Uint8Array(trimmed);
    }
}

/* ------------------------------ */
/* AES-128-XTS 加密解密 */
/* ------------------------------ */
function doSymEnc(){
    const r = document.getElementById('symResult');
    const mode = document.getElementById('symInputMode').value;
    const key = document.getElementById('symKey').value.trim();
    const tweak = document.getElementById('symIv').value.trim();
    const val = document.getElementById('symInput').value.trim();
    r.innerText="⏳ 加密中...";
    try{
        let data;
        if(mode==='hex') data=hexToBytes(val);
        else if(mode==='utf8') data=new TextEncoder().encode(val);
        else data=base64ToBytes(val);

        const xts = new AES_XTS_NATIVE(key);
        const out = xts.encrypt(data, tweak);
        r.innerText=`✅ 完成\nHEX: ${bytesToHex(out)}\nBase64: ${bytesToBase64(out)}`;
    }catch(e){ r.innerText="❌ 失败："+e.message; }
}

function doSymDec(){
    const r = document.getElementById('symResult');
    const mode = document.getElementById('symInputMode').value;
    const key = document.getElementById('symKey').value.trim();
    const tweak = document.getElementById('symIv').value.trim();
    const val = document.getElementById('symInput').value.trim();
    r.innerText="⏳ 解密中...";
    try{
        let data;
        if(mode==='hex') data=hexToBytes(val);
        else if(mode==='base64') data=base64ToBytes(val);
        else throw new Error("密文请使用 HEX 或 Base64 输入");

        const xts = new AES_XTS_NATIVE(key);
        const out = xts.decrypt(data, tweak);
        r.innerText=`✅ 完成\nUTF8: ${bytesToUtf8(out)}\nHEX: ${bytesToHex(out)}`;
    }catch(e){ r.innerText="❌ 失败："+e.message; }
}

/* RSA */
function genRSA(){const k=forge.pki.rsa.generateKeyPair(2048);document.getElementById('rsaPub').value=forge.pki.publicKeyToPem(k.publicKey);document.getElementById('rsaPriv').value=forge.pki.privateKeyToPem(k.privateKey);}
function doRsaEnc(){try{const p=forge.pki.publicKeyFromPem(document.getElementById('rsaPub').value);const o=p.encrypt(forge.util.encodeUtf8(document.getElementById('rsaPlain').value));document.getElementById('rsaResult').innerText=forge.util.bytesToHex(o);}catch(e){document.getElementById('rsaResult').innerText="❌ 加密失败："+e.message;}}
function doRsaDec(){try{const p=forge.pki.privateKeyFromPem(document.getElementById('rsaPriv').value);const o=p.decrypt(forge.util.hexToBytes(document.getElementById('rsaPlain').value));document.getElementById('rsaResult').innerText=forge.util.decodeUtf8(o);}catch(e){document.getElementById('rsaResult').innerText="❌ 解密失败："+e.message;}}

/* 随机数 */
function doRand(){try{const l=parseInt(document.getElementById('randLen').value);const b=crypto.getRandomValues(new Uint8Array(l));const f=document.getElementById('randFormat').value;const o=f==='hex'?bytesToHex(b):bytesToBase64(b);document.getElementById('randResult').innerText=o;}catch(e){document.getElementById('randResult').innerText="❌ 失败："+e.message;}}
</script>
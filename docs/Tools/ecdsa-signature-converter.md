---
title: (实用工具) ECDSA签名转换：ASN.1 ↔ R || S
parent: Tools
---

# ECDSA签名转换：ASN.1 ↔ R || S

<style>
  .ecdsa-tool { margin: 2rem 0; }
  
  .input-label {
    font-size: 14px;
    font-weight: 500;
    margin: 5px 0;
    color: #333;
  }
  
  textarea {
    width: 100%;
    min-height: 100px;
    padding: 10px;
    margin: 6px 0 12px 0;
    box-sizing: border-box;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-family: consolas, monospace;
    spellcheck: false;
  }

  .tool-row {
    margin: 10px 0;
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }

  button {
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background: #0056b3;
  }

  .result-area {
    background: #f6f8fa;
    padding: 15px;
    border-radius: 6px;
    font-family: Consolas, monospace;
    white-space: pre-wrap;
    word-break: break-all;
    min-height: 60px;
    margin-top: 10px;
  }

  .convert-group {
    border: 1px solid #e1e4e8;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    background: #fdfdfd;
  }

  .error-msg {
    color: #d32f2f;
    background: #ffebee;
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
    display: none;
  }
</style>

<div class="ecdsa-tool">
  <div class="convert-group">
    <div class="input-label">R || S → ASN.1 签名</div>
    <div class="input-label">R 值 (十六进制)</div>
    <textarea id="rValue" spellcheck="false">4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b</textarea>
    <div class="input-label">S 值 (十六进制)</div>
    <textarea id="sValue" spellcheck="false">3b3f8e4e1a1c4b0d0c8e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b10</textarea>
    <button onclick="convertToASN1()">转换为 ASN.1</button>
    <div class="result-area" id="asn1ResultArea" style="display:none; margin-top:12px;">
      ASN.1 结果：<span id="asn1Result"></span>
    </div>
  </div>

  <div class="convert-group">
    <div class="input-label">ASN.1 → R || S 签名</div>
    <div class="input-label">ASN.1 签名字符串 (十六进制)</div>
    <textarea id="asn1Input" spellcheck="false"></textarea>
    <button onclick="convertFromASN1()">转换为 R,S 值</button>
    <div class="result-area" id="rsResultArea" style="display:none; margin-top:12px;">
      R 值：<span id="parsedR"></span>
      <br>
      S 值：<span id="parsedS"></span>
    </div>
  </div>

  <div id="errorTip" class="error-msg"></div>
</div>

<script>
function hexToBytes(hex) {
  if (hex.length % 2 !== 0) throw new Error("十六进制长度必须为偶数");
  if (!/^[0-9a-fA-F]+$/.test(hex)) throw new Error("请输入有效的十六进制字符串");
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function showError(msg) {
  const el = document.getElementById("errorTip");
  el.innerText = "❌ 错误：" + msg;
  el.style.display = "block";
}

function hideAllTips() {
  document.getElementById("errorTip").style.display = "none";
  document.getElementById("asn1ResultArea").style.display = "none";
  document.getElementById("rsResultArea").style.display = "none";
}

function convertToASN1() {
  hideAllTips();
  try {
    const r = document.getElementById("rValue").value.trim();
    const s = document.getElementById("sValue").value.trim();
    if (!r || !s) throw new Error("R 值和 S 值不能为空");
    const rBytes = hexToBytes(r);
    const sBytes = hexToBytes(s);
    const encodeInt = bytes => (bytes[0] & 0x80) ? new Uint8Array([0x00, ...bytes]) : bytes;
    const encR = encodeInt(rBytes);
    const encS = encodeInt(sBytes);
    const asn1 = new Uint8Array([
      0x30, encR.length + encS.length + 4,
      0x02, encR.length, ...encR,
      0x02, encS.length, ...encS
    ]);
    document.getElementById("asn1Result").innerText = bytesToHex(asn1);
    document.getElementById("asn1ResultArea").style.display = "block";
  } catch (e) {
    showError(e.message);
  }
}

function convertFromASN1() {
  hideAllTips();
  try {
    const asn1Hex = document.getElementById("asn1Input").value.trim();
    if (!asn1Hex) throw new Error("请输入 ASN.1 签名字符串");
    const bytes = hexToBytes(asn1Hex);
    let idx = 0;
    if (bytes[idx++] !== 0x30) throw new Error("无效的 ASN.1 签名");
    const totalLen = bytes[idx++];
    if (idx + totalLen > bytes.length) throw new Error("ASN.1 长度不匹配");
    if (bytes[idx++] !== 0x02) throw new Error("无效的 R 值");
    const rLen = bytes[idx++];
    const rBytes = bytes.slice(idx, idx + rLen);
    idx += rLen;
    if (bytes[idx++] !== 0x02) throw new Error("无效的 S 值");
    const sLen = bytes[idx++];
    const sBytes = bytes.slice(idx, idx + sLen);
    const clean = b => b[0] === 0x00 ? b.slice(1) : b;
    const rHex = bytesToHex(clean(rBytes));
    const sHex = bytesToHex(clean(sBytes));
    document.getElementById("parsedR").innerText = rHex;
    document.getElementById("parsedS").innerText = sHex;
    document.getElementById("rsResultArea").style.display = "block";
  } catch (e) {
    showError(e.message);
  }
}
</script>
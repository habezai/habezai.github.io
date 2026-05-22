---
title: ECDSA签名转换：ASN.1 ↔ R || S
nav:false
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
    <div class="result-area" id="asn1ResultArea" style="display:none;">ASN.1 结果：<span id="asn1Result"></span></div>
  </div>

  <div class="convert-group">
    <div class="input-label">ASN.1 → R || S 签名</div>
    <div class="input-label">ASN.1 签名字符串 (十六进制)</div>
    <textarea id="asn1Input" spellcheck="false"></textarea>

    <button onclick="convertFromASN1()">转换为 R,S 值</button>
    <div class="result-area" id="rsResultArea" style="display:none;">R 值：<span id="parsedR"></span><br>S 值：<span id="parsedS"></span></div>
  </div>

  <div id="errorTip" class="error-msg"></div>
</div>

<script>
/* 每个输入框本地存储Key */
const HIST_KEY = { r: "hist_r", s: "hist_s", asn1: "hist_asn1" };
/* 历史记录上下浏览索引 */
const historyIndex = { r: -1, s: -1, asn1: -1 };
/* 临时缓存正在编辑的内容 */
const tempCache = { r: "", s: "", asn1: "" };
/* 配置：最大保留历史条数，可自行修改 */
const MAX_HIST_COUNT = 50;

/* 获取指定分类历史记录 */
function getHistory(key) {
  try {
    return JSON.parse(localStorage.getItem(HIST_KEY[key])) || [];
  } catch (e) {
    return [];
  }
}

/* 保存历史，去重 + 限制最大条数 */
function saveHistory(key, val) {
  if (!val.trim()) {
    return;
  }
  let h = getHistory(key);
  /* 去重 */
  h = h.filter(x => x !== val);
  /* 新记录插到最前面 */
  h.unshift(val);
  /* 限制最大条数，防止无限膨胀 */
  if (h.length > MAX_HIST_COUNT) {
    h = h.slice(0, MAX_HIST_COUNT);
  }
  localStorage.setItem(HIST_KEY[key], JSON.stringify(h));
  /* 重置浏览索引 */
  historyIndex[key] = -1;
}

/* 绑定输入框上下键切换历史 */
function bindHistoryKeys(inputId, histKey) {
  const el = document.getElementById(inputId);
  el.addEventListener("keydown", e => {
    const h = getHistory(histKey);

    /* ============================================== */
    /* 关键修复：无历史记录时，直接忽略上下键事件 */
    /* ============================================== */
    if (h.length === 0) {
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      /* 第一次按上键，先缓存当前编辑内容 */
      if (historyIndex[histKey] === -1) {
        tempCache[histKey] = el.value;
      }
      /* 索引上移 */
      if (historyIndex[histKey] < h.length - 1) {
        historyIndex[histKey]++;
      }
      el.value = h[historyIndex[histKey]] || "";
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      /* 索引下移 */
      if (historyIndex[histKey] > -1) {
        historyIndex[histKey]--;
      }
      /* 回到初始位置则恢复编辑前内容 */
      el.value = historyIndex[histKey] === -1 ? tempCache[histKey] : (h[historyIndex[histKey]] || "");
    }
  });
}

/* 初始化所有输入框历史按键绑定 */
function initAllHistoryNav() {
  bindHistoryKeys("rValue", "r");
  bindHistoryKeys("sValue", "s");
  bindHistoryKeys("asn1Input", "asn1");
}

/* 十六进制字符串转字节数组 */
function hexToBytes(hex) {
  if (hex.length % 2 !== 0) {
    throw new Error("十六进制长度必须为偶数");
  }
  if (!/^[0-9a-fA-F]+$/.test(hex)) {
    throw new Error("请输入有效的十六进制字符串");
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

/* 字节数组转十六进制字符串 */
function bytesToHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

/* 展示错误提示 */
function showError(msg) {
  const t = document.getElementById("errorTip");
  t.innerText = "❌ 错误：" + msg;
  t.style.display = "block";
}

/* 隐藏所有结果和错误提示 */
function hideAllTips() {
  document.getElementById("errorTip").style.display = "none";
  document.getElementById("asn1ResultArea").style.display = "none";
  document.getElementById("rsResultArea").style.display = "none";
}

/* R、S 转换为 ASN.1 签名 */
function convertToASN1() {
  hideAllTips();
  try {
    const r = document.getElementById("rValue").value.trim();
    const s = document.getElementById("sValue").value.trim();
    if (!r || !s) {
      throw new Error("R 值和 S 值不能为空");
    }
    saveHistory("r", r);
    saveHistory("s", s);
    const rBytes = hexToBytes(r);
    const sBytes = hexToBytes(s);
    const encodeInt = bytes => (bytes[0] & 0x80) ? new Uint8Array([0x00, ...bytes]) : bytes;
    const encR = encodeInt(rBytes);
    const encS = encodeInt(sBytes);
    const asn1 = new Uint8Array([0x30, encR.length + encS.length + 4, 0x02, encR.length, ...encR, 0x02, encS.length, ...encS]);
    document.getElementById("asn1Result").innerText = bytesToHex(asn1);
    document.getElementById("asn1ResultArea").style.display = "block";
  } catch (e) {
    showError(e.message);
  }
}

/* ASN.1 签名解析为 R、S */
function convertFromASN1() {
  hideAllTips();
  try {
    const asn1Hex = document.getElementById("asn1Input").value.trim();
    if (!asn1Hex) {
      throw new Error("请输入 ASN.1 签名字符串");
    }
    saveHistory("asn1", asn1Hex);
    const bytes = hexToBytes(asn1Hex);
    let idx = 0;
    if (bytes[idx++] !== 0x30) {
      throw new Error("无效的 ASN.1 签名");
    }
    const totalLen = bytes[idx++];
    if (idx + totalLen > bytes.length) {
      throw new Error("ASN.1 长度不匹配");
    }
    if (bytes[idx++] !== 0x02) {
      throw new Error("无效的 R 值");
    }
    const rLen = bytes[idx++];
    const rBytes = bytes.slice(idx, idx + rLen);
    idx += rLen;
    if (bytes[idx++] !== 0x02) {
      throw new Error("无效的 S 值");
    }
    const sLen = bytes[idx++];
    const sBytes = bytes.slice(idx, idx + sLen);
    const clean = b => b[0] === 0x00 ? b.slice(1) : b;
    document.getElementById("parsedR").innerText = bytesToHex(clean(rBytes));
    document.getElementById("parsedS").innerText = bytesToHex(clean(sBytes));
    document.getElementById("rsResultArea").style.display = "block";
  } catch (e) {
    showError(e.message);
  }
}

/* 页面加载初始化 */
window.onload = initAllHistoryNav;
</script>
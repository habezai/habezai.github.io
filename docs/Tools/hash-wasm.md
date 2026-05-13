---
title: (实用工具) Hash-Tool在线计算哈希值
parent: Tools
---

# 哈希在线计算工具

<style>
  .hash-tool { margin: 2rem 0; }
  
  /* 输入框标签提示 */
  .input-label {
    font-size: 14px;
    font-weight: 500;
    margin: 5px 0;
    color: #333;
  }
  
  #hashInput {
    width: 100%;
    min-height: 120px;
    padding: 10px;
    margin: 6px 0 12px 0;
    box-sizing: border-box;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
    spellcheck: false;
  }

  #fileInput {
    width: 100%;
    padding: 8px;
    margin: 6px 0 12px 0;
    box-sizing: border-box;
    font-size: 14px;
    display: none;
  }
  
  /* 浅色占位符样式 */
  #hashInput::placeholder {
    color: #aaa;
    opacity: 1;
  }
  
  .tool-row {
    margin: 10px 0;
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }

  /* radio 组外框 */
  .radio-group {
    display: flex;
    gap: 15px;
    align-items: center;
    padding: 10px 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 8px 0;
    background: #fdfdfd;
  }
  .radio-label {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }

  #hashAlgorithm {
    padding: 8px 12px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ccc;
    min-width: 220px;
  }
  #calcBtn {
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  #resultArea {
    background: #f6f8fa;
    padding: 15px;
    border-radius: 6px;
    font-family: Consolas, monospace;
    white-space: pre-wrap;
    word-break: break-all;
    min-height: 60px;
    margin-top: 10px;
  }
  .param-area {
    margin: 10px 0;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 4px;
    display: none;
  }
  .param-area input {
    margin: 5px;
    padding: 4px 8px;
  }
</style>

<div class="hash-tool">
  <!-- 输入框标题提示 -->
  <div class="input-label">哈希算法输入内容</div>
  <textarea id="hashInput" placeholder="Hex示例输入: 1122eeff, ASCII示例输入:Text Example"></textarea>
  <input type="file" id="fileInput">

  <!-- 三选一：HEX / ASCII / 二进制文件导入 -->
  <div class="radio-group">
    <label class="radio-label">
      <input type="radio" name="inputMode" value="hex" checked> HEX 字符串输入
    </label>
    <label class="radio-label">
      <input type="radio" name="inputMode" value="ascii"> ASCII 字符串
    </label>
    <label class="radio-label">
      <input type="radio" name="inputMode" value="file"> 二进制文件导入
    </label>
  </div>

  <div class="radio-group">
    <label class="radio-label">
      <input type="radio" name="calcMode" value="single" checked> 单算法计算
    </label>
    <label class="radio-label">
      <input type="radio" name="calcMode" value="all"> 所有算法计算
    </label>
  </div>

  <div class="tool-row">
    <select id="hashAlgorithm">
      <option value="md5">MD5</option>
      <option value="sha1">SHA1</option>
      <option value="sha224">SHA224</option>
      <option value="sha256">SHA256</option>
      <option value="sha384">SHA384</option>
      <option value="sha512">SHA512</option>
      <option value="sha3-224">SHA3-224</option>
      <option value="sha3-256">SHA3-256</option>
      <option value="sha3-384">SHA3-384</option>
      <option value="sha3-512">SHA3-512</option>
      <option value="md4">MD4</option>
      <option value="ripemd160">RIPEMD160</option>
      <option value="sm3">SM3</option>
      <option value="whirlpool">Whirlpool</option>
      <option value="adler32">Adler32</option>

      <option value="blake2b">BLAKE2b</option>
      <option value="blake2s">BLAKE2s</option>
      <option value="blake3">BLAKE3</option>
      <option value="crc32">CRC32</option>
      <option value="crc64">CRC64</option>
      <option value="keccak">Keccak</option>
      <option value="xxhash32">XXHash32</option>
      <option value="xxhash64">XXHash64</option>
      <option value="xxhash3">XXHash3</option>
      <option value="xxhash128">XXHash128</option>
    </select>
    <button id="calcBtn">计算哈希</button>
  </div>

  <div id="paramArea" class="param-area">
    <div id="paramContent"></div>
  </div>

  <div id="resultArea">等待计算...</div>
</div>

<script src="https://cdn.jsdelivr.net/npm/hash-wasm@4.12.0/dist/index.umd.min.js"></script>

<script>
/* ===================== 历史记录模块 ===================== */
/* 本地存储键名 */
const HIST_KEY_HASH = "hash_input_history";
/* 历史索引 */
let hashHistIndex = -1;
/* 临时缓存 */
let hashTempCache = "";
/* 最大历史条数 */
const MAX_HASH_HIST = 50;

/* 获取历史 */
function getHashHistory() {
  try {
    return JSON.parse(localStorage.getItem(HIST_KEY_HASH)) || [];
  } catch (e) {
    return [];
  }
}

/* 保存历史 */
function saveHashHistory(val) {
  if (!val.trim()) return;
  let h = getHashHistory();
  h = h.filter(x => x !== val);
  h.unshift(val);
  if (h.length > MAX_HASH_HIST) h = h.slice(0, MAX_HASH_HIST);
  localStorage.setItem(HIST_KEY_HASH, JSON.stringify(h));
  hashHistIndex = -1;
}

/* 绑定上下键 */
function bindHashHistoryKeys() {
  const el = document.getElementById("hashInput");
  el.addEventListener("keydown", function (e) {
    const h = getHashHistory();
    if (h.length === 0) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hashHistIndex === -1) hashTempCache = el.value;
      if (hashHistIndex < h.length - 1) hashHistIndex++;
      el.value = h[hashHistIndex] || "";
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hashHistIndex > -1) hashHistIndex--;
      el.value = hashHistIndex === -1 ? hashTempCache : (h[hashHistIndex] || "");
    }
  });
}
/* ===================== 历史记录模块结束 ===================== */

window.onload = function() {
  /* 获取页面元素 */
  const btn = document.getElementById('calcBtn');
  const input = document.getElementById('hashInput');
  const fileInput = document.getElementById('fileInput');
  const result = document.getElementById('resultArea');
  const algoSelect = document.getElementById('hashAlgorithm');
  const paramArea = document.getElementById('paramArea');
  const paramContent = document.getElementById('paramContent');

  /* 获取单选框元素 */
  const inputModeRadios = document.querySelectorAll('input[name="inputMode"]');
  const calcModeRadios = document.querySelectorAll('input[name="calcMode"]');

  /* 元素校验 */
  if (!btn || !input || !result || !algoSelect) {
    result.innerText = "❌ 页面元素加载失败";
    return;
  }

  /* 初始化历史记录按键 */
  bindHashHistoryKeys();

  /* 切换输入模式：文本框 / 文件选择框 */
  function switchInputMode() {
    const mode = document.querySelector('input[name="inputMode"]:checked').value;
    if (mode === 'file') {
      input.style.display = 'none';
      fileInput.style.display = 'block';
    } else {
      input.style.display = 'block';
      fileInput.style.display = 'none';
    }
  }

  /* 监听输入模式切换 */
  inputModeRadios.forEach(radio => {
    radio.addEventListener('change', switchInputMode);
  });

  /* 绑定回车键触发计算 */
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      btn.click();
    }
  });

  /* 监听算法切换 */
  algoSelect.addEventListener('change', updateParamArea);

  /* 读取文件为 Uint8Array */
  function readFileAsUint8Array(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(new Uint8Array(reader.result));
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  /* 计算按钮主逻辑 */
  btn.onclick = async function() {
    result.innerText = "⏳ 计算中...";
    const inputMode = document.querySelector('input[name="inputMode"]:checked').value;
    const calcMode = document.querySelector('input[name="calcMode"]:checked').value;

    if (!window.hashwasm) {
      result.innerText = "❌ hash-wasm 库加载失败";
      return;
    }

    const hw = window.hashwasm;
    let data = new Uint8Array();
    let output = '';

    try {
      if (inputMode === 'file') {
        const file = fileInput.files[0];
        if (!file) {
          result.innerText = "请选择文件";
          return;
        }
        data = await readFileAsUint8Array(file);
        /* 文件模式：只显示文件名和大小 */
        output = `input file: ${file.name} (size: ${file.size} bytes)\n`;
      } else {
        const val = input.value.trim();
        /* 保存输入历史 */
        saveHashHistory(val);

        if (inputMode === 'hex') {
          if (val) {
            const hexRegex = /^[0-9a-fA-F]+$/;
            if (!hexRegex.test(val)) throw new Error("HEX包含非法字符");
            if (val.length % 2 !== 0) throw new Error("HEX长度必须为偶数");
            data = new Uint8Array(val.match(/.{1,2}/g).map(b => parseInt(b, 16)));
          }
        } else {
          const encoder = new TextEncoder();
          data = encoder.encode(val);
        }
        /* HEX / ASCII 模式：显示完整 hex */
        const inputHex = Array.from(data).map(b => b.toString(16).padStart(2, '0')).join('');
        output = `input data: 0x${inputHex}\n`;
      }

      /* 所有算法计算 */
      if (calcMode === 'all') {
        const allAlgos = [
          'md5','sha1','sha224','sha256','sha384','sha512',
          'sha3-224','sha3-256','sha3-384','sha3-512',
          'md4','ripemd160','sm3','whirlpool','adler32'
        ];
        const promises = [];
        for (const a of allAlgos) {
          if (a === 'sha3-224') promises.push(hw.sha3(data, 224));
          else if (a === 'sha3-256') promises.push(hw.sha3(data, 256));
          else if (a === 'sha3-384') promises.push(hw.sha3(data, 384));
          else if (a === 'sha3-512') promises.push(hw.sha3(data, 512));
          else promises.push(hw[a](data));
        }
        const res = await Promise.all(promises);
        for (let i = 0; i < allAlgos.length; i++) {
          output += `${allAlgos[i].toUpperCase().padEnd(12)}: ${res[i]}\n`;
        }
        result.innerText = output;
        return;
      }

      /* 单算法计算 */
      const algo = algoSelect.value;
      let hashResult = '';
      const simpleAlgos = [
        'md5','sha1','sha224','sha256','sha384','sha512',
        'md4','ripemd160','sm3','whirlpool','adler32'
      ];

      if (simpleAlgos.includes(algo)) hashResult = await hw[algo](data);
      else if (algo === 'sha3-224') hashResult = await hw.sha3(data, 224);
      else if (algo === 'sha3-256') hashResult = await hw.sha3(data, 256);
      else if (algo === 'sha3-384') hashResult = await hw.sha3(data, 384);
      else if (algo === 'sha3-512') hashResult = await hw.sha3(data, 512);
      else if (algo === 'blake2b') {
        const bits = Number(document.getElementById('bits')?.value) || 512;
        const key = document.getElementById('key')?.value || '';
        hashResult = await hw.blake2b(data, bits, key);
      } else if (algo === 'blake2s') {
        const bits = Number(document.getElementById('bits')?.value) || 256;
        const key = document.getElementById('key')?.value || '';
        hashResult = await hw.blake2s(data, bits, key);
      } else if (algo === 'blake3') {
        const bits = Number(document.getElementById('bits')?.value) || 256;
        const key = document.getElementById('key')?.value || '';
        hashResult = await hw.blake3(data, bits, key);
      } else if (algo === 'crc32') {
        const poly = document.getElementById('poly')?.value || '0xedb88320';
        hashResult = await hw.crc32(data, eval(poly));
      } else if (algo === 'crc64') {
        const poly = document.getElementById('poly')?.value || 'c96c5795d7870f42';
        hashResult = await hw.crc64(data, poly);
      } else if (algo === 'keccak') {
        const bits = Number(document.getElementById('bits')?.value) || 512;
        hashResult = await hw.keccak(data, bits);
      } else if (algo === 'xxhash32') {
        const seed = Number(document.getElementById('seed')?.value) || 0;
        hashResult = await hw.xxhash32(data, seed);
      } else if (algo === 'xxhash64') {
        const sl = Number(document.getElementById('seedLow')?.value) || 0;
        const sh = Number(document.getElementById('seedHigh')?.value) || 0;
        hashResult = await hw.xxhash64(data, sl, sh);
      } else if (algo === 'xxhash3') {
        const sl = Number(document.getElementById('seedLow')?.value) || 0;
        const sh = Number(document.getElementById('seedHigh')?.value) || 0;
        hashResult = await hw.xxhash3(data, sl, sh);
      } else if (algo === 'xxhash128') {
        const sl = Number(document.getElementById('seedLow')?.value) || 0;
        const sh = Number(document.getElementById('seedHigh')?.value) || 0;
        hashResult = await hw.xxhash128(data, sl, sh);
      }

      output += `${algo.toUpperCase()}: ${hashResult}`;
      result.innerText = output;
    } catch (err) {
      result.innerText = `❌ 错误：${err.message}`;
      console.error(err);
    }
  };

  /* 初始化 */
  switchInputMode();
  updateParamArea();

  /* 动态更新参数输入框 */
  function updateParamArea() {
    const algo = algoSelect.value;
    paramArea.style.display = 'none';
    paramContent.innerHTML = '';
    const addInput = (id, label, def = '') => {
      paramContent.innerHTML += `<label>${label}: <input type="text" id="${id}" value="${def}"></label>`;
    };
    if (['blake2b', 'blake2s', 'blake3'].includes(algo)) {
      paramArea.style.display = 'block';
      addInput('bits', '位数', '512');
      addInput('key', '密钥(可选)', '');
    } else if (algo === 'crc32') {
      paramArea.style.display = 'block';
      addInput('poly', '多项式', '0xedb88320');
    } else if (algo === 'crc64') {
      paramArea.style.display = 'block';
      addInput('poly', '多项式', 'c96c5795d7870f42');
    } else if (algo === 'keccak') {
      paramArea.style.display = 'block';
      addInput('bits', '位数(224/256/384/512)', '512');
    } else if (algo === 'xxhash32') {
      paramArea.style.display = 'block';
      addInput('seed', '种子', '0');
    } else if (['xxhash64', 'xxhash3', 'xxhash128'].includes(algo)) {
      paramArea.style.display = 'block';
      addInput('seedLow', '种子低32位', '0');
      addInput('seedHigh', '种子高32位', '0');
    }
  }
};
</script>
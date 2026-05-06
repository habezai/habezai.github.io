---
title: 哈希在线计算工具
parent: Tools
---

# 哈希在线计算工具

<style>
  .hash-tool { margin: 2rem 0; }
  #hashInput {
    width: 100%;
    min-height: 120px;
    padding: 10px;
    margin: 10px 0;
    box-sizing: border-box;
  }
  #calcBtn {
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 15px;
  }
  #resultArea {
    background: #f6f8fa;
    padding: 15px;
    border-radius: 6px;
    font-family: Consolas, monospace;
    white-space: pre-wrap;
    word-break: break-all;
  }
</style>

<div class="hash-tool">
  <textarea id="hashInput" placeholder="在这里输入文本">Example text</textarea>
  <button id="calcBtn">点击开始计算哈希</button>
  <div id="resultArea">等待点击计算...</div>
</div>

<script src="https://cdn.jsdelivr.net/npm/hash-wasm@4.12.0/dist/index.umd.min.js"></script>

<script>
/* 页面加载完成后初始化 */
window.onload = function() {
    /* 获取页面元素 */
    var btn = document.getElementById('calcBtn');
    var input = document.getElementById('hashInput');
    var result = document.getElementById('resultArea');

    /* 判断元素是否存在 */
    if (!btn || !input || !result) {
        result.innerText = "❌ 页面元素加载失败";
        return;
    }

    /* 绑定点击事件 */
    btn.onclick = function() {
        result.innerText = "⏳ 计算中...";

        /* 获取输入内容 */
        var val = input.value.trim();
        if (!val) {
            result.innerText = "请输入内容";
            return;
        }

        /* 检查库是否加载成功 */
        if (!window.hashwasm) {
            result.innerText = "❌ hash-wasm 库加载失败";
            return;
        }

        var hw = window.hashwasm;

        /* 并行计算所有哈希 */
        Promise.all([
            hw.md5(val),
            hw.sha1(val),
            hw.sha256(val),
            hw.sha512(val),
            hw.crc32(val),
            hw.blake3(val),
            hw.sm3(val)
        ]).then(function(res) {
            /* 展示结果 */
            result.innerText =
"MD5:     " + res[0] + "\n" +
"SHA1:    " + res[1] + "\n" +
"SHA256:  " + res[2] + "\n" +
"SHA512:  " + res[3] + "\n" +
"CRC32:   " + res[4] + "\n" +
"BLAKE3:  " + res[5] + "\n" +
"SM3:     " + res[6];
        }).catch(function(err) {
            /* 异常处理 */
            result.innerText = "❌ 错误：" + err.message;
            console.error("错误详情：", err);
        });
    };
};
</script>
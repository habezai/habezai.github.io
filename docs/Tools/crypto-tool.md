---
title: 密码学工具箱
nav:false
---

# 密码工具箱

{% include crypto-tool/styles.html %}

<div class="crypto-tool">
<div class="tabbar">
    <div class="tab active" onclick="showTab('hash')">哈希</div>
    <div class="tab" onclick="showTab('hmac')">HMAC</div>
    <div class="tab" onclick="showTab('aes')">AES-XTS</div>
    <div class="tab" onclick="showTab('rsa')">RSA</div>
    <div class="tab" onclick="showTab('random')">随机数</div>
    <div class="tab" onclick="showTab('encode')">编码</div>
</div>

{% include crypto-tool/tab-hash.html %}

{% include crypto-tool/tab-hmac.html %}

{% include crypto-tool/tab-aes.html %}

{% include crypto-tool/tab-rsa.html %}

{% include crypto-tool/tab-random.html %}

{% include crypto-tool/tab-encode.html %}

</div>

{% include crypto-tool/scripts-lib.html %}

{% include crypto-tool/scripts-core.html %}
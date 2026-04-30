---
title: HSM-Development
parent: Automotive-Cyber-Security
---

# HSM-Development
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

<style id="my-hide-style">
main p,
main ol,
main ul,
main li,
main pre,
main code,
main table,
main th,
main td {
    display: none !important;
}

/* 密码面板样式 */
#pwd-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
    z-index: 9999;
    text-align: center;
    font-family: Arial, sans-serif;
}
#pwd-input {
    padding: 10px 15px;
    width: 200px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
}
#pwd-submit {
    padding: 10px 20px;
    background: #409eff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
}
#pwd-submit:hover {
    background: #337ecc;
}
#pwd-tip {
    margin-top: 12px;
    color: #f56c6c;
    font-size: 14px;
    height: 16px;
}
</style>

<div id="pwd-box">
    <div>请输入访问密码</div>
    <input type="password" id="pwd-input" placeholder="输入密码">
    <button id="pwd-submit">确认</button>
    <div id="pwd-tip"></div>
</div>

<script>
const rightPwd = "hbz";
const pwdBox = document.getElementById("pwd-box");
const pwdInput = document.getElementById("pwd-input");
const pwdSubmit = document.getElementById("pwd-submit");
const pwdTip = document.getElementById("pwd-tip");
const hideStyle = document.getElementById("my-hide-style");

// 确认密码
function checkPwd() {
    const val = pwdInput.value.trim();
    if (val === rightPwd) {
        // 密码正确：显示内容 + 移除密码框
        if (hideStyle) hideStyle.remove();
        pwdBox.remove();
    } else {
        // 密码错误：页面内提示
        pwdTip.textContent = "密码无效，请重试";
        pwdInput.value = "";
        pwdInput.focus();
    }
}

// 点击/回车都能提交
pwdSubmit.onclick = checkPwd;
pwdInput.onkeydown = (e) => {
    if (e.key === "Enter") checkPwd();
};
</script>


## HSM整体架构

整体采用 Client-Server架构, 如下图:
![](vx_images/578905217837700.svg)

## 需求和设计原则
1. Client-Server通信：
    - Client发起HSM请求、等待结果；
    - Server执行HSM任务、反馈结果;
2. 队列规则：
    - 容量20，FIFO顺序，队列满拒绝服务并返回对应错误码;
3. Client驱动：
    - 封装功能服务参数，支持同步等待/异步获取结果，屏蔽通信细节;
4. HSM内部：
    - Enque/Deque/执行机制明确，支持硬件/软件/密码库重载;
5. 算法支持：
    - Autosar SHE、Hash/AES等全需求算法，密钥于Server隔离存储;
6. 错误码：
    - 精准对应各逻辑异常，全局统一分发

## 同步/异步请求时序流程图
![](vx_images/31044238105606.svg)

## 任务队列+Worker模式流程图
![renwu_worker](vx_images/115893834789404.svg)

## 子架构图( Server端 )

## 子架构图( Client端 )

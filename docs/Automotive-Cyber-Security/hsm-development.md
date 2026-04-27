---
title: HSM-Development
parent: Automotive-Cyber-Security
---

<style>
/* 只隐藏内容，不隐藏脚本 */
.main-content-hidden {
    display: none !important;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('main').classList.add('main-content-hidden');
    
    const pwd = prompt("请输入访问密码");
    const rightPwd = "123456";

    if (pwd === rightPwd) {
        document.querySelector('main').classList.remove('main-content-hidden');
    } else {
        document.body.innerHTML = `<div style="text-align:center;margin-top:80px;color:red;">密码错误</div>`;
    }
});
</script>


HSM设计

## 整体架构


![] (vx_images/21203024880334.png)

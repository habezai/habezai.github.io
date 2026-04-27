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
// 页面一加载就执行
document.addEventListener('DOMContentLoaded', function() {
    // 先把正文隐藏
    document.querySelector('main').classList.add('main-content-hidden');
    
    // 你的密码
    const pwd = prompt("请输入访问密码");
    const rightPwd = "123456"; // 改成你要的密码

    if (pwd === rightPwd) {
        // 密码正确 → 显示正文
        document.querySelector('main').classList.remove('main-content-hidden');
    } else {
        // 密码错误 → 覆盖页面
        document.body.innerHTML = `<div style="text-align:center;margin-top:80px;color:red;">密码错误</div>`;
    }
});
</script>


HSM设计

## 整体架构


![] (vx_images/21203024880334.png)

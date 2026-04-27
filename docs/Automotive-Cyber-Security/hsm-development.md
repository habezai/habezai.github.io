---
title: HSM-Development
parent: Automotive-Cyber-Security
---

<style>
.main-content-hidden {
    display: none !important;
}
</style>

<script>
    document.querySelectorAll('main p').forEach(p => p.classList.add('main-content-hidden'));

    let pwd = prompt("请输入访问密码");
    const rightPwd = "1009157870";

    if(pwd === rightPwd)
    {
        document.querySelectorAll('main p').forEach(p => p.classList.remove('main-content-hidden'));
    }
    else
    {
        document.body.innerHTML = '<h1>密码错误！请刷新页面后重试</h1>';
    }

</script>


HSM设计

## 整体架构


![] (vx_images/21203024880334.png)

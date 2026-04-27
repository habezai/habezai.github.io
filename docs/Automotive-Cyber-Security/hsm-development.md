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

    const pwd = prompt("请输入访问密码");
    const rightPwd = "123456";

    while(pwd != rightPwd)
    {
        pwd = prompt("请输入正确的访问密码");
        console.log('%s is not correct password', pwd);
    }

    console.log('password is correct');

    document.querySelectorAll('main p').forEach(p => p.classList.remove('main-content-hidden'));
</script>


HSM设计

## 整体架构


![] (vx_images/21203024880334.png)

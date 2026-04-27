---
title: HSM-Development
parent: Automotive-Cyber-Security
---

<style>
    main p{
    display: none !important;
}
</style>

<script>
const rightPwd = "1009157870";
let pwd = prompt("请输入访问密码");

if (pwd === rightPwd) {
    const styleDom = document.querySelector('style');
    if (styleDom) styleDom.remove()
} else {
    console.log('password is wrong!');
}
</script>
</script>


HSM设计

## 整体架构


![] (vx_images/21203024880334.png)

---
title: HSM-Development
parent: Automotive-Cyber-Security
---

<style>
    main p, main div:not(script):not(style) {
    display: none;
}
</style>

<script>
const rightPwd = "1009157870";
let pwd = prompt("请输入访问密码");

if (pwd === rightPwd) {
    document.querySelectorAll('main p, main div:not(script):not(style)')
    .forEach(el => {
        el.style.display = "";
    });
} else {
    console.log('password is wrong!');
}
</script>
</script>


HSM设计

## 整体架构


![] (vx_images/21203024880334.png)

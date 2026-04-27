---
title: HSM-Development
parent: Automotive-Cyber-Security
---

<style id="my-hide-style">
    main p {
        display: none !important;
    }
</style>

<script>
const rightPwd = "123";
let pwd = prompt("请输入访问密码");

if (pwd === rightPwd) {
    const style = document.getElementById("my-hide-style");
    if (style) style.remove();
} else {
    /*document.body.innerHTML = "<h1>密码错误</h1>";*/
    console.log("password is wrong!");
}
</script>


HSM设计

## 整体架构


![] (vx_images/21203024880334.png)

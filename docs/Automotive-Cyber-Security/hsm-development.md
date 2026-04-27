---
title: HSM-Development
parent: Automotive-Cyber-Security
---

<script>
<br/> // 访问密码
<br/> const pass = prompt("本文受保护，请输入访问密码");<br/> // 自定义你的密码
<br/> const rightPwd = "1009157870";
<br/> if(pass !== rightPwd){
<br/>   document.body.innerHTML = "<div style='text-align:center;margin-top:50px'><h2>密码错误，访问不允许</h2></div>";
<br/> }
<br/> 
</script>

HSM设计

## 整体架构


![](vx_images/21203024880334.png)

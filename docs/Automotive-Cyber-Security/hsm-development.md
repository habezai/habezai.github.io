---
title: HSM-Development
parent: Automotive-Cyber-Security
---

<style>
<br/> /* 默认隐藏整篇正文 */
<br/> .page-content {
<br/>   display: none !important;
<br/> }
<br/> </style>
<br/> <script>
<br/> (function(){
<br/>   const pwd = prompt("本文受保护，请输入访问密码");
<br/>   const correctPwd = `1009157870`;
<br/>   if(pwd === correctPwd){
<br/>     // 密码正确，显示正文
<br/>     document.querySelector('.page-content').style.display = 'block';
<br/>   } else {
<br/>     document.body.innerHTML = `<div style="text-align:center;margin-top:80px;font-size:18px;color:red;">
<br/>     密码错误，无权查看
<br/>     </div>`;
<br/>   }
<br/> })();
<br/> </script>

HSM设计

## 整体架构


![](vx_images/21203024880334.png)

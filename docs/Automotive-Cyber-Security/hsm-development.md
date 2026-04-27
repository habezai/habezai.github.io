---
title: HSM-Development
parent: Automotive-Cyber-Security
---

<style>
/* 默认隐藏整篇正文 */
.page-content {
  display: none !important;
}
</style>
<script>
(function(){
  const pwd = prompt("本文受保护，请输入访问密码");
  const correctPwd = `1009157870`;
  if(pwd === correctPwd){
    // 密码正确，显示正文
    document.querySelector('.page-content').style.display = 'block';
   } else {
     document.body.innerHTML = `<div style="text-align:center;margin-top:80px;font-size:18px;color:red;">
     密码错误，无权查看
     </div>`;
   }
})();
</script>

HSM设计

## 整体架构


![] (vx_images/21203024880334.png)

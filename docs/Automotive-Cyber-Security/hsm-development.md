---
title: HSM-Development
parent: Automotive-Cyber-Security
---

<style>
/* 隐藏文章内容 */
#write, .markdown-body, main, article {
    display: none !important;
}
</style>

<script>
// 等待页面加载完成再执行
window.onload = function() {
    // 你自己的密码
    const password = "1009157870";
    
    // 弹出输入框
    let input = prompt("请输入访问密码：");
    
    if(input === password) {
        // 显示内容（覆盖所有常见平台）
        document.querySelectorAll('#write, .markdown-body, main, article').forEach(el => {
            el.style.display = "block";
        });
    } else {
        document.body.innerHTML = `
            <div style="text-align:center;margin-top:100px;font-size:20px;color:red;">
                密码错误，无权访问
            </div>
        `;
    }
}
</script>


HSM设计

## 整体架构


![] (vx_images/21203024880334.png)

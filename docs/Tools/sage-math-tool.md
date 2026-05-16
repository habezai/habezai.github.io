---
title: SageMath 交互式计算
parent: Tools
---

# SageMath 交互式计算
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

<nav class="right-toc" markdown="1">
  1. 目录
  {:toc}
</nav>

<script src="https://sagecell.sagemath.org/static/embedded_sagecell.js"></script>

<script>
sagecell.makeSagecell({
  inputLocation: '.compute',
  evalButtonText: '执行脚本'
});
</script>

## 函数f(x)以及特定点的函数值
<div class="compute">
<pre style="display: none;">
<script type="text/x-sage">
f(x) = x^2 * sin(x) + cos(x) # 定义函数
show(f(x)) # 符号表达式
show(f(x=2)) # 符号表达式
show(f(x=2).n()) #.n() 把 符号 → 小数（浮点数）
</script>
</pre>
</div>

## 作图展示函数图像
<div class="compute">
<pre style="display: none;">
<script type="text/x-sage">
plot(sin(x), (x, 0, 2*pi))
</script>
</pre>
</div>

## 交互式得到$2^n$的值
<div class="compute">
<pre style="display: none;">
<script type="text/x-sage">
@interact
def f(n=(0,10)):
    print(2^n)
</script>
</pre>
</div>

## 交互式得到n!的阶乘值
<div class="compute">
<pre style="display: none;">
<script type="text/x-sage">
@interact
def f(a=(0,10)):
    print(factorial(a))
</script>
</pre>
</div>

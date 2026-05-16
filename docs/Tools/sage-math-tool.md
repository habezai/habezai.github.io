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

sagecell.makeSagecell({
    inputLocation: '.sagecell-linked-demo1', 
    replaceOutput: true,
    autoeval: false,
    linked: true,
    hide: ['messages', 'computationID', 'files', 'sageMode', 'editorToggle', 'sessionTitle', 'done', 'permalink'],
    evalButtonText: 'linked demo 执行!'});
</script>

## 微积分领域
### 函数f(x)以及特定x0的f(x0)
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

### 函数f(x)的导数和积分函数
<div class="compute">
<pre style="display: none;">
<script type="text/x-sage">
f(x) = x^2 * sin(x) + cos(x) # 定义函数
d = diff(f(x),x) # 导函数
i = integrate(f(x),x) #积分函数
show("the derivative is: " + str(d)) # 求导后的函数
show("the integral is: " + str(i)) # 积分函数(原函数)
</script>
</pre>
</div>

### 函数f(x)的数值积分(定积分)
<div class="compute">
<pre style="display: none;">
<script type="text/x-sage">
f(x) = x^2 * sin(x) + cos(x)
numerical_integral(f, 2, 3) # 返回值: (定积分值,误差)
</script>
</pre>
</div>

## 蒙特卡罗方法
### $\pi$ 值的蒙特卡罗估计
<div class="compute">
<pre style="display: none;">
<script type="text/x-sage">
### ==============================================
### 脚本功能：
### 蒙特卡洛法（随机投点法）估算圆周率 π
### 原理：在正方形里随机“射击”打点，统计落在内切圆内的点比例
### 正方形面积 4r²，圆面积 πr²
### 落点比例 ≈ 圆面积 / 正方形面积 = π/4
### 因此 π ≈ 4 * (落在圆内的点数 / 总点数)
### ==============================================

### 声明符号变量 x, y, r, n（Sage符号计算语法）
var ('x y r n')

### 设定圆半径 r = 1
### 正方形范围：x∈[0,1], y∈[0,1]（第一象限的1/4圆，计算更简单）
r = 1

### 记录落在圆内的点数量，初始为0
inside = 0

### 存储所有随机点的坐标列表
points = []

### 随机投点的总数量（可以改大，比如1000、5000，结果更接近π）
n = 100

### ==============================================
### 第一步：随机向正方形区域内投点
### ==============================================
for i in range(0, n):
    ### 随机生成一个点 (x,y)，范围都在 [0,1]
    [x, y] = [random(), random()]
    
    ### 把这个点存入列表
    points.append([x, y])

### ==============================================
### 第二步：判断点是否落在 1/4 圆内
### 圆方程：x² + y² ≤ r²   →   y ≤ sqrt(r² - x²)
### ==============================================
    if (y <= sqrt(r^2 - x^2)):
        ### 如果在圆内，计数器 +1
        inside += 1

### ==============================================
### 第三步：根据落点比例估算 π
### 公式：π ≈ 4 × (圆内点数 / 总点数)
### ==============================================
piapprox = 4 * (inside / n)

### 拼接输出文字：基于多少个点，估算出π≈多少
estimate = "基于 "
estimate += str(n)
estimate += " 次随机投点，π ≈ "
estimate += str(piapprox.n())  ### .n() 转为小数显示

### 显示估算结果
show(estimate)

### ==============================================
### 第四步：画图展示
### ==============================================
circle = []

### 生成 1/4 圆弧的点（用来画红色圆边线）
for i in range(0, 1000):
    x = i / 1000          ### x 从 0 均匀走到 1
    y = sqrt(r^2 - x^2)   ### 圆方程求 y
    circle.append([x, y])

### 画出所有随机点
graph = list_plot(points)

### 叠加画出红色圆弧（plotjoined=true 把点连成线）
graph += list_plot(circle, color='red', figsize=[5,4], plotjoined=true)

### 显示图像
show(graph)
</script>
</pre>
</div>

## 数据拟合
### 对指定带噪声的样本数据的曲线拟合
<div class="compute">
<pre style="display: none;">
<script type="text/x-sage">
# 此示例用于演示：使用正弦函数模型对带噪声的数据进行曲线拟合
# 首先生成一组带有内置方差（噪声）的模拟数据
# 数据格式：(x, y)，y = 1.2*sin(0.5*i-0.2) + 随机噪声
# xsrange(0, 4*pi, 0.2) 表示：从0到4π，步长0.2生成x坐标
# normalvariate(0,1) 表示添加正态分布随机噪声，让数据更贴近真实实验数据
data = [(i, 1.2 * sin(0.5*i-0.2) + 0.1 * normalvariate(0, 1)) for i in xsrange(0, 4*pi, 0.2)]

# 定义拟合模型：带三个可调参数 a, b, c 的正弦函数
# 模型形式：y = a * sin(b * x - c)
# a：振幅  b：频率  c：相位偏移
var('a, b, c, x')
model(x) = a * sin(b * x - c)

# 使用 Sage 内置函数 find_fit 寻找最优参数
# 让 model(x) 尽可能拟合上面生成的 data 数据点
# sol 存储拟合得到的最优参数解：a=?, b=?, c=?
sol = find_fit(data, model)
show(sol)  # 显示拟合结果（a、b、c 的最优取值）

# 定义拟合后的函数 f(x)
# 将 sol 中求得的最优参数代入模型，得到最终拟合函数
f(x) = model(a=sol[0].rhs(), b=sol[1].rhs(), c=sol[2].rhs())  # rhs 是 Right Hand Side，意思是取等号右边的值

# 创建一个空的绘图对象
a = plot([])

# 添加拟合曲线的图像：x 范围从 -0.5 到 12.5
a += plot(f(x), x, [-0.5, 12.5])

# 添加原始数据点，用红色显示
a += list_plot(data, color='red')

# 显示最终图像：蓝色拟合曲线 + 红色原始数据点
show(a)
</script>
</pre>
</div>

## Sage Math 作图
### 最简单的作图
<div class="compute">
<pre style="display: none;">
<script type="text/x-sage">
var('y x')
y = x^3  # 也可以 f(x) = x^3,后面plot的时候y写为f
plot(y,x,(-1,1))
</script>
</pre>
</div>

### 使用figsize=(,)参数控制绘图尺寸
<div class="compute">
<pre style="display: none;">
<script type="text/x-sage">
var('y x'); y = x^3
plot(y,x,(-1,1),figsize=(4,4))
</script>
</pre>
</div>

### 添加图像标题title
<div class="compute">
<pre style="display: none;">
<script type="text/x-sage">
var('y x'); y = x^3
plot(y,x,(-1,1),figsize=(4,4),title="Here is a Graph")
</script>
</pre>
</div>

### 创建空图然后叠加额外图像
<div class="compute">
<pre style="display: none;">
<script type="text/x-sage">
var('y x'); y = x^3
a = plot([],figsize=(4,4),title="Here is a Graph")
a += plot(y,x,(-1,1))
show(a)
</script>
</pre>
</div>

### 单图展示多个函数
<div class="compute">
<pre style="display: none;">
<script type="text/x-sage">
var('x'); y = x^3; g = -x
a = plot([],figsize=(4,4),title="Here is a Graph")
a += plot(y,x,(-1,1))
a += plot(g,x,(-1,1))
show(a)
</script>
</pre>
</div>

### 不同的颜色，线型，Legend图
<div class="compute">
<pre style="display: none;">
<script type="text/x-sage">
var('y x'); y = x^3; g = -x
a = plot([],figsize=(4,4),title="Here is a Graph")
a += plot(y,x,(-1,1),color='red',legend_label='f(x)')
a += plot(g,x,(-1,1),color='green',linestyle='--',thickness=5,legend_label='g(x)')
show(a)
</script>
</pre>
</div>

### 现有图叠加plot以外的图形对象
<div class="compute">
<pre style="display: none;">
<script type="text/x-sage">
var('y x'); y = x^3; g = -x
a = plot([],figsize=(4,4),title="Here is a Graph")
a += plot(y,x,(-1,1),color='red',legend_label='f(x)')
a += plot(g,x,(-1,1),color='green',linestyle='--',thickness=5,legend_label='g(x)')
a += circle((0.0,-0.5),0.5,color='blue')
a += polygon([(0.1,0.3),(0.5,0.3),(0.1,0.7)],color='orange',fill=False)
show(a)
</script>
</pre>
</div>

### 'frame'选项为图形增加边框线,'axes_labels'设置坐标轴标签
<div class="compute">
<pre style="display: none;">
<script type="text/x-sage">
var('y x'); y = x^3; g = -x
a = plot([],figsize=(4,4),title='Here is a Graph',frame=True,axes_labels=['$x$-axis, units','$y$-axis, units'])
a += plot(y,x,(-1,1),color='red',legend_label='f(x)')
a += plot(g,x,(-1,1),color='green',linestyle='--',thickness=5,legend_label='g(x)')
a += circle((0.0,-0.5),0.5,color='blue')
a += polygon([(0.1,0.3),(0.5,0.3),(0.1,0.7)],color='orange',fill=False)
show(a)
</script>
</pre>
</div>

### 当得到的对象不是函数而是数据点列表时，改用list_plot()绘制图像
<div class="compute">
<pre style="display: none;">
<script type="text/x-sage">
des = lambda t,y: [sin(t)]
Q = ode_solver(function=des, y_0=[0])
Q.ode_solve(t_span=[-2*pi(),2*pi()], num_points=100)
a = plot([],figsize=(4,4),title='Here is Another Graph',frame=True)
a += list_plot(Q.interpolate_solution())
show(a)
</script>
</pre>
</div>

## 链接多个cell的计算
<div class="sagecell-linked-demo1">
<pre style="display: none;">
<script type="text/x-sage">
def myFunc(n):
    return 'Yes, myFunc(' + str(n) + ') is called'
myFunc(1)
</script>
</pre>
</div>

<div class="sagecell-linked-demo1">
<pre style="display: none;">
<script type="text/x-sage">
    print(myFunc(2))
</script>
</pre>
</div>

## 交互式傅里叶级数演示

<div class="compute">
<pre style="display: none;">
<script type="text/x-sage">
## 原理：用三角函数叠加，逼近方波、锯齿波、抛物线波
## 参考来源：http://www.walkingrandomly.com/?p=1879
# ------------------------------
# 1. 定义三个波形的 傅里叶单项（每一个谐波项）
# ------------------------------

# 方波：第 n 个正弦项
def ftermSquare(n):
    # 方波的傅里叶级数：只含奇数项的正弦波
    return (1/n * sin(n*x*pi/3))

# 锯齿波：第 n 个正弦项
def ftermSawtooth(n):
    # 锯齿波的傅里叶项（和方波单项公式一样，但组合方式不同）
    return (1/n * sin(n*x*pi/3))

# 抛物线波（周期抛物曲线）：第 n 个余弦项
def ftermParabola(n):
    # 抛物线波由余弦波构成，带 (-1)^n 符号交替
    return ((-1)^n / n^2 * cos(n*x))

# ------------------------------
# 2. 定义三个波形的 傅里叶级数（叠加 n 项求和）
# ------------------------------

# 方波：叠加 n 组谐波（只取奇数项：1,3,5...）
def fseriesSquare(n):
    # 方波标准傅里叶公式：(4/π) * Σ(1/k sin(kx))
    return (4/pi * sum(ftermSquare(i) for i in range(1, 2*n, 2)))

# 锯齿波：叠加 n 项
def fseriesSawtooth(n):
    # 锯齿波标准傅里叶公式：1/2 - (1/π)Σ(1/k sin(kx))
    return (1/2 - 1/pi * sum(ftermSawtooth(i) for i in range(1, n)))

# 周期抛物线波：叠加 n 项
def fseriesParabola(n):
    # 抛物线傅里叶公式：π²/3 + 4Σ((-1)^k /k² cos(kx))
    return (pi^2/3 + 4 * sum(ftermParabola(i) for i in range(1, n)))

# ------------------------------
# 3. 交互式控件：滑块 + 下拉菜单
# ------------------------------
@interact
def plotFourier(
    # 滑块：控制傅里叶项数 n，从 1 到 30，默认 3
    n=slider(1, 30, 1, 3, label='Number of terms(傅里叶项数)'),
    
    # 下拉菜单：选择三种波形
    Function=['Square Wave(方波)','Saw Tooth(锯齿波)','Periodic Parabola(周期抛物线)']
):
    # 根据选择的函数，画出对应的傅里叶级数图像
    if Function == 'Saw Tooth(锯齿波)':
        # 画锯齿波，x范围：-6 到 6
        show(plot(fseriesSawtooth(n), x, -6, 6, figsize=(7,3)))
        
    if Function == 'Square Wave(方波)':
        # 画方波
        show(plot(fseriesSquare(n), x, -6, 6, figsize=(7,3)))
        
    if Function == 'Periodic Parabola(周期抛物线)':
        # 画周期抛物线
        show(plot(fseriesParabola(n), x, -6, 6, figsize=(7,3)))
</script>
</pre>
</div>

## 交互式得到 $2^n$ 的值
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

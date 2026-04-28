---
title: Vim
parent: Tools
---

# Vim
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Vim 常用操作备忘表
- [Vim Cheat Sheet](non-markdown/Vim_Cheat_Sheet.html)

## Vim 设置字体
- 通过命令行设置字体和大小

```bash
# 命令行模式 Linux/Unix: 
set guifont=Monospace\空格14  #注意这里需要对空格使用\进行转义
	
# 命令行模式 Windows: 
set guifont=Monospace:h14   #注意这里的字体大小需要有h的标识
```
- 通过GUI选择字体和大小（更直观）

```bash
# Windows或Linux/Unix：
set guifont=*
```
上述命令输入完毕后，GVIM将会弹出一个对话框，提示选择字体和大小，点击确认即可完成设置。

![](vx_images/120776795525312.png)

## Vim启动命令行参数
- **远程控制**（例如：让已打开的 GVim 新开标签 / 窗口） 

参数	作用

**--remote-tab-silent**	  **已存在 GVim 新标签打开文件（最推荐）**

--remote-tab 新标签打开（无 silent，找不到服务器会弹窗）

--remote	在已有 GVim 打开文件（不新建标签）

--remote-silent	静默打开，不报错

--remote-wait	打开后等待文件关闭才返回终端

--servername NAME	给 GVim 起一个服务器名字（多开时用）

```batch
gvim --remote-tab-silent file.txt 
```

- **启动后直接执行命令**（+command） 

格式： 
vim +命令 文件名 

`vim +5 file.txt`       打开文件后直接跳到第 5 行

`vim +/hello file.txt`  打开后直接搜索 hello

`vim +wq file.txt`      打开、保存、立刻退出

`vim +"set number" file.txt` 打开后显示行号



- **只读 / 安全模式** 

`vim -R file.txt`   只读模式（不能修改保存）

`vim -M file.txt`   强制只读（连修改都不让）

`vim -n file.txt`   不创建 .swp 交换文件

- **diff 模式(对比文件)**

`vim -d file1.txt file2.txt`

`gvim -d file1.txt file2.txt`

- **窗口、标签页控制**

`vim -p file1 file2 file3` 以多标签方式打开多个文件（终端 Vim 也能用） 

`vim -o file1 file2` 水平分屏打开 

`vim -O file1 file2` 垂直分屏打开 

## Vim针对目标文本文件静默执行vim脚本

**vim -es -S task.vim myfile.txt**

> 让 Vim 以静默、非交互的批处理模式，自动执行 task.vim 里的脚本，作用于 myfile.txt 文件，执行完自动退出。

逐参数介绍
1. vim
启动 Vim 编辑器
2. -e
进入 **Ex 模式**（Vim 的命令行模式）
不显示界面
只执行命令
适合脚本自动化
3. -s
silent **静默模式**
不输出任何提示、不等待输入
完全后台安静执行
配合 -e = 批处理专用模式
4. -S task.vim
-S = **Source 执行**脚本
读取并执行 task.vim 里的所有 Vim 命令
相当于在 Vim 里输入 :source task.vim
5. myfile.txt
要**处理的目标文件**
Vim 会打开它
然后执行 task.vim 里的脚本
最后自动保存并退出

示例 task.vim

```vim
" 这是一个完整的 Vim 脚本，支持函数、多行操作
func! ProcessFile()
    " 替换文本
    %s/旧内容/新内容/g
    " 删除空行
    g/^$/d
    " 在末尾添加一行
    $put ='自动添加的内容'
    " 统计行数
    echo "处理完成，总行数：" . line('$')
endfunc

" 调用函数
call ProcessFile()

" 保存退出
wq
 ```



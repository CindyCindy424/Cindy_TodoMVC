## Course Project for Web Programming 

> 1850477 邓欣凌

### （Ⅰ）功能清单

#### 基础功能

- [x] 新增任务
- [x] 显示当前剩余任务数量
- [x] 删除单条任务
- [x] 展现完整任务列表
- [x] 查看已完成任务列表
- [x] 查看未完成任务列表
- [x] 一键完成所有任务
- [x] 一键取消已完成任务
- [x] 删除所有已完成任务
- [x] 保存页面状态，刷新页面后可恢复

#### 高级功能

- [x] 过滤 filter
- [x] 编辑单条任务
- [x] 搜索任务列表
- [x] 更改任务项背景颜色（以直观表示任务难度）
- [x] 为新用户提供初始教程

#### 交互设计

- [x] 设计滑窗Slider小窗口作为主菜单
- [x] 选中某任务后，左滑编辑内容/修改颜色，右滑删除项目
- [x] 右下角工具箱：以该区域为锚点包含“编辑”、“换色”、“搜索”三大功能供用户选择
- [x] 错误反馈：当用户输入内容为空时，输入条变色进行反馈
- [x] 用户友好的界面设计：有提示语言、形象的图标等



### （Ⅱ）功能设计与实现简介

主界面设计如下图所示：

![图片1](https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/图片1.png)



为了提升应用的美观和可用性，系统设计了`滑动菜单栏`.

![](https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/图片2.png)



为了保持界面的简洁美观，同时增强应用的功能性，系统在界面右下角实现了一个工具包作为锚点，会有以下三种不同的功能在工具区域进行使用。

**注使用方式：**

选中某一任务项，左滑进入编辑和颜色修改页面，右滑删除。

![图片3](https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/图片3.png)



滑动操作方式：

- 左滑编辑/切换颜色
- 右滑删除任务

<img src="https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/image-20210628141724276.png" alt="image-20210628141724276" style="zoom:50%;" /><img src="https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/image-20210628141739500.png" alt="image-20210628141739500" style="zoom:50%;" />



系统为新用户提供了新手教程，同时也对数据做了持久化处理，努力提升老用户的使用体验。

![图片4](https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/图片4.png)



系统也进行了用户友好优化，提供文字/图标提示 & 错误反馈等。

<img src="https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/图片5.png" alt="图片5" style="zoom:50%;" />



### 功能手册

#### 1. 基础功能

1.1 新增任务

主页面中间即为可供用户进行输入的输入框。用户完成输入后即可查看刚才新增加的任务。

<img src="https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/image-20210626081253628.png" alt="image-20210626081253628" style="zoom: 50%;" /><img src="https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/image-20210626081641103.png" alt="image-20210626081641103" style="zoom:50%;" />



1.2 删除单条任务

在每条任务的后面附有一个删除按钮，用户点击删除按钮即刻删除该任务。

<img src="https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics\image-20210626081759711.png" alt="image-20210626081759711" style="zoom:50%;" />

1.3 展现完整任务列表

用户点击`All`按钮查看当前所有任务（包括已完成和未完成任务）。

<img src="https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/image-20210626081914522.png" alt="image-20210626081914522" style="zoom:50%;" />

1.4 查看已完成任务列表

用户点击`Finished`按钮查看当前已完成任务清单。

<img src="https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/image-20210626082034237.png" alt="image-20210626082034237" style="zoom:50%;" />

1.5 查看未完成任务列表

用户点击`NotYet`按钮查看当前未完成任务清单。

<img src="https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/image-20210626082102439.png" alt="image-20210626082102439" style="zoom:50%;" />



1.6 一键完成所有任务

用户点击应用左上角的菜单按钮即可打开主菜单，然后选择`Finish All`即可。

<img src="https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/image-20210626082256757.png" alt="image-20210626082256757" style="zoom:50%;" />



1.7 一键取消已完成任务

在1.6的图中，用户点击应用左上角的菜单按钮即可打开主菜单，然后选择`Undo All`即可。



1.8 删除所有已完成任务

在1.6所示图中，用户点击应用左上角的菜单按钮即可打开主菜单，然后选择`Delete Fini`即可。



1.9 保存页面状态，刷新页面后可恢复

系统使用**localstorage**机制完成数据缓存。



#### 2. 高级功能

2.1 过滤 filter

利用filter机制，实现对于不同状态的任务的过滤和集合。为用户提供以下3种视图：

- 全任务列表
- 已完成任务
- 未完成任务



2.2 编辑单条任务

系统允许用户对已发布的任务进行修改。

<img src="https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/image-20210626091041615.png" alt="image-20210626091041615" style="zoom:50%;" />

2.3 搜索任务列表

系统允许用户直接在列表栏种搜索相关内容，提升工作效率。

<img src="https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/image-20210626091103839.png" alt="image-20210626091103839" style="zoom:40%;" />



2.4 更改任务项背景颜色（以直观表示任务难度/重要性）

系统允许用户对不同任务置以不同背景颜色，以区分不同任务的重要程度/难易程度。

<img src="https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/image-20210626091133291.png" alt="image-20210626091133291" style="zoom:50%;" />



2.5 为新用户提供初始教程

系统为新用户提供了新手教程，以任务的形式存在于任务栏中，帮助用户更快上手。

<img src="https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/image-20210626091146478.png" alt="image-20210626091146478" style="zoom:50%;" />



3. 交互设计

3.1 设计滑窗Slider小窗口作为主菜单

利用贝塞尔函数（cubic-bezier）实现了浮动窗口的滑出效果，提升美观，同时提供菜单界面提高效率。

<img src="https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/image-20210626091205245.png" alt="image-20210626091205245" style="zoom:50%;" />



3.2 右下角工具箱：点开后包含“编辑”、“换色”、“搜索”三大功能供用户选择

为了保证界面的简洁，在有限空间里选择将功能统一放置到工具箱附近以提升空间利用率、保证UI界面的高效性。



3.3 错误反馈：当用户输入内容为空时，输入条变色进行反馈

当用户的输入为空且尝试进行提交时，系统会将输入框变红并显示提示字样。

<img src="https://github.com/CindyCindy424/Cindy_TodoMVC/blob/master/pics/image-20210626090718724.png" alt="image-20210626090718724" style="zoom:50%;" />



3.4 用户友好的界面设计：有提示语言、形象的图标等



### 项目仓库与demo地址

项目仓库：https://github.com/CindyCindy424/Cindy_TodoMVC

demo地址：https://cindycindy424.github.io/Cindy_TodoMVC/



### 参考

1. 本项目是基于TodoMVC的源码和课程教师徐老师的讲解学习后的练习项目。

   > http://luics.com/web-dev/

2. 前端滑动设计灵感来自于：

   >  https://codepen.io/shieldsma91/pen/zLpbLX


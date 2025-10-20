# Charity Hub - AngularJS 管理后台

这是使用 AngularJS 构建的慈善活动平台管理后台应用程序。

## 功能特性

- 📋 **活动管理**: 查看、创建、编辑、删除活动
- 📊 **注册管理**: 查看所有活动注册信息
- 🔧 **管理界面**: 专门为管理员设计的界面
- 📱 **响应式设计**: 支持移动端和桌面端

## 技术栈

- **前端框架**: AngularJS 1.8.3
- **路由**: AngularJS ngRoute
- **HTTP服务**: AngularJS $http
- **样式**: 原生CSS
- **服务器**: http-server

## 安装和运行

1. **安装依赖**:
   ```bash
   npm install
   ```

2. **启动应用**:
   ```bash
   npm start
   ```
   或者双击 `start-admin.bat`

3. **访问应用**:
   打开浏览器访问 `http://localhost:3002`

## API 依赖

确保后端 API 服务器在 `http://localhost:3000` 上运行。

## 主要组件

### 控制器 (Controllers)
- `EventsController`: 活动管理控制器
- `EventEditController`: 活动编辑控制器
- `RegistrationsController`: 注册管理控制器

### 服务 (Services)
- `ApiService`: API 调用服务
- `AuthService`: 管理员认证服务

## 路由配置

- `/` - 活动管理页面
- `/edit/:id` - 编辑活动页面
- `/registrations` - 注册管理页面

## 管理功能

### 活动管理
- 查看所有活动列表
- 创建新活动
- 编辑现有活动
- 删除活动

### 注册管理
- 查看所有注册信息
- 按活动筛选注册
- 导出注册数据

## 开发说明

这是专门为管理员设计的后台管理系统，提供完整的活动管理功能。

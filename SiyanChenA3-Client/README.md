# Charity Hub - AngularJS 客户端

这是使用 AngularJS 构建的慈善活动平台客户端应用程序。

## 功能特性

- 🏠 **首页**: 显示即将举行的慈善活动
- 🔍 **搜索**: 按日期、地点、分类搜索活动
- 📝 **活动详情**: 查看活动详细信息并注册参与
- 👤 **用户系统**: 登录/注册功能
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
   或者双击 `start-client.bat`

3. **访问应用**:
   打开浏览器访问 `http://localhost:3001`

## API 依赖

确保后端 API 服务器在 `http://localhost:3000` 上运行。

## 主要组件

### 控制器 (Controllers)
- `HomeController`: 首页控制器
- `SearchController`: 搜索页面控制器
- `EventController`: 活动详情控制器
- `LoginController`: 登录控制器
- `RegisterController`: 注册控制器

### 服务 (Services)
- `ApiService`: API 调用服务
- `AuthService`: 用户认证服务

### 过滤器 (Filters)
- `formatDate`: 日期格式化
- `currency`: 货币格式化

## 路由配置

- `/` - 首页
- `/search` - 搜索页面
- `/event/:id` - 活动详情页面
- `/login` - 登录页面
- `/register` - 注册页面

## 开发说明

这是一个单页应用程序 (SPA)，所有页面都通过 AngularJS 路由动态加载。用户状态通过 localStorage 进行管理。

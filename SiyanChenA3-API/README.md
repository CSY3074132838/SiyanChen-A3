# Charity Hub - AngularJS API 服务器

这是为AngularJS应用提供数据支持的API服务器。

## 功能特性

- 🌐 **RESTful API**: 提供完整的REST API接口
- 📊 **数据库支持**: MySQL数据库集成
- 🔒 **CORS支持**: 跨域请求支持
- 📝 **活动管理**: 活动的增删改查
- 👥 **注册管理**: 用户注册功能
- 🏷️ **分类管理**: 活动分类支持

## 技术栈

- **后端框架**: Express.js
- **数据库**: MySQL
- **ORM**: mysql2
- **中间件**: CORS, dotenv
- **开发工具**: nodemon

## 安装和运行

1. **安装依赖**:
   ```bash
   npm install
   ```

2. **配置数据库**:
   - 确保MySQL服务运行
   - 导入 `sql/charityevents_db.sql` 文件
   - 配置 `.env` 文件中的数据库连接信息

3. **启动服务器**:
   ```bash
   npm start
   ```
   或者双击 `start-api.bat`

4. **访问API**:
   API服务器运行在 `http://localhost:3000`

## API 端点

### 活动相关
- `GET /api/events` - 获取所有活动
- `GET /api/events/search` - 搜索活动
- `GET /api/events/:id` - 获取单个活动
- `POST /api/events` - 创建活动
- `PUT /api/events/:id` - 更新活动
- `DELETE /api/events/:id` - 删除活动

### 分类相关
- `GET /api/categories` - 获取所有分类

### 注册相关
- `POST /api/registrations` - 创建注册记录

## 数据库配置

确保在 `.env` 文件中配置以下环境变量：

```env
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=charityevents_db
PORT=3000
```

## 开发说明

这是为AngularJS客户端和管理端提供数据支持的API服务器，保持与原有API的兼容性。

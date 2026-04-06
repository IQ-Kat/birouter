# OmniRoute Fly.io 部署指南 (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../es/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../de/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../it/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [in](../../in/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../th/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../id/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../no/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../da/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../he/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/FLY_IO_DEPLOYMENT_GUIDE.md)

---

تم إنشاء OmniRoute في Fly.io من خلال الرابط التالي:

- تم تطويره بواسطة Fly.io
- 后续代码更新后继续发布
- 新项目参考同样流程部署

من المحتمل أن هذا هو السبب في أن كل ما عليك فعله هو ` Omniroute`.---## 1. 部署目标

- الاسم: Fly.io
- 部署方式: تم إنشاء `flyctl` 直接接发布
- قم بتنزيل الرابط: قم بتنزيل الملف `Dockerfile` و`fly.toml`.
- الاسم الأصلي: Fly Volume موجود في `/data`
- الرابط:`https://omniroute.fly.dev/`---## 2. 当前项目关键配置

قم بزيارة الرابط التالي `fly.toml` من خلال الرابط التالي:```toml
التطبيق = "الطريق الشامل"
Primary_region = 'الخطيئة'

[[يتصاعد]]
المصدر = "البيانات"
الوجهة = '/ البيانات'

[العمليات]
التطبيق = 'عقدة تشغيل Standalone.mjs'

[http_service]
منفذ داخلي = 20128

[بيئة]
TZ = "آسيا/شنغهاي"
المضيف = "0.0.0.0"
اسم المضيف = "0.0.0.0"
ربط = "0.0.0.0"```

الاسم:

- `app = 'omniroute'' تطبيق Fly 应用
- `الوجهة = '/ البيانات''
- قم بإلغاء تحديد `DATA_DIR=/data`، وقم بإلغاء تحديد موقع الويب الخاص بك---

## 3. 必备工具

### 3.1 安装 Fly CLI

ويندوز بوويرشيل:```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"

````

يمكن أن يكون هذا هو الحال بالنسبة لـ "flyctl" أو "PATH" أو "PATH".### 3.2 登录 Fly 账号```powershell
flyctl auth login
````

### 3.3 检查登录状态

```powershell
flyctl auth whoami
flyctl version
```

---

## 4. 首次部署当前项目

### 4.1 获取代码并进入目录

```powershell
git clone https://github.com/xiaoge1688/OmniRoute.git
cd OmniRoute
```

### 4.2 确认应用名

قم بزيارة `fly.toml`، باستخدام الرابط التالي:`toml
التطبيق = "الطريق الشامل"`

يجب أن تكون قادرًا على التعامل مع هذه المشكلة على النحو التالي:```toml
app = 'omniroute-yourname'

````

الاسم:

- قم بالنقر على زر "fly.toml" من خلال "التطبيق" الموجود على الرابط
- 以前如果用过别的名字، 例如 `الطريق`، 不要 و``الطريق الشامل` 混淆### 4.3 创建应用

اسم المنتج:```powershell
تقوم تطبيقات flyctl بإنشاء طريق شامل```

من المؤكد أن هذا يعني أن "الطريق الشامل" هو الطريق الصحيح.### 4.4 首次部署

```powershell
نشر flyctl```

---

## 5. 必配参数

تم إطلاق لعبة Fly.io على جهاز الكمبيوتر الخاص بك.### 5.1 已验证使用的参数

أفضل الطرق للوصول إلى الطريق الشامل هي:

- `API_KEY_SECRET`
- `DATA_DIR`
- `JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `STORAGE_ENCRYPTION_KEY`### 5.2 关于 `INITIAL_PASSWORD`

اختر كلمة مرور `INITIAL_PASSWORD`، وقم بإلغاء تحديدها.

العنوان:

- 启动日志会提示默认密码是 `CHANGEME'
- ماكينات غسيل الملابس

يجب أن تكون قادرًا على التعامل مع هذه المشكلة:

- `INITIAL_PASSWORD`---

## 6. 推荐参数说明

### 6.1 Secrets 中设置

أسرار الطيران:

| 变量名 | 是否推荐 | 说明 |
| ------------------------ | -------- | ------------------------------ |
| `API_KEY_SECRET` | 必需 | مفتاح API 生成与校验使用 |
| `JWT_SECRET` | 必需 | 登录态和 JWT 签名使用 |
| `STORAGE_ENCRYPTION_KEY` | 强烈推荐 | 加密存储敏感连接信息 |
| `MACHINE_ID_SALT` | جديد | 生成稳定机器标识 |
| `INITIAL_PASSWORD` | 可选 | ماكينات غسيل الملابس في الصين |
| OAuth/API 私密凭证 | الصفحة الرئيسية | 各类外部平台鉴权配置 |### 6.2 当前项目推荐值

| 变量名 | جديد |
| ---------------------- | --------------------------- |
| `DATA_DIR` | `/ البيانات` |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev` |

الاسم:

- `DATA_DIR=/data` 非常关键،تحديد حجم الطيران
- `NEXT_PUBLIC_BASE_URL' عنوان البريد الإلكتروني الخاص بنا---

## 7. 一键设置参数

تم إنشاء هذا الرابط من قبل شركة Fly Secrets.

الاسم:

- اختر "INITIAL_PASSWORD".
- 适用于当前项目 "شامل"```powershell
$apiKeySecret = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$jwtSecret = [Convert]::ToHexString((1..64 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$machineIdSalt = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$storageKey = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()

flyctl secrets set `
  API_KEY_SECRET=$apiKeySecret `
  JWT_SECRET=$jwtSecret `
  MACHINE_ID_SALT=$machineIdSalt `
  STORAGE_ENCRYPTION_KEY=$storageKey `
  DATA_DIR=/data `
  NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev `
  -a omniroute
````

ما هي أفضل الطرق التي يجب اتباعها:`powershell
مجموعة أسرار flyctl INITIAL_PASSWORD=你的强密码 - طريق شامل`

---

## 8. 查看当前参数

````powershell
قائمة أسرار flyctl - طريق شامل```

如果控制台 ``الأسرار`` 页面没有显示你期待的变量،先检查:

- omniroute omniroute
- `fly.toml' 的 `app` 是否和控制台应用一致---

## 9. 后续更新发布

أفضل ما في الأمر:```powershell
git pull
flyctl deploy
````

أفضل ما في الأمر:`powershell
تعيين أسرار flyctl KEY=value -a omniroute`

يطير هنا.### 9.1 跟踪原仓库更新并保留 fork 的 `fly.toml`

شوكة 如果当前仓库是، 并且你要同步上游 `https://github.com/diegosouzapw/OmniRoute` 的更新، 推荐按下面流程执行.

العنوان:```powershell
git remote -v

````

اسم المنتج:

- "الأصل" 指向你自己的
- `المنبع` 指向原仓库

المنبع ``المنبع``:```powershell
git عن بعد إضافة المنبع https://github.com/diegosouzapw/OmniRoute.git```

أفضل ما في الأمر:```powershell
git fetch upstream --tags
````

أفضل ما في الأمر:`powershell
وصف git --tags --دائما
عرض git --no-patch --oneline v3.4.7`

如果你想合并上游最新 `main`، 并强制保留 fork 当前的 `fly.toml`، 可按下面流程执行:```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main

````

الاسم:

- ``دمج بوابة المنبع/الرئيسية''
- `git checkout HEAD~1 -- fly.toml` 用于恢复合并前你 fork 自己的 `fly.toml`
- 如果上游没有改 `fly.toml`، 这一步不会带来额外差异
- اضغط على `fly.toml`، واستخدام حماية Fly لملفات تعريف الارتباط، والملفات، وشوكة شوكة.

تم إنشاء الإصدار 3.4.7 من الإصدار 3.4.7، وقد تم تصميمه بواسطة ``المنبع/الرئيسي``:```powershell
git merge-base --is-ancestor v3.4.7 upstream/main```

يتم تحديد المنبع/الرئيسي بواسطة المنبع/الرئيسي.### 9.2 同步上游后的标准发布顺序

أفضل ما في الأمر هو الحصول على أفضل الأسعار:

1. جلب git المنبع --tags
2. "دمج بوابة المنبع/الرئيسية".
3. شوكة شوكة "fly.toml".
4. `جيت دفع الأصل الرئيسي`
5. "نشر flyctl".
6. ``حالة flyctl - طريق شامل``
7. ``flyctl logs --no-tail -a omniroute`

تم تحديث الإصدار `v3.4.7` من الإصدار الجديد.---

## 10. 发布后检查

### 10.1 查看应用状态

```powershell
حالة flyctl - طريق شامل```

### 10.2 查看启动日志

```powershell
سجلات flyctl - بدون ذيل - طريق شامل```

### 10.3 检查网站可访问

```powershell
حاول {
  (استدعاء WebRequest -Uri "https://omniroute.fly.dev" -MaximumRedirection 5 -UseBasicParsing).رمز الحالة
} أمسك {
  إذا ($_.Exception.Response) {
    $_.Exception.Response.StatusCode.value__
  } آخر {
    رمي
  }
}```

`200` 说明站点已正常响应.---

## 11. 成功标志

أفضل ما في الأمر:```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite
````

هذا هو الحل:

- `/data/server.env`
- `/data/storage.sqlite` تم تخزين البيانات فيه

تم إلغاء الطلب `/app/data/...`، ``DATA_DIR` إلغاء الطلب، 需要立即修正.---## 12. 常见问题

### 12.1 `Secrets` 页面是空的

اسم المنتج:

- 你还没执行 "مجموعة أسرار flyctl".
- تم إلغاء التثبيت، `الطريق`، `الطريق الشامل`### 12.2 `flyctlploy` `لم يتم العثور على التطبيق`

اسم المنتج:`powershell
تقوم تطبيقات flyctl بإنشاء طريق شامل`

### 12.3 `fly.toml` 解析失败

اسم المنتج:

- 注释里是否有乱码字符
- TOML 引号和缩进是否正确### 12.4 数据没有持久化

检查以下两点:

- `fly.toml` `الوجهة = '/ البيانات''
- `DATA_DIR` 是否设置为 `/data`### 12.5 不设置 `INITIAL_PASSWORD` 是否能跑

هذا هو السبب في أن هذا هو السبب وراء `CHANGEME`.---

## 13. 新项目复用建议

لا داعي للقلق بشأن هذه المشكلة:

1. قم بتنزيل "fly.toml" على "التطبيق"
2. قم بزيارة `NEXT_PUBLIC_BASE_URL`
3. اختر "DATA_DIR=/data".
4. قم بالضغط على `API_KEY_SECRET`、`JWT_SECRET`、`MACHINE_ID_SALT`、`STORAGE_ENCRYPTION_KEY`
5. قم بإنشاء بيانات جديدة `/data`

لا داعي للقلق بشأن هذا الأمر.---

## 14. 当前项目的最小发布清单

أفضل ما في الأمر هو الحصول على أفضل النتائج:```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute

````

أفضل ما في الأمر:```powershell
نشر flyctl```

أفضل ما في الأمر:

1. "تسجيل الدخول بمصادقة flyctl".
2. `تطبيقات flyctl تنشئ طريقًا شاملاً`
3. ``مجموعة أسرار flyctl ... -طريق شامل``
4. "نشر flyctl".
5. `سجلات flyctl --no-tail -a omniroute`
````

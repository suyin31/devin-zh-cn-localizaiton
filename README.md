# Devin 简体中文补丁

为 Devin Desktop 增补简体中文界面翻译。补丁包含运行时界面翻译和 Devin 内置文字目录翻译，词条集中维护在 `devin-zh-cn-localizer.js`。

> 这是社区维护的非官方项目，与 Cognition 或 Devin 无关。当前安装脚本只针对 Devin Desktop **1.141.2**（commit `1126aba4a596c3bb4c3a3b10f472e10448be1fd8`）做过核对；其他版本会被脚本拒绝，避免误改文件。

## 安装

需要 Windows PowerShell 和 Node.js。先正常退出 Devin，然后在本项目目录运行：

```powershell
.\deploy.ps1 -AppRoot 'X:\Path\To\Devin\resources\app'
```

`AppRoot` 应指向同时包含 `package.json` 和 `product.json` 的 `resources\app` 文件夹。脚本会核对版本和原始文件校验值，再备份并应用补丁；完成后重新打开 Devin。

安装记录和原始文件备份保存在 `%APPDATA%\DevinZhCnLocalization`，不会写入 Git 仓库。

## 更新词条

编辑 `devin-zh-cn-localizer.js` 后运行：

```powershell
.\refresh.ps1
```

如果是在新的 PowerShell 窗口中运行，也可以再次传入 `-AppRoot`。更新后重新打开 Devin，新增词条才会加载。

## 还原

运行：

```powershell
.\restore.ps1
```

脚本会检查安装版本、补丁文件和备份完整性，再恢复原文件。若检测到 Devin 已更新或目标文件被其他程序改动，脚本会停止以保护现有安装。

## 维护词条

词条位于 `devin-zh-cn-localizer.js` 顶部的 `dictionary` 对象。`extract-english-labels.mjs` 可从匹配版本的 Devin 文件中整理常见英文界面文本：

```powershell
node .\extract-english-labels.mjs 'X:\Path\To\Devin\resources\app'
```

翻译时保留变量、快捷键、HTML 标签和格式占位符。聊天内容、代码、终端内容和输入框中的用户文本会跳过。

## 限制

- Devin 更新可能覆盖补丁；请等待兼容版本发布后再重新安装。
- 补丁修改本机安装目录中的前端文件和校验记录。不要在安装过程中更新 Devin。
- Devin 自带的部分原文、扩展提供的文字和服务器返回内容不一定能被本地补丁覆盖。

## License

MIT。详见 [LICENSE](LICENSE)。

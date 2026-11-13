# Devin 简体中文补丁

为 Devin Desktop 增补简体中文界面翻译。补丁包含运行时界面翻译和 Devin 内置文字目录翻译，词条集中维护在 `devin-zh-cn-localizer.js`。

> 这是社区维护的非官方项目，与 Cognition 或 Devin 无关。当前核对的版本为 Devin Desktop **3.12.59**（内部 package 版本 `1.141.2`，commit `0122b42e158c7ca62960222fb9725f087cd9544f`）。版本信息集中在 `supported-build.json`；其他版本会被脚本拒绝，避免误改文件。官方发布记录见 [Devin Desktop releases](https://docs.devin.ai/desktop/releases)。

## 安装

需要 Windows PowerShell 和 Node.js。安装、刷新或还原补丁前，先正常退出目标安装目录中的 Devin。脚本会检查对应的 `Devin.exe` 是否仍在运行；若无法确认进程路径或应用尚未退出，会停止且不改动文件。

在本项目目录运行：

```powershell
.\deploy.ps1 -AppRoot 'X:\Path\To\Devin\resources\app'
```

`AppRoot` 应指向同时包含 `package.json` 和 `product.json` 的 `resources\app` 文件夹。脚本会核对版本和原始文件校验值，再备份并应用补丁；完成后重新打开 Devin。

安装记录和原始文件备份保存在 `%APPDATA%\DevinZhCnLocalization`，不会写入 Git 仓库。

如果安装目录残留仓库早期版本的完整补丁、但没有安装记录，脚本仅在两份内嵌词库和校验值都匹配已知旧版时自动替换，并把还原后的原始文件存入备份。无法确认的残留或不完整补丁会停止安装，不会覆盖文件。

## 更新后自动恢复（可选）

Devin 自动更新会替换安装目录里的补丁。Windows 用户可在补丁安装成功后运行以下命令，为当前 Windows 用户启用登录后运行的后台监视任务：

```powershell
.\install-auto-restore.ps1 -AppRoot 'X:\Path\To\Devin\resources\app'
```

监视任务会先等版本和待修改文件通过校验并稳定 30 秒，只在项目已核对支持的版本上恢复汉化，并且会等 Devin 正常退出后再改文件；它不会关闭或重启 Devin，也不会联网下载代码。Devin 的更新器仍会先覆盖安装目录里的本地补丁，因此若更新后应用立即自动重启，第一次启动可能暂时显示英文；监视任务会等你正常退出后补回汉化，之后再次打开就会恢复中文。尚未核对的版本会保持原样。

项目支持新版本后，请从更新后的项目目录重新运行上面的命令，刷新本机监视任务所用的词条和版本信息。查看记录可打开 `%APPDATA%\DevinZhCnLocalization\auto-restore\auto-restore.log`。如需关闭该功能，运行：

```powershell
.\remove-auto-restore.ps1
```

移除监视任务不会还原或删除已安装的汉化补丁及备份。

## 更新词条

编辑 `devin-zh-cn-localizer.js`，确认 Devin 已退出后运行：

```powershell
.\refresh.ps1
```

如果是在新的 PowerShell 窗口中运行，也可以再次传入 `-AppRoot`。更新后重新打开 Devin，新增词条才会加载。

## 还原

确认 Devin 已退出后运行：

```powershell
.\restore.ps1
```

脚本会检查安装版本、补丁文件和备份完整性，再恢复原文件。若检测到 Devin 已更新或目标文件被其他程序改动，脚本会停止以保护现有安装。

## 维护词条

词条位于 `devin-zh-cn-localizer.js` 顶部的 `dictionary` 对象。`extract-english-labels.mjs` 会从匹配版本中整理默认英文界面文本，并排除程序内置的其他语言目录：

```powershell
node .\extract-english-labels.mjs 'X:\Path\To\Devin\resources\app'
```

要列出词典和通用规则尚未覆盖的候选文案（最多显示 500 条），加上 `--missing`：

```powershell
node .\extract-english-labels.mjs 'X:\Path\To\Devin\resources\app' --missing
```

候选结果仍需人工筛选；产品名称、资源名称和由界面动态生成的文字不一定需要添加固定词条。

翻译时保留变量、快捷键、HTML 标签和格式占位符。聊天内容、代码、终端内容和输入框中的用户文本会跳过。

## 反馈与翻译建议

请在 GitHub 的 [Issues](https://github.com/suyin31/devin-zh-cn-localizaiton/issues) 新建反馈；也可以在对应 Issue 下补充评论。翻译建议请附 Devin Desktop 版本、所在页面、英文原文、当前显示内容和期望译文。兼容性问题请附报错全文和复现步骤。截图请先遮住账号信息、文件路径、令牌等隐私内容。

## 限制

- Devin 自动更新会替换本地文件，因此补丁需要在更新后重新应用。可手动重新运行安装脚本，也可按上文启用可选的自动恢复任务。两种方式都只修改经过核对且与项目版本匹配的 Devin 安装。
- 补丁修改本机安装目录中的前端文件和校验记录。不要在安装过程中更新 Devin。
- Devin 自带的部分原文、扩展提供的文字和服务器返回内容不一定能被本地补丁覆盖。

## License

MIT。详见 [LICENSE](LICENSE)。

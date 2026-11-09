/* DEVIN ZH CN LOCALIZER V2 */
(function () {
  "use strict";
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.__devinZhCnInstalled) return;
  window.__devinZhCnInstalled = true;

  const dictionary = Object.freeze({
    "File": "文件", "Edit": "编辑", "Selection": "选择", "View": "视图", "Go": "转到",
    "Run": "运行", "Terminal": "终端", "Window": "窗口", "Help": "帮助",
    "Preferences": "首选项", "Settings": "设置", "Services": "服务",
    "Automations": "自动化", "Customizations": "自定义", "Security": "安全", "Home": "首页",
    "New": "新建", "New File": "新建文件", "New Window": "新建窗口", "Open": "打开",
    "Open File...": "打开文件...", "Open Folder...": "打开文件夹...", "Open Workspace...": "打开工作区...",
    "Save": "保存", "Save As...": "另存为...", "Save All": "全部保存", "Close": "关闭",
    "Close Editor": "关闭编辑器", "Close Window": "关闭窗口", "Exit": "退出", "Quit": "退出",
    "Undo": "撤销", "Redo": "重做", "Cut": "剪切", "Copy": "复制", "Paste": "粘贴",
    "Find": "查找", "Replace": "替换", "Select All": "全选", "Zoom In": "放大",
    "Zoom Out": "缩小", "Reset Zoom": "重置缩放", "Command Palette": "命令面板",
    "Configure Display Language": "配置显示语言", "Explorer": "资源管理器", "Search": "搜索",
    "Source Control": "源代码管理", "Run and Debug": "运行和调试", "Extensions": "扩展",
    "Problems": "问题", "Output": "输出", "Debug Console": "调试控制台", "New Terminal": "新建终端",
    "Split Terminal": "拆分终端", "Welcome": "欢迎", "About": "关于", "Toggle Sidebar": "切换侧边栏",
    "Skip to main content": "跳转到主要内容", "Back": "返回", "Forward": "前进",
    "Hide tab": "隐藏标签页", "Hide Tab": "隐藏标签页", "Notifications": "通知", "Notification": "通知",
    "Search sessions": "搜索会话", "Search...": "搜索...", "Search…": "搜索…",
    "Session": "会话", "Sessions": "会话", "New session": "新建会话", "New Session": "新建会话",
    "New conversation": "新建对话", "New Conversation": "新建对话",
    "Start a new conversation": "开始新对话", "Recent": "最近", "Recent sessions": "最近会话",
    "Recent workspaces": "最近工作区", "Inactive": "未激活", "Active": "已激活",
    "Review": "审查", "Review changes": "审查更改", "Wiki": "Wiki", "Properties": "属性",
    "More": "更多", "More actions": "更多操作", "Code": "代码", "Cloud": "云端", "Local": "本地",
    "Agent": "代理", "Agents": "代理", "Normal": "普通", "Switch mode": "切换模式",
    "Commands and skills": "命令与技能", "Configuration": "配置", "Attach or mention": "添加附件或提及",
    "Attach or Mention": "添加附件或提及", "Record voice prompt": "录制语音提示",
    "Start voice call": "开始语音通话", "More send options": "更多发送选项", "Send": "发送",
    "Prompt": "提示", "Message Devin": "给 Devin 发送消息", "Send a message": "发送消息",
    "Send message": "发送消息", "Stop": "停止", "Cancel": "取消", "Apply": "应用", "Accept": "接受",
    "Reject": "拒绝", "Delete": "删除", "Rename": "重命名", "Archive": "归档", "Restore": "恢复",
    "Create": "创建", "Next": "下一步", "Previous": "上一步", "Done": "完成", "Clear": "清除",
    "Refresh": "刷新", "Filter": "筛选", "Sort": "排序", "Account": "账户", "Billing": "账单",
    "Plan": "套餐", "Model": "模型", "Select a model": "选择模型", "Choose a model": "选择模型",
    "Task": "任务", "Tasks": "任务", "Conversation": "对话", "Browser": "浏览器", "Preview": "预览",
    "Artifacts": "成果", "Memory": "记忆", "Skills": "技能", "Rules": "规则", "Knowledge": "知识库",
    "Integrations": "集成", "Computer Use": "电脑操控", "Explore plans": "查看套餐",
    "You ran out of free credits. Please subscribe to continue using Devin": "免费额度已用完。订阅后即可继续使用 Devin",
    "Tip: Change Devin's model and capabilities": "提示：更改 Devin 的模型和功能",
    "Change Devin's model and capabilities": "更改 Devin 的模型和功能",
    "Loading...": "正在加载...", "Loading…": "正在加载…", "Working...": "正在处理...",
    "Working…": "正在处理…", "Thinking...": "正在思考...", "Thinking…": "正在思考…",
    "Completed": "已完成", "Running": "运行中", "Pending": "等待中", "Failed": "失败",
    "Error": "错误", "Success": "成功", "Saved": "已保存", "Copied": "已复制",
    "No results": "没有结果", "No results found": "没有找到结果",
    "Dismiss notification": "关闭通知", "Dismiss Notification": "关闭通知",
    "Devin installation appears to be corrupt. Please reinstall.": "Devin 安装似乎损坏。请重新安装。",
    "Your Devin installation appears to be corrupt. Please reinstall.": "Devin 安装似乎损坏。请重新安装。",
    "You ran out of free credits.": "免费额度已用完。",
    "Please subscribe to continue using Devin": "订阅后即可继续使用 Devin",
    "Log in": "登录", "Sign in": "登录", "Sign out": "退出登录",
    "Welcome to Devin": "欢迎使用 Devin", "Welcome back": "欢迎回来",
    "Open in editor": "在编辑器中打开", "Open in browser": "在浏览器中打开",
    "Copy link": "复制链接", "Copy Link": "复制链接", "Open settings": "打开设置",
    "Open Settings": "打开设置", "Open Keyboard Shortcuts": "打开键盘快捷方式",
    "General": "常规", "Appearance": "外观", "Display": "显示", "Language": "语言",
    "Display language": "显示语言", "Notifications settings": "通知设置", "Theme": "主题",
    "Light": "浅色", "Dark": "深色", "On": "开启", "Off": "关闭", "Enabled": "已启用",
    "Disabled": "已禁用", "Organization": "组织", "Members": "成员", "Help center": "帮助中心",
    "Keyboard shortcuts": "键盘快捷键", "Upgrade": "升级", "Upgrade plan": "升级套餐",
    "Subscribe": "订阅", "View plans": "查看套餐", "Learn more": "了解更多",
    "Open documentation": "打开文档", "What's new": "更新内容", "Changelog": "更新日志",
    "Feedback": "反馈", "Status": "状态", "All": "全部", "Today": "今天", "Yesterday": "昨天",
    "This week": "本周", "This month": "本月", "Run command": "运行命令",
    "Open command palette": "打开命令面板", "Select a workspace": "选择工作区",
    "Choose a workspace": "选择工作区", "Open workspace": "打开工作区", "Open folder": "打开文件夹",
    "New workspace": "新建工作区", "Create workspace": "创建工作区", "Workspace": "工作区",
    "Workspaces": "工作区", "No workspaces yet": "还没有工作区", "No sessions yet": "还没有会话",
    "View all": "查看全部", "Show more": "显示更多", "Show less": "收起", "Expand": "展开",
    "Collapse": "折叠", "Minimize": "最小化", "Maximize": "最大化",
    "Restore Down": "向下还原", "Close window": "关闭窗口", "Close Window": "关闭窗口",
    "Try again": "重试", "More actions": "更多操作", "Load more": "加载更多",
    "Learn more": "了解更多", "Ask Devin": "询问 Devin", "Pull request": "拉取请求",
    "Pull requests": "拉取请求", "Client ID": "客户端 ID", "Client secret": "客户端密钥",
    "In progress": "进行中", "Service user": "服务用户", "Service users": "服务用户",
    "View session": "查看会话", "Save changes": "保存更改", "Can share": "可共享",
    "Can use": "可使用", "Can configure": "可配置", "Can edit": "可编辑",
    "Can view": "可查看", "Can manage": "可管理", "No tags found": "未找到标签",
    "All organizations": "所有组织", "Something went wrong": "出了点问题", "Clear all": "全部清除",
    "Add target": "添加目标", "Search repositories": "搜索代码仓库", "No repositories found": "未找到代码仓库",
    "No repositories available": "暂无可用代码仓库", "Open session": "打开会话", "Not connected": "未连接",
    "All repositories": "所有代码仓库", "No data available": "暂无数据", "Search organizations...": "搜索组织...",
    "Not set": "未设置", "Show all": "显示全部", "No limit": "不限", "Created by": "创建者",
    "Clear search": "清空搜索", "Direct messages": "私信", "Reset to default": "恢复默认值",
    "Select a repository": "选择代码仓库", "No access": "无权访问", "Sort by": "排序方式",
    "Run again": "再次运行", "New folder": "新建文件夹", "No findings": "未发现问题",
    "Link copied": "链接已复制", "Get started": "开始使用", "All sessions": "所有会话",
    "Previous cycle": "上个周期", "Current cycle": "本周期", "Add connection": "添加连接",
    "Clear filters": "清除筛选条件", "Drag to reorder": "拖动以重新排序", "Needs attention": "需要关注",
    "Discard changes": "放弃更改", "Start session": "开始会话", "Monthly ACU limit": "月度 ACU 限额",
    "Select an organization": "选择组织", "Repository permissions": "代码仓库权限",
    "Discard unsaved changes?": "要放弃未保存的更改吗？", "Open PR": "打开 PR", "View PR": "查看 PR",
    "Last run": "上次运行", "Copy URL": "复制 URL", "Needs you": "需要你处理", "ACU usage": "ACU 用量",
    "Code scan": "代码扫描", "Code scans": "代码扫描", "Agent mode": "代理模式", "Created at": "创建时间",
    "No matches": "没有匹配项", "Merged PRs": "已合并的 PR", "PRs merged": "已合并的 PR",
    "Start scan": "开始扫描", "Lead model": "主模型", "Close panel": "关闭面板", "Not started": "尚未开始",
    "Group chats": "群聊", "Smart diffs": "智能差异", "All statuses": "所有状态", "Display name": "显示名称",
    "Search tags…": "搜索标签…", "Search tags...": "搜索标签...", "Select option": "选择选项",
    "All resources": "所有资源", "No output yet": "暂无输出", "No users found": "未找到用户",
    "No targets yet": "暂无目标", "Clear selection": "清除选择", "Merge conflicts": "合并冲突",
    "Secret scanning": "密钥扫描", "Security profile": "安全配置", "Devin users only": "仅限 Devin 用户",
    "Copy webhook URL": "复制 Webhook URL", "Chat completions": "聊天补全", "No sessions found": "未找到会话",
    "No organizations found.": "未找到组织。", "No results found.": "未找到结果。",
    "No repositories found matching your search.": "没有找到符合搜索条件的代码仓库。",
    "Something went wrong. Please try again.": "出了点问题，请重试。",
    "Please try again.": "请重试。", "just now": "刚刚", "Just now": "刚刚",
    "Session navigation": "会话导航", "Notifications alt+T": "通知 alt+T",
    "Tip: Change Devin's model and capabilities (": "提示：更改 Devin 的模型和功能（",
    "Search organizations…": "搜索组织…", "Search repositories…": "搜索代码仓库…",
    "Search sessions…": "搜索会话…", "Search tags…": "搜索标签…", "Search users…": "搜索用户…",
    "View all sessions": "查看所有会话", "Manage access": "管理访问权限", "All resources": "所有资源",
    "No sessions have used this skill yet": "还没有会话使用此技能", "No versions found": "未找到版本",
    "No repositories match your search.": "没有代码仓库符合搜索条件。", "No organizations found": "未找到组织",
    "No results found": "未找到结果", "No data": "暂无数据", "No activity yet": "暂无活动",
    "Save and continue": "保存并继续", "Continue": "继续", "Go back": "返回", "Go to Devin": "前往 Devin",
    "Search pages": "搜索页面", "Create page": "创建页面", "Create automation": "创建自动化",
    "Run now": "立即运行", "Next run": "下次运行", "Last fetched": "上次获取",
    "Connect GitHub": "连接 GitHub", "Git connections": "Git 连接", "All sessions": "所有会话",
    "Cloud sessions": "云端会话", "Local sessions": "本地会话", "Download CSV": "下载 CSV",
    "Export CSV": "导出 CSV", "Copy command": "复制命令", "Custom reviewers": "自定义审查者",
    "No items found": "未找到项目", "No matching results": "没有匹配结果", "No activity": "暂无活动",
    "Add link": "添加链接", "Add member": "添加成员", "Invite member": "邀请成员", "Pending verification": "等待验证",
    "Awaiting response": "等待回复", "Approval required": "需要批准", "Needs approval": "需要批准",
    "View details": "查看详情", "Hide details": "隐藏详情", "Open settings": "打开设置",
    "Edit settings": "编辑设置", "Delete permanently": "永久删除", "Are you sure?": "确定吗？",
    "Create new": "新建", "Select none": "全不选", "By day": "按天", "By week": "按周",
    "Got it": "知道了", "Not now": "暂不", "No tags": "无标签", "API key": "API 密钥",
    "Add team": "添加团队", "Can open": "可打开", "Base URL": "基础 URL", "Add rule": "添加规则",
    "Turn off": "关闭", "New rule": "新建规则", "Group by": "分组依据", "Open file": "打开文件",
    "Read only": "只读", "Set trust": "设置信任", "Last week": "上周", "Repeat on": "重复日期",
    "Every day": "每天", "Review PR": "审查 PR", "Read more": "阅读更多", "Mark read": "标记为已读",
    "Add stage": "添加阶段", "Custom URL": "自定义 URL", "Cloud only": "仅限云端",
    "Revoke all": "全部撤销", "Go to file": "转到文件", "MCP server": "MCP 服务器",
    "Applies to": "适用于", "Next event": "下一个事件", "Check again": "再次检查",
    "Copy output": "复制输出", "Copy secret": "复制密钥", "No channels": "没有频道",
    "Spend limit": "支出上限", "Already connected": "已连接", "Close pull request": "关闭拉取请求",
    "Monthly spend limit": "月度支出上限", "Add a target domain": "添加目标域名",
    "Organization default": "组织默认值", "Revoke authorization": "撤销授权",
    "Launch red-team scan": "启动红队扫描", "Verify authorization": "验证授权",
    "Open in Devin Desktop": "在 Devin 桌面版中打开", "Environment variables": "环境变量",
    "Authorization: Bearer": "授权：Bearer", "Authorization evidence": "授权证明",
    "Red-team scan started.": "红队扫描已开始。", "Couldn't load targets.": "无法加载目标。",
    "Couldn't add the target.": "无法添加目标。", "Couldn't launch the scan.": "无法启动扫描。",
    "Couldn't update the target.": "无法更新目标。", "Search for a user or group": "搜索用户或群组",
    "Failed to update the setting. Please try again.": "设置更新失败，请重试。",
    "Additional in-scope hosts (optional)": "其他授权范围内的主机（可选）",
    "The host to pentest. Only this exact host is in scope, not its subdomains.": "渗透测试目标主机。范围仅限此主机，不包括其子域名。",
    "Add a live domain to pentest. A Devin employee must verify authorization before a scan can run.": "添加要进行渗透测试的有效域名。扫描开始前，Devin 员工必须先验证授权。",
    "Only Devin staff can verify targets.": "仅 Devin 员工可以验证目标。",
    "e.g. signed authorization from the domain owner, ticket link": "例如域名所有者签署的授权文件或工单链接",
    "Back to app": "返回应用", "Back to organization": "返回组织", "Search settings...": "搜索设置...",
    "Personal": "个人", "Connections": "连接", "My Analytics": "我的分析", "App settings": "应用设置",
    "Plans": "套餐", "Invoices": "发票", "Usage & Limits": "用量与限制", "Devin Desktop": "Devin 桌面版",
    "Environment": "环境", "Secrets": "密钥", "Repositories": "代码仓库", "Membership": "成员资格",
    "Analytics": "分析", "Schedules": "日程", "DeepWiki": "DeepWiki", "Devin sessions": "Devin 会话",
    "Organization preferences and settings for Devin sessions": "Devin 会话的组织偏好设置",
    "Configure Devin's behavior in sessions": "配置 Devin 在会话中的行为",
    "Enable native deployments": "启用原生部署",
    "Allow Devin to deploy to the public internet with its built-in deployment tools": "允许 Devin 使用内置部署工具部署到公网",
    "Let Devin keep personal notes for each member across sessions": "允许 Devin 在各会话之间为每位成员保留个人备注",
    "Agent computer use": "代理电脑操作",
    "Let Devin use mouse, keyboard, and screen tools. When disabled, Devin uses browser tools instead. The Computer tab remains available either way.": "允许 Devin 使用鼠标、键盘和屏幕工具。关闭后，Devin 将改用浏览器工具。“计算机”选项卡仍会保留。",
    "Local Hands": "本地操控",
    "Let Devin request access to run tools on a user's own machine through": "允许 Devin 请求在用户自己的电脑上运行工具，使用以下命令：",
    "Each connection needs the user's approval. Not available when native deployments are off or the session uses a security profile.": "每个连接都需要用户批准。关闭原生部署或会话使用安全配置时，此功能不可用。",
    "SSH access": "SSH 访问", "How users may SSH into session machines": "用户通过 SSH 访问会话机器的方式",
    "SSH keys": "SSH 密钥", "Session agents": "会话代理", "Choose which agents are used in sessions": "选择会话中使用的代理",
    "Default agent": "默认代理", "Default agent for all new sessions in your organization": "组织内所有新会话的默认代理",
    "API default agent": "API 默认代理", "Default agent for API sessions in your organization": "组织内 API 会话的默认代理",
    "Use org default": "使用组织默认设置", "Default platform": "默认平台",
    "Default platform or outpost for all new sessions in your organization": "组织内所有新会话的默认平台或运行节点",
    "Commands": "命令", "Custom commands for the chat input. Type / to see available commands": "聊天输入框的自定义命令。输入 / 查看可用命令",
    "Manage commands": "管理命令", "Add Command": "添加命令", "No commands configured": "尚未配置命令",
    "Usage limits": "用量限制", "Set limits for session creation and usage": "设置会话创建数量和用量限制",
    "Batch limit": "批次上限", "Maximum sessions Devin can create per batch (1–500)": "Devin 每批最多可创建的会话数（1–500）",
    "Message usage limit": "单条消息用量上限",
    "Asks for permission to continue when reached. Changes apply to new sessions only, not sessions already running": "达到上限时会请求继续授权。更改仅对新会话生效，不影响正在运行的会话。",
    "Maximum on-demand usage that Devin can use per message you send": "Devin 每次回复可使用的按需用量上限",
    "How Devin creates, manages, and responds to pull requests": "Devin 创建、管理和回复拉取请求的方式",
    "Share prompts in PRs": "在 PR 中分享提示词", "Include the original prompt in PR descriptions": "在 PR 描述中包含原始提示词",
    "Require @Devin to respond": "必须 @Devin 才会回复", "Only respond to PR comments that directly mention @Devin": "仅回复明确提及 @Devin 的 PR 评论",
    "Require session access for PR comments": "PR 评论者必须有会话访问权限",
    "Only forward PR comments from people with access to the session": "仅转发来自有权访问该会话人员的 PR 评论",
    "Allow the gh CLI token to read security data": "允许 gh CLI 令牌读取安全信息",
    "When disabled, the GitHub CLI token in Devin sessions cannot read security advisories, code scanning alerts, secret scanning alerts or Dependabot alerts": "关闭后，Devin 会话中的 GitHub CLI 令牌将无法读取安全公告、代码扫描警报、密钥扫描警报或 Dependabot 警报。",
    "Auto-add reviewer": "自动添加审查者", "Add the session creator as a reviewer on Devin's PRs": "将会话创建者添加为 Devin 所创建 PR 的审查者",
    "Open PRs as": "以此身份打开 PR", "Author identity for Devin-created PRs": "Devin 创建 PR 时使用的作者身份",
    "Select how to open pull requests": "选择打开拉取请求的方式",
    "Allow PRs to be opened by session participants": "允许会话参与者打开 PR",
    "When enabled, Devin can open PRs as a human who has contributed to the session.": "启用后，Devin 可以使用参与该会话的成员身份打开 PR。",
    "Responding to bots": "回复机器人", "Devin will respond to comments from these bots": "Devin 将回复以下机器人的评论",
    "Selected only": "仅限所选对象", "Security profiles": "安全配置文件",
    "Reusable security restrictions for sessions": "可在多个会话中重复使用的安全限制",
    "Create profile": "创建配置文件", "Default profile for snapshot builds": "快照构建的默认配置文件",
    "Only the profile's network policy applies to build VMs. Inherits the session default.": "仅此配置文件的网络策略会应用于构建虚拟机，其他设置继承会话默认值。",
    "Inherit default (No profile)": "继承默认值（无配置文件）",
    "No security profiles configured. Create one to get started.": "尚未配置安全配置文件。创建一个以开始使用。",
    "Add": "添加", "Remove": "移除", "Search for bot's GitHub username": "搜索机器人的 GitHub 用户名",
    "Open editor settings": "打开编辑器设置", "General editor preferences open in a separate page": "常规编辑器偏好设置会在单独页面中打开",
    "Marketplace extension gallery service URL": "扩展市场服务 URL", "Base URL for marketplace search results. Restart Devin to use the new marketplace": "扩展市场搜索结果的基础 URL。重启 Devin 后使用新的扩展市场",
    "Available marketplace options": "可用的扩展市场选项", "Marketplace gallery item URL": "扩展市场项目 URL",
    "Base URL on each extension page. Restart Devin to use the new marketplace": "每个扩展页面的基础 URL。重启 Devin 后使用新的扩展市场",
    "Available options": "可用选项", "Search agents...": "搜索代理...", "Set as preferred": "设为首选", "Enable": "启用",
    "Devin AI coding agent via Devin CLI": "通过 Devin CLI 使用的 Devin AI 编程代理",
    "ACP wrapper for Anthropic's Claude": "Anthropic Claude 的 ACP 封装代理",
    "ACP adapter for OpenAI's coding assistant": "OpenAI 编程助手的 ACP 适配器",
    "Agent marketplace with 174+ AI capabilities. Browse, invoke, and pay for agent services settled in USDC on Base L2.": "代理市场提供 174 多种 AI 能力。你可以浏览、调用代理服务，并使用 Base L2 上的 USDC 结算费用。",
    "ACP wrapper for Amp - the frontier coding agent": "前沿编程代理 Amp 的 ACP 封装",
    "Google’s AI coding agent": "Google 的 AI 编程代理", "Augment Code's powerful software agent, backed by industry-leading context engine": "Augment Code 的强大软件代理，由业界领先的上下文引擎提供支持",
    "IBM Bob is your AI-Powered Development Partner": "IBM Bob 是你的 AI 开发伙伴",
    "Autonomous coding agent CLI - capable of creating/editing files, running commands, using the browser, and more": "自主编程代理命令行工具，可创建和编辑文件、运行命令、使用浏览器等",
    "Tencent Cloud's official intelligent coding tool": "腾讯云官方智能编程工具", "Snowflake's Cortex Code coding agent": "Snowflake Cortex Code 编程代理",
    "Co-building with a seasoned Rust partner.": "与你经验丰富的 Rust 搭档共同构建。", "Minimal ACP Native Coding Agent": "轻量级原生 ACP 编程代理",
    "Cursor's coding agent": "Cursor 编程代理", "Batteries-included AI coding and general purpose agent powered by LangChain.": "由 LangChain 驱动、功能齐备的 AI 编程与通用代理。",
    "A coding agent that puts leading models at your command.": "让你直接调用领先模型的编程代理。",
    "Reduces API costs by more than 50%, produces better and faster work. Uses Hash anchored parallel edits, AST manipulation and a whole lot of neat optimizations. Fully Open Source.": "可将 API 成本降低 50% 以上，同时提升质量和速度。采用哈希锚定并行编辑、AST 操作等优化方案，完全开源。",
    "Factory Droid - AI coding agent powered by Factory AI": "Factory AI 驱动的 Factory Droid 编程代理",
    "Code and build agents with comprehensive multi-provider support": "构建和运行代理，全面支持多个服务提供商",
    "Google's official CLI for Gemini": "Google 官方 Gemini 命令行工具", "GitHub's AI pair programmer": "GitHub AI 编程搭档",
    "ACP agent powered by Zhipu AI's GLM Coding Plan models (glm-5.1, glm-5-turbo, glm-4.7, glm-4.5-air). Supports streaming, tool calls, mid-session model switching, image input via Z.AI Coding Plan Vision MCP, and session load/fork/resume with on-disk persistence.": "由智谱 AI GLM Coding Plan 模型（glm-5.1、glm-5-turbo、glm-4.7、glm-4.5-air）驱动的 ACP 代理。支持流式输出、工具调用、会话中切换模型、通过 Z.AI Coding Plan Vision MCP 输入图片，以及会话加载、分叉和恢复并保存到本地磁盘。",
    "xAI's coding agent and CLI": "xAI 编程代理和命令行工具", "Harn runs .harn agent pipelines as a native ACP coding agent over stdio.": "Harn 通过标准输入输出，以原生 ACP 编程代理运行 .harn 代理流程。",
    "AI Coding Agent by JetBrains": "JetBrains AI 编程代理", "Coding agent powered by multi-model orchestration": "由多模型编排驱动的编程代理",
    "Archived by Moonshot AI. Use Kimi Code instead": "Moonshot AI 已归档此工具，请改用 Kimi Code。",
    "Moonshot AI's next-gen coding agent": "Moonshot AI 新一代编程代理", "MiniMax Code is an AI coding agent with Agent Client Protocol support.": "MiniMax Code 是支持 Agent Client Protocol 的 AI 编程代理。",
    "An enhanced AI code assistant built on the Minion framework with rich development tools": "基于 Minion 框架打造的增强型 AI 编程助手，配备丰富的开发工具",
    "Mistral's open-source coding assistant": "Mistral 开源编程助手", "Nova by Compass AI - a fully-fledged software engineer at your command": "Compass AI 推出的 Nova，随时听候调遣的全能软件工程师",
    "ACP adapter for pi coding agent": "pi 编程代理的 ACP 适配器", "Poolside's coding agent": "Poolside 编程代理",
    "AI coding assistant with agentic capabilities": "具备代理能力的 AI 编程助手", "Alibaba's Qwen coding assistant": "阿里巴巴通义千问编程助手",
    "Local-first coding agent. Runs entirely on your machine with optional on-device LLM inference via Onde.": "本地优先的编程代理。完全在你的电脑上运行，也可选择通过 Onde 使用本地大模型推理。",
    "Share terminal activity": "共享终端活动", "Let Devin see commands and output from your integrated terminal.": "允许 Devin 查看集成终端中的命令和输出。",
    "Share user edits": "共享用户编辑", "Let Devin see which files you edit and create in your workspace, and let a Devin Cloud session read unsaved edits when it reads a file on this machine.": "允许 Devin 查看你在工作区中编辑和创建的文件；Devin 云端会话读取本机文件时，也可以读取尚未保存的更改。",
    "Run save actions on agent edits": "代理编辑后运行保存操作", "Run format-on-save and code actions on save (e.g. gofmt) when Devin edits a file.": "Devin 编辑文件时，运行保存时格式化和保存时代码操作（例如 gofmt）。",
    "Agent notifications": "代理通知", "Notify when an agent session finishes or needs your input while in the background": "代理会话在后台完成或需要你提供信息时通知你",
    "Remote agent hosts": "远程代理主机", "Connect to agents on remote machines over SSH.": "通过 SSH 连接远程计算机上的代理。",
    "Connect on startup": "启动时连接", "Connect to saved hosts automatically on startup.": "启动时自动连接已保存的主机。",
    "Auto-continue": "自动继续", "Devin continues past the invocation limit without prompting; otherwise it stops and asks you to continue": "Devin 达到调用上限后会自动继续；否则会暂停并询问你是否继续",
    "Auto-fix lints": "自动修复代码检查问题", "Devin detects lint errors from its own edits and may fix them automatically. May increase tool usage": "Devin 会检测自身编辑产生的代码检查错误，并可能自动修复。这可能增加工具用量。",
    "Enable Fast Context": "启用快速上下文", "Allow Devin's Fast Context agent to retrieve relevant code with SWE-grep": "允许 Devin 快速上下文代理使用 SWE-grep 检索相关代码",
    "Gitignore access": "Gitignore 文件访问权限", "Let Devin view and edit files in .gitignore": "允许 Devin 查看和编辑 .gitignore 文件",
    "These settings only apply to Devin Local and are saved to": "这些设置仅适用于 Devin 本地版，并保存到",
    "Patterns for tools and commands that are always allowed": "始终允许的工具和命令模式", "Add item to chisel.permissions.allow": "添加到 chisel.permissions.allow",
    "Patterns for tools and commands that are always denied": "始终拒绝的工具和命令模式", "Add item to chisel.permissions.deny": "添加到 chisel.permissions.deny",
    "Patterns for tools and commands that require confirmation": "需要确认的工具和命令模式", "Add item to chisel.permissions.ask": "添加到 chisel.permissions.ask",
    "No items": "没有项目", "Import": "导入", "Export": "导出", "Deny": "拒绝", "Ask": "询问",
    "Subagents (Preview)": "子代理（预览）", "Allow the agent to delegate work to subagents. Organization policy takes precedence": "允许代理将工作委派给子代理。组织策略优先。",
    "Configuration file": "配置文件", "Open config.json in editor": "在编辑器中打开 config.json",
    "User interface": "用户界面", "Auto-open edited files": "自动打开已编辑文件", "Open files in the background if Devin creates or edits them": "Devin 创建或编辑文件时，在后台打开这些文件",
    "Show explain problem inlay hint": "显示问题说明内嵌提示", "Show in-line explain problem actions while the cursor is on a line with an error squiggle": "光标位于带错误波浪线的行时，显示行内问题说明操作",
    "Show inlay shortcuts": "显示内嵌快捷操作", "Show in-line shortcut actions while the cursor is on an empty line": "光标位于空行时显示行内快捷操作",
    "Show selection popup": "显示选中文本弹窗", "Show clickable shortcut popup when selecting text": "选中文本时显示可点击的快捷操作弹窗",
    "Scroll to next diff on accept": "接受后滚动到下一处差异", "Automatically scroll to the next diff when accepting the current one": "接受当前差异后自动滚动到下一处差异",
    "Agent diff zones": "代理差异区域", "Show interactive diff zones with accept/reject controls for agent file edits": "显示交互式差异区域，以便接受或拒绝代理对文件的修改",
    "Keep workspace in Agent Command Center": "在代理指挥中心保留工作区", "Show the window's own folders instead of the active session's folders.": "显示当前窗口自己的文件夹，而不是活动会话的文件夹。",
    "Agent Command Center location": "代理指挥中心位置", "Where the Agent Command Center opens.": "代理指挥中心的打开位置。",
    "Current window": "当前窗口", "Devin Tab": "Devin Tab", "Aggression": "主动程度",
    "Controls how proactively Supercomplete suggests edits near your cursor": "控制 Supercomplete 在光标附近主动建议编辑内容的程度",
    "Clipboard context": "剪贴板上下文", "Devin uses your clipboard as context for completions": "Devin 会将剪贴板内容用作补全上下文",
    "Completion mode": "补全模式", "Choose your preferred code completion experience": "选择你偏好的代码补全方式",
    "Supercomplete": "Supercomplete", "Tab to import": "按 Tab 导入", "Add and update imports with a tab keypress": "按 Tab 键添加或更新导入语句",
    "Tab to jump": "按 Tab 跳转", "Predicts your next edit location and jumps there when you press tab": "预测你的下一个编辑位置，并在按 Tab 键时跳转到该处",
    "Shortcuts": "快捷键", "View all Devin shortcuts": "查看所有 Devin 快捷键", "Advanced": "高级",
    "Detect proxy": "检测代理", "Automatically detect a network proxy. Changing this reloads Devin": "自动检测网络代理。更改此选项会重新加载 Devin。",
    "Reduce activity when hidden": "隐藏时降低活动", "Slows Devin down in the background to save CPU and battery": "Devin 在后台时降低活动强度，以节省 CPU 和电量。",
    "Weekly quota used": "每周额度用量", "Your usage of your weekly quota included as part of your full seat": "你已使用的每周额度，包含在完整席位中",
    "Weekly average utilization": "每周平均使用率", "On-demand spend": "按需支出",
    "Your own on-demand spend across Devin Cloud, Desktop, and CLI.": "你在 Devin 云端、桌面版和命令行中的按需支出。",
    "Cycle total": "本周期总计", "No on-demand usage in this period.": "本周期没有按需用量。",
    "Local usage": "本地用量", "Your activity in Devin Desktop and Devin CLI over the last 30 days": "过去 30 天你在 Devin 桌面版和命令行中的活动",
    "Local model usage": "本地模型用量", "Tab acceptances by language": "按语言统计的 Tab 接受次数",
    "Agent lines written": "代理编写的代码行数", "Agent messages sent": "代理发送的消息数",
    "Total web searches": "网页搜索总数", "Total MCP invocations": "MCP 调用总数", "MCP tool calls by the legacy agent": "旧版代理的 MCP 工具调用",
    "Select billing cycle": "选择账单周期", "Weekly quota used": "每周额度用量",
    "Connect your personal accounts to use integrations and MCPs established by your team members.": "连接你的个人账户，以使用团队成员配置的集成和 MCP。",
    "MCPs are now in Customize": "MCP 已移至“自定义”", "Connect your MCPs alongside skills, rules, and hooks across cloud and local using plugins.": "使用插件，在云端和本地将 MCP 与技能、规则和钩子一并连接。",
    "Go to Customize": "前往自定义", "iMessage": "iMessage", "The number or Apple ID you text your Superagents from": "用于向 Superagent 发送短信的电话号码或 Apple ID",
    "Not linked": "未关联", "Link your number from a Superagent's settings": "请在 Superagent 设置中关联你的电话号码",
    "Connect your personal accounts to use team-enabled integrations": "连接你的个人账户，以使用团队启用的集成",
    "Unlink user": "取消关联用户", "Missing an integration?": "找不到需要的集成？", "Integrations": "集成",
    "Choose which notifications reach your inbox, and which of those are also pushed to your devices.": "选择哪些通知显示在收件箱中，以及哪些通知还会推送到你的设备。",
    "Mobile push needs the Devin mobile app, signed in with notifications allowed.": "要接收手机推送，请安装 Devin 移动应用、登录账号并允许通知。",
    "Show the notifications in \"My sessions\"": "显示“我的会话”通知", "Sessions that need you, finish, or can be restarted.": "需要你处理、已完成或可重新启动的会话。",
    "Push \"My sessions\" to mobile": "将“我的会话”通知推送到手机", "My sessions": "我的会话",
    "Show the notifications in \"Usage & billing\"": "显示“用量与账单”通知", "Usage limits, budgets and contract dates.": "用量限制、预算和合同日期。",
    "Push \"Usage & billing\" to mobile": "将“用量与账单”通知推送到手机", "Usage & billing": "用量与账单",
    "Show the notifications in \"Requests & approvals\"": "显示“请求与审批”通知", "Requests waiting on you, and answers to your own requests.": "等待你处理的请求，以及你发起请求后的答复。",
    "Push \"Requests & approvals\" to mobile": "将“请求与审批”通知推送到手机", "Requests & approvals": "请求与审批",
    "Show the notifications in \"Automations & integrations\"": "显示“自动化与集成”通知", "Failed runs, disconnected integrations and disabled webhooks.": "运行失败、集成断开和 Webhook 禁用等通知。",
    "Push \"Automations & integrations\" to mobile": "将“自动化与集成”通知推送到手机", "Automations & integrations": "自动化与集成",
    "Choose which notifications reach your inbox": "选择哪些通知显示在收件箱中", "Mobile": "手机", "Some on": "部分开启",
    "View and customize keyboard shortcuts. Changes are not synced across devices.": "查看和自定义键盘快捷键。更改不会在设备之间同步。",
    "Reset all": "全部重置", "Search shortcuts": "搜索快捷键", "Record keys": "录制按键", "Modified": "已修改",
    "Change shortcut": "更改快捷键", "Add shortcut": "添加快捷键", "Next notification": "下一条通知",
    "Previous notification": "上一条通知", "Previous session": "上一个会话", "Next session": "下一个会话",
    "Find next": "查找下一个", "Find previous": "查找上一个",
    "Composer": "输入框", "Toggle ask mode": "切换提问模式", "Push to talk": "按键讲话", "Capability menu": "功能菜单",
    "Next mode": "下一个模式", "Ask mode menu": "提问模式菜单", "Cloud or local agent": "云端或本地代理",
    "Knowledge suggestions": "知识建议", "Stage quote caption": "暂存引用说明", "Focus chat": "聚焦聊天输入框",
    "Stop Devin": "停止 Devin", "Rename session": "重命名会话", "Archive session": "归档会话",
    "Toggle workspace panel": "切换工作区面板", "Close other tabs": "关闭其他标签页", "Close tab or session pane": "关闭标签页或会话窗格",
    "Next tab": "下一个标签页", "Previous tab": "上一个标签页", "Open add-tab menu": "打开新建标签页菜单",
    "Reopen closed tab": "重新打开已关闭的标签页", "Search workspace": "搜索工作区", "Editor commands": "编辑器命令",
    "Toggle terminal": "切换终端", "Add review mention": "添加审查提及", "Toggle review sidebar": "切换审查侧边栏",
    "New review chat mention": "在审查聊天中提及", "Submit review": "提交审查", "Approve pull request": "批准拉取请求",
    "Request changes": "请求更改", "Merge or queue pull request": "合并或将拉取请求加入队列",
    "Load latest commits or analysis": "加载最新提交或分析", "Digest": "摘要", "Toggle digest agent": "切换摘要代理",
    "Wiki search": "Wiki 搜索", "Focus wiki search": "聚焦 Wiki 搜索", "Wiki settings": "Wiki 设置",
    "Focus settings search": "聚焦设置搜索", "Toggle findings panel": "切换发现项面板", "Code scan findings": "代码扫描发现项",
    "Previous finding": "上一个发现项", "Next finding": "下一个发现项", "Assign finding to Devin": "将发现项分配给 Devin",
    "Dismiss finding": "忽略发现项", "Context map search": "上下文地图搜索", "Design system search": "设计系统搜索",
    "Boards": "看板", "Save ticket": "保存工单", "New ticket": "新建工单", "Assign ticket": "分配工单",
    "Toggle board agent": "切换看板代理", "Go to notifications": "转到通知", "Not assigned": "未分配", "Record": "录制",
    "Manage your personal preferences": "管理你的个人偏好设置", "Profile": "个人资料", "Picture": "头像",
    "Set your profile picture": "设置个人头像", "Change profile picture": "更换头像", "Name": "姓名",
    "Set your display name": "设置显示名称", "Email": "电子邮件", "Your account email": "你的账户邮箱",
    "User ID": "用户 ID", "Your unique user identifier for API usage": "用于 API 的唯一用户标识符",
    "Theme": "主题", "Select your preferred color theme": "选择你偏好的颜色主题", "System": "跟随系统",
    "High contrast mode": "高对比度模式", "Increase color contrast across the app, or follow your operating system setting.": "提高整个应用的颜色对比度，或跟随操作系统设置。",
    "Keep error notifications until dismissed": "错误通知保留到手动关闭", "Error and warning notifications stay on screen until you close them, instead of closing after 10 seconds": "错误和警告通知会一直显示，直到你将其关闭，而不是 10 秒后自动消失",
    "Chat width": "聊天区域宽度", "How wide session messages and the composer can grow.": "会话消息和输入框的最大宽度。",
    "Default": "默认", "Interface font": "界面字体", "Used for messages, menus, and controls": "用于消息、菜单和控件",
    "Interface font size": "界面字体大小", "Base text size in pixels": "基础文字大小（像素）",
    "Decrease font size": "缩小字体", "Increase font size": "放大字体", "Code font": "代码字体",
    "Used for code blocks, diffs, and terminal output": "用于代码块、差异内容和终端输出", "Code font size": "代码字体大小",
    "Text size for code in pixels": "代码文字大小（像素）", "English": "英语", "Chinese": "中文",
    "Select your preferred language for the UI": "选择界面显示语言", "Play sound with notifications": "通知时播放声音",
    "Plays a sound when a session needs your attention": "会话需要你处理时播放提示音",
    "Play sound while an agent is working": "代理工作时播放声音", "Plays a looping sound while an agent is working on a task": "代理执行任务时循环播放提示音",
    "System notifications": "系统通知", "Receive system notifications when a session needs your attention": "会话需要你处理时接收系统通知",
    "Newsletter": "新闻邮件", "Receive product updates and announcements via email": "通过电子邮件接收产品更新和公告",
    "Default agent mode for new sessions you start here": "你从此处启动的新会话的默认代理模式",
    "Git commit author": "Git 提交作者", "Set a git author and committer for Devin's commits": "为 Devin 的提交设置 Git 作者和提交者",
    "Co-authored (you + Devin)": "共同署名（你 + Devin）", "Git commit email": "Git 提交邮箱",
    "Set an email to use for git commits": "设置 Git 提交使用的邮箱", "Select email…": "选择邮箱…",
    "Pull request links open...": "拉取请求链接打开位置...", "Choose where pull requests open by default": "选择拉取请求默认打开的位置",
    "Not set (will ask on first click)": "未设置（首次点击时询问）", "Automatically open Devin links in Devin Desktop when possible": "尽可能在 Devin 桌面版中自动打开 Devin 链接",
    "Open pull requests as drafts": "以草稿形式打开拉取请求", "Devin will always create pull requests as drafts": "Devin 始终以草稿形式创建拉取请求",
    "Pre-approve testing": "预先批准测试", "Devin will test the app without asking for approval first": "Devin 可以不经事先批准直接测试应用",
    "Send shortcut": "发送快捷键", "Choose which keys send a message.": "选择用于发送消息的按键。", "Press": "按下", "to do the opposite": "执行相反操作",
    "Default send behavior": "默认发送行为", "Set how Devin handles follow-up prompts.": "设置 Devin 处理后续提示的方式。",
    "Auto-approve child sessions": "自动批准子会话", "Devin will start child sessions without asking for approval first": "Devin 无需事先询问即可启动子会话",
    "Auto-approve workflows": "自动批准工作流", "Devin will run workflows without asking for approval first": "Devin 无需事先询问即可运行工作流",
    "Auto-approve actions on your behalf": "自动批准代表你执行的操作",
    "Sessions you own can create, edit, and delete automations, knowledge, playbooks, schedules, MCP servers, personal plugins and skills, and other resources you already have permission to manage without asking first, when you asked for or pre-approved the action or it is trivial. Otherwise Devin still asks for approval": "你拥有的会话可以代你创建、编辑和删除自动化、知识库、操作手册、日程、MCP 服务器、个人插件和技能，以及其他你有权管理的资源，无需事先询问；前提是你已提出或预先批准该操作，或该操作十分简单。否则 Devin 仍会征求你的批准。",
    "Review trigger": "审查触发条件", "Choose when Devin reviews PRs you author. Except for manual, reviews are not triggered on draft PRs.": "选择 Devin 何时审查你创建的 PR。除手动触发外，草稿 PR 不会触发审查。",
    "Manual": "手动", "Comment language": "评论语言", "Language Devin Review uses when writing comments on your PRs": "Devin Review 在你的 PR 中发表评论时使用的语言",
    "Keys enrolled here can SSH into your Devin sessions directly, without browser approval.": "在此登记的密钥可直接通过 SSH 连接 Devin 会话，无需在浏览器中批准。",
    "No SSH keys enrolled.": "尚未登记 SSH 密钥。", "Key name": "密钥名称", "Public key": "公钥",
    "Add key": "添加密钥", "Your privacy choices": "你的隐私选项", "Manage": "管理",
    "Overview": "概览", "Findings": "发现项", "Red Teaming": "红队演练",
    "Scans": "扫描", "Scan runs": "扫描记录", "Start a scan": "开始扫描",
    "Your security at a glance": "安全状况一览",
    "Start your first scan to see findings by severity, track fixes, and monitor security trends across your repositories.": "开始首次扫描，即可按严重程度查看安全发现、跟踪修复进度，并监控代码仓库中的安全趋势。",
    "Find vulnerabilities and get fixes ready for review": "发现漏洞并准备修复方案，供你审查",
    "Bring findings from another tool into Devin to triage and fix": "将其他工具发现的问题导入 Devin，进行分类处置并修复",
    "Customize your Devin": "自定义 Devin",
    "Manage the plugins, skills, MCPs, and hooks Devin can use, for you and your org.": "管理你和所在组织可供 Devin 使用的插件、技能、MCP 和钩子。",
    "Install from the marketplace": "从市场安装", "Browse existing plugins and install them into your setup.": "浏览现有插件并将其安装到你的环境中。",
    "Shared across every surface": "所有端通用",
    "Your plugins load in cloud sessions, the Devin CLI, and Devin Desktop.": "你的插件会在云端会话、Devin CLI 和 Devin Desktop 中加载。",
    "Devin can add plugins for you": "Devin 可以为你添加插件",
    "Have Devin make skills, install MCP server, or setup third-party plugins.": "让 Devin 为你创建技能、安装 MCP 服务器或配置第三方插件。",
    "Install": "安装", "Installed": "已安装", "Continue": "继续",
    "Introducing Automations": "自动化功能介绍",
    "Trigger on events or schedules to investigate issues, generate insights, and create pull requests automatically.": "通过事件或定时任务触发 Devin，自动排查问题、生成洞察并创建拉取请求。",
    "Key features": "主要功能", "Event-based triggers": "事件触发器",
    "Automatically run Devin from supported integrations or your own systems using custom webhooks": "通过支持的集成或自定义 Webhook，从你自己的系统自动启动 Devin",
    "Scheduled triggers": "定时触发器", "Have Devin handle workloads on any recurring date or time interval": "让 Devin 按照重复日期或时间间隔处理任务",
    "Preflight checks": "预检查", "Filter matched events with an LLM or a script before a session starts": "在会话启动前，通过大语言模型或脚本筛选匹配的事件",
    "Persistent Memory": "持久记忆", "Use scratchpad to persist state and knowledge across automation runs": "使用便笺在多次自动化运行之间保留状态和知识",
    "Customization": "自定义", "Configure ACU limits, security profiles, MCPs and network policies, and other controls": "配置 ACU 限额、安全配置文件、MCP、网络策略和其他控制项",
    "Maybe later": "以后再说", "Trigger event": "触发事件", "File report": "文件报告",
    "Review any PR URL": "审查任意 PR 链接", "Jump to pull request": "跳转到拉取请求",
    "Paste pull request URL": "粘贴拉取请求链接", "Go to pull request": "转到拉取请求",
    "Create a PR with Devin": "让 Devin 创建 PR", "Submit PR URL": "提交 PR 链接", "or": "或",
    "Devin Review": "Devin 审查", "AI Gateway": "AI 网关", "AI Gateway ACU": "AI 网关 ACU",
    "Code quality": "代码质量", "MCP servers": "MCP 服务器", "Set as default": "设为默认",
    "Search organizations": "搜索组织", "You can't remove your own access": "无法移除你自己的访问权限",
    "No PR": "无 PR", "% change": "变化百分比", "% of total": "占总量的比例",
    "Header name": "请求头名称", "Danger zone": "危险操作", "ACUs per merged PR": "每个已合并 PR 的 ACU 用量",
    "Sign up": "注册", "Webhook URL": "Webhook 地址", "Official MCP": "官方 MCP", "Personal MCP": "个人 MCP",
    "Clear filter": "清除筛选", "Rename folder": "重命名文件夹", "Search groups": "搜索群组",
    "On-demand usage": "按需用量", "Repository prefix": "代码仓库前缀", "Team sync": "团队同步",
    "Add to chat": "添加到聊天", "Mark unread": "标记为未读", "View plugin": "查看插件",
    "Git provider": "Git 服务提供商", "Keep editing": "继续编辑", "Active users": "活跃用户",
    "Last 30 days": "过去 30 天", "Needs review": "需要审查", "Slack thread": "Slack 讨论串",
    "Close search": "关闭搜索", "Repeat every": "每隔", "Billing tags": "账单标签", "Scan profile": "扫描配置",
    "Newest first": "最新优先", "Oldest first": "最早优先", "Deselect all": "取消全选",
    "Session size": "会话规模", "Last updated": "最后更新", "Access token": "访问令牌",
    "Select region": "选择区域", "Delete secret": "删除密钥", "Delete folder": "删除文件夹",
    "None selected": "未选择", "ACUs consumed": "已消耗 ACU", "View sessions": "查看会话",
    "Devin session": "Devin 会话", "Security scan": "安全扫描", "Current limit": "当前上限",
    "Create report": "创建报告", "User messages": "用户消息", "Fix with Devin": "使用 Devin 修复",
    "Awaiting input": "等待输入", "Monthly budget": "月度预算", "Cancel request": "取消请求",
    "Submit request": "提交请求", "No description": "暂无描述", "Ready to merge": "可合并",
    "Channel access": "频道访问权限", "Search members": "搜索成员", "Expand sidebar": "展开侧边栏",
    "Previous event": "上一个事件", "Shared with you": "与你共享", "Enterprise role": "企业角色",
    "Untitled ticket": "无标题工单", "Preflight check": "预检查", "Search channels": "搜索频道",
    "Unsaved changes": "未保存的更改", "View automation": "查看自动化", "Request pending": "请求待处理",
    "Open repository": "打开代码仓库", "No labels found": "未找到标签", "Add a custom MCP": "添加自定义 MCP",
    "Edit description": "编辑描述", "Name is required": "名称为必填项", "ACUs per session": "每个会话的 ACU 用量",
    "Session settings": "会话设置", "Exit full screen": "退出全屏", "Search templates": "搜索模板",
    "Create responder": "创建响应者", "Collapse sidebar": "折叠侧边栏", "Search resources": "搜索资源",
    "Ready for review": "可供审查", "Edit in settings": "在设置中编辑", "Add a description": "添加描述",
    "Copy session link": "复制会话链接", "Start new session": "开始新会话", "No projects found": "未找到项目",
    "Specific channels": "指定频道", "Select repository": "选择代码仓库", "Awaiting approval": "等待批准",
    "Not visible to you": "对你不可见", "Pull request closed": "拉取请求已关闭",
    "ACU cap per session": "单个会话的 ACU 上限", "Remove from sidebar": "从侧边栏移除",
    "Failed to copy link": "复制链接失败", "Search environments": "搜索环境", "GitHub organization": "GitHub 组织",
    "Teams sync disabled": "Teams 同步已禁用", "Authorization header": "授权请求头",
    "Manage service users": "管理服务用户", "Usage quota exceeded": "用量已超出限额",
    "Organization members": "组织成员", "Signing secret saved": "签名密钥已保存", "No organizations yet": "尚无组织",
    "Organization settings": "组织设置", "Total ACU consumption": "ACU 总消耗量", "Devin CLI permissions": "Devin CLI 权限",
    "No repositories found.": "未找到代码仓库。", "Manage personal automations": "管理个人自动化",
    "No results match your search.": "没有匹配的搜索结果。", "Please enter a token to continue": "请输入令牌以继续",
    "Your unsaved changes will be lost.": "未保存的更改将会丢失。", "Enterprise preferences and settings": "企业偏好设置",
    "Your account is on an individual plan": "你的账户使用的是个人套餐",
    "Access inherited from a role or group": "访问权限继承自角色或群组",
    "Increase enterprise organization usage limit": "提高企业组织用量上限",
    "No data available for the selected time range": "所选时间范围内暂无数据",
    "Change in ACUs consumed vs the full last cycle": "与上一个完整周期相比的 ACU 用量变化",
    "This access is inherited and can't be changed here": "此访问权限继承自角色或群组，无法在此更改",
    "Only image files are supported (.png, .jpg, .jpeg, .gif, .webp)": "仅支持图片文件（.png、.jpg、.jpeg、.gif、.webp）",
    "This row's ACUs divided by the total ACUs consumed this billing cycle in this view's scope": "此行 ACU 用量占当前视图范围内本账单周期 ACU 总消耗量的比例"
  });

  const foldedDictionary = Object.create(null);
  for (const [key, value] of Object.entries(dictionary)) {
    const folded = key.toLocaleLowerCase();
    if (Object.prototype.hasOwnProperty.call(foldedDictionary, folded) && foldedDictionary[folded] !== value) {
      foldedDictionary[folded] = null;
    } else if (!Object.prototype.hasOwnProperty.call(foldedDictionary, folded)) {
      foldedDictionary[folded] = value;
    }
  }

  const templates = [
    [/^(\d+)\s+days?\s+ago$/i, function (_, n) { return n + " 天前"; }],
    [/^(\d+)\s+hours?\s+ago$/i, function (_, n) { return n + " 小时前"; }],
    [/^(\d+)\s+minutes?\s+ago$/i, function (_, n) { return n + " 分钟前"; }],
    [/^(\d+)\s+seconds?\s+ago$/i, function (_, n) { return n + " 秒前"; }],
    [/^Notifications\s+(alt\+T)$/i, function (_, shortcut) { return "通知 " + shortcut; }],
    [/^Tip: Change Devin's model and capabilities\s*\(([^)]+)\)$/i, function (_, shortcut) { return "提示：更改 Devin 的模型和功能（" + shortcut + "）"; }],
    [/^(Back|Forward|Toggle Sidebar|Skip to main content)\s*(\([^)]*\))$/i, function (_, label, shortcut) { return (translated(label) || label) + " " + shortcut; }],
    [/^Last fetched:\s*(.+)$/i, function (_, value) { return "上次获取：" + value; }],
    [/^(\d+)\s+of\s+(\d+)\s+items? still need input\.?$/i, function (_, remaining, total) { return `还有 ${remaining} 项需要填写（共 ${total} 项）`; }],
    [/^(\d+)\s+results?$/i, function (_, n) { return n + " 条结果"; }],
    [/^(\d+)\s+repositories$/i, function (_, n) { return n + " 个代码仓库"; }],
    [/^Options for\s+(.+)$/i, function (_, name) { return (translated(name) || name) + " 的选项"; }],
    [/^Change shortcut\s+(.+?)\s+for\s+(.+)$/i, function (_, shortcut, action) { return "更改“" + (translated(action) || action) + "”的快捷键（" + shortcut + "）"; }],
    [/^Remove\s+(.+?)\s+from\s+(.+)$/i, function (_, shortcut, action) { return "移除“" + (translated(action) || action) + "”的快捷键（" + shortcut + "）"; }],
    [/^Published\s+(.+)$/i, function (_, version) { return "已发布 " + version; }],
    [/^Remove\s+(.+)$/i, function (_, item) { return "移除 " + item; }],
    [/^(\d+)\s+sessions?$/i, function (_, n) { return n + " 个会话"; }],
    [/^(\d+)\s+tasks?$/i, function (_, n) { return n + " 个任务"; }]
  ];

  const protectedSelector = [
    "script", "style", "noscript", "kbd", "samp", "var", "pre", "code", "svg", "canvas",
    "input", "textarea", "select", "[contenteditable]:not([contenteditable='false'])",
    "[role='textbox']", "[role='code']", "[role='log']",
    "[data-message-id]", "[data-message-author-role]", "[data-message-content]",
    "[data-testid*='message-content']", "[data-testid*='message-body']",
    "[data-testid*='user-message']", "[data-testid*='assistant-message']",
    "[data-testid*='terminal-output']", "[data-language]", "[data-code]",
    ".monaco-editor", ".xterm", ".xterm-screen", ".terminal-output", ".terminal-content",
    ".diff-editor", ".code-block", ".codeblock", ".hljs", ".shiki", ".prism",
    ".markdown", ".markdown-body", ".markdown-content", ".prose",
    ".chat-message", ".chat-transcript", ".conversation-history",
    ".message-content", ".message-body", ".user-message", ".assistant-message",
    ".file-name", ".filename", ".breadcrumb", ".path-label", ".tab-label",
    "[class*='transcript']", "[class*='messageContent']", "[class*='messageBody']"
  ].join(",");
  const attributeNames = ["aria-label", "aria-description", "title", "placeholder", "data-placeholder", "alt"];
  const observedRoots = new WeakSet();
  const attachedFrames = new WeakSet();

  function isProtected(element) {
    try {
      return !!(element && element.closest && element.closest(protectedSelector));
    } catch (_) {
      return false;
    }
  }

  function translated(value) {
    const trimmed = String(value || "").replace(/\s+/g, " ").trim();
    if (!trimmed) return null;
    if (Object.prototype.hasOwnProperty.call(dictionary, trimmed)) return dictionary[trimmed];
    const folded = trimmed.toLocaleLowerCase();
    if (Object.prototype.hasOwnProperty.call(foldedDictionary, folded) && foldedDictionary[folded]) return foldedDictionary[folded];
    for (const entry of templates) {
      const match = entry[0].exec(trimmed);
      if (match) return entry[1].apply(null, match);
    }
    const punctuation = trimmed.match(/^(.+?)([.!?…]+)$/);
    if (punctuation) {
      const base = translated(punctuation[1]);
      if (base) return base + punctuation[2];
    }
    return null;
  }

  function translateTextNode(node) {
    if (!node || !node.parentElement || isProtected(node.parentElement)) return;
    const original = node.nodeValue || "";
    const value = translated(original);
    if (!value || value === original.trim()) return;
    const leading = (original.match(/^\s*/) || [""])[0];
    const trailing = (original.match(/\s*$/) || [""])[0];
    node.nodeValue = leading + value + trailing;
  }

  function translateAttributes(element) {
    if (!element || element.nodeType !== 1) return;
    for (const name of attributeNames) {
      const original = element.getAttribute(name);
      if (!original) continue;
      const value = translated(original);
      if (value && value !== original) element.setAttribute(name, value);
    }
  }

  function observeRoot(root) {
    if (!root || observedRoots.has(root)) return;
    observedRoots.add(root);
    const target = root.nodeType === 9 ? root.documentElement : root;
    if (!target) return;
    processNode(target);
    const observer = new MutationObserver(function (records) {
      for (const record of records) {
        if (record.type === "characterData") translateTextNode(record.target);
        else if (record.type === "attributes") translateAttributes(record.target);
        else if (record.type === "childList") {
          for (const node of record.addedNodes) processNode(node);
        }
      }
    });
    observer.observe(target, {
      childList: true, subtree: true, characterData: true, attributes: true,
      attributeFilter: attributeNames
    });
  }

  function observeFrame(frame) {
    if (!frame || attachedFrames.has(frame)) return;
    attachedFrames.add(frame);
    const scanFrame = function () {
      try {
        if (frame.contentDocument) observeRoot(frame.contentDocument);
      } catch (_) {}
    };
    frame.addEventListener("load", scanFrame);
    scanFrame();
  }

  function processNode(node) {
    if (!node) return;
    if (node.nodeType === 3) {
      translateTextNode(node);
      return;
    }
    if (node.nodeType === 9 || node.nodeType === 11) {
      for (const child of node.childNodes) processNode(child);
      return;
    }
    if (node.nodeType !== 1) return;
    translateAttributes(node);
    if (!isProtected(node)) {
      for (const child of node.childNodes) processNode(child);
    }
    if (node.shadowRoot) observeRoot(node.shadowRoot);
    if (node.tagName === "IFRAME") observeFrame(node);
  }

  function start() {
    try {
      const proto = Element.prototype;
      const originalAttachShadow = proto.attachShadow;
      if (originalAttachShadow && !originalAttachShadow.__devinZhWrapped) {
        const wrappedAttachShadow = function (init) {
          const root = originalAttachShadow.call(this, init);
          observeRoot(root);
          return root;
        };
        wrappedAttachShadow.__devinZhWrapped = true;
        proto.attachShadow = wrappedAttachShadow;
      }
    } catch (_) {}
    observeRoot(document);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();

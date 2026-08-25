import {localIconLoader} from "vitepress-plugin-group-icons";

const localIcon = (path: string) => localIconLoader(import.meta.url, path).trimStart();

export const customIcon = {

    // ==========================================
    // 1. 编程语言 (已替换为内置)
    // ==========================================
    c: "vscode-icons:file-type-c",           // 原为本地 c.svg
    cpp: "vscode-icons:file-type-cpp",       // 原为本地 cpp.svg
    java: "vscode-icons:file-type-java",
    lua: "vscode-icons:file-type-lua",
    sql: "vscode-icons:file-type-sql",
    css: "vscode-icons:file-type-css",
    h: localIcon("../../../public/iconify/c.svg"), // 内置无 .h，保留本地

    // ==========================================
    // 2. 终端与 Shell (已替换为内置)
    // ==========================================
    shell: "vscode-icons:file-type-shell",   // 原为本地 shell.svg
    sh: "vscode-icons:file-type-shell",      // 原为本地 shell.svg
    bash: "vscode-icons:file-type-gnu",
    cmd: "vscode-icons:file-type-shell",
    winget: "vscode-icons:file-type-shell",
    powershell: "vscode-icons:file-type-powershell",
    fish: localIcon("../../../public/iconify/fish.svg"), // 内置无 fish，保留本地
    "控制台": localIcon("../../../public/iconify/terminal.svg"),

    // ==========================================
    // 3. 构建工具、配置与文档 (已经是内置)
    // ==========================================
    maven: "vscode-icons:file-type-apache",
    gradle: "vscode-icons:file-type-light-gradle",
    git: "vscode-icons:file-type-git",
    docker: "vscode-icons:file-type-docker2",
    dockerfile: "vscode-icons:file-type-docker2",
    toml: "vscode-icons:file-type-toml",
    markdown: "vscode-icons:file-type-markdown",

    // ==========================================
    // 4. 操作系统与发行版 (内置无，保留本地)
    // ==========================================
    almalinux: localIcon("../../../public/iconify/almaLinux.svg"),
    ubuntu: localIcon("../../../public/iconify/ubuntu.svg"),
    linux: localIcon("../../../public/iconify/linux.svg"),
    windows: localIcon("../../../public/iconify/windows.svg"),
    clion64: localIcon("../../../public/iconify/clion.svg"),

    // ==========================================
    // 5. 第三方软件、IDE 与浏览器 (内置无，保留本地)
    // ==========================================
    idea: localIcon("../../../public/iconify/idea.svg"),
    webstorm: localIcon("../../../public/iconify/webstorm.svg"),
    scoop: localIcon("../../../public/iconify/scoop.svg"),
    choco: localIcon("../../../public/iconify/choco.svg"),
    chrome: localIcon("../../../public/iconify/chrome.svg"),
    firefox: localIcon("../../../public/iconify/firefox.svg"),
    edge: localIcon("../../../public/iconify/edge.svg"),
    arthas: localIcon("../../../public/iconify/arthas.svg"),

    // ==========================================
    // 6. 自定义语义化/业务图标 (内置无，保留本地)
    // ==========================================
    cpu: localIcon("../../../public/iconify/cpu.svg"),
    "项目结构": localIcon("../../../public/iconify/architecture.svg"),
    effect: localIcon("../../../public/iconify/effect.svg"),
    "结果": localIcon("../../../public/iconify/effect.svg"),
    faq: localIcon("../../../public/iconify/reply.svg"),
    bytecode: localIcon("../../../public/iconify/bytecode.svg"),
    "字节码指令": localIcon("../../../public/iconify/bytecode.svg"),
    log: localIcon("../../../public/iconify/log.svg"),
    "日志": localIcon("../../../public/iconify/log.svg"),
    "路由器": localIcon("../../../public/iconify/router.svg"),
}

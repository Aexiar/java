import type { HeadConfig } from "vitepress";
import { VITE_BASE_URL } from "./context";

export const head: HeadConfig[] = [
    ["link", { rel: "shortcut icon", href: `${VITE_BASE_URL}logo.svg` }],
    ["link", { rel: "icon", href: `${VITE_BASE_URL}logo.svg`, type: "image/svg+xml" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    ["link", {
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap",
        rel: "stylesheet",
    }],
    ["meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,shrink-to-fit=no",
    }],
    ["meta", {
        name: "keywords",
        content: "为知笔记、云原生、Linux、容器、Kubernetes、DevOps、服务编排",
    }],
    ["meta", { charset: "UTF-8" }],
];

export const siteConfig = {
    rewrites: { "zh/:rest*": ":rest*" },
    metaChunk: true,
    lang: "zh-CN",
    title: "为知笔记",
    titleTemplate: "Hi，终于等到你",
    description: "为知笔记，系统整理 Linux、容器、Kubernetes、DevOps 与云原生实践",
    head,
    appearance: true,
    base: VITE_BASE_URL,
    lastUpdated: true,
    sitemap: { hostname: `https://java.weiweixu.cn${VITE_BASE_URL}` },
};


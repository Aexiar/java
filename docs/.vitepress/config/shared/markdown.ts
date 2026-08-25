import {figure} from "@mdit/plugin-figure";
import {InlineLinkPreviewElementTransform} from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it";
import {componentPreview, containerPreview} from "@vitepress-demo-preview/plugin";
import path from "node:path";
import type MarkdownIt from "markdown-it";
import multimdTable from "markdown-it-multimd-table";
// @ts-ignore package does not publish declarations
import markdownItTaskCheckbox from "markdown-it-task-checkbox";
import timeline from "vitepress-markdown-timeline";
import {vitepressDemoPlugin} from "vitepress-demo-plugin";
import {groupIconMdPlugin} from "vitepress-plugin-group-icons";
import vitepressPluginLegend from "vitepress-plugin-legend";
import {customMarkdownPlugin} from "../../theme/plugins/markdown-it-custom-plugin";
import {demoAlias} from "./context";

export async function configureMarkdown(md: MarkdownIt): Promise<void> {
    md.use(containerPreview, { clientOnly: true, alias: demoAlias });
    md.use(componentPreview, { clientOnly: true, alias: demoAlias });
    md.use(multimdTable, {
        multiline: true,
        rowspan: true,
        headerless: true,
        multibody: true,
        autolabel: true,
    });
    vitepressPluginLegend(md, {
        markmap: { showToolbar: true },
        mermaid: { showToolbar: true },
    });
    md.use(customMarkdownPlugin);
    md.use(timeline);
    md.use(groupIconMdPlugin);
    md.use(InlineLinkPreviewElementTransform);
    md.use(figure, { figcaption: "alt", copyAttrs: "^class$", lazy: true });
    md.use(markdownItTaskCheckbox);
    md.use(vitepressDemoPlugin, {
        demoDir: path.resolve(__dirname, "../../demos"),
    });
}

export const markdownConfig = {
    math: true,
    lineNumbers: true,
    image: { lazyLoading: true },
    // VitePress's attrs plugin recalculates table rowspans and conflicts with
    // markdown-it-multimd-table's `^^` rowspan syntax.
    attrs: { disable: true },
    config: configureMarkdown,
};

import type { Plugin } from "vite";


export function IndexPermalinkCompat(): Plugin {
    return {
        name: "vitepress-index-permalink-compat",

        // 确保在 vitepress-plugin-permalink 后执行
        enforce: "post",

        config(config: any) {
            const permalinks =
                config.vitepress?.site?.themeConfig?.permalinks;

            if (!permalinks?.map) {
                return;
            }

            const map = permalinks.map as Record<string, string>;

            for (const [path, permalink] of Object.entries({...map})) {
                if (path.endsWith("/index")) {
                    const folderPath = path.slice(
                        0,
                        -"/index".length
                    );

                    /*
                     * 原始：
                     *
                     * xxx/index
                     *      ↓
                     * /pages/xxxx
                     *
                     * 增加：
                     *
                     * xxx
                     * xxx/
                     *      ↓
                     * /pages/xxxx
                     */

                    if (!map[folderPath]) {
                        map[folderPath] = permalink;
                    }

                    if (!map[`${folderPath}/`]) {
                        map[`${folderPath}/`] = permalink;
                    }
                }
            }
        },
    };
}
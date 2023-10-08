import { copySVG, checkSVG } from "../assets/icons.js";

export const TOOL_NAME = "copyBlocks";
export const TOOL_ATTR = "m8l-copyBlocks";
export const TOOL_KEYS = {
    content: "content",
    button: "button",
    text: "text",
};
export const STYLES_URL =
    "https://api.github.com/repos/meaningfulteam/m8l-webflow-tools/contents/tools/common/styles/copyBlocks.css";
export const DEFAULT_BRACKETS = "%%cb%%";
export const DEFAULT_STYLES = {
    icon: {
        enable: "m8l-copyBlocks_icon-enable",
        disable: "m8l-copyBlocks_icon-disable",
    },
    block: {
        head: "m8l-copyBlocks_block-head",
        body: "m8l-copyBlocks_block-body",
        wrapper: "m8l-copyBlocks_block-wrapper",
    },
};
export const DEFAULT_ASSETS = {
    copy: copySVG,
    success: checkSVG,
    isDefault: true,
};
export const WAITING_TIME = 1000;

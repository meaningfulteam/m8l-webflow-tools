import { consoleProps, consoleMsg } from "../common/m8l-consoleMsg.js";
import { copySVG, checkSVG } from "../assets/icons.js";

const DEFAULT_STYLE = `.m8l-copyBlocks_blockClass{display: flex;flex-direction: column;border-radius: 1rem;overflow: hidden;}.m8l-copyBlocks_inputClass{border-style: none;color: #c9d1d9;background-color: #161b22;padding: 1rem 01.5rem;font-weight: 400;width: auto;font-family: sans-serif;font-size: 1rem;line-height: 1.5;}.m8l-copyBlocks_iconClass {width: 1.25rem;height: 1.25rem;color: #c9d1d9;padding: 0.25rem;cursor: pointer;border-radius: 0.5rem;}.m8l-copyBlocks_iconClass:hover{background-color: #30363d;}.m8l-copyBlocks_iconClass:active{background-color: #4b5158;}.m8l-copyBlocks_disableClass{width: 1.5rem;height: 1.5rem;}.m8l-copyBlocks_headerClass{display: flex;justify-content: right;   background-color: #0d1117;padding: 0.125rem 0.5rem;}@media screen and (width<=600px) {.m8l-copyBlocks_inputClass {padding: 1rem 1rem;}}`;

const TOOL_NAME = "copyBlocks";
const CB_ATTR = "m8l-copyBlocks";
const BLOCK_BRACKETS = "%%cb%%";
const DEFAULT_STYLES = {
    block: "m8l-copyBlocks_blockClass",
    input: "m8l-copyBlocks_inputClass",
    header: "m8l-copyBlocks_headerClass",
    icon: {
        enableIcon: "m8l-copyBlocks_iconClass",
        disableIcon: "m8l-copyBlocks_disableClass",
    },
};
const DEFAULT_ASSETS = {
    copyAsset: copySVG,
    checkAsset: checkSVG,
};

const copyBlock = ({ id, iconConfig }) => {
    const text = document.getElementById(id + "-text").innerText;
    const input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.value = text;
    input.setAttribute("id", CB_ATTR + "-field");
    let field = document.getElementById(CB_ATTR + "-field");
    input.select();
    navigator.clipboard.writeText(input.value);
    input.remove();
    const icon = document.getElementById(id + "-img");
    if (iconConfig.isDefault) {
        icon.innerHTML = iconConfig.assets.checkAsset;
        setTimeout(() => {
            icon.innerHTML = iconConfig.assets.copyAsset;
        }, 1000);
    } else {
        icon.setAttribute("src", iconConfig.assets.checkAsset);
        setTimeout(() => {
            icon.setAttribute("src", iconConfig.assets.copyAsset);
        }, 1000);
    }
};

const createBlockHtml = ({
    text,
    blockClass,
    headerClass,
    inputClass,
    iconConfig,
    id,
}) => {
    const block = `
    <div class="${blockClass}">
        <div class="${headerClass}">
            <div id="${id}-button" ${CB_ATTR}="button" class="${
        iconConfig.styles.enableIcon
    }">
            ${
                iconConfig.isDefault
                    ? `<div id="${id + "-img"}">${
                          iconConfig.assets.copyAsset
                      }</div>`
                    : `<img id="${id + "-img"}" src="${
                          iconConfig.assets.copyAsset
                      }"/>`
            }     
            </div>
        </div>
        <div id="${id + "-text"}"
             class="${inputClass}">
            ${text}
        </div>
    </div>
    `;
    return block;
};

const putBlocks = ({
    blockClass = DEFAULT_STYLES.block,
    headerClass = DEFAULT_STYLES.header,
    inputClass = DEFAULT_STYLES.input,
    iconConfig = {
        styles: DEFAULT_STYLES.icon,
        assets: DEFAULT_ASSETS,
        isDefault: true,
    },
    customBrackets = BLOCK_BRACKETS,
}) => {
    const styles = document.createElement("styles");
    styles.innerHTML = DEFAULT_STYLE;
    document.querySelector(
        "head"
    ).innerHTML += `<style>${DEFAULT_STYLE}</style>`;

    const copyRegex = new RegExp(
        `<p>${customBrackets}"(.*?)"${customBrackets}</p>`,
        "g"
    );

    const contents = document.querySelectorAll(`[${CB_ATTR}="content"]`);
    contents.forEach((content, cIndex) => {
        const matches = content.innerHTML.match(copyRegex);
        matches.forEach((match, mIndex) => {
            const blockHtml = createBlockHtml({
                text: match
                    .replace("<p>"+customBrackets + '"', "")
                    .replace('"' + customBrackets+"</p>", ""),
                blockClass,
                headerClass,
                inputClass,
                iconConfig,
                id: `${cIndex}.${mIndex}-m8l-${TOOL_NAME}`,
            });
            content.innerHTML = content.innerHTML.replace(match, blockHtml);
        });
    });
    document.querySelectorAll(`[${CB_ATTR}="button"]`).forEach((button) => {
        button.addEventListener("click", (e) => {
            const id = button.getAttribute("id").replace("-button", "");
            copyBlock({ id: id, iconConfig: iconConfig });
        });
    });
};

document.addEventListener("DOMContentLoaded", function () {
    try {
        let m8lConfig = window.m8lConfig || {};
        if (m8lConfig[TOOL_NAME]) {
            try {
                putBlocks({
                    blockClass: m8lConfig[TOOL_NAME].blockClass,
                    headerClass: m8lConfig[TOOL_NAME].headerClass,
                    inputClass: m8lConfig[TOOL_NAME].inputClass,
                    iconConfig: m8lConfig[TOOL_NAME].iconConfig,
                    customBrackets: m8lConfig[TOOL_NAME].customBrackets,
                });
            } catch (err) {
                throw new Error("Copy blocks Script");
            }
        }
    } catch (error) {
        consoleMsg(consoleProps.types.Error, `Implementation '${error}'`);
    }
});

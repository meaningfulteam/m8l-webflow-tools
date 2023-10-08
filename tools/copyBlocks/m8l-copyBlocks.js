import { consoleProps, consoleMsg } from "../common/lib/m8l-consoleMsg.js";
import {
    TOOL_NAME,
    TOOL_ATTR,
    DEFAULT_STYLES,
    DEFAULT_ASSETS,
    DEFAULT_BRACKETS,
    TOOL_KEYS,
    WAITING_TIME,
    STYLES_URL,
} from "../common/constants/copyBlocks.js";

const copyText = ({ id, assets, styles }) => {
    const text = document.getElementById(`${id}-${TOOL_KEYS.text}`).innerText;
    const tempInput = document.createElement("input");
    tempInput.setAttribute("type", "hidden");
    tempInput.value = text;
    tempInput.select();
    navigator.clipboard.writeText(tempInput.value);
    tempInput.remove();

    const icon = document.getElementById(`${id}-${TOOL_KEYS.button}`);
    if (assets.isDefault) {
        icon.innerHTML = assets.success;
        icon.classList.remove(styles.icon.enable);
        icon.classList.add(styles.icon.disable);

        setTimeout(() => {
            icon.innerHTML = assets.copy;
            icon.classList.remove(styles.icon.disable);
            icon.classList.add(styles.icon.enable);
        }, WAITING_TIME);
    } else {
        icon.querySelector("img").setAttribute("src", assets.success);
        icon.classList.remove(styles.icon.enable);
        icon.classList.add(styles.icon.disable);
        setTimeout(() => {
            icon.querySelector("img").setAttribute("src", assets.copy);
            icon.classList.remove(styles.icon.disable);
            icon.classList.add(styles.icon.enable);
        }, WAITING_TIME);
    }
};

const setWatcher = ({ assets, styles }) => {
    document
        .querySelectorAll(`[${TOOL_ATTR}="${TOOL_KEYS.button}"]`)
        .forEach((button) => {
            button.addEventListener("click", (e) => {
                const id = button
                    .getAttribute("id")
                    .replace(`-${TOOL_KEYS.button}`, "");
                copyText({ id, assets, styles });
            });
        });
};

const createBox = ({ id, match, block, assets, styles, brackets }) => {
    const box = `
    <div class="${styles.block.wrapper}">
    <div class="${styles.block.head}">
    <div id="${id}-${TOOL_KEYS.button}" class="${
        styles.icon.enable
    }" ${TOOL_ATTR}="${TOOL_KEYS.button}">
    ${assets.isDefault ? assets.copy : `<img src=${assets.copy}/>`}
    </div>
    </div>
    <div id="${id}-${TOOL_KEYS.text}" class="${styles.block.body}">
    ${cleanText({ match, brackets })}
    </div>
    </div>
    `;
    block.innerHTML = block.innerHTML.replace(match, box);
};

const cleanText = ({ match, brackets }) => {
    const startRegExp = new RegExp(`[\\s\\n]*${brackets}"`, "gs");
    const finalRegExp = new RegExp(`"${brackets}[\\s\\n]*`, "gs");
    return match.replace(startRegExp, "").replace(finalRegExp, "");
};

const renderBlocks = ({
    brackets = DEFAULT_BRACKETS,
    assets = DEFAULT_ASSETS,
    styles = DEFAULT_STYLES,
}) => {
    if (!assets.copy || !assets.success) {
        consoleMsg(consoleProps.types.Error, "No valid assets detected");
        return;
    }
    const copyRegex = new RegExp(
        `<p>[\\s\\n]*${brackets}"(.*?)"${brackets}[\\s\\n]*</p>`,
        "gs"
    );
    document
        .querySelectorAll(`[${TOOL_ATTR}="${TOOL_KEYS.content}"]`)
        .forEach((block, bIndex) => {
            block.innerHTML.match(copyRegex).forEach((match, mIndex) => {
                try {
                    createBox({
                        id: `${bIndex}-${mIndex}`,
                        match,
                        block,
                        assets,
                        styles,
                        brackets,
                    });
                } catch (error) {
                    consoleMsg(
                        consoleProps.types.Error,
                        `Configuration error.`
                    );
                }
            });
        });
    setWatcher({ assets, styles });
};

const getStyles = async () => {
    const repoBaseUrl = STYLES_URL;

    const req = await fetch(repoBaseUrl);
    const data = await req.json();
    const content = atob(data.content);

    const styleElement = document.createElement("style");
    styleElement.innerHTML = content;
    document.head.appendChild(styleElement);
};

document.addEventListener("DOMContentLoaded", async function () {
    try {
        let m8lConfig = window.m8lConfig || {};
        if (m8lConfig[TOOL_NAME]) {
            try {
                if (!m8lConfig[TOOL_NAME].styles) {
                    await getStyles();
                }
            } catch (error) {
                throw new Error("Fetch default styles");
            }
            try {
                renderBlocks({
                    brackets: m8lConfig[TOOL_NAME].brackets,
                    assets: m8lConfig[TOOL_NAME].assets,
                    styles: m8lConfig[TOOL_NAME].styles,
                });
            } catch (err) {
                throw new Error("Copy blocks Script");
            }
        }
    } catch (error) {
        consoleMsg(consoleProps.types.Error, `Implementation '${error}'`);
    }
});

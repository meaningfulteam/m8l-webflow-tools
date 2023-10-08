import { consoleProps, consoleMsg } from "../common/lib/m8l-consoleMsg";

const TOOL_NAME = "countdown";
const COUNTDOWN_ATTR = "m8l-countdown";
const VALID_CONFIG = ["d", "h", "m", "s"];

const addCountdown = ({
    date,
    suffixState,
    config = VALID_CONFIG,
    fixedIndex,
    callback,
    defaultMessage = "",
}) => {
    const filteredConfig = config.filter((item) => VALID_CONFIG.includes(item));
    const goalDate = new Date(date).getTime();
    const suffix = suffixState ? `-${fixedIndex}` : "";

    const $items = {
        wrapper: document.querySelector(
            `[${COUNTDOWN_ATTR}="timeWrapper${suffix}"]`
        ),
    };
    filteredConfig.forEach((config) => {
        $items[config] = document.querySelector(
            `[${COUNTDOWN_ATTR}="${config}${suffix}"]`
        );
    });

    Object.keys($items).forEach((key) => {
        if (!$items[key]) throw new Error("Elements not found");
    });

    const interval = setInterval(() => {
        const delta = goalDate - new Date().getTime();
        const times = {
            d: Math.floor(delta / (1000 * 60 * 60 * 24)),
            h: Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            m: Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60)),
            s: Math.floor((delta % (1000 * 60)) / 1000),
        };

        filteredConfig.forEach((key) => {
            $items[key].innerText = String(times[key]).padStart(2, "0");
        });

        if (delta <= 0) {
            if (callback) {
                callback({
                    date: date,
                    suffix: suffix,
                    config: filteredConfig,
                });
            } else {
                consoleMsg(
                    consoleProps.types.Context,
                    `The countdown script does not have a callback configured.`
                );
                $items.wrapper.innerHTML = defaultMessage;
            }
            clearInterval(interval);
        }
    }, 1000);
};

const initCountdown = ({ data, defaultMessage, callback }) => {
    const suffixState = data.length > 1;
    data.forEach((dateObj, index) => {
        try {
            addCountdown({
                date: dateObj.date,
                config: dateObj.config,
                suffixState: suffixState,
                fixedIndex: index + 1,
                callback: callback,
                defaultMessage: defaultMessage,
            });
        } catch (error) {
            consoleMsg(
                consoleProps.types.Error,
                `Configuration error in date:'{date: "${dateObj.date}", index: ${index}}' because: "${error}"'`
            );
        }
    });
};

document.addEventListener("DOMContentLoaded", function () {
    try {
        let m8lConfig = window.m8lConfig || {};
        if (m8lConfig[TOOL_NAME]) {
            try {
                initCountdown({
                    data: m8lConfig[TOOL_NAME].data,
                    defaultMessage: m8lConfig[TOOL_NAME].defaultMessage,
                    callback: m8lConfig[TOOL_NAME].callback,
                });
            } catch (err) {
                throw new Error("Countdown Script");
            }
        }
    } catch (error) {
        consoleMsg(consoleProps.types.Error, `Implementation '${error}'`);
    }
});

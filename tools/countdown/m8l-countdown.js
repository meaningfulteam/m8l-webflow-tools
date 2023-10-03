import { consoleProps, consoleMsg } from "../common/m8l-consoleMsg.js";

const TOOL_NAME = "countdown";
const COUNTDOWN_ATTR = "m8l-countdown";

const addCountdown = (date, index, numbered, defaultMessage, callBack) => {
    const suffix = numbered ? `-${index + 1}` : "";
    const [$dW, $hW, $mW, $sW, $tW] = [
        document.querySelector(`[${COUNTDOWN_ATTR}="d${suffix}"]`),
        document.querySelector(`[${COUNTDOWN_ATTR}="h${suffix}"]`),
        document.querySelector(`[${COUNTDOWN_ATTR}="m${suffix}"]`),
        document.querySelector(`[${COUNTDOWN_ATTR}="s${suffix}"]`),
        document.querySelector(`[${COUNTDOWN_ATTR}="timeWrapper${suffix}"]`),
    ];

    const goalDate = new Date(date).getTime();
    const interval = setInterval(() => {
        const delta = goalDate - new Date().getTime();
        const [d, h, m, s] = [
            Math.floor(delta / (1000 * 60 * 60 * 24)),
            Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60)),
            Math.floor((delta % (1000 * 60)) / 1000),
        ];
        $dW.innerText = String(d).padStart(2, "0");
        $hW.innerText = String(h).padStart(2, "0");
        $mW.innerText = String(m).padStart(2, "0");
        $sW.innerText = String(s).padStart(2, "0");

        if (delta <= 0) {
            if (callBack) {
                callBack({ date, suffix });
            } else {
                consoleMsg(
                    consoleProps.types.Context,
                    `The countdown script does not have a callback configured.`
                );
                $tW.innerText = defaultMessage;
            }
            clearInterval(interval);
        }
    }, 1000);
};

const initCountdown = (dateArr, defaultMessage, callBack) => {
    const numbered = dateArr.length > 0;
    dateArr.forEach((date, i) => {
        addCountdown(date, i, numbered, defaultMessage, callBack);
    });
};

document.addEventListener("DOMContentLoaded", function () {
    try {
        let m8lConfig = window.m8lConfig || {};
        if (m8lConfig[TOOL_NAME]) {
            try {
                initCountdown(
                    m8lConfig[TOOL_NAME].dates,
                    m8lConfig[TOOL_NAME].defaultMessage,
                    m8lConfig[TOOL_NAME].callBack
                );
            } catch (err) {
                throw new Error("Countdown Script");
            }
        }
    } catch (error) {
        consoleMsg(consoleProps.types.Error, `Implementation '${error}'`);
    }
});

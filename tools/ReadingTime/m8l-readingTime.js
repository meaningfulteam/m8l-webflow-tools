import { consoleProps, consoleMsg } from "../common/lib/m8l-consoleMsg";

const getReadingTime = (type = "cumulative", speed = 200) => {
    try {
        let contents = document.querySelectorAll("[m8l-readingTime='content']");
        let displayText = document.querySelectorAll(
            "[m8l-readingTime='label']"
        );
        let totalTime,
            readingTimes = [];
        contents.forEach((content) => {
            readingTimes.push(
                content.textContent.trim().split(" ").length / speed
            );
        });

        switch (type) {
            case "cumulative":
                totalTime = readingTimes.reduce((a, b) => a + b, 0);
                break;
            case "longerTime":
                totalTime = Math.max(...readingTimes);
                break;
            case "lessTime":
                totalTime = Math.min(...readingTimes);
                break;
            case "average":
                let total = 0;
                for (let i = 0; i < readingTimes.length; i++) {
                    total += readingTimes[i];
                }
                totalTime = total / readingTimes.length;
                break;
            default:
                throw new Error("Unrecognized calculationType");
        }

        displayText.forEach((display) => {
            display.innerText = `${Math.round(totalTime)} min`;
        });
    } catch (error) {
        consoleMsg(
            consoleProps.types.Error,
            `Error trying to calculate reading time. Error message → ${error}`
        );
    }
};

document.addEventListener("DOMContentLoaded", function () {
    try {
        let m8lConfig = window.m8lConfig || {};
        if (m8lConfig["readingTime"]) {
            try {
                getReadingTime(
                    m8lConfig["readingTime"].calculationType,
                    m8lConfig["readingTime"].wordsPerMinute
                );
            } catch (err) {
                throw new Error("Reading Time Script");
            }
        }
    } catch (error) {
        consoleMsg(consoleProps.types.Error, `Implementation '${error}'`);
    }
});

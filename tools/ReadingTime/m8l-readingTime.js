const rtConsoleProps = {
    text_colors: {
        Default: "black",
        Error: "white",
        Context: "white",
    },
    bg_colors: {
        Default: "transparent",
        Error: "red",
        Context: "green",
    },
    types: {
        Error: "Error",
        Context: "Context",
    },
};

const rtConsoleMsg = (category, msg) => {
    console.log(
        `%c${category}:%c ${msg}`,
        `color: ${rtConsoleProps.text_colors[category]}; background-color: ${rtConsoleProps.bg_colors[category]}; font-size: larger; padding: 0rem 1rem`,
        `color: ${rtConsoleProps.text_colors.default}`
    );
};

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
        rtConsoleMsg(
            rtConsoleProps.types.Error,
            `Error trying to calculate reading time. Error message: ${error}`
        );
    }
};

try {
    var m8lConfig = m8lConfig || {};
    if (m8lConfig["readingTime"]) {
        getReadingTime(
            m8lConfig["readingTime"].calculationType,
            m8lConfig["readingTime"].wordsPerMinute
        );
    }
} catch (error) {
    rtConsoleMsg(
        rtConsoleProps.types.Error,
        "Implementation error in the 'CTA script' main thread."
    );
}

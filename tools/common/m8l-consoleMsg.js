const consoleProps = {
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

const consoleMsg = (category, msg) => {
    console.log(
        `%c${category}:%c ${msg}`,
        `color: ${rtConsoleProps.text_colors[category]}; background-color: ${rtConsoleProps.bg_colors[category]}; font-size: larger; padding: 0rem 1rem`,
        `color: ${rtConsoleProps.text_colors.default}`
    );
};

export { consoleProps, consoleMsg };

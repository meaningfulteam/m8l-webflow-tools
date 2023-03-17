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
        `color: ${consoleProps.text_colors[category]}; background-color: ${consoleProps.bg_colors[category]}; font-size: larger; padding: 0rem 1rem`,
        `color: ${consoleProps.text_colors.default}`
    );
};

export { consoleMsg, consoleProps };

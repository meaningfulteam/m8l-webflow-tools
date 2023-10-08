import { consoleProps, consoleMsg } from "../common/lib/m8l-consoleMsg";

const addCta = (source = document, ctaId) => {
    try {
        if (ctaId) {
            let contents = document.querySelectorAll(
                "[m8l-customCtas='target']"
            );
            contents.forEach((content) => {
                const clone = source
                    .querySelector(`[m8l-ctaName='${ctaId}']`)
                    .cloneNode(true);
                clone.classList.remove("hide");
                let rawContent = content
                    .getInnerHTML()
                    .split(`<p>%%${ctaId}%%</p>`);
                content.innerHTML = rawContent.join(clone.outerHTML);
            });
        }
    } catch (error) {
        consoleMsg(
            consoleProps.types.Error,
            `CTA implementation error with identifier → ${ctaId}`
        );
    }
};

const getHtmlSource = async (url) => {
    if (url) {
        try {
            let serverResponse = await fetch(url);
            let htmlText = await serverResponse.text();
            let source = document.createElement("html");
            source.innerHTML = htmlText;
            return source;
        } catch (error) {
            throw new Error("Failed to get the external source.");
        }
    }
    consoleMsg(
        consoleProps.types.Context,
        "No external source for custom CTAs."
    );
};
document.addEventListener("DOMContentLoaded", function () {
    try {
        let m8lConfig = window.m8lConfig || {};
        if (m8lConfig["customCtas"]) {
            let ctaArray = m8lConfig["customCtas"].list.split(",");
            getHtmlSource(m8lConfig["customCtas"].source).then((html) => {
                ctaArray.forEach((ctaSpec) => {
                    addCta(html, ctaSpec);
                });
            });
        }
    } catch (error) {
        consoleMsg(consoleProps.types.Error, `Implementation '${error}'`);
    }
});

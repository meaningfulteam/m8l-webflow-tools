import { consoleProps, consoleMsg } from "../common/lib/m8l-consoleMsg.js";
import { copySVG, checkSVG } from "../assets/icons.js";

/*
    m8lConfig = {
        copyBlocks:{
            customBrackets:"",
            assets={
                success:"",
                copy:""
            }
            styles={
                icon:{
                    enable:"",
                    disable:"",
                },
                block:{
                    head:"",
                    body:"",
                    wrapper:"",
                }
            },

        }
    }
*/

const TOOL_NAME = "copyBlocks";

document.addEventListener("DOMContentLoaded", function () {
    try {
        let m8lConfig = window.m8lConfig || {};
        if (m8lConfig[TOOL_NAME]) {
            try {
                putBlocks({
                    customBrackets: m8lConfig[TOOL_NAME].customBrackets,
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

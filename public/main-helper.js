export const buildFormattedInnerHTMLFrom = (textArray) => {
    let outputInnerHTML = "";
    for (const substringObject of textArray) {
        // Ensure text isn't undefined
        if (typeof substringObject.text == 'undefined') {
            continue;
        }
        let substring = substringObject.text;
        // Add styling
        for (const styleAttribute in substringObject.annotations) {
            if (substringObject.annotations[styleAttribute] == true) {
                switch (styleAttribute) {
                    case "bold":
                        substring = "<b>" + substring + "</b>";
                        break;
                    case "italic":
                        substring = "<i>" + substring + "</i>";
                        break;
                    case "underline":
                        substring = "<ins>" + substring + "</ins>";
                        break;
                }
            }
        }
        outputInnerHTML += substring;
    }
    return outputInnerHTML;
};
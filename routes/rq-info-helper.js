function findSectionIds(pageObject, sectionName) {
    /*
    Returns an array withh the IDs of the objects most likely to part of the
    "What are the rings/quadrants?" section (determined by the sectionName
    parameter). First item in the array is the heading.
    */
    // Check if an object can be iterated through
    const isIterable = (obj) => {
            if (obj == null) {
              return false;
            }
            return typeof obj[Symbol.iterator] === 'function';
          };

    sectionName = sectionName.toLowerCase();
    let results;
    if (typeof pageObject.results != 'undefined') {
        results = pageObject.results;
    } else {
        return [];
    }
    
    // Check that there is a results array in this object
    if (!isIterable(results)) {
        return [];
    }

    for (const [index, block] of results.entries()) {
        // Check if block of text is of the 'heading 3'
        if (typeof block.heading_3 != 'undefined' && isIterable(block.heading_3.text)) {
            // Check if it contains sectionName in the text.content: attributes of
            // any of the objects in its heading_3.text: array.
            for (const textElem of block.heading_3.text) {
                if (textElem.text.content.toLowerCase().includes(sectionName)) {
                    // Check whether or not the next object on the page is a
                    // bulleted list item. If so, this is the heading that will
                    // be guessed to be correct
                    let j = index + 1;
                    if (typeof results[j].bulleted_list_item != 'undefined') {
                        const resultsArray = [index];
                        while (j < results.length && typeof results[j].bulleted_list_item != 'undefined') {
                            // Add the remaining bullet list items that follow
                            resultsArray.push(j);
                            j++;
                        }
                        return resultsArray;
                    }
                }
            }
        }
    }

    return [];
}

function getTextFrom(pageObject, arrayOfIndexes) {
    /*
    Returns an array of objects with all the text and formatting from the
    pageObject and the indexes at arrayOfIndexes.

    Objects within the output array have the following structure:
    {
        textArray: [
            {
                text: "string",
                annotations: {
                    bold: bool,
                    code: bool,
                    color: "string",
                    italic: bool,
                    strikethrough: bool,
                    underline: bool,
                    }
            },
            ...
        ]
    }
    */
    const getBlockType = (block) => {
        for (const attr in block) {return attr};
    }

    const outputArray = new Array();

    if (typeof pageObject.results == 'undefined') {
        return [];
    }

    for (const pageObjectIndex of arrayOfIndexes) {
        if (pageObjectIndex < pageObject.results.length) {
            const newBlock = {textArray: new Array()};
            const blockType = getBlockType(pageObject.results[pageObjectIndex]);
            for (const textElement of pageObject.results[pageObjectIndex][blockType].text) {
                newBlock.textArray.push({
                    text: textElement.text.content,
                    annotations: textElement.text.annotations
                });
            }
            outputArray.push(newBlock);
        }
    }

    return outputArray;
}

exports.findSectionIds = findSectionIds;
exports.getTextFrom = getTextFrom;
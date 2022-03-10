export function findSectionHeading(pageObject, sectionName) {
    /*
    Returns the ID of the object most likely to be the heading of the "What
    are the rings/quadrants?" section (determined by the sectionName
    parameter).
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
        return -1;
    }
    
    // Check that there is a results array in this object
    if (!isIterable(results)) {
        return -1;
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
                    if (typeof results[index + 1].bulleted_list_item != 'undefined') {
                        return index;
                    }
                }
            }
        }
    }

    return -1;
}
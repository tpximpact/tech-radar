function excludeInvalidDatapoints(data) {
    /* Identify and exclude datapoints containing null mandatory fields, recording
    what those fields are for each.
    Returns an array of objects containing the label of excluded items alongside
    the attributes that caused the items to be excluded. */
    const excludedItems = new Array();
    for (let i = 0; i < data.length; i++) {
        const invalidAttributes = invalidAttributesIn(data[i]);
        if (invalidAttributes.length > 0) {
            if (!invalidAttributes.includes("label")) {
                excludedItems.push({
                    label: data[i].label,
                    invalidAttributes: invalidAttributes,
                });
            }
            data.splice(i, 1);
            i--;
        }
    }
    return excludedItems;
}

function invalidAttributesIn(datapoint) {
    /*
    Returns an array of attribute names that are invalid for a datapoint.
    */
    const invalidAttributes = new Array();
    if (typeof datapoint.label !== "string" || datapoint.label === "") {
        invalidAttributes.push("label");
    }
    if (typeof datapoint.ring !== "number" || datapoint.ring < 0 || datapoint.ring > 3) {
        invalidAttributes.push("ring");
    }
    if (typeof datapoint.quadrant !== "number" || datapoint.quadrant < 0 || datapoint.quadrant > 3) {
        invalidAttributes.push("quadrant");
    }
    return invalidAttributes;
}

module.exports = excludeInvalidDatapoints;
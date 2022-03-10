export function findSectionHeading(pageObject, sectionName) {
    /*
    Returns the ID of the object most likely to be the heading of the "What
    are the rings/quadrants?" section (determined by the sectionName
    parameter).
    */

    // For each object

        // Check if object has heading_3 attribute

        // Check if it contains sectionName in the text.content: attributes of
        // any of the objects in its heading_3.text: array.

        // Check whether or not the next object in pageObject.results has
        // bulleted_list_item attribute. If so, this is the heading that will
        // be guessed to be correct
   return 0;
}
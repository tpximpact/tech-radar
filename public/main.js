import { radar_visualization } from './build-radar.js';

const getRadarData = async () => {
    const result = await fetch(`${window.location.origin}/radar`);
    const data = await result.json();
    return data;
};

const data = await getRadarData();

/*
Placeholder code to show which items have been excluded
*/
if (data.excludedData.length > 0) {
    document.getElementById('incomplete-data-warning').style.visibility = "visible";
    let hiddenItemsList = document.getElementById('hidden-items-list');
    for (const excludedItem of data.excludedData) {
        let newListItem = document.createElement('li');
        let missingAttributes = "";
        for (const missingAttribute of excludedItem.invalidAttributes) {
            missingAttributes += missingAttribute + ", "
        }
        missingAttributes = missingAttributes.substring(0, missingAttributes.length - 2);
        newListItem.appendChild(document.createTextNode(excludedItem.label + " is missing values for " + missingAttributes));
        hiddenItemsList.appendChild(newListItem);
    }
}

radar_visualization({
    svg_id: 'radar',
    width: 1450,
    height: 1000,
    colors: {
        background: '#fff',
        grid: '#bbb',
        inactive: '#ddd',
    },
    quadrants: [
        { name: 'Techniques' },
        { name: 'Platforms' },
        { name: 'Tools' },
        { name: 'Languages & Frameworks' },
    ],
    rings: [
        { name: 'ADOPT', color: '#93c47d' },
        { name: 'TRIAL', color: '#93d2c2' },
        { name: 'ASSESS', color: '#fbdb84' },
        { name: 'HOLD', color: '#efafa9' },
    ],
    print_layout: true,
    entries: data.includedData,
});

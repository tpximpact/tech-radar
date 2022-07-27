import { radar_visualization } from './build-radar.js';
import { buildFormattedInnerHTMLFrom } from './main-helper.js';

// Show loading animation
const loader = document.getElementById('loader-container');
const svgWrapper = document.getElementById('svg-wrapper');
svgWrapper.style.display = 'none';
loader.style.display = 'grid';

const getRadarData = async () => {
    const result = await fetch(`${window.location.origin}/radar`);
    const data = await result.json();
    return data;
};

const getRingsAndQuadrantsInfo = async () => {
    const result = await fetch(
        `${window.location.origin}/rings-and-quadrants-info`
    );
    const data = await result.json();
    return data;
};

const data = await getRadarData();
const ringsAndQuadrantInfo = await getRingsAndQuadrantsInfo();

// Hide loading animation
loader.style.display = 'none';
svgWrapper.style.display = 'block';

function redraw() {
    let svgWrapperWidth = svgWrapper.offsetWidth;

    // Set height of SVG wrapper so that items below it respond to the change of height
    document.getElementById('svg-wrapper').style.height =
        (svgWrapperWidth * 0.7).toString() + 'px';

    // Clear SVG
    let svg = document.getElementById('radar');
    while (svg.lastChild) {
        svg.removeChild(svg.lastChild);
    }

    // Draw visualisation
    radar_visualization({
        svg_id: 'radar',
        width: svgWrapperWidth,
        height: 1000,
        viewbox: '0 0 ' + svgWrapperWidth + ' ' + 1400000 / svgWrapperWidth,
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
}

/*
Display excluded items to user
*/
if (data.excludedData.length > 0) {
    document.getElementById('incomplete-data-warning').style.visibility =
        'visible';
    let hiddenItemsList = document.getElementById('hidden-items-list');
    for (const excludedItem of data.excludedData) {
        let newListItem = document.createElement('li');
        newListItem.className = 'list-disc';
        let missingAttributes = '';
        for (const missingAttribute of excludedItem.invalidAttributes) {
            missingAttributes += missingAttribute + ', ';
        }
        missingAttributes = missingAttributes.substring(
            0,
            missingAttributes.length - 2
        );
        newListItem.appendChild(
            document.createTextNode(
                excludedItem.label +
                    ' is missing values for ' +
                    missingAttributes
            )
        );
        hiddenItemsList.appendChild(newListItem);
    }
}

redraw();

// Display rings and quadrant info
let ringsHeading = document.getElementById('rings-heading');
let quadrantsHeading = document.getElementById('quadrants-heading');
let ringsTextSection = document.getElementById('rings-text-section');
let quadrantsTextSection = document.getElementById('quadrants-text-section');

ringsHeading.innerHTML = buildFormattedInnerHTMLFrom(
    ringsAndQuadrantInfo.ringsSection[0].textArray
);
quadrantsHeading.innerHTML = buildFormattedInnerHTMLFrom(
    ringsAndQuadrantInfo.quadrantsSection[0].textArray
);

const populateBulletpointTextSection = (
    bulletpointTextSection,
    bulletpointTextArray,
    className
) => {
    /*
        bulletpointTextSection: A DOM element to populate with bullet points.
        bulletpointTextArray:   An array containing input data from the Notion API containing only data
                                relevant to the bullet points.
    */
    for (const bulletpoint of bulletpointTextArray) {
        const innerHTML = buildFormattedInnerHTMLFrom(bulletpoint.textArray);
        const tag = document.createElement('li');
        tag.innerHTML = innerHTML;
        tag.className = className;
        bulletpointTextSection.appendChild(tag);
    }
};

populateBulletpointTextSection(
    ringsTextSection,
    ringsAndQuadrantInfo.ringsSection.slice(1),
    'pb-2'
);
populateBulletpointTextSection(
    quadrantsTextSection,
    ringsAndQuadrantInfo.quadrantsSection.slice(1),
    'pb-2'
);

window.onresize = () => {
    setTimeout(() => {
        redraw();
    }, 100);
};

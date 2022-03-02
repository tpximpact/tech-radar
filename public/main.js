import { radar_visualization } from './build-radar.js';
import excludeInvalidDatapoints from './data-validation.js';

const getRadarData = async () => {
    const result = await fetch(`${window.location.origin}/radar`);
    const data = await result.json();
    return data;
};

var data = await getRadarData();

var excludedData = excludeInvalidDatapoints(data);

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
    entries: data,
});

const getRadarData = async() => {
    const result = await fetch(`${window.location.origin}/radar`);
    const data = await result.json();
    return data;
};

const data = await getRadarData();
console.log(data);
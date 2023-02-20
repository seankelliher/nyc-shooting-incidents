function getMurderFlagShared(){
    this.vics.map((vic) => {
        if (vic.statistical_murder_flag === "Y") {
            this.vicsMurderFlag.push(vic.incident_key);
        }
    });
}

function getAgeDataShared(){
    this.vics.map((vic) => {
        const expr = vic.vic_age_group;
        switch(expr) {
        case "<18":
            this.vicsAgeUnder18.push(vic.incident_key);
            break;
        case "18-24":
            this.vicsAge18To24.push(vic.incident_key);
            break;
        case "25-44":
            this.vicsAge25To44.push(vic.incident_key);
            break;
        case "45-64":
            this.vicsAge45To64.push(vic.incident_key);
            break;
        case "65+":
            this.vicsAge65Up.push(vic.incident_key);
            break;
        default:
            this.vicsAgeUnknown.push(vic.incident_key);
        }
    });        
}

function getSexDataShared(){
    this.vics.map((vic) => {
        const expr = vic.vic_sex;
        switch(expr) {
        case "M":
            this.vicsSexMale.push(vic.incident_key);
            break;
        case "F":
            this.vicsSexFemale.push(vic.incident_key);
            break;
        default:
            this.vicsSexUnknown.push(vic.incident_key);
        }
    });        
}

function getRaceDataShared(){
    this.vics.map((vic) => {
        const expr = vic.vic_race;
        switch(expr) {
        case "ASIAN / PACIFIC ISLANDER":
            this.vicsRaceAsian.push(vic.incident_key);
            break;
        case "BLACK":
            this.vicsRaceBlack.push(vic.incident_key);
            break;
        case "BLACK HISPANIC":
            this.vicsRaceBlackHisp.push(vic.incident_key);
            break;
        case "WHITE":
            this.vicsRaceWhite.push(vic.incident_key);
            break;
        case "WHITE HISPANIC":
            this.vicsRaceWhiteHisp.push(vic.incident_key);
            break;
        default:
            this.vicsRaceUnknown.push(vic.incident_key);
        }
    });        
}

function getStatShared(arr){
    const length = arr.length;
    const local = length.toLocaleString();
    return local;
}

function getPercentShared(arr){
    const result = ((arr.length / this.vics.length) * 100);
    if (result === 0) {
        return 0;
    } else if (result < 1) {
        return "<1";
    } else {
        return (Math.round(result));
    }
}

export {
    getMurderFlagShared,
    getAgeDataShared,
    getSexDataShared,
    getRaceDataShared,
    getStatShared,
    getPercentShared
};

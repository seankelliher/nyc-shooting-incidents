function getTimeDataShared() {
    this.incidents.map((incident) => {
        if (incident.occur_time >= "00:00:00" && incident.occur_time <= "05:59:00") {
            this.timePeriod1.push(incident.incident_key);
        } else if (incident.occur_time >= "06:00:00" && incident.occur_time <= "11:59:00") {
            this.timePeriod2.push(incident.incident_key);
        } else if (incident.occur_time >= "12:00:00" && incident.occur_time <= "17:59:00") {
            this.timePeriod3.push(incident.incident_key);
        } else if (incident.occur_time >= "18:00:00" && incident.occur_time <= "23:59:00") {
            this.timePeriod4.push(incident.incident_key);
        }
    });
}

function getBoroDataShared() {
    this.incidents.map((incident) => {

        const expr = incident.boro;
        switch(expr) {
        case "BRONX":
            this.boroBronx.push(incident.incident_key);
            break;
        case "BROOKLYN":
            this.boroBrooklyn.push(incident.incident_key);
            break;
        case "MANHATTAN":
            this.boroManhattan.push(incident.incident_key);
            break;
        case "QUEENS":
            this.boroQueens.push(incident.incident_key);
            break;
        case "STATEN ISLAND":
            this.boroStaten.push(incident.incident_key);
            break;
        }
    });
}

// Inside vs Outside.
function getDescDataShared() {
    this.incidents.map((incident) => {
        if (incident.loc_of_occur_desc === "INSIDE") {
            this.descInside.push(incident.incident_key);
        } else if (incident.loc_of_occur_desc === "OUTSIDE") {
            this.descOutside.push(incident.incident_key);
        }
    });
}

// Location classification, eg - Housing, Playground, Transit.
function getClassDataShared() {
    this.incidents.map((incident) => {

        const expr = incident.loc_classfctn_desc;
        switch(expr) {
        case "COMMERICAL":
            this.classCommercial.push(incident.incident_key);
            break;
        case "DWELLING":
            this.classDwelling.push(incident.incident_key);
            break;
        case "HOUSING":
            this.classHousing.push(incident.incident_key);
            break;
        case "PARKING LOT":
            this.classParkingLot.push(incident.incident_key);
            break;
        case "PLAYGROUND":
            this.classPlayground.push(incident.incident_key);
            break;
        case "STREET":
            this.classStreet.push(incident.incident_key);
            break;
        case "TRANSIT":
            this.classTransit.push(incident.incident_key);
            break;
        case "VEHICLE":
            this.classVehicle.push(incident.incident_key);
            break;
        default:
            this.classOther.push(incident.incident_key);
        }
    });
}

function getMurderFlagShared() {
    this.incidents.map((incident) => {
        if (incident.statistical_murder_flag === "Y") {
            this.incidentsMurderFlag.push(incident.incident_key);
        }
    });
}

function getAgeDataShared(vicsOrPerps) {
    let expr;

    this.incidents.map((incident) => {
        if (vicsOrPerps === "victims") {
            expr = incident.vic_age_group;
        } else if (vicsOrPerps === "perpetrators") {
            expr = incident.perp_age_group;
        }
        //const expr = incident.vic_age_group;
        switch(expr) {
        case "<18":
            this.ageUnder18.push(incident.incident_key);
            break;
        case "18-24":
            this.age18To24.push(incident.incident_key);
            break;
        case "25-44":
            this.age25To44.push(incident.incident_key);
            break;
        case "45-64":
            this.age45To64.push(incident.incident_key);
            break;
        case "65+":
            this.age65Up.push(incident.incident_key);
            break;
        default:
            this.ageUnknown.push(incident.incident_key);
        }
    });        
}

function getSexDataShared(vicsOrPerps) {
    let expr;

    this.incidents.map((incident) => {
        if (vicsOrPerps === "victims") {
            expr = incident.vic_sex;
        } else if (vicsOrPerps === "perpetrators") {
            expr = incident.perp_sex;
        }
        //const expr = incident.vic_age_group;
        switch(expr) {
        case "M":
            this.sexMale.push(incident.incident_key);
            break;
        case "F":
            this.sexFemale.push(incident.incident_key);
            break;
        default:
            this.sexUnknown.push(incident.incident_key);
        }
    });        
}

function getRaceDataShared(vicsOrPerps) {
    let expr;

    this.incidents.map((incident) => {
        if (vicsOrPerps === "victims") {
            expr = incident.vic_race;
        } else if (vicsOrPerps === "perpetrators") {
            expr = incident.perp_race;
        }
        //const expr = incident.vic_age_group;
        switch(expr) {
        case "ASIAN / PACIFIC ISLANDER":
            this.raceAsian.push(incident.incident_key);
            break;
        case "BLACK":
            this.raceBlack.push(incident.incident_key);
            break;
        case "BLACK HISPANIC":
            this.raceBlackHisp.push(incident.incident_key);
            break;
        case "WHITE":
            this.raceWhite.push(incident.incident_key);
            break;
        case "WHITE HISPANIC":
            this.raceWhiteHisp.push(incident.incident_key);
            break;
        default:
            this.raceUnknown.push(incident.incident_key);
        }
    });        
}

function getStatShared(arr) {
    const length = arr.length;
    const local = length.toLocaleString();
    return local;
}

function getPercentShared(arr) {
    const result = ((arr.length / this.incidents.length) * 100);
    if (result === 0) {
        return 0;
    } else if (result < 1) {
        return "<1";
    } else {
        return (Math.round(result));
    }
}

export {
    getTimeDataShared,
    getBoroDataShared,
    getDescDataShared,
    getClassDataShared,
    getMurderFlagShared,
    getAgeDataShared,
    getSexDataShared,
    getRaceDataShared,
    getStatShared,
    getPercentShared
};

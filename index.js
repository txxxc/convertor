const builder = require('xmlbuilder');
const http = require('http');
const axios = require('axios');
const url = require('url');
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 8080;
app.use(cors());
app.locals.pretty = true;

function readJSON(url, callback) {
    fs.readFile(url, "utf8", function (err, result) {
        if (err) callback(err);
        callback(null, JSON.parse(result));
    });
}

function writeJSON(data, filename) {
    fs.writeFile(`/tmp/${filename}`, data, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            //console.log(fs.readFileSync(filename, "utf8"));
        }
    });
}

function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const withHyphens = [year, month, day].join('-');
    return withHyphens;
}

function checkJSON(filename) {
    fs.stat(`/tmp/${filename}`, (err, stats) => {
        if (err) return false;
        const currentDate = getCurrentDate();
        const lastUpdated = new Date(+Number(stats.mtimeMs.toFixed(0)));
        const lastUpdatedDate = [lastUpdated.getFullYear(), lastUpdated.getMonth() + 1, lastUpdated.getDate()].join('-');
        console.log(`/tmp/${filename}`);
        return currentDate === lastUpdatedDate;
    })
}
app.get('/data', (request, response) => {
    const page = url.parse(request.url, true).query['pageIndex'];
    let file = `data${page}.json`;
    response.set('Cache-Control', 'no-store');
    readJSON(file, (err, nameContent) => {
        if (err) {
            response.status(500).send(err);
            return;
        }
        response.send(nameContent);
    })
});
app.get('/', async (request, response) => {
    response.set('Cache-Control', 'no-store');
    response.writeHead(200, {
        'Content-Type': 'application/xml'
    });
    prod = url.parse(request.url, true).query['production'];
    if (prod === undefined) prod = `true`;
    let filename = prod === `true` ? `production.xml` : `mockdata.xml`;
    console.log(filename);
    let xml;
    fs.stat(`/tmp/${filename}`, async (err, stats) => {
        if (err) {
            console.log(`Fetching new data!`);
            let json = await fetchAllPages(prod);
            json = JSON.stringify(json);
            xml = parseJsonToXML(json);
            writeJSON(xml, filename);
            response.write(xml);
            response.end();
            return;
        }
        const currentDate = getCurrentDate();
        const lastUpdated = new Date(+Number(stats.mtimeMs.toFixed(0)));
        const lastUpdatedDate = [lastUpdated.getFullYear(), lastUpdated.getMonth() + 1, lastUpdated.getDate()].join('-');
        if (currentDate === lastUpdatedDate) {
            console.log(`Re-using old data!`);
            fs.readFile(`/tmp/${filename}`, "utf8", function (err, result) {
                if (err) {
                    response.status(500).send(err);
                    return;
                }
                xml = result;
                response.write(xml);
                response.end();   
            });
        } else {
            console.log(`Fetching new data!`);
            let json = await fetchAllPages(prod);
            json = JSON.stringify(json);
            xml = parseJsonToXML(json);
            writeJSON(xml, filename);
            response.write(xml);
            response.end();
        }
    })


});
async function fetchAllPages(prod) {
    const results = [];
    let host = `http://127.0.0.1:8080/data?`;
    if (prod === "true") {
        host = `https://api.blendproducer.com/ListingWallet/v1/listing/v2/Wallet/GetWallet?Code=20B6764DB092406D98202C9EA9E79FBE&lang=en&pageSize=100&`;
    }
    let url = host + `pageIndex=1`;
    const config = {
        method: 'get',
        url: url,
        headers: {
            'Ocp-Apim-Subscription-Key': 'd8f37f5ef7dc4d27b98be6cdaa5c265c',
            'Locale': 'en',
            'Accept-Language': 'en-US,en;'
        }
    };
    do {
        const ax = await axios(config);
        const data = ax.data;
        url = null;
        if (Number(data.pageIndex) < Number(data.totalPages)) {
            url = host + `pageIndex=` + (Number(data.pageIndex) + 1);
            console.log(url);
        }
        config.url = url;
        if (ax.data.items) {
            results.push(...ax.data.items);
        }
    } while (url);
    return results;
}

function parseJsonToXML(source) {
    source = source.replace(/\n\n/g, "\\n");
    let json = JSON.parse(source);
    // return;
    // json = json.items;
    const dt = new Date();
    const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
    const updatedProducts = json.map(({
        propertyId: id,
        contractNumber: ref,
        price,
        propertyType: type,
        address,
        totalBedrooms: beds,
        totalWC: baths,
        grossArea,
        netArea,
        plotArea,
        energyPerformanceCertificateRating,
        videoURL,
        virtualRealityCode,
        propertyDescriptionES,
        propertyDescriptionEN,
        propertyDescriptionFR,
        propertyPhotoList,
        listingWebSiteMasterUrl,
        businessType,
    }) => ({
        id,
        date: `${dt.getFullYear()}-${padL(dt.getMonth()+1)}-${padL(dt.getDate())} ${padL(dt.getHours())}:${padL(dt.getMinutes())}:${padL(dt.getSeconds())}`,
        ref,
        price,
        currency: "EUR",
        price_freq: businessType,
        //part_ownership: 0,
        //leasehold: 0,
        //new_build: 0,
        type,
        town: address.city,
        province: "alicante",
        country: "spain",
        location: address,
        key_loca: address.postalCode,
        calle: address.streetName,
        numero: address.buildingNumber,
        numplanta: address.floorNumber,
        altitud: address.longitude,
        latitud: address.latitude,
        //location_detail: "optional location detail",
        beds,
        baths,
        //pool: 1,
        surface_area: {
            grossArea: Math.round(grossArea),
            plotArea: Math.round(plotArea)
        },
        energy_rating: energyPerformanceCertificateRating,
        url: listingWebSiteMasterUrl,
        video_url: videoURL,
        virtual_tour_url: virtualRealityCode,
        desc: {
            propertyDescriptionES,
            propertyDescriptionEN,
            propertyDescriptionFR
        },
        images: propertyPhotoList
    }));
    var root = builder.create('root').ele(`kyero`).ele(`feed_version`, 3).up().up();
    for (const item of updatedProducts) {
        let par = root.ele(`property`);
        for (let [key, value] of Object.entries(item)) {
            let parentEle = par.ele(`${key}`);
            switch (key) {
                case `location`:
                    parentEle.ele(`latitude`, value.latitude);
                    parentEle.ele(`longitude`, value.longitude);
                    break;
                case `price_freq`:
                    value = (value === 'For Sale') ? 'sale' : 'month';
                    //if(equals(item()?['businessType'], 'For Sale'), 'sale', 'month')
                    parentEle.txt(value);
                    break;
                case `price`:
                    if (value === null) {
                        parentEle.txt(`x`);
                    } else {
                        parentEle.txt(value);
                    }
                    break;
                case `desc`:
                    parentEle.ele(`es`, value.propertyDescriptionES);
                    parentEle.ele(`en`, value.propertyDescriptionEN);
                    parentEle.ele(`fr`, value.propertyDescriptionFR);
                    break;
                case `surface_area`:
                    parentEle.ele(`built`, value.grossArea);
                    parentEle.ele(`plot`, value.plotArea);
                    break;
                case `energy_rating`:
                    if (value === `exempt`) {
                        value = 'X';
                    }
                    if (value !== `unknown`) {
                        parentEle.ele(`consumption`, value);
                    }
                    break;
                case `url`:
                    parentEle.ele(`es`, value);
                    break;
                case `images`:
                    let i = 0;
                    for (let image of value) {
                        i++;
                        if (i < 50) {
                            let imageFileName = image.fileName.split("?")[0];
                            if (imageFileName.match(/^.*\.(gif|jpe?g|png|GIF|JPE?G|PNG)$/)) {
                                parentEle.ele(`image`, {
                                    id: image.orderNumber
                                }).ele(`url`, imageFileName);
                            } else {
                                //console.log(imageFileName);
                                //console.error(`WRONG FORMAT!!!`);
                            }

                        }
                    }
                    break;
                default:
                    if (value) {
                        parentEle.txt(value);
                    } else {
                        parentEle.remove();
                    }
            };
        }
    }
    var xml = root.end({
        pretty: true
    });
    return xml;
}
app.listen(PORT, function () {
    console.log(`App is running: http://localhost:${PORT}/`);
})
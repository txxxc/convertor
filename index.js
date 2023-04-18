const builder = require('xmlbuilder');
const http = require('http');
const axios = require('axios');
const url = require('url');
async function start(prod) {
    console.log(`Starting prod=${prod} script.`);
    if(prod === `false`) {
        let source = `
    {
        "pageIndex": 1,
        "totalPages": 4,
        "totalCount": 237,
        "pageSize": 50,
        "hasPagingData": true,
        "items": [
            {
                "prospectSellerId": 2301976,
                "prospectStatus": "Cliente",
                "propertyId": 2886247,
                "contractNumber": "C0138-00001",
                "price": 155000.0,
                "businessType": "Venda",
                "propertyType": "Apartamento",
                "propertySubType": "Andar",
                "propertyTitlePT": null,
                "propertyDescriptionPT": null,
                "propertyTitleES": "Fantástico apartamento con vistas panorámicas",
                "propertyDescriptionES": "Este apartamento ha sido reformado integralmente y se encuentra nuevo, a estrenar. Gracias a la localización disfruta de unas magníficas vistas al mar, a la playa de la Fosa en Calpe, y recibe el sol durante todo el día. \n\nCuenta con un amplio dormitorio, un salón con cocina americana, un cuarto de baño con ducha  y una soleada terraza con vistas al mar y  al Peñón de Ifach. \n\nEl edificio cuenta con acceso adaptado para discapacitados, dos ascensores, parking exterior y se encuentra a 100 metros de las playas de arena. ",
                "propertyTitleEN": "Fantastic apartment with panoramic views",
                "propertyDescriptionEN": "This apartment has been completely renovated and is new, brand new.\n\nThanks to its location, it enjoys magnificent views of the sea, La Fosa beach in Calpe, and receives the sun throughout the day.\n\nIt has a large bedroom, a living room with a kitchenette, a bathroom with a shower and a sunny terrace with views of the sea and the Peñón de Ifach.\n\nThe building has access adapted for the disabled, two elevators, outdoor parking and is located 100 meters from the sandy beaches.",
                "propertyTitleFR": "Fantastic Apartment",
                "propertyDescriptionFR": "Cet appartement a été entièrement rénové et est neuf, tout neuf.\n\nGrâce à son emplacement, il bénéficie d'une vue magnifique sur la mer, la plage de La Fosa à Calpe, et reçoit le soleil toute la journée.\n\nIl comprend une grande chambre, un salon avec une kitchenette, une salle de bains avec douche et une terrasse ensoleillée avec vue sur la mer et le Peñón de Ifach.\n\nLe bâtiment dispose d'un accès adapté pour les personnes handicapées, de deux ascenseurs, d'un parking extérieur et est situé à 100 mètres des plages de sable.",
                "hasLift": true,
                "isGroundFloor": null,
                "isTopFloor": null,
                "grossArea": 57.00,
                "netArea": 57.00,
                "totalBedrooms": 1,
                "totalWC": 1,
                "totalRooms": null,
                "plotArea": null,
                "totalHalfWC": null,
                "totalParkingSpaces": 0,
                "totalApartmentsPerFloor": null,
                "constructionYear": 1974,
                "floorCount": null,
                "totalFloorsOfHouse": null,
                "netAreaQualifiable": true,
                "roomsQualifiable": true,
                "wcQualifiable": true,
                "isPrivateCondominium": true,
                "hasSanitation": null,
                "inLandSubdivision": null,
                "landFormatFrontSize": null,
                "landFormatBottomSize": null,
                "observationsPublic": "El gasto de comunidad incluye el agua al no tener contador independiente.",
                "address": {
                    "streetName": "llentiscle",
                    "buildingNumber": "4",
                    "floorNumber": "D",
                    "postalCode": "03710",
                    "locality": "Playa de Fossa-Levante",
                    "city": "Marina Alta",
                    "latitude": 38.6501676,
                    "longitude": 0.075854,
                    "doorType": "Porta nº",
                    "fullAddress": null,
                    "addressLocationFullName": " Marina Alta,  Calpe,  Playa de Fossa-Levante"
                },
                "lifeStyleType": "Praia",
                "viewType": "Mar",
                "orientationType": "Sul/Nascente",
                "energyPerformanceCertificateRating": "exempt",
                "videoURL": null,
                "virtualRealityCode": "https://castlefocus.s3.eu-west-2.amazonaws.com/HWR350541+/index.html",
                "listingWebSiteMasterUrl": "https://www.century21.pt/ref/C0138-00001",
                "propertyPhotoList": [
                    {
                        "orderNumber": 1,
                        "fileName": "https://cdn.21online.app/v7/_c21cdn_/img-0866-copia_a07f82a5-4e99-4320-8206-ac8deff07ee8.jpg?w=1920&wat=1&org_if_sml=1"
                    }
                ],
                "equipmentTypeList": [],
                "surroundingTypeList": [
                    {
                        "name": "Supermercado",
                        "place": "Supermarket",
                        "distanceInMeters": 300
                    },
                    {
                        "name": "Praia",
                        "place": "Beach",
                        "distanceInMeters": 50
                    },
                    {
                        "name": "Supermercado",
                        "place": "Supermarket",
                        "distanceInMeters": 300
                    }
                ],
                "roomTypeList": [],
                "labels": {
                    "dropPrice": false,
                    "hidePrice": false,
                    "fullyFinanced": false
                },
                "agent": {
                    "id": "21a86cf6-2882-422a-ab90-59b8c704808e",
                    "name": "Pablo Faelli Abiega",
                    "emailAddress": "pablo.f@century21.es",
                    "role": "Broker",
                    "telephoneNumber": "",
                    "photo": "https://cdn.21online.app/v7/_c21cdn_/agent-photo_562892e5-3250-4815-ace9-723108a63f3e.png",
                    "mySiteUrl": "https://www.mysitec21.com/pablo-f",
                    "agency": {
                        "id": 6313,
                        "name": "CENTURY 21 Evolution",
                        "commercialName": "APF EVOLUTION S.L.",
                        "licence": "0",
                        "address": {
                            "streetName": "Avenida Gabriel Miró",
                            "buildingNumber": "14",
                            "floorNumber": null,
                            "postalCode": "03710",
                            "locality": "Calpe",
                            "city": "Alicante",
                            "latitude": 38.6435072,
                            "longitude": 0.0474966,
                            "doorType": "DoorNumber",
                            "fullAddress": null,
                            "addressLocationFullName": "España, Alicante, Marina Alta, Calpe, Calpe, Calpe Pueblo"
                        },
                        "emailAddress": "evolution@century21.es",
                        "telephoneNumber": "0",
                        "logo": "https://cdn.21online.app/v7/_c21cdn_/logo-evolution_80d026f2-fbf7-4c8a-9aba-a42fac02c76f.png"
                    }
                },
                "externalPortals": [
                    "Idealista",
                    "Global",
                    "Trovit",
                    "Yaencontre",
                    "GreenAcres",
                    "MLS España"
                ]
            },
            {
                "prospectSellerId": 2301976,
                "prospectStatus": "Cliente",
                "propertyId": 2886247,
                "contractNumber": "C0138-00001",
                "price": 155000.0,
                "businessType": "Venda",
                "propertyType": "Apartamento",
                "propertySubType": "Andar",
                "propertyTitlePT": null,
                "propertyDescriptionPT": null,
                "propertyTitleES": "Fantástico apartamento con vistas panorámicas",
                "propertyDescriptionES": "Este apartamento ha sido reformado integralmente y se encuentra nuevo, a estrenar. Gracias a la localización disfruta de unas magníficas vistas al mar, a la playa de la Fosa en Calpe, y recibe el sol durante todo el día. \n\nCuenta con un amplio dormitorio, un salón con cocina americana, un cuarto de baño con ducha  y una soleada terraza con vistas al mar y  al Peñón de Ifach. \n\nEl edificio cuenta con acceso adaptado para discapacitados, dos ascensores, parking exterior y se encuentra a 100 metros de las playas de arena. ",
                "propertyTitleEN": "Fantastic apartment with panoramic views",
                "propertyDescriptionEN": "This apartment has been completely renovated and is new, brand new.\n\nThanks to its location, it enjoys magnificent views of the sea, La Fosa beach in Calpe, and receives the sun throughout the day.\n\nIt has a large bedroom, a living room with a kitchenette, a bathroom with a shower and a sunny terrace with views of the sea and the Peñón de Ifach.\n\nThe building has access adapted for the disabled, two elevators, outdoor parking and is located 100 meters from the sandy beaches.",
                "propertyTitleFR": "Fantastic Apartment",
                "propertyDescriptionFR": "Cet appartement a été entièrement rénové et est neuf, tout neuf.\n\nGrâce à son emplacement, il bénéficie d'une vue magnifique sur la mer, la plage de La Fosa à Calpe, et reçoit le soleil toute la journée.\n\nIl comprend une grande chambre, un salon avec une kitchenette, une salle de bains avec douche et une terrasse ensoleillée avec vue sur la mer et le Peñón de Ifach.\n\nLe bâtiment dispose d'un accès adapté pour les personnes handicapées, de deux ascenseurs, d'un parking extérieur et est situé à 100 mètres des plages de sable.",
                "hasLift": true,
                "isGroundFloor": null,
                "isTopFloor": null,
                "grossArea": 57.00,
                "netArea": 57.00,
                "totalBedrooms": 1,
                "totalWC": 1,
                "totalRooms": null,
                "plotArea": null,
                "totalHalfWC": null,
                "totalParkingSpaces": 0,
                "totalApartmentsPerFloor": null,
                "constructionYear": 1974,
                "floorCount": null,
                "totalFloorsOfHouse": null,
                "netAreaQualifiable": true,
                "roomsQualifiable": true,
                "wcQualifiable": true,
                "isPrivateCondominium": true,
                "hasSanitation": null,
                "inLandSubdivision": null,
                "landFormatFrontSize": null,
                "landFormatBottomSize": null,
                "observationsPublic": "El gasto de comunidad incluye el agua al no tener contador independiente.",
                "address": {
                    "streetName": "llentiscle",
                    "buildingNumber": "4",
                    "floorNumber": "D",
                    "postalCode": "03710",
                    "locality": "Playa de Fossa-Levante",
                    "city": "Marina Alta",
                    "latitude": 38.6501676,
                    "longitude": 0.075854,
                    "doorType": "Porta nº",
                    "fullAddress": null,
                    "addressLocationFullName": " Marina Alta,  Calpe,  Playa de Fossa-Levante"
                },
                "lifeStyleType": "Praia",
                "viewType": "Mar",
                "orientationType": "Sul/Nascente",
                "energyPerformanceCertificateRating": null,
                "videoURL": null,
                "virtualRealityCode": "https://castlefocus.s3.eu-west-2.amazonaws.com/HWR350541+/index.html",
                "listingWebSiteMasterUrl": "https://www.century21.pt/ref/C0138-00001",
                "propertyPhotoList": [
                    {
                        "orderNumber": 1,
                        "fileName": "https://cdn.21online.app/v7/_c21cdn_/img-0866-copia_a07f82a5-4e99-4320-8206-ac8deff07ee8.jpg?w=1920&wat=1&org_if_sml=1"
                    }
                ],
                "equipmentTypeList": [],
                "surroundingTypeList": [
                    {
                        "name": "Supermercado",
                        "place": "Supermarket",
                        "distanceInMeters": 300
                    },
                    {
                        "name": "Praia",
                        "place": "Beach",
                        "distanceInMeters": 50
                    },
                    {
                        "name": "Supermercado",
                        "place": "Supermarket",
                        "distanceInMeters": 300
                    }
                ],
                "roomTypeList": [],
                "labels": {
                    "dropPrice": false,
                    "hidePrice": false,
                    "fullyFinanced": false
                },
                "agent": {
                    "id": "21a86cf6-2882-422a-ab90-59b8c704808e",
                    "name": "Pablo Faelli Abiega",
                    "emailAddress": "pablo.f@century21.es",
                    "role": "Broker",
                    "telephoneNumber": "",
                    "photo": "https://cdn.21online.app/v7/_c21cdn_/agent-photo_562892e5-3250-4815-ace9-723108a63f3e.png",
                    "mySiteUrl": "https://www.mysitec21.com/pablo-f",
                    "agency": {
                        "id": 6313,
                        "name": "CENTURY 21 Evolution",
                        "commercialName": "APF EVOLUTION S.L.",
                        "licence": "0",
                        "address": {
                            "streetName": "Avenida Gabriel Miró",
                            "buildingNumber": "14",
                            "floorNumber": null,
                            "postalCode": "03710",
                            "locality": "Calpe",
                            "city": "Alicante",
                            "latitude": 38.6435072,
                            "longitude": 0.0474966,
                            "doorType": "DoorNumber",
                            "fullAddress": null,
                            "addressLocationFullName": "España, Alicante, Marina Alta, Calpe, Calpe, Calpe Pueblo"
                        },
                        "emailAddress": "evolution@century21.es",
                        "telephoneNumber": "0",
                        "logo": "https://cdn.21online.app/v7/_c21cdn_/logo-evolution_80d026f2-fbf7-4c8a-9aba-a42fac02c76f.png"
                    }
                },
                "externalPortals": [
                    "Idealista",
                    "Global",
                    "Trovit",
                    "Yaencontre",
                    "GreenAcres",
                    "MLS España"
                ]
            }
        ]
        }`;
        return parseJsonToXML(source);
    };
    const config = {
        method: 'get',
        url: 'https://api.blendproducer.com/ListingWallet/v1/listing/v2/Wallet/GetWallet?Code=20B6764DB092406D98202C9EA9E79FBE&lang=en',
        headers: {
            'Ocp-Apim-Subscription-Key': 'd8f37f5ef7dc4d27b98be6cdaa5c265c',
            'Locale': 'en'
        }
    };
    const ax = await axios(config);
    return parseJsonToXML(JSON.stringify(ax.data));
    // axios(config).then(function (response) {
    //     console.log(`req sent`)
    //     return parseJsonToXML(JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
    // return parseJsonToXML(source);
};
function parseJsonToXML(source){
    source = source.replace(/\n\n/g, "\\n");
    let json = JSON.parse(source);
    json = json.items;
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
        province: address.locality,
        country: "spain",
        location: address,
        //location_detail: "optional location detail",
        beds,
        baths,
        //pool: 1,
        surface_area: {
            grossArea,
            plotArea
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
                    value = (value === 'Venda') ? 'sale' : 'month';
                    //if(equals(item()?['businessType'], 'For Sale'), 'sale', 'month')
                    parentEle.txt(value);
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
                    if(value === `exempt`) {
                        value = 'X';
                    }
                    parentEle.ele(`consumption`, value);
                    break;
                case `url`:
                    parentEle.ele(`es`, value);
                    break;
                case `images`:
                    for (let image of value) {
                        parentEle.ele(`image`, {
                            id: image.orderNumber
                        }).ele(`url`, image.fileName.split("?")[0]);
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

http.createServer(async function (req, res) {
    prod = url.parse(req.url, true).query['production'];
    console.log(prod);
    if (!prod) return;
    const xml = await start(prod);
    console.log(xml);
    res.writeHead(200, {
        'Content-Type': 'application/xml'
    });
    res.write(xml); //write a response to the client
    res.end(); //end the response
}).listen(8080);
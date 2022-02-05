
///Recupérer les variables à partir du HTML 
var population = document.getElementById('population');
var region = document.getElementById('region');
var superficie = document.getElementById('superficie');
var adminsitraion = document.getElementById('administration');
var monument = document.getElementById('monument');
var labelMonument = document.getElementById('label-monument')
            
//..........BASE MAPS ........................
var openstreetMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            })
googlesatellite  = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
{ maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3'],
iconURL: '//stamen-tiles-a.a.ssl.fastly.net/toner/4/2/5.png'
});
googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
{ maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3'] });
var grayscale = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', 
{attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'}),
streets   = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
{attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'});

var map = L.map('map', {
    center: [17.47, 10.04],
    zoom: 6,
    layers: [openstreetMap],

    });

    map.options.minZoom = 5;
    map.options.maxZoom = 9;

var baseLayers = {
    "OSM fond noir": openstreetMap,
    "OpenStreetMap": streets,
    "Google Satellite": googlesatellite,
    "Google Hybride ":googleHybrid,


};

L.control.layers(baseLayers).addTo(map);


// Fonctions permettant de creer la carte chloroplète

//-----------------------------------------------------------------------------------------------
    function getColor(d) {
        return(d >=0 && d <=0.82) ?  '#ffffb2' :
                    (d >0.82 && d <=4.27) ?  '#FED976' :
                    (d >4.27 && d <=26.53) ?  '#FEB24C' :
                    (d >26.53 && d <=32.45 ) ?  '#FD8D3C' :
                    (d >32.45 && d <=33.87 ) ?  '#FC4E2A' :
                    (d >33.87 && d <=69.99 ) ? '#E31A1C':
                    (d >69.99 && d <=95.40 ) ? '#BD0026' : '#800026' ;
                                
                    }

function style(feature) {
    return {
        fillColor: getColor(feature.properties.densite),
        weight: 2,
        opacity: 1,
        color: '#13385e',
        dashArray: '3',
        fillOpacity: 0.6
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 4,
        color: 'white',
        dashArray: '',
        fillOpacity: 1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
        info.update(layer.feature.properties);

}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
        info.update();

}
function zoomToFeature(e) {
    var currentLayer = e.target;
    console.log(currentLayer.feature.properties);
    region.value = currentLayer.feature.properties.name
    population.value = currentLayer.feature.properties.population
    superficie.value = currentLayer.feature.properties.Superficie
    var departements = currentLayer.feature.properties.nb_depts
    var communes = currentLayer.feature.properties.nb_comunes
    var cantons = currentLayer.feature.properties.cantons
    var sultanat = currentLayer.feature.properties.sultanat
    var groupements = currentLayer.feature.properties.groupement
    adminsitraion.value = `La région de ${region.value} est subdivisée en :
     ${departements} départements
     ${communes} communes 
     ${cantons} cantons 
     ${sultanat} sultanat 
     ${groupements} groupements`

     if(region.value === 'Agadez'){
         labelMonument.innerText = "Mosquée d'Agadez"
         monument.src = 'images/agadez.jpg'
         imageStyle(monument);

     }else if (region.value === 'Diffa'){
        labelMonument.innerText = "Entrée ville Diffa"
        monument.src = 'images/diffa.jpg'
        imageStyle(monument);
        

     }else if (region.value === 'Dosso'){
        labelMonument.innerText = "Statue place Djermakoye"
        monument.src = 'images/dosso.jpg'
        imageStyle(monument);
     }

     else if (region.value === 'Maradi'){
        labelMonument.innerText = "Monument des 7 Haoussas"
        monument.src = 'images/maradi.jpg'
        imageStyle(monument);
     }

     else if (region.value === 'Niamey'){
        labelMonument.innerText = "Rond-point liberté"
        monument.src = 'images/niamey.jpg'
        imageStyle(monument);
     }

     else if (region.value === 'Tahoua'){
        labelMonument.innerText = "Entrée ville de Tahoua"
        monument.src = 'images/tahoua.jpg'
        imageStyle(monument);
     }
     else if (region.value === 'Tillabéri'){
        labelMonument.innerText = "Entrée ville de Tillaberi"
        monument.src = 'images/tillaberi.jpg'
        imageStyle(monument);
     }
     else{
        labelMonument.innerText = "Sultanat de zinder"
        monument.src = 'images/zinder.jpg'
        imageStyle(monument);
     }





    console.log(currentLayer.feature.properties.population)
    console.log(currentLayer.feature.properties.name)

    
map.fitBounds(currentLayer.getBounds());
}

function imageStyle(input){
    input.style.width = '250px';
    input.style.height = '250px';
    input.classList.add('center-img');

}
function onEachFeature(feature, layer) {
layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
});
layer.bindTooltip(feature.properties.name, {permanent: true, direction: 'right'}).openTooltip();
}                  
var geojson = L.geoJSON(features,
{style : style,
onEachFeature: onEachFeature,
}).addTo(map)



//-------------------------------LEGEND----------------------
        //----------------LEGEND-------------------
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0,0.82,4.27,6.53,32.45,33.87,69.99,95.40,4500],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    div.innerHTML=" <b> Densité de la population Niger(2017) </b><br>"
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML += '<i style="background:' + getColor(grades[i]+0.01) + '"></i> ' +
            grades[i] + (grades[i + 1] ? ' - ' + grades[i+1 ] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

var info = L.control({position: 'topright'});

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'pop'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML ='<h4>Infos sur les régions du NIGER(2017) </h4><br/>' +  (props ?
        'Région: <b>' + props.name + '</b><br /> Superficie: <b> '+props.Superficie+ ' km²</b><br/> Population :<b> ' + props.population + ' habitants</b><br/> Densité :<b> ' + props.densite+ ' habitants/km²</b><br/> </sup>'
        : 'Merci de mettre le cursuer sur la region');
};
info.addTo(map);

// ADDING SCALE CONTROL

/** ADDING WATERMark*/

L.Control.Watermark = L.Control.extend({
    onAdd: function(map) {
        var img = L.DomUtil.create('img');

        img.src = 'images/logo.png';
        img.style.width = '100px';
        img.style.borderRadius = '50px';

        return img;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});

L.control.watermark = function(opts) {
    return new L.Control.Watermark(opts);
}

L.control.watermark({ position: 'bottomleft' }).addTo(map);


var drawnItems = new L.FeatureGroup();
     map.addLayer(drawnItems);
     var drawControl = new L.Control.Draw({
         edit: {
             featureGroup: drawnItems
         }
     });
     map.addControl(drawControl);

     var searchControl = new L.Control.Search({
        layer: geojson,  // Determines the name of variable, which includes our GeoJSON layer!
        propertyName: 'name',
        marker: false,
        });
        
        searchControl.on('search:locationfound', function(e) {
        
        map.fitBounds(e.layer.getBounds());
        e.layer.setStyle({fillColor: '#f37550', color: '#0f0'});
        
        }).on('search:collapsed', function(e) {
        
        featuresLayer.eachLayer(function(layer) {   //restore feature color
            featuresLayer.resetStyle(layer);
        }); 
        });
        
        map.addControl( searchControl ); 


        L.control.graphicScale({
            fill : 'hollow',
            doubleLine : true,
            labelPlacement : 'top',
            showSubunits: true
        }).addTo(map);
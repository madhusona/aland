import React, { useEffect, useState, useRef } from "react";
import "leaflet-search/dist/leaflet-search.min.css"
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
const icon = L.icon({ iconUrl: "/Auroville_symbol.svg", iconSize: new L.Point(20, 34) });
export default function Map({land}) {
  console.log("in function")
  console.log(land)
  useEffect(() => {
    const position = [12.00712, 79.81010]
    
    let current_zoom = 16;
    let center_zoom = current_zoom;

    // The <div id="map"> must be added to the dom before calling L.map('map')
    
    let map = L.map('map', {
      center: position,
      zoom: center_zoom
    
    },{
      searchControl: {layer: searchLayer}
    });
    var searchLayer = L.layerGroup().addTo(map);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    land.map((item,index) => {
      if(item.lat !="-")
      {
        L.marker([item.lat,item.lg],{icon:icon}).addTo(map);
      }
      
     // var searchLayer = L.geoJson().addTo(map);
      //... adding data in searchLayer ...
     // L.map('map', {  });
    })
    return () => map.remove();
  });

  return <div id="map" style={{ height: "30vh" }}></div>
}

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const getColorByType = (type) => { // Function to get color by asset type
  switch (type) {
    case "pozo":
      return "#1E90FF";
    case "motor":
      return "#32CD32";
    case "transformador":
      return "#FFA500";
    default:
      return "#999";
  }
};

const AssetsMapView = ({ assets = [] }) => { // MapView component to display assets on a map
  const mapContainer = useRef(null); // Reference to the map container
  const map = useRef(null); // Reference to the map instance
  const markersRef = useRef([]); //Reference the markers in map

  useEffect(() => {
    if (map.current) return;  // Initialize map only once

    map.current = new mapboxgl.Map({ // Create a new map instance
      container: mapContainer.current, //Container for the map
      style: "mapbox://styles/mapbox/streets-v11", //Map style
      center: [-74.06, 4.67], //Initial map center in Bogotá
      zoom: 10, //Initial zoom level
    });
  }, []);

  useEffect(() => {
    if (!map.current || !assets.length) return;  // Wait for map to load and assets to be available

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const validAssets = assets.filter(
      (asset) =>
        !isNaN(parseFloat(asset.latitude)) &&
        !isNaN(parseFloat(asset.longitude))
    ); //Filter only assets that are numbers (prevent load errors)

    validAssets.forEach((asset) => { //Iterate each valid asset to create a marker
      const el = document.createElement("div"); //Create a new div element for each marker
      el.style.backgroundColor = getColorByType(asset.type); //Set the background color based on asset type 
      el.style.width = "20px"; 
      el.style.height = "20px";
      el.style.borderRadius = "50%";
      el.style.border = "2px solid white";
      el.style.boxShadow = "0 0 4px rgba(0,0,0,0.5)";
      el.style.cursor = "pointer";

      const marker = new mapboxgl.Marker(el)  //Create the marker
        .setLngLat([parseFloat(asset.longitude), parseFloat(asset.latitude)])  // Set marker position
        .setPopup( 
          new mapboxgl.Popup().setHTML( // Create a popup with asset details
            `<strong>${asset.name}</strong><br/>Tipo: ${asset.type}<br/>Lat: ${asset.latitude}<br/>Lng: ${asset.longitude}`
          )
        )
        .addTo(map.current);  // Add marker to the map

      markersRef.current.push(marker); // Add the new marker to the current list of markers stored in the ref
    });
  }, [assets]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "8px",
        marginTop: "10px",
        marginBottom: "20px"
      }}
    />
  );
};

export default AssetsMapView;
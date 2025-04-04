import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zZXNhbG9wYXNvIiwiYSI6ImNtOTMzc2RsbTBpbmkya3ExdHA0MjFpNWkifQ.-WZUzhvFTM_AEgGZKxkUaA';

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

const MapView = ({ assets = [] }) => { // MapView component to display assets on a map
  const mapContainer = useRef(null); // Reference to the map container
  const map = useRef(null); // Reference to the map instance

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({ // Create a new map instance
      container: mapContainer.current, // // Container for the map
      style: "mapbox://styles/mapbox/streets-v11", // Map style
      center: [-74.06, 4.67],   // Initial map center (Bogotá)
      zoom: 10, // Initial zoom level
    });
  }, []);

  useEffect(() => {
    if (!map.current || !assets.length) return; // Wait for map to load and assets to be available

    assets.forEach((asset) => { // Loop through each asset and create a marker
      const el = document.createElement("div"); // Create a new div element for the marker
      el.style.backgroundColor = getColorByType(asset.type); // Set background color based on asset type
      el.style.width = "20px"; // Set width of the marker
      el.style.height = "20px"; // Set height of the marker
      el.style.borderRadius = "50%"; // Make it circular
      el.style.border = "2px solid white"; // Add a white border
      el.style.boxShadow = "0 0 4px rgba(0,0,0,0.5)"; // Add shadow
      el.style.cursor = "pointer"; // Change cursor to pointer on hover

      new mapboxgl.Marker(el) // Create a new marker
        .setLngLat([asset.longitude, asset.latitude]) // Set marker position
        .setPopup( 
          new mapboxgl.Popup().setHTML( // Create a popup with asset details
            `<strong>${asset.name}</strong><br/>Tipo: ${asset.type}<br/>Lat: ${asset.latitude}<br/>Lng: ${asset.longitude}` 
          )
        )
        .addTo(map.current); // Add marker to the map
    });
  }, [assets]);

  return (
    <div
      ref={mapContainer} // Reference to the map container
      style={{ width: "100%", height: "500px", borderRadius: "8px", marginTop: "1rem" }}
    />
  );
};

export default MapView;
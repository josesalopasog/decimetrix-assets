//Packages ⬇️
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//Slices ⬇️
import { fetchAssets, } from "../../../redux/slices/assetsSlice";
//Custom Hooks ⬇️
import useWSNotifications from "../../../hooks/useWSNotifications";
//Components ⬇️
import AssetsMapView from "../../../components/AssetsMapView";
import AssetsTable from "../../../components/AssetsTable";
import AssetsForm from "../../../components/AssetsForm";
//Styles ⬇️
import "./styles.css";
import { openSideMenu } from "../../../redux/slices/uiSlice";

const Assets = () => {
    useWSNotifications(); //Hook fot WS events
    const location = useLocation(); // Hook to get the current location
    const dispatch = useDispatch(); // Hook to send actions to redux
    const { assets, loading, error } = useSelector((state) => state.assets); // Selectors to get assets, loading and error states from redux
    
    useEffect(() => {
        dispatch(fetchAssets());
        dispatch(openSideMenu());
    }, [dispatch]);

    useEffect(() => {
        if (location.hash) { // Checks if the URL contains a hash
            const targetId = location.hash.replace("#", ""); // Removes the '#' to get the actual ID
            const targetElement = document.getElementById(targetId); // Tries to find the element with that ID
            if (targetElement) { //If there is and element with that ID
                targetElement.scrollIntoView({ behavior: "smooth" }); //Smoothly scrolls to the element
            }
        }
    }, [location]);

    if (loading) return <p>Cargando activos...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="assets-container">
            <div className="assets-content">
                <h1 className="assets-title" id="see-assets">Activos</h1>
                <AssetsTable assets={assets} />
                <h2 className="assets-title" id="add-assets">Agregar Activo</h2>
                <AssetsForm />
                <h2 className="assets-title" id="assets-map">Mapa</h2>
                <AssetsMapView assets={assets} />
            </div>
        </div>
    );
};

export default Assets;
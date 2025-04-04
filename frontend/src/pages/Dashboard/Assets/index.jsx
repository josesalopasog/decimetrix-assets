//Packages ⬇️
import { useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
//Slices ⬇️
import { fetchAssets, createAsset } from "../../../redux/slices/assetsSlice";
//Components ⬇️
import MapView from "../../../components/MapView";
//Assets⬇️
import { PluseCircleIcon } from "../../../assets/icons";
import "./styles.css";

const Assets = () => {
    const location = useLocation(); // Hook to get the current location
    const dispatch = useDispatch(); // Hook to send actions to redux
    const { assets, loading, error } = useSelector((state) => state.assets); // Get assets data from redux store
    const [newAssetData, setNewAssetData] = useState({ // State to manage new asset data
        name: "",
        type: "",
        description: "",
        latitude: "",
        longitude: "",
    });
    //Functions ⬇️
    const handleInputChange = (e) => { // Function to handle input changes in the form
        const { name, value } = e.target; // Destructure name and value from the event target
        setNewAssetData((prevData) => ({ // Update the state with the new value
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => { // Function to handle form submission
        e.preventDefault(); // Prevent default form submission behavior

        try { // Create a new asset using the data from the form
            dispatch(createAsset(newAssetData)).unwrap(); // Dispatch the action to create a new asset
            dispatch(fetchAssets()); // Fetch the updated list of assets

            setNewAssetData({ // Reset the form fields after submission
                name: "",
                type: "",
                description: "",
                latitude: "",
                longitude: "",
            });

        } catch (error) { // Handle any errors that occur during asset creation
            console.error("Error al crear el activo:", error);
        }
    };
    //Effects ⬇️
    useEffect(() => {  // Scroll to the target element if there is a hash in the URL
        if (location.hash) { // Check if there is a hash in the URL
            const targetId = location.hash.replace("#", ""); // Get the target ID from the hash
            const targetElement = document.getElementById(targetId); // Get the target element by ID
            if (targetElement) { // Check if the target element exists
                targetElement.scrollIntoView({ behavior: "smooth" }); // Scroll to the target element smoothly
            }
        }
    }, [location]); // Run this effect when the location changes

    useEffect(() => { // Fetch assets when the component mounts
        dispatch(fetchAssets()); // Dispatch the action to fetch assets
    }, [dispatch]); // Run this effect only once when the component mounts

    // Render the component ⬇️
    if (loading) return <p>Cargando activos...</p>; // Show loading message while fetching assets
    if (error) return <p>Error: {error}</p>; // Show error message if there is an error

    return (
        <div className="assets-container">
            <div className="assets-content">
                <h1 className="assets-title" id="see-assets">Activos</h1>
                <TableContainer component={Paper} className="assets-table-container">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Latitud</TableCell>
                                <TableCell>Longitud</TableCell>
                                <TableCell>Fecha de Creación</TableCell>
                                <TableCell>Creado por</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assets.map((asset, index) => (
                                <TableRow key={asset.id || asset._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{asset.name}</TableCell>
                                    <TableCell>{asset.type}</TableCell>
                                    <TableCell>{asset.description}</TableCell>
                                    <TableCell>{asset.latitude}</TableCell>
                                    <TableCell>{asset.longitude}</TableCell>
                                    <TableCell>{new Date(asset.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{asset.createdBy?.username || "Unknown"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <h2 className="assets-title" id="add-assets">Agregar Activo</h2>
                <form className="assets-form" onSubmit={handleSubmit}>

                    <div className="form-group name">
                        <label>Nombre del activo:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            value={newAssetData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group type">
                        <label>Tipo de activo:</label>
                        <select
                            name="type"
                            value={newAssetData.type}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">-- Selecciona tipo --</option>
                            <option value="transformador">Transformador</option>
                            <option value="pozo">Pozo</option>
                            <option value="motor">Motor</option>
                        </select>
                    </div>


                    <div className="form-group description">
                        <label>Descripción (máx. 120 caracteres):</label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Descripción"
                            maxLength={120}
                            value={newAssetData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>


                    <div className="form-group latitude">
                        <label>Latitud:</label>
                        <input
                            type="number"
                            name="latitude"
                            placeholder="Latitud"
                            value={newAssetData.latitude}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group longitude">
                        <label>Longitud:</label>
                        <input
                            type="number"
                            name="longitude"
                            placeholder="Longitud"
                            value={newAssetData.longitude}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group button">
                        <button type="submit">
                            <PluseCircleIcon className="add-icon" />
                            <span>Agregar</span>
                        </button>
                    </div>
                </form>
                <h2 className="assets-title" id="assets-map">Mapa</h2>
                <div className="map-container">
                    <MapView assets={assets} />
                </div>
            </div>
        </div>
    );
};

export default Assets;
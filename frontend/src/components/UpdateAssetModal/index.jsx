//Packages ⬇️
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
//Slices ⬇️
import { updateAsset, fetchAssets } from "../../redux/slices/assetsSlice";
//Assets ⬇️
import { PencilSquareIcon } from "../../assets/icons";
//Styles ⬇️
import "./styles.css";

const UpdateAssetModal = ({ open, onClose, asset }) => {
    const dispatch = useDispatch(); //Hook to send actions to redux
    const [updatedData, setUpdatedData] = useState({ //State to manage the updated data
        name: "",
        type: "",
        description: "",
        latitude: "",
        longitude: "",
    });
    useEffect(() => { // Run this effect whenever the 'asset' prop changes
        if (asset) { // If the asset exists 
            setUpdatedData({ // Set the form state with asset's current data or with empty data
                name: asset.name || "",
                type: asset.type || "",
                description: asset.description || "",
                latitude: asset.latitude || "",
                longitude: asset.longitude || "",
            });
        }
    }, [asset]); // Re-run the effect every time 'asset' changes
    //Functions ⬇️
    const handleChange = (e) => { // Function to handle input changes in the form
        const { name, value } = e.target; // Destructure name and value from the event target
        setUpdatedData((prevData) => ({ // Update the state with the updated value
            ...prevData,  //Copy data in a new object
            [name]: value, //Updates the field that change
        }));
    };

    const handleSubmit = async (e) => { // Function to handle form submission
        e.preventDefault(); // Prevent default form submission behavior (e:event don't reload the page)
        try {
            if (!asset?._id) return;
            await dispatch(updateAsset({ id: asset._id, assetData: updatedData })).unwrap(); // Dispatch the action to update a new asset ny ID
            dispatch(fetchAssets()); // Fetch the updated list of assets
            onClose(); //Close the modal
            setUpdatedData({ // Reset the form fields after submission
                name: "",
                type: "",
                description: "",
                latitude: "",
                longitude: "",
            });

        } catch (error) { // Handle any errors that occur during asset creation and show in console
            console.error("Error al crear el activo:", error);
        }
    };

    if (!open) return null;

    return (
        <div className="update-modal-overlay" onClick={onClose}>
            <div
                className="update-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="update-modal-title">
                    <PencilSquareIcon className="update-modal-icon" />
                    <span>Editar Activo</span>
                </h2>
                <form onSubmit={handleSubmit} className="update-form">
                    <div className="form-group name">
                        <label>Nombre del activo:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            value={updatedData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group type">
                        <label>Tipo de activo:</label>
                        <select
                            name="type"
                            value={updatedData.type}
                            onChange={handleChange}
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
                            value={updatedData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group latitude">
                        <label>Latitud Bogotá (De 4.84 hasta 4.84) :</label>
                        <input
                            type="number"
                            name="latitude"
                            placeholder="Latitud"
                            value={updatedData.latitude}
                            onChange={handleChange}
                            step="0.0001"
                            min="4.48"
                            max="4.84"
                            required
                        />
                    </div>
                    <div className="form-group longitude">
                        <label>Longitud Bogotá (De -74.30 hasta -73.99):</label>
                        <input
                            type="number"
                            name="longitude"
                            placeholder="Longitud"
                            value={updatedData.longitude}
                            onChange={handleChange}
                            step="0.0001"
                            min="-74.30"
                            max="-73.99"
                            required
                        />
                    </div>
                    <div className="update-buttons">
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAssetModal;
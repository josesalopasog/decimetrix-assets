// Packages ⬇️
import { useDispatch } from "react-redux";
import { useState } from "react";
// Slices ⬇️
import { createAsset, fetchAssets } from "../../redux/slices/assetsSlice";
// Assets ⬇️
import { PluseCircleIcon } from "../../assets/icons";
//Styles ⬇️
import "./styles.css";

const AssetsForm = () => {
    const dispatch = useDispatch(); //Hook to send actions to redux
    const [newAssetData, setNewAssetData] = useState({ //State to manage new asset data
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
            ...prevData,  //Copy data in a new object
            [name]: value, //Updates the field that change
        }));
    };
    const handleSubmit = async (e) => { // Function to handle form submission
        e.preventDefault(); // Prevent default form submission behavior (e:event don't reload the page)
        try {
            await dispatch(createAsset(newAssetData)).unwrap(); // Dispatch the action to create a new asset
            dispatch(fetchAssets()); // Fetch the updated list of assets

            setNewAssetData({ // Reset the form fields after submission
                name: "",
                type: "",
                description: "",
                latitude: "",
                longitude: "",
            });

        } catch (error) { // Handle any errors that occur during asset creation and show in console
            console.error("Error creating new asset: ", error);
        }
    };

    return (
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
                <label>Latitud Bogotá (De 4.84 hasta 4.84) :</label>
                <input
                    type="number"
                    name="latitude"
                    placeholder="Latitud"
                    value={newAssetData.latitude}
                    onChange={handleInputChange}
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
                    value={newAssetData.longitude}
                    onChange={handleInputChange}
                    step="0.0001"
                    min="-74.30"
                    max="-73.99"
                    required
                />
            </div>
            <div className="button-add-asset">
                <button type="submit">
                    <PluseCircleIcon className="add-icon" />
                    <span>Agregar</span>
                </button>
            </div>
        </form>
    );
};

export default AssetsForm;
//Packages ⬇️
import React from "react";
import { useDispatch } from "react-redux";
//Slices ⬇️
import { deleteAsset, fetchAssets } from "../../redux/slices/assetsSlice";
//Assets ⬇️
import { GarbageIcon } from "../../assets/icons";
//Styles ⬇️
import "./styles.css";

const DeleteAssetModal = ({ open, onClose, asset }) => {
    const dispatch = useDispatch(); //Hook to send actions to redux
    if (!open) return null; //Prevents to render the modal if is not open

    const handleDelete = async (e) => { //Function to handle delete asset
        e.preventDefault(); // Prevent default form submission behavior (e:event don't reload the page)
        try {
            if (!asset._id) return; //If there is not an id return 
            await dispatch(deleteAsset(asset._id)).unwrap();  // Dispatch the action to delete the asset by ID
            dispatch(fetchAssets()); // Fetch the updated list of assets
            onClose(); //Close the modal
        } catch (error) {
            console.error("Error al crear el activo:", error); // Handle any errors that occur during asset delete and show in console
        }
    };
    return (
        <div className="delete-modal-overlay" onClick={onClose}>
            <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
                <h2 className="delete-modal-title">
                   <GarbageIcon className="delete-modal-icon" />
                    <span>Eliminar Activo</span>
                </h2>
                <p>
                    ¿Deseas eliminar el activo <strong>{asset?.name ?? "Desconocido"}</strong>?
                </p>
                <div className="delete-buttons">
                    <button onClick={handleDelete}>Sí, eliminar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAssetModal;
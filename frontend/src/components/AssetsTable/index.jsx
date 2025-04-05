//Packages ⬇️
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from "@mui/material";
import { useState } from "react";
//Components ⬇️
import UpdateAssetModal from "../UpdateAssetModal"
import DeleteAssetModal from "../DeleteAssetModal";
//Assets ⬇️
import { GarbageIcon, PencilSquareIcon } from "../../assets/icons";
//Styles ⬇️
import "./styles.css";

const AssetsTable = ({ assets}) => {
    const [updateModalOpen, setUpdateModalOpen] = useState(false); //State to open and close edit modal
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); //Stat to open and coles delete modal
    const [selectedAsset, setSelectedAsset] = useState(null); //State to select the asset to edit or delete
    //Functions ⬇️
    const openUpdateModal = (asset) => { //To open de Update Modal when the user clicks the icon 
        setSelectedAsset(asset); //Select the asset where the user clicks
        setUpdateModalOpen(true);
    };
    const openDeleteModal = (asset) => { //To open de Delete Modal when the user clicks the icon 
        setSelectedAsset(asset); //Select the asset where the user clicks
        setDeleteModalOpen(true);
    };

    return (
        <>
            <TableContainer component={Paper} className="assets-table-container">
                <Table>
                    <TableHead className="assets-table-head">
                        <TableRow className="assets-table-row">
                            <TableCell></TableCell>
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
                        {assets.map((asset, index) => { //Iterates each asset and get and index
                            let borderColor; 
                            switch (asset.type?.toLowerCase()) { //Set the color for each type
                                case "transformador":
                                    borderColor = "#FFA500"; //Orange for "transformador"
                                    break;
                                case "pozo":
                                    borderColor = "#1E90FF"; //Blue for "pozo"
                                    break;
                                case "motor":
                                    borderColor = "#32CD32"; //Green for "motor"
                                    break;
                                default:
                                    borderColor = "#fff"; //White for default
                            }

                            return (
                                <TableRow
                                    key={asset.id || asset._id || index} //Key so react can render all assets
                                    style={{ borderLeft: `6px solid ${borderColor}` }}  //Set left border color based on asset type
                                >
                                    <TableCell>
                                        <div className="buttons-container">
                                            <PencilSquareIcon
                                                className="update-icon"
                                                onClick={() => openUpdateModal(asset)}
                                            />
                                            <GarbageIcon
                                                className="delete-icon"
                                                onClick={() => openDeleteModal(asset)}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{asset.name}</TableCell>
                                    <TableCell>{asset.type}</TableCell>
                                    <TableCell>{asset.description}</TableCell>
                                    <TableCell>{asset.latitude}</TableCell>
                                    <TableCell>{asset.longitude}</TableCell>
                                    <TableCell>
                                        {asset.createdAt
                                            ? new Date(asset.createdAt).toLocaleDateString()
                                            : "NaN"}
                                    </TableCell>
                                    <TableCell>
                                        {asset.createdBy?.username || "Null"}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <UpdateAssetModal
                open={updateModalOpen} //Flag to control update modal control
                onClose={() => setUpdateModalOpen(false)} //Set update modal state to close the modal
                asset={selectedAsset} //Set the selected asset to update
            />

            <DeleteAssetModal
                open={deleteModalOpen} //Flag to control delete modal control
                onClose={() => setDeleteModalOpen(false)} //Set update modal state to close the modal
                asset={selectedAsset} //Set the selected asset to update
            />
        </>
    );
};

export default AssetsTable;
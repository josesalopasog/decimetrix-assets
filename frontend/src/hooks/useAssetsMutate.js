import { mutate } from 'swr';

const mutateAssets = (assets = null) => {
    mutate('/assets', assets, false); // Update the local cache with the new asset data
}

export default mutateAssets; // Export the function for use in other parts of the application

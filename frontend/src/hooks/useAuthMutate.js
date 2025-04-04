import { mutate } from 'swr';

const mutateAuth = (user = null) => {
    mutate('/users/me', user, false); // Update the local cache with the new user data
};

export default mutateAuth;
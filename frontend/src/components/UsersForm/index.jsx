//Packages ⬇️
import { useState } from "react";
import { useDispatch } from "react-redux";
//Slices ⬇️
import { fetchUsers, createUser } from "../../redux/slices/userSlice";
//Assets ⬇️
import { PluseCircleIcon } from "../../assets/icons";
//Styles ⬇️
import "./styles.css";

const UsersForm = () => {
    const dispatch = useDispatch(); //Hook to send actions to redux
    const [showPassword, setShowPassword] = useState(false);
    const [newUserData, setNewUserData] = useState({ //State to manage new user data
        username: "",
        email: "",
        role: "",
        password: "",
    });
    //Functions ⬇️
    const handleInputChange = (e) => { // Function to handle input changes in the form
        const { name, value } = e.target; // Destructure name and value from the event target
        setNewUserData((prevData) => ({ // Update the user state with the new value
            ...prevData, //Copy data in a new object
            [name]: value, //Updates the field that change
        }));
    };
    const handleSubmit = async (e) => { // Function to handle form submission
        e.preventDefault(); // Prevent default form submission behavior (e:event don't reload the page)
        try {
            await dispatch(createUser(newUserData)).unwrap(); // Dispatch the action to create a new user
            dispatch(fetchUsers()); // Fetch the updated list of users
            setNewUserData({ // Reset the form fields after submission
                username: "",
                email: "",
                password: ""
            });
        } catch (error) { // Handle any errors that occur during asset creation and show in console
            console.error("Error al crear el usuario:", error);
        }
    };

    return (
        <form className="users-form" onSubmit={handleSubmit}>
            <div className="form-group username">
                <label>Nombre de usuario:</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Usuario"
                    value={newUserData.username}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-group email">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUserData.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-group role">
                <label>Rol:</label>
                <select
                    name="role"
                    value={newUserData.role}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">-- Selecciona tipo --</option>
                    <option value="operario">operario</option>
                    <option value="admin">admin</option>
                </select>
            </div>
            <div className="form-group password">
                <label>Contraseña:</label>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Contraseña"
                    value={newUserData.password}
                    onChange={handleInputChange}
                    required
                />
                <div className="show-password-checkbox">
                    <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label htmlFor="showPassword">Mostrar contraseña</label>
                </div>
            </div>
            <div className="button-add-user">
                <button type="submit">
                    <PluseCircleIcon className="add-icon" />
                    <span>Agregar</span>
                </button>
            </div>
        </form>
    )
};

export default UsersForm;
// import libraries from react
import { createContext, useState, useEffect } from "react";

const initUesr = {
    username: "",
    password: "",
    instrument: "",
}

const getInitialState = () => {
    const user = localStorage.getItem("user");
    console.log("Local storage user", user)
    return user ? JSON.parse(user) : initUesr;
}

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [user, setUser] = useState(getInitialState);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const login = (username, password, instrument) => {
        const updatedUser = {
            ...user,
            username: username,
            password: password,
            instrument: instrument,
        };
        setUser(updatedUser);
    }
    const signUp = (username, password, instrument) => {
        const newUser = {
            username: username,
            password: password,
            instrument: instrument,
        };
        setUser(newUser);
    };


    return (
        <AuthContext.Provider value={{ user, signUp, login }} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
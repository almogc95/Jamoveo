// import libraries from react
import { createContext, useState, useEffect } from "react";

const initAdmin = {
    adminname: "",
    adminpassword: "",
    adminrole: "admin",
}

const getInitialStateAdmin = () => {
    const admin = localStorage.getItem("admin");
    console.log("Local storage admin", admin)
    return admin ? JSON.parse(admin) : initAdmin;
}

export const AuthContextAdmin = createContext();

const AuthContextProviderAdmin = (props) => {
    const [admin, setAdmin] = useState(getInitialStateAdmin);

    useEffect(() => {
        localStorage.setItem("admin", JSON.stringify(admin));
    }, [admin]);

    const adminLogin = (adminname, adminpassword) => {
        const updatedAdmin = {
            ...admin,
            adminname: adminname,
            adminpassword: adminpassword,
        };
        setAdmin(updatedAdmin);
    }

    const signUpAdmin = (adminname, adminpassword, adminrole) => {
        const newAdmin = {
            adminname: adminname,
            adminpassword: adminpassword,
            adminrole: adminrole
        };
        setAdmin(newAdmin);
    };


    return (
        <AuthContextAdmin.Provider value={{ admin, signUpAdmin, adminLogin }}>
            {props.children}
        </AuthContextAdmin.Provider>
    )
}

export default AuthContextProviderAdmin;
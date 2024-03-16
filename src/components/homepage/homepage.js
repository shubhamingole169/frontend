import React, { useState, useEffect } from "react";
import "./homepage.css";

const Homepage = ({ setLoginUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("https://elansol-backend.onrender.com/users");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleRemoveUser = async (userId) => {
        try {
            const response = await fetch(`https://elansol-backend.onrender.com/${userId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                
                fetchUsers();
            } else {
                console.error("Failed to remove user");
            }
        } catch (error) {
            console.error("Error removing user:", error);
        }
    };

    return (
        <div className="homepage">
        <h1>Elansol User Database</h1>
            <table className="borderless-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.dob}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleRemoveUser(user._id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button" onClick={() => setLoginUser({})}>Logout</div>
        </div>
    );
};

export default Homepage;

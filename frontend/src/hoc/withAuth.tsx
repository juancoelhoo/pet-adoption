import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const withAuth = (WrappedComponent: React.ComponentType) => {
    const AuthHOC: React.FC = (props) => {
        const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
        const navigate = useNavigate();

        useEffect(() => {
            const checkAuth = async () => {
                try {
                    await axios.get("http://localhost:3333/users/auth-check", {
                        withCredentials: true
                    });
                    setIsAuthenticated(true);
                } catch (error) {
                    navigate("/login");
                }
            };

            checkAuth();
        }, [navigate]);

        if (!isAuthenticated) {
            return null; // Ou um componente de carregamento
        }

        return <WrappedComponent {...props} />;
    };

    return AuthHOC;
};

export default withAuth;

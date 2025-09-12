import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        console.log('🔍 Loading user from localStorage:', storedUser);
        return storedUser ? JSON.parse(storedUser) : null;
    });
    
    const [tenant, setTenant] = useState(() => {
        const storedTenant = localStorage.getItem('tenant');
        console.log('🔍 Loading tenant from localStorage:', storedTenant);
        return storedTenant ? JSON.parse(storedTenant) : null;
    });
    
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('token');
        console.log('🔍 Loading token from localStorage:', storedToken);
        return storedToken;
    });

    // Updated login to accept tenant
    const login = (userData, jwt, tenantData) => {
        console.log('🚀 Login called with:');
        console.log('  userData:', userData);
        console.log('  jwt:', jwt);
        console.log('  tenantData:', tenantData);

        setUser(userData);
        setTenant(tenantData);
        setToken(jwt);

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('tenant', JSON.stringify(tenantData));
        localStorage.setItem('token', jwt);

        console.log('✅ Data stored to localStorage');
        console.log('  user:', JSON.stringify(userData));
        console.log('  tenant:', JSON.stringify(tenantData));
    };

    console.log('🔄 AuthContext current state:');
    console.log('  user:', user);
    console.log('  tenant:', tenant);
    console.log('  tenant keys:', tenant ? Object.keys(tenant) : 'tenant is null');

    const logout = () => {
        console.log('🚪 Logout called');
        setUser(null);
        setTenant(null);
        setToken(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ user, tenant, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
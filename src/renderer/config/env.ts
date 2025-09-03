/* interface EnvironmentConfig {
    BASEURL: string;
    NODE_ENV: string;
}

function getEnvironmentConfig(): EnvironmentConfig {
    // Electron renderer process
    if (typeof window !== 'undefined' && window.electronAPI) {
        return {
            BASEURL: window.electronAPI.env.BASEURL,
            NODE_ENV: window.electronAPI.env.NODE_ENV
        };
    }

    // Normal browser (Vite)
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        return {
            BASEURL: import.meta.env.VITE_BASEURL || 'http://localhost:3000',
            NODE_ENV: import.meta.env.MODE || 'development'
        };
    }

    // Electron main process (Node.js ortamı)
    if (typeof window === 'undefined') {
        return {
            BASEURL: process.env.VITE_BASEURL || 'http://localhost:3000',
            NODE_ENV: process.env.NODE_ENV || 'development'
        };
    }

    // Fallback
    return {
        BASEURL: 'http://localhost:3000',
        NODE_ENV: 'development'
    };
}

export const ENV_CONFIG = getEnvironmentConfig(); */
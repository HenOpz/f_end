import { PublicClientApplication } from "@azure/msal-browser";
import store from '/src/store'

let authInfo = {};
if(store.state.mode == 'dev') {
    authInfo = store.state.msalDev;
} else if (store.state.mode == 'prod') {
    authInfo = store.state.msalProd;
}

console.log('authInfo', authInfo);

const msalInstance = new PublicClientApplication({
    auth: {
        clientId: authInfo.clientId,
        authority:  authInfo.authority,
        redirectUri:  authInfo.redirectUri
    },
    system: {
        allowNativeBroker: true,
    },
});

export async function initializeMSAL() {
    await msalInstance.initialize();
    await msalInstance.handleRedirectPromise();
    msalInstance.acquireTokenSilent();
}

export async function signIn() {
    if (!msalInstance) {
        throw new Error('MSAL not initialized yet.');
    }
    try {
        const authResult = await msalInstance.loginPopup();
        return authResult;
    } catch (error) {
        console.error('Sign-in error:', error);
        throw error; 
    }
}

export async function signOut() {
    if (!msalInstance) {
        console.error('MSAL not initialized yet.');
        return;
    }
    await msalInstance.logout();
}
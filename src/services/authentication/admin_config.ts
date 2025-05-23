import admin from "firebase-admin";

if(!admin.apps.length){
    const serviceAccount = {
        "type": process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_type,
        "project_id": process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_project_id,
        "private_key_id": process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_private_key_id,
        "private_key": process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_private_key!.replace(/\\n/g, '\n'),
        "client_email": process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_client_email,
        "client_id": process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_client_id,
        "auth_uri": process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_auth_uri,
        "token_uri": process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_token_uri,
        "auth_provider_x509_cert_url": process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_auth_provider_x509_cert_url,
        "client_x509_cert_url": process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_client_x509_cert_url,
        "universe_domain": process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_universe_domain
    }
    const account =JSON.parse(JSON.stringify(serviceAccount));
    admin.initializeApp({
    credential: admin.credential.cert(account),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_databaseURL
    });}

const auth = admin.auth();

export { admin, auth };
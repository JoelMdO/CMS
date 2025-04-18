
const createLog= (token: any) =>  {
    ///========================================================
    // Create the log object for session
    ///========================================================
    const crypto = require('crypto');
    const salt = crypto.randomBytes(Number(process.env.NEXT_PUBLIC_saltLength!));
    const iv = crypto.randomBytes(Number(process.env.NEXT_PUBLIC_ivLength!));
    const masterKey = Buffer.from(process.env.NEXT_PUBLIC_secure_key!, 'base64');
    
    // Derive encryption key from master key and salt
    const key = crypto.pbkdf2Sync(
    masterKey, 
    salt, 
    parseInt(process.env.NEXT_PUBLIC_iterations!), 
    parseInt(process.env.NEXT_PUBLIC_keyLength!), 
    process.env.NEXT_PUBLIC_digest
    );
    
    // Encrypt
    const cipher = crypto.createCipheriv(process.env.NEXT_PUBLIC_algorithm, key, iv);
    const encrypted_data = Buffer.concat([
        cipher.update(token, 'utf8'),
        cipher.final()
    ]);
    
    // Get authentication tag
    const tag = cipher.getAuthTag();
    
    // Combine parts: salt:iv:tag:encrypted
    const log = Buffer.concat([
    salt,
    iv,
    tag,
    encrypted_data,
    ]).toString('base64');
    //
    return log;
};

export default createLog;
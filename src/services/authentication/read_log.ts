const readLog = (session: string) =>{
    ///========================================================
    // Function to read the lgo
    ///========================================================
    //
    const crypto = require('crypto');
    const buffer = Buffer.from(session, 'base64');
    const saltLength = Number(process.env.NEXT_PUBLIC_saltLength);
    const ivLength = Number(process.env.NEXT_PUBLIC_ivLength);
    const tagLength = Number(process.env.NEXT_PUBLIC_tagLength);
    //
    if (buffer.length < saltLength + ivLength) {
        throw new Error(`Invalid buffer: Not enough data. Expected at least ${saltLength + ivLength} bytes but got ${buffer.length}`);
    }
    const minLength = saltLength + ivLength + tagLength;
    if (buffer.length < minLength) {
    throw new Error(`Invalid buffer: Expected at least ${minLength} bytes but got ${buffer.length}`);
    }
    //
    // Extract components
    const salt = buffer.subarray(0, saltLength);
    const iv = buffer.subarray(saltLength, saltLength + ivLength);
    const tag = buffer.subarray(saltLength + ivLength, saltLength + ivLength + tagLength);
    const encryptedData = buffer.subarray(saltLength + ivLength + tagLength);
    // Derive the key
    const masterKey = Buffer.from(process.env.NEXT_PUBLIC_secure_key!, 'base64'); // Your master key
    const key = crypto.pbkdf2Sync(
    masterKey,
    salt, 
    Number(process.env.NEXT_PUBLIC_iterations!),
    Number(process.env.NEXT_PUBLIC_keyLength!), 
    process.env.NEXT_PUBLIC_digest
    );
    //
    if (!iv || iv.length !== ivLength) {
        throw new Error(`Invalid IV: Expected ${ivLength} bytes but got ${iv.length}`);
    }
    // Decifer the data
    const decipher = crypto.createDecipheriv(process.env.NEXT_PUBLIC_algorithm, key, iv);
    decipher.setAuthTag(tag); 
    let decrypted = decipher.update(encryptedData, 'binary', 'utf8');
    decrypted += decipher.final('utf8'); // Complete the decryption
    decrypted = decrypted.trim().replace(/\x00/g, '').replace(/[^\x20-\x7E]/g, '');
    return decrypted;
}

export default readLog
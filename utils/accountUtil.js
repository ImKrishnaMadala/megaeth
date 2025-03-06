import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';

const keystorePath = path.join(process.cwd(), 'keystore.json');

function loadKeystore() {
  if (!fs.existsSync(keystorePath)) {
    return [];
  }
  const data = fs.readFileSync(keystorePath);
  return JSON.parse(data);
}

function saveKeystore(keystore) {
  fs.writeFileSync(keystorePath, JSON.stringify(keystore, null, 2));
}

/**
 * Creates a new wallet and saves it to the keystore.
 *
 * @param {string} [name] - Optional name for the account.
 * @returns {object} The new wallet instance.
 */
export function createWallet(name = 'account-' + Date.now()) {
  const wallet = ethers.Wallet.createRandom();
  const keystore = loadKeystore();
  keystore.push({ name, address: wallet.address, privateKey: wallet.privateKey });
  saveKeystore(keystore);
  return wallet;
}

/**
 * Imports an existing wallet using its private key.
 *
 * @param {string} privateKey - The private key of the wallet.
 * @param {string} [name] - Optional name for the account.
 * @returns {object} The imported wallet instance.
 */
export function importWallet(privateKey, name = 'imported-' + Date.now()) {
  try {
    const wallet = new ethers.Wallet(privateKey);
    const keystore = loadKeystore();
    keystore.push({ name, address: wallet.address, privateKey: wallet.privateKey });
    saveKeystore(keystore);
    return wallet;
  } catch (error) {
    throw new Error('Invalid private key');
  }
}

/**
 * 
 *
 * @returns {Array} Array of account objects in the local keystore.
 */
export function listWallets() {
  return loadKeystore();
}

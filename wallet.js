const {generateMnemonic, mnemonicToSeedSync} = require('bip39');
const {derivePath} = require("ed25519-hd-key");
const {ethers } = require('ethers');
const { Keypair } = require("@solana/web3.js");
const {Buffer} = require("buffer");
const phrase = generateMnemonic();

// Ethereum Wallet

const path = `m/44'/60'/0'/0/0`;
const hdNode = ethers.utils.HDNode.fromMnemonic(phrase);
const derivedHdNode = hdNode.derivePath(path);
const privateKeyEth = derivedHdNode.privateKey;
const publicKeyEth = derivedHdNode.publicKey;

console.log("Ethereum private key:"+privateKeyEth);

console.log("Ethereum public key:"+publicKeyEth);

const wallet = new ethers.Wallet(privateKeyEth);

console.log("Ethereum wallet address: " + wallet.address);



// Solana Wallet

const seed = mnemonicToSeedSync(phrase);

const derivedSeed = derivePath(`m/44'/501'/0'/0'`, seed.toString("hex")).key;

const keyPair = Keypair.fromSeed(derivedSeed);

const privateKeySol = Buffer.from(keyPair.secretKey).toString("hex");

const publicKeySol = keyPair.publicKey.toBase58();

console.log("Solana private key:"+ privateKeySol);

console.log("Solana public key:"+ publicKeySol);

module.exports = {
    phrase,
    privateKeyEth,
    publicKeyEth,
    privateKeySol,
    publicKeySol
};
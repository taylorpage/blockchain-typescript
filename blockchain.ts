import * as SHA256 from 'crypto-js/sha256';

class Block {
    public index: number;
    public timestamp: string;
    public data: string;
    public previousHash: string;
    public hash: string;

    constructor(index: number, timestamp: string, data: string, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    // Calculate a hash based on data supplied to block
    public calculateHash() {
        return SHA256(`${this.index}${this.previousHash}${this.timestamp}${JSON.stringify(this.data).toString()}`)
    }
}

class Blockchain {
    public chain: Block[];

    constructor() {
        this.chain = [this._createGenesisBlock()];
    }

    // Create the initial block for the blockchain
    private _createGenesisBlock() {
        return new Block(0, (new Date()).toString(), 'Genesis Block', '0');
    }

    // Get the last created block
    public getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Add a new block to the blockchain
    public addBlock(newBlock: Block) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    // Check if the chain is valid
    public validChain() {
        let validity = true;

        this.chain.forEach((block, i) => {
            const previousBlock = this.chain[i - 1];

            if (
                block.hash !== block.calculateHash() ||
                block.previousHash !== previousBlock.hash
            ) {
                validity = false;
            }
        });

        return validity;
    }
}
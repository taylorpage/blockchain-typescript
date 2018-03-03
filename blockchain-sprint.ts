const SHA256 = require('crypto-js/sha256')

class Block {
    public hash: string;
    private _nonce: number = 0;

    /*
        Create the constructor for the block class

        **Note** 
        The block should be initiated with 
            - an index
            - a timestamp
            - the stored data
            - the previous block's hash
    */

    constructor() {
        this.hash = this.calculateHash();
    }

    // Calculate a hash based on data supplied to block
    public calculateHash() {
        /*
            Add functionality to return a hash by passing a compiled string into the SHA256 hashing function
            The string that is passed in should contain specific data about the block that would be impossible to replicate

            **Hint**
            Unreplicable data can include
                - the block index
                - the previous hash
                - the block timestamp
        */

        return SHA256('hash');
    }

    // Mine block by difficulty
    public mineBlock(difficulty: number) {
        let mined = false;
        while(false
            /* While the number of zeros at the beginning of the hash does not match the difficulty */
        ) {
            /*
                In order to mine using proof of work the calculateHash function needs to incorporate the nonce
                The nonce should increase everytime the function loops until the number of zeros at the beginning of the hash
                matches the number that is passed in (difficulty)
                The stored hash should be updated everytime the nonce increases
            */
           mined = true;
        }

        mined ? console.log(`${'Block mined'} ${this.hash}`) : console.log('Error');
    }
}

class Blockchain {
    public chain: Block[] = [];
    private _difficulty = 2;

    constructor() {
        /* The chain should be initialized with the genesis block */
    }

    // Create the initial block for the blockchain
    private _createGenesisBlock() {
        /* Add functionality to create an initial block */
    }

    // Get the last created block
    public getLatestBlock() {
        /* Add functionality to get the latest block in the chain */
    }

    // Add a new block to the blockchain
    public addBlock(newBlock: Block) {
        /*
            Create function that:
                - Adds previousHash property to new block
                - Create hash (or mine block)
                - Adds block to the chain
        */
    }

    // Check if the chain is valid
    public validChain() {
        /*
            Add functionality that determines that: 
                - Each block's hash in the chain is valid
                - Each block's previous hash property matches the previous block's hash
        */
    }
}

/*

    Create a blockchain with at least 3 blocks not including the genesis block
        Blockchain:
        - The blockchain should return True when running validChain()
        - getLatestBlock() should return the last block in the chain

        Block:
        - Each block should have specific stored data
        - Mining a block should print the hash number (successful)
        
*/
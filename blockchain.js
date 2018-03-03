"use strict";
var SHA256 = require('crypto-js/sha256');
var Block = /** @class */ (function () {
    function Block(index, timestamp, data, previousHash) {
        if (previousHash === void 0) { previousHash = ''; }
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this._nonce = 0;
    }
    // Calculate a hash based on data supplied to block
    Block.prototype.calculateHash = function () {
        return SHA256("" + this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this._nonce).toString();
    };
    // Mine block by difficulty
    Block.prototype.mineBlock = function (difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this._nonce++;
            this.hash = this.calculateHash();
        }
        console.log('Block mined' + " " + this.hash);
    };
    return Block;
}());
var Blockchain = /** @class */ (function () {
    function Blockchain() {
        this._difficulty = 5;
        this.chain = [this._createGenesisBlock()];
    }
    // Create the initial block for the blockchain
    Blockchain.prototype._createGenesisBlock = function () {
        return new Block(0, (new Date()).toString(), 'Genesis Block', '0');
    };
    // Get the last created block
    Blockchain.prototype.getLatestBlock = function () {
        return this.chain[this.chain.length - 1];
    };
    // Add a new block to the blockchain
    Blockchain.prototype.addBlock = function (newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this._difficulty);
        this.chain.push(newBlock);
    };
    // Check if the chain is valid
    Blockchain.prototype.validChain = function () {
        var _this = this;
        var validity = true;
        this.chain.forEach(function (block, i) {
            var previousBlock = _this.chain[i - 1];
            if (block.hash !== block.calculateHash() ||
                block.previousHash !== previousBlock.hash) {
                validity = false;
            }
        });
        return validity;
    };
    return Blockchain;
}());

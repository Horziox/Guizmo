const Client = require('./Client');
const { CommandInteraction } = require('discord.js');

/**
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
function executeFunction(client, interaction) {}

class Command {
    /**
     *  Command Interaction class
     * @typedef {{name: string, execute: executeFunction}} CommandOptions
     * @param {CommandOptions} options 
     */
    constructor(options) {
        this.name = options.name;
        this.execute = options.execute;
    }
}

module.exports = Command;
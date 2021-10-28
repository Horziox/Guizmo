const Discord = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');
const { join } = require('path');

class Client extends Discord.Client {
    /**
     * DiscordJS Client Options
     * @param {Discord.ClientOptions} options 
     */
    constructor(options) {
        super(options);
        this.commands = new Discord.Collection()
    }

    /**
     * Register client Commands folder
     * @param {string} dir 
     */
    async registerCommands(dir) {
        fs.readdir(join(dir), async (err, files) => {
            for(const file of files) {
                if(file.endsWith(".js")) {
                    try {
                        const command = require(join(dir, file));;
                        if(this.commands.has(command.name))
                            console.log(chalk.yellow('WARN') + ` ${command.name} already exist!`)
                        else {
                            this.commands.set(command.name, command);
                            console.log(chalk.green('ADD'), command.name);
                        }
                    }
                    catch(e) {
                        console.log(chalk.red('ERROR') + ` with ${file}\n=> ${e}`);
                    }
                } 
                else 
                    await this.registerCommands(join(dir, file));
            }
        });
    };
}

module.exports = Client;
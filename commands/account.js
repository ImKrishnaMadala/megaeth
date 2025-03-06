import { Command } from 'commander';
import chalk from 'chalk';
import { createWallet, importWallet, listWallets } from '../utils/accountUtil.js';

const accountCmd = new Command('account')
  .description('Manage blockchain accounts');

accountCmd
  .command('create')
  .description('Create a new blockchain account')
  .option('-n, --name <name>', 'Name for the account')
  .action((options) => {
    const wallet = createWallet(options.name);
    console.log(chalk.green('New account created:'), wallet.address);
    console.log('Account details saved to local keystore.');
  });

accountCmd
  .command('import')
  .description('Import an existing account with a private key')
  .requiredOption('-k, --key <privateKey>', 'Private key of the account')
  .option('-n, --name <name>', 'Name for the account')
  .action((options) => {
    try {
      const wallet = importWallet(options.key, options.name);
      console.log(chalk.green('Account imported:'), wallet.address);
    } catch (error) {
      console.error(chalk.red('Failed to import account:'), error.message);
      process.exit(1);
    }
  });

accountCmd
  .command('list')
  .description('List all managed accounts')
  .action(() => {
    const accounts = listWallets();
    if (accounts.length === 0) {
      console.log(chalk.yellow('No accounts found.'));
    } else {
      accounts.forEach((acct, index) => {
        console.log(`${index + 1}. ${acct.name} - ${acct.address}`);
      });
    }
  });

export default accountCmd;

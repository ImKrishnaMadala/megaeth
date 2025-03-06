import { Command } from 'commander';
import chalk from 'chalk';
import MegaethClient from '../utils/client.js';
import { requestFaucet } from '../utils/networkUtil.js';

const networkCmd = new Command('network')
  .description('Network utilities and queries');

// Balance command
networkCmd
  .command('balance <address>')
  .description('Get the balance of a specific MegaETH address')
  .option('-u, --url <url>', 'MegaETH node RPC URL', 'https://carrot.megaeth.com/rpc')
  .option('-b, --block <blockTag>', 'Block tag (e.g., "latest" or "pending")', 'latest')
  .action(async (address, options) => {
    const client = new MegaethClient({ url: options.url });
    try {
      const balance = await client.getBalance(address, options.block);
      console.log(chalk.blue(`Balance for ${address}: ${balance}`));
    } catch (error) {
      console.error(chalk.red('Error retrieving balance:'), error.message);
      process.exit(1);
    }
  });

// Transaction details command
networkCmd
  .command('tx <txHash>')
  .description('Get details of a transaction by its hash')
  .option('-u, --url <url>', 'MegaETH node RPC URL', 'https://carrot.megaeth.com/rpc')
  .action(async (txHash, options) => {
    const client = new MegaethClient({ url: options.url });
    try {
      const tx = await client.getTransactionByHash(txHash);
      console.log(chalk.blue('Transaction details:'), tx);
    } catch (error) {
      console.error(chalk.red('Error retrieving transaction:'), error.message);
      process.exit(1);
    }
  });

// Transaction receipt command
networkCmd
  .command('receipt <txHash>')
  .description('Get the receipt of a transaction by its hash')
  .option('-u, --url <url>', 'MegaETH node RPC URL', 'https://carrot.megaeth.com/rpc')
  .action(async (txHash, options) => {
    const client = new MegaethClient({ url: options.url });
    try {
      const receipt = await client.getTransactionReceipt(txHash);
      console.log(chalk.blue('Transaction receipt:'), receipt);
    } catch (error) {
      console.error(chalk.red('Error retrieving transaction receipt:'), error.message);
      process.exit(1);
    }
  });


// Faucet command
networkCmd
  .command('faucet <address>')
  .description('Request test tokens from the faucet (Work in progress)')
  .action(async (address) => {
    console.log('Faucet functionality is currently a work in progress. Please check back later.');
  });


export default networkCmd;

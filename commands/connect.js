import { Command } from 'commander';
import chalk from 'chalk';
import MegaethClient from '../utils/client.js';

const connectCmd = new Command('connect')
  .description('Connect to a MegaETH node and retrieve the chain ID')
  .option('-u, --url <url>', 'MegaETH node RPC URL', 'https://carrot.megaeth.com/rpc')
  .action(async (options) => {
    const client = new MegaethClient({ url: options.url });
    try {
      const chainId = await client.getChainId();
      console.log(chalk.green('Connected successfully!'));
      console.log('Chain ID:', chainId);
    } catch (error) {
      console.error(chalk.red('Connection failed:'), error.message);
      process.exit(1);
    }
  });

export default connectCmd;

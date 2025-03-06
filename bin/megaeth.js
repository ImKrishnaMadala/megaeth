#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import connectCmd from '../commands/connect.js';
import accountCmd from '../commands/account.js';
import networkCmd from '../commands/network.js';

const program = new Command();

program
  .name('megaeth')
  .version('0.1.2')
  .description('CLI for interacting with the MegaETH Layer 2 blockchain');


program.addCommand(connectCmd);


program.addCommand(accountCmd);


program.addCommand(networkCmd);

program.parse(process.argv);

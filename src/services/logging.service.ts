import chalk from 'chalk';
import * as readline from 'readline';

export class LoggingService {
  private static instance: LoggingService;
  private spinnerInterval: NodeJS.Timeout | null = null;
  private spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  private spinnerIndex = 0;

  static getInstance(): LoggingService {
    if (!LoggingService.instance) {
      LoggingService.instance = new LoggingService();
    }
    return LoggingService.instance;
  }

  private formatTimestamp(): string {
    return chalk.gray(`[${new Date().toISOString()}]`);
  }

  // ═══════════════════════════════════════════════════════════
  // Spinner / Loader Methods
  // ═══════════════════════════════════════════════════════════

  startSpinner(message: string = 'Thinking...') {
    this.stopSpinner(); // Clear any existing spinner
    process.stdout.write(`  ${chalk.cyan(this.spinnerFrames[0])} ${chalk.gray(message)}`);
    
    this.spinnerInterval = setInterval(() => {
      this.spinnerIndex = (this.spinnerIndex + 1) % this.spinnerFrames.length;
      this.clearLine();
      process.stdout.write(`  ${chalk.cyan(this.spinnerFrames[this.spinnerIndex])} ${chalk.gray(message)}`);
    }, 80);
  }

  stopSpinner(finalMessage?: string) {
    if (this.spinnerInterval) {
      clearInterval(this.spinnerInterval);
      this.spinnerInterval = null;
      this.clearLine();
      if (finalMessage) {
        console.log(`  ${chalk.green('✓')} ${finalMessage}`);
      }
    }
  }

  clearLine() {
    process.stdout.write('\r\x1b[K');
  }

  // ═══════════════════════════════════════════════════════════
  // Basic Logging Methods
  // ═══════════════════════════════════════════════════════════

  info(message: string, details?: any) {
    const label = chalk.blueBright('[INFO]');
    console.log(`${this.formatTimestamp()} ${label} ${message}`);
    if (details) {
      console.log(chalk.gray(JSON.stringify(details, null, 2)));
    }
  }

  success(message: string, details?: any) {
    const icon = chalk.green('✓');
    console.log(`${icon} ${chalk.green(message)}`);
    if (details) {
      console.log(chalk.gray(JSON.stringify(details, null, 2)));
    }
  }

  warn(message: string, details?: any) {
    const icon = chalk.yellow('⚠');
    console.log(`${icon} ${chalk.yellow(message)}`);
    if (details) {
      console.log(chalk.gray(JSON.stringify(details, null, 2)));
    }
  }

  error(message: string, error?: Error | any) {
    const icon = chalk.red('✗');
    console.log(`${icon} ${chalk.red(message)}`);
    if (error) {
      if (error instanceof Error) {
        console.log(chalk.red(`  ${error.message}`));
        if (process.env.DEBUG && error.stack) {
          console.log(chalk.gray(error.stack));
        }
      } else {
        console.log(chalk.red(JSON.stringify(error, null, 2)));
      }
    }
  }

  debug(message: string, details?: any) {
    if (process.env.DEBUG) {
      const label = chalk.magenta('[DEBUG]');
      console.log(`${this.formatTimestamp()} ${label} ${message}`);
      if (details) {
        console.log(chalk.gray(JSON.stringify(details, null, 2)));
      }
    }
  }

  // ═══════════════════════════════════════════════════════════
  // CLI-Specific Methods
  // ═══════════════════════════════════════════════════════════

  separator() {
    console.log(chalk.gray('━'.repeat(50)));
  }

  header(text: string, emoji?: string) {
    this.separator();
    console.log(chalk.blueBright(`${emoji ? emoji + ' ' : ''}${text}`));
    this.separator();
  }

  subheader(text: string, emoji?: string) {
    console.log(chalk.greenBright(`${emoji ? emoji + ' ' : ''}${text}\n`));
  }

  thinking(message: string = 'Thinking...') {
    this.startSpinner(message);
  }

  analyzing(message: string = 'Analyzing repository context...') {
    this.startSpinner(message);
  }

  done(message?: string) {
    this.stopSpinner(message);
  }

  // ═══════════════════════════════════════════════════════════
  // Repository Context Display
  // ═══════════════════════════════════════════════════════════

  repoInfo(label: string, value: string, color: 'green' | 'yellow' | 'red' | 'cyan' | 'gray' | 'white' = 'white') {
    const colors = {
      green: chalk.green,
      yellow: chalk.yellow,
      red: chalk.red,
      cyan: chalk.cyan,
      gray: chalk.gray,
      white: chalk.white,
    };
    console.log(`${chalk.green('✓')} ${chalk.white(label + ':')} ${colors[color](value)}`);
  }

  repoStatus(label: string, value: string, isClean: boolean) {
    const icon = chalk.green('✓');
    const statusColor = isClean ? chalk.green : chalk.yellow;
    console.log(`${icon} ${chalk.white(label + ':')} ${statusColor(value)}`);
  }

  conflictWarning(files: string[]) {
    console.log(chalk.red(`⚠ Conflicts detected in: ${files.join(', ')}`));
  }

  syncStatus(aheadCount: number, behindCount: number) {
    console.log(chalk.white('Sync Status:'));
    if (aheadCount > 0) {
      console.log(chalk.yellow(`  ↑ ${aheadCount} commit(s) ahead of remote`));
    }
    if (behindCount > 0) {
      console.log(chalk.yellow(`  ↓ ${behindCount} commit(s) behind remote`));
    }
    if (aheadCount === 0 && behindCount === 0) {
      console.log(chalk.green('  ✓ Up to date with remote'));
    }
  }

  fileList(title: string, files: string[], type: 'staged' | 'modified' | 'untracked' | 'conflict') {
    const config = {
      staged: { color: chalk.green, icon: '+' },
      modified: { color: chalk.yellow, icon: '~' },
      untracked: { color: chalk.gray, icon: '?' },
      conflict: { color: chalk.red, icon: '!' },
    };
    const { color, icon } = config[type];
    console.log(color(`\n  ${title} (${files.length}):`));
    files.forEach(f => console.log(color(`    ${icon} ${f}`)));
  }

  commitHistory(commits: string[], limit: number = 5) {
    console.log(chalk.white('\nRecent Commits:'));
    commits.slice(0, limit).forEach(commit => {
      console.log(chalk.gray(`  ${commit}`));
    });
  }

  // ═══════════════════════════════════════════════════════════
  // Step and Command Display
  // ═══════════════════════════════════════════════════════════

  step(index: number, description: string, command: string, risk: 'low' | 'medium' | 'high') {
    const riskColors = {
      low: chalk.green,
      medium: chalk.yellow,
      high: chalk.red,
    };
    const riskIcons = {
      low: '✓',
      medium: '⚠',
      high: '🛑',
    };

    console.log(chalk.white(`${index}. ${description}`));
    console.log(chalk.cyan(`   $ ${command}`));
    console.log(riskColors[risk](`   [${riskIcons[risk]} Risk: ${risk}]`));
    console.log();
  }

  command(cmd: string, status: 'running' | 'success' | 'failed') {
    const icons = {
      running: chalk.blue('→'),
      success: chalk.green('✓'),
      failed: chalk.red('✗'),
    };
    const colors = {
      running: chalk.cyan,
      success: chalk.green,
      failed: chalk.red,
    };
    console.log(`${icons[status]} ${colors[status](cmd)}`);
  }

  commandOutput(output: string, maxLength: number = 200) {
    if (output) {
      console.log(chalk.gray(`  ${output.slice(0, maxLength)}`));
    }
  }

  commandFailed(cmd: string, message: string) {
    console.log(chalk.red(`❌ Failed: ${cmd}`));
    console.log(chalk.red(`   ${message}`));
  }

  // ═══════════════════════════════════════════════════════════
  // Warnings and Plan Display
  // ═══════════════════════════════════════════════════════════

  warnings(warnings: string[]) {
    if (warnings && warnings.length > 0) {
      console.log(chalk.yellow('⚠ Warnings:'));
      warnings.forEach((warning) => {
        console.log(chalk.yellow(`  • ${warning}`));
      });
      console.log();
    }
  }

  planHeader() {
    this.subheader('Plan of Action:', '📋');
  }

  executingHeader() {
    this.separator();
    console.log(chalk.blueBright('🚀 Executing commands...\n'));
  }

  deploySuccess() {
    this.separator();
    console.log(chalk.greenBright('🎉 Successfully deployed!'));
    this.separator();
  }

  mergeInfo(source: string, target: string, strategy: string) {
    this.separator();
    console.log(chalk.blueBright(`🔀 Merging ${chalk.cyan(source)} → ${chalk.cyan(target)}`));
    console.log(chalk.gray(`   Strategy: ${strategy}`));
    this.separator();
  }

  resolveInfo(strategy: string, files: string[]) {
    this.separator();
    console.log(chalk.blueBright(`🔧 Resolving conflicts with strategy: ${chalk.cyan(strategy)}`));
    console.log(chalk.gray(`   Files: ${files.join(', ')}`));
    this.separator();
  }

  // ═══════════════════════════════════════════════════════════
  // User Interaction
  // ═══════════════════════════════════════════════════════════

  async confirm(message: string): Promise<boolean> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(chalk.yellow(`${message} (y/N): `), (answer) => {
        rl.close();
        resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
      });
    });
  }

  async confirmHighRisk(command: string, description: string): Promise<boolean> {
    console.log();
    console.log(chalk.red('⚠ HIGH RISK'));
    console.log(chalk.white(`  ${description}`));
    console.log(chalk.cyan(`  ${command}`));
    
    return this.confirm('Proceed?');
  }

  async input(prompt: string): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(chalk.cyan(`  ${prompt} `), (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    });
  }

  async select(prompt: string, options: string[]): Promise<string> {
    console.log(chalk.cyan(`  ${prompt}`));
    options.forEach((opt, i) => {
      console.log(chalk.gray(`    ${i + 1}) ${opt}`));
    });
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(chalk.cyan('  Choose (1-' + options.length + '): '), (answer) => {
        rl.close();
        const idx = parseInt(answer) - 1;
        if (idx >= 0 && idx < options.length) {
          resolve(options[idx]);
        } else {
          resolve(answer.trim());
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // Legacy Methods (backward compatibility)
  // ═══════════════════════════════════════════════════════════

  log(action: string, details: any) {
    this.info(action, details);
  }

  audit(action: string, userId: string, entity: string, entityId: string, details?: any) {
    const auditLabel = chalk.greenBright('[AUDIT]');
    const userInfo = chalk.yellow(`user=${userId}`);
    const entityInfo = chalk.cyan(`${entity}(${entityId})`);
    console.log(`${this.formatTimestamp()} ${auditLabel} ${userInfo} | ${action} ${entityInfo}`);
    if (details) {
      console.log(chalk.gray(JSON.stringify(details, null, 2)));
    }
  }
}

export const logger = LoggingService.getInstance();
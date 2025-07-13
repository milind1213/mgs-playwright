import fs from 'fs';
import path from 'path';

const logDir = path.resolve('logs');
const logFilePath = path.join(logDir, 'log.txt');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

fs.writeFileSync(logFilePath, '', 'utf-8');

export function log(...messageParts) {
  if (!messageParts || messageParts.length === 0) return;

  const now = new Date();
  const shortDate = `${String(now.getDate()).padStart(2, '0')}-${now.toLocaleString('default', { month: 'short' })}-${String(now.getFullYear()).slice(-2)}`;
  const time = now.toLocaleTimeString('en-US', { hour12: true });

  const fullMessage = messageParts.join(' ');
  const formatted = `[${shortDate} ${time}] - [ ${fullMessage} ]`;

  console.log(formatted);
  fs.appendFileSync(logFilePath, formatted + '\n');
}

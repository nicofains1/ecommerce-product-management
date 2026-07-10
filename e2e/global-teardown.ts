import { execSync } from 'node:child_process';

export default function globalTeardown(): void {
  if (process.env.E2E_KEEP_STACK) {
    return;
  }
  execSync('docker compose -f ../docker-compose.yml -f ../docker-compose.e2e.yml down -v', {
    stdio: 'inherit',
    cwd: __dirname,
  });
}

#!/usr/bin/env node

const { execSync } = require("child_process");

const ports = process.argv.slice(2).filter(Boolean);

if (ports.length === 0) {
  process.exit(0);
}

function getListeningPidsWindows(port) {
  const output = execSync("netstat -ano -p tcp", { encoding: "utf8" });
  const lines = output.split(/\r?\n/);
  const pids = new Set();

  for (const line of lines) {
    if (!line.includes(`:${port}`) || !line.includes("LISTENING")) {
      continue;
    }

    const match = line.trim().match(/(\d+)\s*$/);
    if (match) {
      pids.add(Number(match[1]));
    }
  }

  return [...pids];
}

function getListeningPidsUnix(port) {
  try {
    const output = execSync(`lsof -nP -iTCP:${port} -sTCP:LISTEN -t`, { encoding: "utf8" });
    return output
      .split(/\r?\n/)
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isInteger(value) && value > 0);
  } catch (error) {
    return [];
  }
}

function killPidWindows(pid) {
  execSync(`taskkill /PID ${pid} /F /T`, { stdio: "ignore" });
}

function killPidUnix(pid) {
  process.kill(pid, "SIGKILL");
}

for (const port of ports) {
  const pids =
    process.platform === "win32" ? getListeningPidsWindows(port) : getListeningPidsUnix(port);

  if (pids.length === 0) {
    continue;
  }

  for (const pid of pids) {
    if (pid === process.pid) {
      continue;
    }

    try {
      if (process.platform === "win32") {
        killPidWindows(pid);
      } else {
        killPidUnix(pid);
      }
      process.stdout.write(`[free-port] Cleared port ${port} by stopping PID ${pid}\n`);
    } catch (error) {
      process.stderr.write(
        `[free-port] Failed to stop PID ${pid} on port ${port}: ${
          error && error.message ? error.message : String(error)
        }\n`
      );
    }
  }
}

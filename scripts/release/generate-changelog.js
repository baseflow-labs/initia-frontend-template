#!/usr/bin/env node
/* eslint-disable no-console */
const { execSync } = require("child_process");

const run = (command) => {
  try {
    return execSync(command, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
  } catch {
    return "";
  }
};

const parseCommits = (raw) => {
  if (!raw) return [];
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [hash, authorDate, subject] = line.split("\t");
      return { hash, authorDate: Number(authorDate || 0), subject: subject || "" };
    });
};

const getType = (subject) => {
  const conventional = subject.match(/^([a-z]+)(\(.+\))?:\s+/i);
  if (conventional) return conventional[1].toLowerCase();
  if (/^merge pull request/i.test(subject)) return "merge";
  return "other";
};

const sectionLabel = (type) => {
  const map = {
    feat: "Features",
    fix: "Fixes",
    refactor: "Refactors",
    perf: "Performance",
    docs: "Docs",
    test: "Tests",
    chore: "Chores",
    build: "Build",
    ci: "CI",
    merge: "Merges",
    other: "Other",
  };
  return map[type] || "Other";
};

const shouldInclude = (subject) => {
  return !/(^chore\(code\): bump version to|ci skip|^merge branch)/i.test(subject);
};

const main = () => {
  const fromArg = process.argv.find((arg) => arg.startsWith("--from="));
  const toArg = process.argv.find((arg) => arg.startsWith("--to="));
  const from = fromArg ? fromArg.replace("--from=", "") : "";
  const to = toArg ? toArg.replace("--to=", "") : "HEAD";

  const range = from ? `${from}..${to}` : to;
  const raw = run(`git log ${range} --pretty=format:"%H%x09%at%x09%s" --date-order`);
  const commits = parseCommits(raw)
    .filter((commit) => shouldInclude(commit.subject))
    .sort((a, b) => {
      if (a.authorDate !== b.authorDate) return a.authorDate - b.authorDate;
      return a.hash.localeCompare(b.hash);
    });

  if (commits.length === 0) {
    console.log("- Minor updates");
    return;
  }

  const grouped = new Map();
  commits.forEach((commit) => {
    const type = getType(commit.subject);
    const key = sectionLabel(type);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(`- ${commit.subject}`);
  });

  const sectionOrder = [
    "Features",
    "Fixes",
    "Refactors",
    "Performance",
    "Build",
    "CI",
    "Tests",
    "Docs",
    "Chores",
    "Merges",
    "Other",
  ];

  const lines = [];
  sectionOrder.forEach((section) => {
    const items = grouped.get(section);
    if (!items || items.length === 0) return;
    lines.push(`### ${section}`);
    lines.push(...items);
    lines.push("");
  });

  console.log(lines.join("\n").trim());
};

main();


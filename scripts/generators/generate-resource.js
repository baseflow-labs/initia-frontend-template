#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = process.cwd();
const SPEC_DIR = path.join(ROOT, "scripts/specs");

function toServiceCode(value) {
  return String(value || "")
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((item, index) =>
      index === 0
        ? item.charAt(0).toLowerCase() + item.slice(1)
        : item.charAt(0).toUpperCase() + item.slice(1)
    )
    .join("");
}

function toServiceKey(serviceCode) {
  return serviceCode.charAt(0).toUpperCase() + serviceCode.slice(1);
}

function main() {
  const rawName = process.argv[2];
  if (!rawName) {
    throw new Error("Usage: node scripts/generators/generate-resource.js <resource-name>");
  }

  const serviceCode = toServiceCode(rawName);
  if (!serviceCode) throw new Error("Invalid resource name");

  const serviceKey = toServiceKey(serviceCode);
  const specPath = path.join(SPEC_DIR, `user-service.${serviceCode}.json`);

  if (fs.existsSync(specPath)) {
    throw new Error(`Spec already exists: ${path.relative(ROOT, specPath)}`);
  }

  const spec = {
    serviceCode,
    serviceKey,
    appFolderName: serviceCode,
    apiEndpoint: `/${serviceCode}`,
    title: {
      en: serviceKey,
      ar: serviceKey,
    },
    singleItem: {
      en: serviceKey.slice(0, -1) || serviceKey,
      ar: serviceKey.slice(0, -1) || serviceKey,
    },
    fields: [
      {
        name: "name",
        type: "text",
        label: {
          en: "Name",
          ar: "Name",
        },
      },
      {
        name: "createdAt",
        type: "date",
        label: {
          en: "Created At",
          ar: "Created At",
        },
      },
    ],
  };

  fs.mkdirSync(SPEC_DIR, { recursive: true });
  fs.writeFileSync(specPath, `${JSON.stringify(spec, null, 2)}\n`, "utf8");
  console.log(`Created spec: ${path.relative(ROOT, specPath)}`);

  const generated = spawnSync(
    "node",
    ["scripts/generators/generate-user-service.js", "--spec", path.relative(ROOT, specPath)],
    { cwd: ROOT, stdio: "inherit" }
  );

  if (generated.status !== 0) {
    throw new Error("Resource generation failed");
  }
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}


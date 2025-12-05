module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "users",
        "profile",
        "dashboard",
        "settings",
        "notifications",
        "common",
        "code",
        "layout",
        "docs",
      ],
    ],
    "scope-empty": [2, "never"],
  },
};

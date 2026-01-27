module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "users",
        "auth",
        "profile",
        "dashboard",
        "settings",
        "notifications",
        "messaging",
        "common",
        "code",
        "layout",
        "docs",
        "landing",
      ],
    ],
    "scope-empty": [2, "never"],
  },
};

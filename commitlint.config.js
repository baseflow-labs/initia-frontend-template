module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "auth",
        "aids",
        "applicants",
        "users",
        "profile",
        "membershipForm",
        "dashboard",
        "membershipRegistration",
        "settings",
        "notifications",
        "staff",
        "visits",
        "visitReports",
        "common",
        "code",
        "docs",
      ],
    ],
    "scope-empty": [2, "never"],
  },
};

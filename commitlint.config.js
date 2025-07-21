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
        "beneficiaries",
        "dashboard",
        "membershipRegistration",
        "settings",
        "notifications",
        "staff",
        "visits",
        "visitReports",
        "common",
        "code",
      ],
    ],
    "scope-empty": [2, "never"],
  },
};

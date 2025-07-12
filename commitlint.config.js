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
        "staff",
        "visits",
        "visitReports",
        "code",
      ],
    ],
    "scope-empty": [2, "never"],
  },
};

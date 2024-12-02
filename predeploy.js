/* eslint-disable */

const fs = require("fs");

const environment = process.env.ENVIRONMENT || "development";

const firebaseConfig = {
  hosting: {
    public: "build",
    ignore: ["firebase.json", "**/.*", "**/node_modules/**"],
    rewrites: [
      {
        source: "**",
        function: environment === "development" ? "ssrMain" : "ssrreflect",
      },
    ],
  },
  functions: [
    {
      source: ".",
      codebase: "default",
      runtime: "nodejs18",
      ignore: [
        "node_modules",
        ".git",
        "firebase-debug.log",
        "firebase-debug.*.log",
        "*.local",
      ],
      predeploy: [
        'npm --prefix "$RESOURCE_DIR" run lint',
        'npm --prefix "$RESOURCE_DIR" run build',
      ],
    },
  ],
};

fs.writeFileSync("firebase.json", JSON.stringify(firebaseConfig, null, 2));
console.log(
  `firebase.json updated for ${environment} environment.`,
  JSON.stringify(firebaseConfig, null, 2)
);

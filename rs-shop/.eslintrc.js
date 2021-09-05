module.exports = {
  root: true,
  plugins: ["import"],
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: [
          "tsconfig.*?.json",
        ],
        createDefaultProgram: true,
      },
      extends: [
        "plugin:@angular-eslint/recommended",
        "airbnb-typescript/base",
      ],
      rules: {
        "import/prefer-default-export": "off",
        "class-methods-use-this": "off",
        "lines-between-class-members": "off",
        "@typescript-eslint/lines-between-class-members": "off",
      }
    },
    {
      files: ["*.component.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
    },
    {
      files: ["*.component.ts"],
      extends: ["plugin:@angular-eslint/template/process-inline-templates"]
    }
  ]
}
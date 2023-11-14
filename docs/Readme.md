**[← back to home](../README.md)**

# Getting Started

> **Note**: Hygen is a code generation tool that helps automate and streamline repetitive tasks in software development. It allows you to create and use templates for generating code, files, and other project-related artifacts.

This README provides an overview of how to install and use Hygen effectively.

# Step 1: Installation

You can install Hygen in different ways, depending on your preference.

# On macOS and Homebrew:

If you're on macOS and prefer Homebrew, you can install Hygen using the following commands:

```bash
brew tap jondot/tap
brew install hygen
```

# Globally with `npm` (or `yarn`):

You can install Hygen globally using npm or yarn with the following command:

```bash
npm i -g hygen
```

# No-strings-attached approach:

If you don't want to install Hygen globally, you can use npx to run it without a global installation. For example:

```bash
npx hygen ...
```

# Step 2: Initialize hygen in your project:

Before you can start using Hygen, you need to initialize it in your project. Run the following command in your project's directory (you only need to do this once per project):

```bash
cd your-project
hygen init self
```

# Step 3: Build your first generator:

Templates are at the core of Hygen. They define how code or files should be generated. You can create your own templates or use existing ones, which are typically stored in the /\_templates directory within your project.

To generate code using Hygen, use the following command:

```bash
hygen generator-name sub-generator-name [options]

```

<generator-name>: The name of the generator you want to use.
<sub-generator-name>: The name of the sub-generator within the generator (optional).
[options]: Additional options to customize code generation (if supported by the generator).
For example, if you have a generator named "component" and a sub-generator named "new," you can run:

```bash
hygen component new
```

Hygen will then generate code or files according to the specified template.


# Add settings in the `"scripts"` section of your package.json file:

To add settings in the scripts section of your package.json file, follow these steps:

- Open your project's package.json file in a text editor.

- Locate the scripts section within the JSON structure. It should look something like this:

```json
"scripts": {
  "android": "react-native run-android",
  "ios": "react-native run-ios",
  "lint": "eslint .",
  "start": "react-native start",
},

```

- Add your settings by specifying a new key-value pair within the scripts object. The key is the name of the script, and the value is the command or setting you want to associate with that script. Here's an example:

```json
"scripts": {
  "android": "react-native run-android",
  "ios": "react-native run-ios",
  "lint": "eslint .",
  "start": "react-native start",
  "add:atom-component": "hygen add atom-component",
  "add:molecule-component": "hygen add molecule-component",
  "add:organism-component": "hygen add organism-component",
  "add:template-component": "hygen add template-component",
  "add:screen-component": "hygen add screen-component",
},

```
Now you have added custom settings in the scripts section of your package.json file. You can run these scripts using npm or yarn by referencing their names.

# Template

A hygen template is a header of a markdown-like header/[frontmatter](https://www.hygen.io/docs/templates#all-frontmatter-properties) and a body of an ejs templating engine.

```
---                            <----- frontmatter section
to: app/emails/<%= name %>.html
---

Hello <%= name %>,
<%= message %>                 <----- body, ejs
(version <%= version %>)

```

The frontmatter is delimited by a matching --- top and bottom with yaml in it, where we define the template metadata.

Templates are also rendered, so if we have this in the file _templates/mailer/campaign/emails.ejs.t:

# Example:

To generate an atom component:
```bash
npm run add:atom-component

# You'll see output similar to the following:
?  Type a component name (like "Search", "Select")... › 
```

When you run this script, Hygen will generate the corresponding components or templates based on the templates defined in your project. For this project we have that template:

```bash
Loaded templates: _templates
       added: src/components/atoms/Example/Example.tsx
      inject: src/components/atoms/index.ts
       added: src/components/atoms/Example/index.ts
       added: src/components/atoms/Example/Example.useStyles.ts
```


To understand how the generator is built, inspect the \_templates directory, which you should check into your project repository.

This improved README provides a clear and organized guide for installing and using Hygen in your project. Feel free to customize it further to match your specific project requirements.


# node-ts-starter

[![Dependency Status](https://david-dm.org/dreamsparkx/node-starter.svg)](https://david-dm.org/dreamsparkx/node-starter)

The main purpose of this repository is to show a working Node.js API Server + front-end project and workflow for writing Node code in TypeScript.

# Pre-reqs

To build and run this app locally you will need a few things:

- Install Node.js
- Install MongoDB

# Getting Started

Clone the repository

```
git clone https://github.com/dreamsparkx/node-starter <project_name>
```

Install dependencies

```
cd <project_name>
npm install
```

Configure and start MongoDB

```
mongod

# on macOS 10.15 or above the db directory is under home directory
mongod --dbpath ~/data/db
```

Build and run the project

```
npm run build
npm start
```

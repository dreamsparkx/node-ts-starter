# node-ts-starter

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdreamsparkx%2Fnode-ts-starter.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdreamsparkx%2Fnode-ts-starter?ref=badge_shield)
[![Coverage Status](https://coveralls.io/repos/github/dreamsparkx/node-ts-starter/badge.svg?branch=master)](https://coveralls.io/github/dreamsparkx/node-ts-starter?branch=master)
[![Commit activity](https://img.shields.io/github/commit-activity/y/dreamsparkx/node-ts-starter?style=flat-square)](https://github.com/dreamsparkx/node-ts-starter/commits/)
![main.yml workflow](https://github.com/dreamsparkx/node-ts-starter/actions/workflows/main.yml/badge.svg)

The main purpose of this repository is to show a working Node.js API Server + front-end project and workflow for writing Node code in TypeScript.

# Pre-reqs

To build and run this app locally you will need a few things:

- Install Node.js
- Install MongoDB
- Install pnpm (npm install -g pnpm@latest-10)

# Getting Started

Clone the repository

```
git clone https://github.com/dreamsparkx/node-ts-starter <project_name>
```

Install dependencies

```
cd <project_name>
pnpm install
```

Configure and start MongoDB

```
mongod

# on macOS 10.15 or above the db directory is under home directory
mongod --dbpath ~/data/db
```

Build and run the project

```
pnpm build
pnpm start
```

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdreamsparkx%2Fnode-ts-starter.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdreamsparkx%2Fnode-ts-starter?ref=badge_large)

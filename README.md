# Auth & Persistence

The purpose of this project, is to demonstrate prinicples such as dependency injection and single responsibility rule,
using patterns like repository or dao.

# How to use?

Core Module contains its own dependencies, and primarily it's Firebase (for storage and authentication).

There are two ways of running test suites:

npm run test:dependencies   -> It calls real Firebase account instance
npm run test:mocks          -> It operates on mocks, created for ease of TDD


### About

Created by Szymon Sitko @ 2020
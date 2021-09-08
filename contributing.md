# Contributing to Botd

## Working with the code

Prerequisite: Make sure you have the [Yarn](https://yarnpkg.com) package manager installed.

### Development playground

The playground is a quick way to run, test, and debug the code. The playground is located in the [playground](playground) directory. The page runs the built library once opened.

To prepare playground run:
```bash
yarn install # installs dependencies
yarn build:rollup # builds bot detection client library
```
After a successful build, you can open [playground/index.html](playground/index.html) file in your browser.

**Note:** Playground uses a shared hardcoded botd API token.

### How to build

To build the distribution files of the library, run:

```bash
yarn install
yarn build
```

The files will appear in the `dist` directory.

### Code style

The code style is controlled by [ESLint](https://eslint.org) and [Prettier](https://prettier.io).
Run to check that the code style is ok:

```bash
yarn lint
```

Run to fix code style mistakes (not all mistakes can be fixed automatically):

```bash
yarn lint:fix
```

### Contributing
**Important**: Bot detection, crawling, and scraping techniques are continuously evolving. Before filing a new issue or discussing detection techniques publicly, consider whether the topic is suitable for the general audience. Please discuss sensitive topics directly with [support@fingerprintjs.com](mailto:support@fingerprintjs.com) or on the [Discord server](https://discord.gg/39EpE2neBg) with the repository maintainers.

One can create a new signal source in this client-side library, however, it needs to be also accepted and processed on the backend side properly. The recommended approach is to  [file an issue in the repository](https://github.com/fingerprintjs/botd/issues) and discuss signal details with the maintainers.

#### How to add a new signal source to the client
1. Create a new signal source in the `src/sources` directory.
2. Register it in the `collector.ts` file, in the `collect()` function. The new signal and its enum number should be discussed with the maintainers of the repository.
```ts
import getNewSignal from './sources/getNewSignal'
...
[SignalName.MyNewSignal]: getNewSignal,
...
```

### How to test
There are no tests yet - to be done later.

### How to publish

This section is for repository maintainers.

1. Bump the version. Search the current version number in the code to know where to change it.
2. Build and test the project.
3. See what's will get into the NPM package, make sure it contains the distributive files and no excess files.
    To see, run `yarn pack`, an archive will appear in the root, you can open it with any archive browser.
4. Run
    ```bash
    # Add '--tag beta' (without the quotes) if you release a beta version
    # Add '--tag dev' if you release a development version (which is expected to get new features)
    yarn publish --access public
    ```
5. Push the changes to the repository, and a version tag like `v1.3.4` to the commit.
6. Describe the version changes in the [releases section](https://github.com/fingerprintjs/botd/releases).
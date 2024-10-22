# Contributing to BotD

Thanks for taking the time to contribute!
Here you can find ways to make BotD better, as well as tips and guidelines.

This project and everyone participating in it is governed by the [Code of Conduct](code_of_conduct.md).
By participating, you are expected to uphold this code.

## How you can contribute

### Reporting an issue

If you've noticed a bug, have an idea or a question,
feel free to [create an issue](https://github.com/fingerprintjs/BotD/issues/new/choose) or [start a discussion](https://github.com/fingerprintjs/BotD/discussions/new/choose).

> [!IMPORTANT]
> Bot detection, crawling, and scraping techniques are continuously evolving.
> Before filing a new issue or discussing detection techniques publicly, consider whether the topic is suitable for the general audience.
> Please discuss sensitive topics directly with [support@fingerprint.com](mailto:support@fingerprint.com) or on the [Discord server](https://discord.gg/39EpE2neBg) with the repository maintainers.

Before you start, please [search](https://github.com/search?q=repo%3Afingerprintjs%2FBotD) for your topic.
There is a chance it has already been discussed.

When you create an issue, please provide all the information needed to reproduce your situation, it will help us solve your issue faster.
If you want to share a piece of code or the library output with us, please wrap it in a ` ``` ` block and make sure you include all the information.

### Creating a pull request

If you want to fix a bug, create a signal source, or make any other code contribution, please [create a pull request](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project).

After you clone the repository, check the [Working with code](#working-with-code) section to learn how to run, check, and build the code.

In order for us to review and accept your code contributions, please follow these rules:
- Your code quality should be at least as good as the code you modify.
- Your code style (syntax, naming, coding patterns, etc) should follow the BotD style.
- All the new code should be covered with automated tests.
- All the checks described in the [Working with code](#working-with-code) section must pass successfully.
  You may create a draft pull request in this repository to run the checks automatically by GitHub Actions,
  but the tests won't run on BrowserStack until a BotD maintainer approves them.
- If you want to add a bot detector, follow the [How to add a bot detector](#how-to-add-a-bot-detector) instructions carefully.
- The changes should be backward compatible, ensuring BotD users continue to use the library without any modifications.
- Don't add dependencies (such as Node packages) unless necessary.
- Don't make changes unrelated to the stated purpose of your pull request. Please strive to introduce as few changes as possible.
- Don't change BotD code style, its TypeScript configuration, or other subjective things.

If you want to do something more complex than fixing a small bug, or if you're not sure if your changes meet the project requirements, please [start a discussion](https://github.com/fingerprintjs/BotD/discussions/new/choose).
We encourage starting a discussion if you want to propose violating a rule from this guide.
Doing so ensures we discuss all opinions, creating a good contribution experience for everyone.

### Helping with existing issues

If you want to help, but don't know where to start, take a look at the ["help wanted" issues](https://github.com/fingerprintjs/BotD/labels/help%20wanted).
You can help by sharing knowledge or creating a pull request.
Feel free to ask questions in the issues if you need more details.

## Working with code

This section describes how to deploy the repository locally, make changes to the code, and verify your work.

First, make sure you have [Git](https://git-scm.com), [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com) installed.
Then clone the repository and install the dependencies:

```bash
git clone https://github.com/fingerprintjs/BotD.git
cd BotD
yarn install
```

### Development playground

Development playground lets you run BotD locally. Run this command to start a playground:

```bash
yarn dev:playground # Add '--port 8765' to change the server port
```

Then open http://localhost:3000 in a browser.
BotD will execute immediately and print the result on the page.
The page reloads every time you change the source code.
The code of the playground itself is located in the [playground](playground) directory.

The playground is a quick way to run, test, and debug the code. The playground is located in the [playground](playground) directory.

### Code style

Follow the repository's code style.
The code style is controlled by [ESLint](https://eslint.org) and [Prettier](https://prettier.io).
Run to check that the code style is ok:

```bash
yarn lint
```

You aren't required to run the check manually, the CI will do it.
Run to fix code style mistakes (not all mistakes can be fixed automatically):

```bash
yarn lint:fix
```

### How to build

To build the distribution files of BotD that can be used in a browser directly, run:

```bash
yarn build
```

The files will be saved to the `dist` directory.

### How to test

There are automated tests.
They are run by [Jasmine](https://jasmine.github.io) in real browsers using [Karma](https://karma-runner.github.io).
Unit test files are located right next to individual module files that they check.
Integration tests are located in the `tests` directory.

To run the tests in a browser on your machine, build the project and run:
```bash
yarn test:local --browsers ChromeHeadless
# or to run in Firefox
yarn test:local --browsers FirefoxHeadless
# or to run in both
yarn test:local
```

To run the tests in browsers on [BrowserStack](https://www.browserstack.com), get a BrowserStack access key and run:
```bash
# For Linux, macOS and WSL (Linux on Windows)
BROWSERSTACK_USERNAME=your-username BROWSERSTACK_ACCESS_KEY=your-key yarn test:browserstack
```

If you face `Error: spawn Unknown system error -86` on macOS, try installing Rosetta:
```bash
softwareupdate --install-rosetta
```

Alternatively, make a PR to this repository, the test will run on BrowserStack automatically.
But the test won't run when the PR is made from a fork repository, in this case, a member will run the tests manually.

BrowserStack sessions are unstable, so a session can fail for no reason;
restart the testing when you see no clear errors related to the tests.
If you run the test command multiple times in parallel, BrowserStack will lose access to the Karma server
(for some reason), which will cause the tests to hang infinitely, so try to run a single test command at once.

To check the distribution TypeScript declarations, build the project and run:

```bash
yarn check:dts
```

To check that the package is compatible with server-side rendering, build the project and run:

```bash
yarn check:ssr
```

### How to add a bot detector

A bot detection algorithm consists of 2 stages: collection and detection.

The collection stage is implemented by signal sources, functions that extract pieces of data from the browsers.
The function are located in the [src/sources](src/sources) directory and listed in [src/sources/index.ts](src/sources/index.ts).

The detection stage is implemented by detectors, functions that make conclusions based on the data obtained by the collectors.
The function are located in the [src/detectors](src/detectors) directory and listed in [src/detectors/index.ts](src/detectors/index.ts).
A detector output is either the bot kind name, or `false` if the visitor is not a bot, or `true` if the visitor is an unknown bot.

If a signal source meets an unexpected condition that doesn't allow it to return a proper signal,
the signal should throw a `BotdError` object with the corresponding `state` and `message`.

The signal sources must handle expected and only expected errors.
The expected errors and unsupported conditions must be turned into special signals and returned, or into `BotdError` objects and thrown.
Pay attention to potential asynchronous errors.
If you handle unexpected errors, you won't know what's going wrong inside the signal source.
Example:

```js
async function signalSource() {
  try {
    // `await` is necessary to catch asynchronous errors
    return await doLongAction()
  } catch (error) {
    // WRONG:
    return 'error'

    // Correct:
    if (error.message = 'Foo bar') {
      return 'bot'
    }
    if (/boo/.test(error.message)) {
      throw new BotdError(State.UnexpectedBehaviour, 'Boo message')
    }
    throw error // Unexpected error
  }
}
```

Every signal source needs to be covered with unit tests.
These tests are meant to verify that the signal source returns expected values across all supported browsers.
In the event of significant changes or deprecation of the underlying APIs, these tests should start to fail in future browser versions.

For inspiration see existing tests in [src/sources/](src/sources/).

### How to publish

See the [publishing guide](docs/publishing.md) (for BotD maintainers only).

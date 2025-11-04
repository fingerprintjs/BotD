# How to publish

This guide is for repository maintainers.

1. Create a PR that bumps the version in [package.json](../package.json).
2. When the PR checks succeed and the PR is approved, merge it.
3. Run the [Publish to NPM](https://github.com/fingerprintjs/BotD/blob/main/.github/workflows/npm_release.yml) workflow by using the "Run workflow" button.
    It will publish the current code to NPM and create a corresponding Git tag.
    The NPM version tag will be derived automatically from the package version, for example `2.2.3` gives `latest` and `2.2.3-alpha.1` gives `alpha`.
4. Describe the version changes in the [releases section](https://github.com/fingerprintjs/BotD/releases) under the corresponding tag.
5. Update the agent in https://stackblitz.com/edit/botd-v2-npm (find "dependencies" and click the round arrow).

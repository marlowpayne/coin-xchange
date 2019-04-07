# Coin Xchange

A simulated cryptocurrency exchange

https://coin-xchange.surge.sh

[![CircleCI](https://circleci.com/gh/marlowpayne/coin-xchange/tree/master.svg?style=svg)](https://circleci.com/gh/marlowpayne/coin-xchange/tree/master)

## Running

```sh
git clone https://github.com/marlowpayne/coin-xchange.git
cd coin-xchange/
yarn
yarn start
```

A browser will open Coin Xchange at `http://localhost:3000`

## Market Activity

Naive market activity is directed by the factors found in [constants](./src/constants/index.js).

Disclaimer: I have no real knowledge of how markets actually behave.

## Storybook

This project uses [Storybook](https://storybook.js.org/). Start it up with `yarn run storybook`

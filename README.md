# DeFiChain Masternode Monitor 2 (defichain-masternode-monitor-2)

tl;dr: See what's going on with your DeFiChain Masternodes

This software is able to show some interesting information about DeFiChain
masternodes. They don't have to be yours. You can see the number of blocks which have
been minted by a single or multiple masternodes, how many rewards they have been
receiving for that and so on.

The system itself utilizes a DeFiChain Ocean API as its main data source. You can
also host your own Ocean by using the "Pond" docker container image.

Masternode Monitor is free and open source. You can host it on your own page if you
like. There are some restrictions to its functionality when doing so because not
every information and functionality is available via Ocean. That's why there are some
centralized APIs I had to build.

The software does not use any kind of user tracking. There's no Google Analytics
involved or anything else. So, your privacy is always secured.

You can make a free 'account' to save your masternode list and settings to a
centralized service which is also maintained and ran by myself. But that's fully
optional.

## geek stuff

This application is running on JavaScript. It works in every major browser, including
those installed on smartphones and tablets.

It's built upon Vue.js v3, a major JavaScript framework which very elegantly enables
developing interconnected components, each in its own single file.
It also utilizes Quasar. That's a framework built on top of Vue.js. It aims to
provide some easy-to-use components for building a good user interface, such as
cards, input fields, buttons and some useful structure around that. It also enables
to make iOS and android apps from it.

The application itself uses the browser's data storage to save some data. That's
neccessary to give the application the ability to "remember" the masternodes you
are watching and your settings and stuff like that. Every reload makes it neccessary
to load these things from the browser's data storage. IndexedDB is what MaMon uses
in particular. That's why you sholud not delete your whole browser caches, because
that would also kill all saved data from MaMon.

This data store is not used directly but with Vue Pinia. That's something what's
called "state management". And that's just a fancy term for some kind of runtime data
storage. Long story short: Pinia is used to store, process and remotely access data
and to provide that to the different components of the application.

All this combined leads to the application itself, which then loads data out of
DeFiChain. It does that indirectly by utilizing the official Ocean system, which
ist kind of a global super node, providing DeFiChain's internal data through some
web-specific communication protocols an techniques, such as API calls via a REST API.
The connection to this system is provided by the offivial Jellyfish/Whale package,
which manages the whole data connection and data fetching in the background.

The UI is capable of running in different resolutions and environments. This means:
You can use it on your desktop computer on a 4k monitor as well as on your small
iPhone SE. It will adapt to the very different display sizes and input methods these
devices use.

If you want to take a look, you may find some interesting things in the
./src/components/ folder and in ./src/stores/ as well.

## Prerequisites for running it on your own

You have to have node.js, yarn and quasar cli installed to compile this application
by yourself.

## Install the dependencies

```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

This will run the application locally and open it up in your default browser.

### Build the app for production

```bash
quasar build
```

This will build a production version of the application. You'll find it in the
folder

```
./dist/spa/
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

<p align="center"><img src="./docs/logo.png" width="150" /></p>
<h2 align="center">HoloPlay</h2>
<p align="center">
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
    <a href="https://github.com/stephane-r/holoplay-pwa/tags"><img src="https://www.repostatus.org/badges/latest/active.svg" alt="Badges"></a>
    <a href="https://github.com/stephane-r/holoplay-pwa/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome"></a>
    <a href="https://github.com/stephane-r/holoplay-pwa-"><img src="https://img.shields.io/github/stars/stephane-r/holoplay-pwa?label=%E2%AD%90%20Stars" alt="Stars"></a>
    <a href="https://github.com/stephane-r/holoplay-pwa"><img src="https://img.shields.io/github/forks/stephane-r/holoplay-pwa?color=%23ff69b4" alt="Forks"></a>
    <a href="https://github.com/stephane-r/holoplay-pwa/tags"><img src="https://img.shields.io/docker/pulls/spout8301/holoplay" alt="Docker pull"></a>
</p>

<hr>

HoloPlay is a Youtube alternative app using [Invidious API](https://github.com/omarroth/invidious). You can save music to favoris or create your playlists. This project is fully open source.

If you want add more feature, PM, MR or PR are welcome :)

[<img src="docs/screenshots/dashboard.png" width=350>](./docs/screenshots/dashboard.png)
[<img src="docs/screenshots/search.png" width=350>](./docs/screenshots/search.png)
[<img src="docs/screenshots/search-light-mode.png" width=350>](./docs/screenshots/search-light-mode.png)
[<img src="docs/screenshots/playlists.png" width=350>](./docs/screenshots/playlists.png)

<br>

[<img src="docs/screenshots/mobile.png" width=250>](./docs/screenshots/mobile.png)
[<img src="docs/screenshots/playlists-mobile.png" width=250>](./docs/screenshots/playlists-mobile.png)
[<img src="docs/screenshots/favorite-mobile.png" width=250>](./docs/screenshots/favorite-mobile.png)

## Features

- **Search on Invidious or Youtube Music**
- **Search by video and playlist**
- **Create your playlists**
- **Save favourites**
- **Downloading video**
- **Background mode (Android, PWA)**
- **Data Syncing between devices** (by using [Holoplay Serverless](https://github.com/stephane-r/holoplay-serverless))
- **Internationalization with 🏴󠁧󠁢󠁥󠁮󠁧󠁿 English, 🇫🇷 French, 🇯🇵 Japanese, 🇷🇺 Russian and 🇩🇪 German**
- **Audio and video mode (by using youtube-nocookie.com)**
- **Respect your privacy**
- **Open Source**
- **Sponsor Block**
- **Responsive**
- **Dark Theme**

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

First, use **Node.js 18** or higher.

Copy `.env.dist` to `.env` and change `REACT_APP_API_URL` to your Holoplay Serverless URL :

```bash
REACT_APP_API_URL=http://localhost:3001 # Or https://holoplay-serverless.vercel.app for production domain
```

Then, install dependencies:

```bash
npm install
```

And run project in development mode:

```bash
npm start
```

## Docker

If you prefer Docker, holoplay can be run in a container from official Docker hub :

```bash
docker run -d -p 3000:3000 spout8301/holoplay:latest
```

Or locally :

```bash
docker build -t holoplay .
docker run -d -p 3000:3000 holoplay
```

## Built With

- [React](https://reactjs.org)
- [Mantine](https://mantine.dev)
- [TypeScript](https://www.typescriptlang.org/)

## Plausible Analytics

HoloPlay use [Plausible Analytics](https://plausible.io/), an transparent and fully open source [privacy-friendly analytics](https://plausible.io/privacy-focused-web-analytics) software.

Analytics page is public : [HoloPlay Plausible page](https://plausible.holoplay.io/holoplay.io)

## About Invidious

[Invidious](https://github.com/iv-org/invidious) is an alternative front-end to YouTube. HoloPlay use all [Invidious public instances](https://api.invidious.io/). All instances are retrieved each time HoloPlay is launched.

## Contributors

<a href="https://github.com/stephane-r/holoplay-pwa/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=stephane-r/holoplay-pwa" />
</a>

## License

This project is licensed under the MIT.

## TODO

- [ ] Play on other device from app (ex. desktop to mobile)
- [ ] Virtualize list for better performance
- [x] Use region on Invidious API ()
- [x] Video mode
- [x] i18n support
- [x] Default Invidious instance
- [x] Add custom Invidious instance

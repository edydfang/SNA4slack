# slack-diagram
A project for [SNA4Slack](http://score-contest.org/2018/projects/sna4slack.php).
It obtains data from [SlackArchive](http://slackarchive.io/).

## Online Demo

[SNA4Slack](https://sna4slack.herokuapp.com)

## Development environment

- [WebStorm](https://www.jetbrains.com/webstorm/) recommended.
- VSCode
- ECM 2017 Standard

## Installation
Make sure you have installed [node.js](https://nodejs.org/).

 - Node.js >= 7.6 (async/await)
 - NPM

Run the following commands:
```sh
git clone https://github.com/imxieyi/slack-diagram.git
cd slack-diagram
npm install
node server.js
```

Open [http://localhost:3000](http://localhost:3000) in the browser.

## TO-DOs
 - [x] Digest chunky json response from SlackArchive api
 - [x] Index page
 - [x] Raw page design
 - [ ] Input-dependent button color
 - [ ] Auto-complete
 - [ ] Animation effect
 - [ ] Channel selection panel
 - [ ] Date span selection
 - [ ] Network graph
 - [ ] Member details panel
 - [ ] Relationship details panel

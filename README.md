# slack-diagram
A project for [SNA4Slack](http://score-contest.org/2018/projects/sna4slack.php).
It obtains data from [SlackArchive](http://slackarchive.io/).

## Development environment
[WebStorm](https://www.jetbrains.com/webstorm/) recommended.

## Dependencies
 - [Express](http://expressjs.com/)
 - [Bootstrap](https://getbootstrap.com/)
 - [jQuery](https://jquery.com/)

## Installation
Make sure you have installed [node.js](https://nodejs.org/).

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
 - [ ] Index page
 - [ ] Channel selection panel
 - [ ] Date span selection
 - [ ] Network graph
 - [ ] Member details panel
 - [ ] Relationship details panel

# slack-diagram
A project for [SNA4Slack](http://score-contest.org/2018/projects/sna4slack.php).
It obtains data from [SlackArchive](http://slackarchive.io/).

The back end source is located at [imxieyi/SlackDiagramServer](https://github.com/imxieyi/SlackDiagramServer)

## Online Demo

[SNA4Slack](https://sna4slack.herokuapp.com)

## Development environment

- [WebStorm](https://www.jetbrains.com/webstorm/) recommended.
- VSCode
- ECM 2015 Standard

## Installation
Make sure you have installed [node.js](https://nodejs.org/).

 - Node.js >= 7.6 (async/await)
 - NPM

Run the following commands:
```sh
git clone https://github.com/imxieyi/slack-diagram.git
# for front end
cd slack-diagram/front-end
npm install
node run dev
```

Open [http://localhost:9528](http://localhost:9528) in the browser.

## TO-DOs
 - [x] Entry Page Design
 - [x] Back End Basic API
 - [x] Dashboard Framwork
 - [ ] Dashborad Details
 - [ ] Network Graph Rendering
 - [ ] Deep Analysis for the SNA
 - [ ] Channel selection panel
 - [ ] Date Filter
 - [ ] Network graph
 - [ ] Member details panel
 - [ ] Relationship details panel
 - [ ] Report Export

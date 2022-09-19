# Footbase

![](https://i.imgur.com/ehC85Z3.gif)

## Description

This project was made for the final part of The Odin Project's Javascript curriculum. The instructions were to re-create a website and implement as much functionality from that website as we could. I chose [transfermarkt](https://www.transfermarkt.com/) as the website I wanted to replicate and had already decided that it wouldn't be a straight clone, but rather my own take on the website. The primary things that I wanted to practice whilst making this project were:

- Making multiple API calls and managing that data in state.
- Using Firebase for User Authentication and to store the users favourite players/teams.
- Visualise that data using tables where possible.

The end result is a site where you can make an account, save your favourite Premier League players and teams, as well as see up-to-date statistics from their current season. You can also stay up-to-date via the homepage with all the latest news and statistics from the league as a whole.

A couple of improvements that I would like to make are;

- use Typescript for it's ability to catch errors earlier (particalarly when passing Props with this project).
- handling the multiple API calls begtter. Perhaps by using a custom hook.
- a slightly better implementation of the dark theme.

## How to install

```
git clone https://github.com/as-bowley/footbase.git
cd footbase
npm install
npm run build
```

## Technologies

- [React](https://reactjs.org/)
- [Javascript](https://www.javascript.com/)
- [Create React App](https://create-react-app.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Firebase](https://firebase.google.com/)

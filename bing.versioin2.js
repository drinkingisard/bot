// ==UserScript==
// @name         BingBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  bing is botted!
// @author       Shichinova Anna
// @match        https://www.bing.com/*
// @match        https://napli.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let keywords = ["10 самых популярных шрифтов от Google", "Отключение редакций и ревизий", "Взаимодействие PHP и MySQL", "Плагины VS Сode", "DevTools"];
let keyword = keywords[getRandom(0, keywords.length)];
let search_icon = document.getElementById("search_icon");
let links = document.links;
let bingInput = document.getElementById('sb_form_q');

if (search_icon !== null) {
  let i = 0;
  let timerId = setInterval(() => {
    bingInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      setTimeout(() => {
        search_icon.click();
      }, getRandom(200, 500));
    }
  }, 500)

  } else if (location.hostname == "napli.ru") { // check if we are on a target site

    setInterval(() => {
      let index = getRandom(0, links.length);
      if (getRandom(0, 101) >= 80) {
        location.href = "https://www.bing.com/"
      }
      if (links.length == 0) {
        location.href = "https://napli.ru";
      }
      if (links[index].href.indexOf("napli.ru") !== -1) {
        links[index].click();
      }
    }, getRandom(3000, 5000));
    console.log("мы на целевом/target сайте");

  } else {
    let nextBingPage = true;
    for (let i = 0; i < links.length; i++) {
      if (links[i].href.indexOf("napli.ru") !== -1) {
        let link = links[i];
        console.log("found string " + link);
        setTimeout(() => {
          link.click();
        }, getRandom(1500, 4000));
        break;
      }
    }
    if (document.getElementsByClassName("b_widePag")[4].innerText == "5") { // если не нашли в выдаче целевой сайт
      nextBingPage = false;
      location.href = "https://www.bing.com/";
    }
    if (nextBingPage ) { //кликаем по каждой странице выдачи
      setTimeout(() => {
        document.getElementsByClassName("sb_pagN")[0].click();
      }, getRandom(2000, 5000));
    }
  }
function getRandom(min, max) {
  return Math.floor(Math.random()*(max - min) + min);
}

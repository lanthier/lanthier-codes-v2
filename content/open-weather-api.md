---
title: Open Weather API Tutorial
description: How to make API calls using AJAX, Fetch, and XHR with the Open Weather API
---

As an online tutor, I've noticed one of the most common APIs students are asked to learn is the Open Weather API. Often teachers want their students to utilize something specific (ajax, fetch, etc.) in order to call the API.

In this tutortial I will show you the AJAX, Fetch and XHR request methodologies for getting data from an API.

## The HTML

```html
<html>
  <body>
    <label>City name:</label>
    <input type="text" id="city-name-input" />
    <button id="api-button">Call api</button>
  </body>
</html>
```

**Note:** The `script` is the CDN library to allow for AJAX requests. Do not include this script if you aren't going to use AJAX.

## JavaScript Part 1 - Reference HTML in your JavaScript

Now we need to reference our HTML elements in our JavaScript. `document.getElementById()` is one of the most common ways we get a specific HTML element into our JavaScript. This code will be the same regardless of which method you choose to use.

```javascript
var button = document.getElementById('api-button');
button.addEventListener('click', callWeatherApi); //Add event listener
```

First, we store the button in a variable so we can use it on the next line. On the next line we are adding a click event listener with the `addEventListener` function. The first parameter is the type of event listener (click), the second is the function that we will call whenever that particular even is emitted from the element we are attaching it to.

## JavaScript - Ajax Call

[Ajax Reference](https://api.jquery.com/jquery.ajax/)

```javascript
async function callWeatherApi () {
    const cityNameInput = document.getElementById('city-name-input');
    const cityName = cityNameInput.value;
    return await $.ajax({
      type: "GET",
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey
    });
  }
```

**Note:** You'll need to add a reference to the AJAX library in order to use this. I like using the CDN.

## JavaScript - Fetch API

[Fetch API Reference](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

```javascript
async function callWeatherApi () {
    const cityNameInput = document.getElementById('city-name-input');
    const cityName = cityNameInput.value;
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey);
    return response.json();
  }
```

This is my favorite way because it is native to the browser. The only downside is our favorite browser Internet Explorer doesn't support this. If you need to support Internet Explorer, [use a polyfill](https://github.com/github/fetch).

## JavaScript - XHR request

[XMLHTTPRequest Reference](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)

```javascript
async function callWeatherApi () {
    var cityNameInput = document.getElementById('city-name-input');
    var cityName = cityNameInput.value;
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey);
    xhr.send();
    let weatherData;
    xhr.onload = () => {
      weatherData = xhr.response;
    }
    return weatherData;
  }
```

## Full example on GitHub

[Full example here](https://github.com/lanthier/open-weather-api-requests). This version is slightly different because I wanted it to work by itself, but the actual request methodologies remain the same. I have three different buttons in this project that represent each methodology separately. After that, for each type of request, I store the variable rather than return it. 
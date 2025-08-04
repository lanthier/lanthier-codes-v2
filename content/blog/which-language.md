---
title: Which Programming Language Should You Learn First?
description: An in-depth analysis of programming languages for beginners
date: 2020-09-05T05:00.000-05:00
seo:
  title: "Which Programming Language Should I Learn First? - Complete Guide"
  description: "In 2020, what programming language should you learn first? Get an in-depth analysis of programming languages for beginners with industry insights and recommendations."
  keywords: ["programming", "programming languages", "python", "javascript", "java", "csharp", "beginners", "coding"]
  author: "Alex Lanthier"
  image: "/which-programming-language.jpg"
  url: "/which-language"
---

Let me skip the anticipation. It does not *really* matter which programming language you learn first. At least, that is what you will hear from most forum posters and other bloggers in this space. But what if you had to choose? Maybe you only want to learn one programming language, or perhaps you are switching careers and need to know which programming language will get you on the fast track. Either way, I will do an in-depth analysis on some programming languages.

## Considerations for your first programming language

**Industry application**

The biggest factor: Why do you want to learn how to program? Do you want to make video games or websites? Certain programming languages are better for particular career paths. Python is ideal for data science, for instance.

**Language type**

I believe your first language should be a language that best fits your learning style. When you start coding, would you prefer to see what is happening behind the scenes in your code? Or would you rather the code magically work?

**Language market**

Do you want to learn a language that is popular or a niche language? Niche languages can make you more money but frequently have smaller communities to help you out when you get stuck. I recommend my students to first learn a popular language so they have a lot of support.

**Language difficulty**

The time commitment you will need to give will vary based on how difficult your language is to learn.

## Industry application

So, what do you want to do?

**Video Games**

I recommend **C#**. Everyone will tell you **C++** is the first language you should learn for video games, but C++ is tough as a first programming language. It is harder to master and there is a lot more work involved to program simplistic operations. C# is a modern language and is the primary language of the [Unity](https://unity.com/) game engine. Following my recommendation does not mean you can't also learn C++, but you'll likely have better luck learning C# first.

C++ is typically the language Programmers recommend because we popularly know the video game industry for using it to improve the speed of code. C++ can work "closer" to the computer to better manage the memory the program uses. Thus, making the code faster. I don't think this is a good reason for someone to learn C++ as their first language.

| Programming Language | Category | Top Game Engine(s) | Games* |
|---------------------|----------|-------------------|---------|
| C++ | AA/AAA | [Unreal Engine](https://www.unrealengine.com) | World of Warcraft, Fortnite, Borderlands |
| C# | AA/AAA | [Unity](https://unity.com/) | Pokemon Go, Hearthstone, Crossy Road |
| JavaScript | Web | [babaylonjs](https://www.babylonjs.com/), [phaser](https://phaser.io/) | |
| Lua | AA/AAA | [Love](https://love2d.org/) | Dota 2, Dark Souls, Roblox |
| Swift | IOS Mobile | [SceneKit](https://developer.apple.com/scenekit/) | Angry Birds |
| Objective-C | IOS Mobile | [Sparrow](https://gamua.com/sparrow/), [Cocos 2D](https://www.cocos.com/en/) | Star Trek: Rivals, WordScape |
| Java | AA/AAA, Android Mobile | [libGDX](https://libgdx.badlogicgames.com/), [jmonkeyengine](https://jmonkeyengine.org/) | The Amazing Spiderman 2, Assassin's Creed II |

*Many games are created using multiple languages.*

**Website Development**

**JavaScript** is a quick language to use, albeit a little difficult to master. JavaScript is useful regardless if you want to be a front-end (what you see in your browser), back-end (the data and authentication) or a full-stack (both) developer. If your goal is to become a full-stack developer, you will need to follow both the front-end and the back-end paths of learning.

I recommend JavaScript because, while you can code front ends in Python, JavaScript is still by far the most dominate programming language in web development. Browsers also directly support JavaScript, which makes it easy to work with it right out of the box.

**Front-end developers** need to know HTML, CSS and JavaScript at a minimum. HTML and CSS are what you see on your screen, and the JavaScript manipulates those things on your screen to create functional behavior. HTML is the button, CSS is what the button looks like and JavaScript is what happens when you click that button.

**Back-end developers** need to know a back-end language and a database query language. The back-end typically involves the storage of data that might be used across multiple websites (or even mobile apps!). Back-end also involves creating interfaces for these websites to use the data. I recommend JavaScript as your first back-end language. Other back-end languages include C#, PHP, Java and Python.

**Mobile Application Development**

**Swift** for IOS or **Java** for Android. Keep in mind that if you learn Swift, there are very few popular applications outside of IOS development. Java on the other hand is a very portable language and still widely used across different industries.

You can also learn JavaScript or C# to create cross-platform targeting applications. C# uses the [Xamarin](https://dotnet.microsoft.com/apps/xamarin) framework and JavaScript uses [React Native](https://reactnative.dev/). I recommend staying away from Xamarin both from personal experience and from a [February 2020 Stack Overflow survey](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-other-frameworks-libraries-and-tools-dreaded3). I took a snapshot of the survey results below for "Most Dreaded Technology".

![Stack Overflow Dreaded Technology Survey](/stack-overflow-dreaded.png)

## Language Type and Classifications

If you are still stuck between a couple languages or you don't have a clear goal in mind, language type may be the deciding factor for you.

**Type Class**

**Strongly typed** or **weakly typed**. Roughly speaking, strongly typed needs to specify if something is a number or a word. Weakly typed languages do not need you to specify. Mostly, this is true when you are converting types into other types. I.E. Trying to turn a number into a word in your code. Consider the following:

```python
# Python is a weakly typed language. You can change strings (characters/words) to numbers and multiply them.

aWord = 'Hello'
x = aWord*2 # No error
aWord = 123 # No error, possible to turn strings into numbers
```

Weakly typed languages such as Python allow for more freedom with your code. What if you don't know whether your variable will hold a number or a string? The downside to weakly typed languages is you are more prone to error. For a first-time programmer, it isn't obvious at all that there is any kind of typing going on here.

```java
// Java is a strongly typed language; you cannot change types of variables.

string aWord = "Hello";
int x = aWord * 2; // Error can't multiply string by integer
aWord = 123; // Also error
```

Strongly typed languages like Java and C# force you to declare which type the variable is. Java is a popular language for new programmers because it is very verbose in the code you write: `Scanner scanner = new Scanner();`. The downsides are you aren't allowed as much freedom and you have to write more code.

**Compilation Class**

**Static** or **dynamic**. Static typing means the program checks your types before running your program. Dynamic typing means the program checks your types while your program is running. I find that when I teach new programmers, they have a little more trouble with dynamically typed languages, but this isn't always the case. Dynamically typed languages give you some freedom too, though this freedom that might not matter for your first programming language.

## Language Difficulty

How difficult a language is maybe subjective, but there are some indicators and language "features" that can help us distinguish which programming languages are harder to learn than others. Once again I'm going to use a snapshot from the 2020 developer survey from stack overflow:

![Stack Overflow Dreaded Language Survey](/stack-overflow-dreaded-language.png)

VBA is an older language which was developed by Microsoft. Programmers write it for products and frameworks in Mircosoft's ecosystem. C# has largely replaced VBA. Objective-C is the primary language you use to write software for IOS and OS X, though Swift is starting to replace some of this. I would not recommend VBA, Objective-C, Perl, Assembly, C no PHP as your first language.

## Language Market

Uncommon and older programming languages seem to offer the highest pay, according to the 2020 Stack Overflow Developer Survey. Personally, I couldn't handle working with Scala or Objective-C all day, but that's just me.

![Stack Overflow Pay by Language Survey](/stack-overflow-pay-by-language.png)

## So, Which Programming Language?

If you still don't know, just learn JavaScript. JavaScript has applications in more fields than just web development. It is simple to start up and forgives you where other languages would not. It will expose to functional programming and give you all the basics of languages like variables, functions, types, etc. Also, recent developments in JavaScript allow for more object-oriented programming. 
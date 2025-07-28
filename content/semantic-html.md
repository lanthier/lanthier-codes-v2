---
title: What is Semantic HTML?
description: Understanding semantic HTML elements and their importance
---

## What is Semantic HTML?

Semantic HTML is HTML that uses semantic elements, which are elements that clearly describe what they mean from their tag names. A semantic element shows its meaning to both the browser and the programmer.

**Non-semantic elements:**

`<div>`

`<span>`

**Semantic elements:**

| Element | Purpose |
|---------|---------|
| `<address>` | Text that represents an address. Note, this [DOES NOT](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address) need to be the author(s) of the document. |
| `<article>` | A self-contained, independent composition in the document intended to be independently distributable. |
| `<aside>` | Indirectly related to the document's main content, usually a sidebar. |
| `<bdi>` | Isolated text from its surrounding text for text directionality purposes. |
| `<details>` | For toggleable, optional text that the user doesn't need to see. |
| `<dialog>` | Dialog boxes and windows. |
| `<figure>` | A caption or legend describing other contents. |
| `<footer>` | Footer, typically contains author info and legal information. |
| `<header>` | Introductory content, logos, navigational aids, etc. |
| `<main>` | The dominant content of the document's `<body>`. |
| `<mark>` | Text which is marked or highlighted for reference or notation. |
| `<menuitem>` | [Deprecated - Do not use this](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menuitem). |
| `<meter>` | A scalar value within a known range or a fractional value. |
| `<nav>` | Provides links within or outside of the current document. |
| `<progress>` | Indicates completion progress of a task. |
| `<rp>` | Fallback for the `<ruby>` element. |
| `<rt>` | Text component of a `<ruby>` annotation. |
| `<ruby>` | Shows pronunciation of East Asian characters. |
| `<section>` | Represents a standalone section in a document. |
| `<summary>` | Summary, caption or legend for a `<details>` disclosure box. |
| `<time>` | Represents a specific period in time. |
| `<wbr>` | Optional line break. |

## Why use semantic HTML?

Per the [W3](https://www.w3.org/TR/WCAG20-TECHS/G115.html), the objective of semantic HTML is to mark up the structure of the web content using the appropriate semantic elements. In other words, the elements are used according to their meaning, not because of the way they appear visually.

Using the appropriate semantic elements will make sure the structure is available to the [user agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent).

Humans and bots have an easier time reading semantic HTML. Rather than having 5 or 6 nested `<div>` elements, use other less generic-use elements to increase the readability of the content.

Bots understanding your HTML markup better means better chances for ranking higher in SEO. Also, programs that assist users with accessibility issues can better read these elements and therefore give their users better accessibility to your website.

## How to use semantic HTML

Already have a working website? Identify where you are using `<div>` and `<span>` elements and replace them with others. Use the table I provided to see if your non-semantic elements have a meaning that matches one of the elements.

**A sample common layout using semantic elements:**

![Semantic HTML Example](https://i.postimg.cc/zBYQDtSn/semantic-example.png)

You can use the `<header>` to put your logos, site title, navigation menu, etc. Navigation typically lives in your `<header>` element.

`<aside>` in this setup is great for side bars or for running mobile advertisements.

`<article>` contains the actual content you want to give the user. In here, I prefer to use `<section>` elements to ward off sections of information if necessary.

Copyright information and legal information such as Privacy Policies, Terms and Conditions or disclosures are great for the `<footer>`.

**Navigation markup example:**

```html
<header>
  <img src="logo.png" />
  <h1>My Portfolio</h1>
  <nav class="right">
    <a href="/home">Home</a>
    <a href="/about">About</a>
    <a href="/projects">Projects</a>
    <a href="/contact">Contact</a>
  </nav>
</header>
```

**Article markup example:**

```html
<article>
  <header>
    <h1>Animals</h1>
  </header>
  <section>
    <h2>Sunbears</h2>
    <p>
      Sunbears are small bears that origin...
    </p>
  </section>
  <section>
    <h2>Penguins</h2>
    <p>
      Penguins are aquatic flightless birds...
    </p>
  </section>
  <section>
    <h2>Kids</h2>
    <p>
      Kids are another animal completely...
    </p>
  </section>
</article>
```

There are a few different methods you can organize your `<section>` and `<article>` elements. This is the way I prefer. It is also acceptable to nest `<article>` elements inside of `<section>` elements.

## Further Resources on Semantic HTML

- [W3 Schools on HTML Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)
- [Mozilla on semantics](https://developer.mozilla.org/en-US/docs/Glossary/Semantics) - Look at what they have to say about semantics in HTML. 
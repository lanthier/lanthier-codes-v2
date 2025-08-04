---
title: What is CSS Specificity?
description: Understanding CSS specificity, rule conflicts, and how browsers choose which style to apply
date: 2020-08-13T05:00.000-05:00
seo:
  title: "CSS Specificity Explained - How Browsers Choose Styles"
  description: "Master CSS specificity with this comprehensive guide. Learn how browsers resolve style conflicts, calculate specificity scores, and apply the most specific CSS rules."
  keywords: ["css", "specificity", "web development", "frontend", "styling", "css rules"]
  author: "Alex Lanthier"
  image: "/css-specificity.jpg"
  url: "/css-specificity"
---

## What is CSS Specificity?

CSS Specificity is the selection of the most specific CSS rule when it is conflicting with another rule. This article is about how the most specific CSS rule gets chosen and when our browsers decide that a rule is conflicting.

[MDN Definition](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) - Specificity is a weight that is applied to a given CSS declaration, determined by the number of each selector type in the matching selector.

## CSS Rule Conflicts

CSS rule conflicts happen when CSS selectors select the same element and try to apply the same CSS rule to that element. While the name might sound scary, these aren't merge conflicts. CSS rule conflicts aren't bad by themselves, they are common in larger projects and projects that use external CSS resources. The problem is CSS specificity is a common "gotcha" when styles aren't showing up on your elements.

**Example**

```css
button {
  background-color: red;
}

.button-class {
  background-coor: purple;
}
```

**Result:**

<button class="button-class">
  Click me
</button>

This is a CSS rule conflict between two selectors. `button {` is trying to set background-color property of all buttons to red. `.button {` is trying to set the background-color property to purple. This is a CSS rule conflict. The CSS rule that gets select is the rule inside of `.button` because it is more *specific*.

## CSS Style Specificity Calculation

| Rank/Score | Selector | Example |
|------------|----------|---------|
| 1 | Type selectors | `button` `span` `p` `table` |
| 2 | Class selectors | `.button-class` `.subtitle` |
| 2 | Psuedo class selectors | `:hover` `:disabled` |
| 2 | Attribute selectors | `input[type="button"]` `a[href$=".com"]` |
| 3 | ID selectors | `#button-id` `#main-content` |
| 4 | Inline style | `<button style="color: pink">Click me!</button>` |
| 5 | !important | `color: pink !important;` `flex-direction: column !important;` |

**1 = Least specific  5 = Most specific**

ID selector styles will override class selector styles, class selector styles will override element selectors, etc. An *important* thing to note here is that inline styles and the `!important` selector have the highest scores on this table. That means that they will override any other type of selector's CSS rules. CSS specificity is the primary why the usage of these two types of styling are discouraged. That being said, as a software engineer I understand there are times where you must use these selectors for non-perfect world scenarios.

## More on Specificity

**Class order matters**

```html
<span class="purple-text green-text">The second class overwrites the first.</span>
```

```css
.purple-text {
  color: purple;
}

.green-text {
  color: green;
}
```

**Result:**

<span class="purple-text green-text">The second class overwrites the first.</span>

**When to use `!important`**

I recommend against using `!important`. The specificity and the fact that you need to place it on a per-property basis makes your styles harder to maintain and difficult to debug. That being said, sometimes there are no other options but to use it. The bottom line is only use `!important` if you don't have control over what you are overriding.

- Overriding inline styles. This is something I've had to do before when using large amounts of stored web scraped html content data. Sometimes there are no other options.
- Overriding high specificity. Only if you do not have control over high specificity. If you have control over the CSS that has the high specificity, either write a higher specificity selector or remove the high specificity in the first place.

**Specificity Algorithm**

If you are the kind of person that wants to know more than a top level overview, [read this](https://www.w3.org/TR/CSS1/#cascading-order). There is an algorithm that you can use to calculate specificity. If you don't like reading documentation but are curious, here is a sample calculation:

1. Count the ID attributes in the selector. (**A** = # of ID attributes)
2. Count the class attributes in the selector. (**B** = # of class attributes)
3. Count the number of element names in the selector. (**C** = # of element names)
4. (A x 100) + (B x 10) + C = Specificity score.

| Selector | # of ID attributes | # of class attributes | # of element names | Specificity score |
|----------|-------------------|----------------------|-------------------|------------------|
| `button` | 0 | 0 | 1 | 1 |
| `button span` | 0 | 0 | 2 | 2 |
| `button span.red-text` | 0 | 1 | 2 | 12 |
| `#submit-button` | 1 | 0 | 0 | 100 | 
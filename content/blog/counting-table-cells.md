---
title: Counting Table Cells in JavaScript
description: How to count cells in HTML tables using JavaScript
date: 2020-08-17T05:00.000-05:00
seo:
  title: "How to Count Cells in a Table - JavaScript Tutorial"
  description: "JavaScript method of counting the amount of cells in an HTML table. Learn how to traverse table rows and count cells efficiently."
  keywords: ["javascript", "html", "tables", "dom manipulation", "web development", "counting cells"]
  author: "Alex Lanthier"
  image: "/counting-table-cells.jpg"
  url: "/counting-table-cells"
---

A cool problem on a coding assessment that might through you off guard if you're used to working with JavaScript arrays. How do we count cells in HTML tables?

## Simple Algorithm

**1. Get your table in HTML**

Multiple tables can just be a simple `document.getElementsByTagId('table')`. This call will grab all table elements that are loaded in the DOM. However, the example I will show you is just for one table. So I will be using an Id selector instead.

**2. Loop through each table's row**

Below, I use the `table.rows` property. This can be a "gotcha", this property is not an `Array`, but the inevitable `HtmlNodeCollection`. Therefore, we cannot say `table.rows.forEach((row) => { ... });` Instead, we must use a `for (let x of obj)` type loop instead.

**3. Count the cells**

Once we have our loop working, we can access the `row.cells` property to access each row's list of cells. We do not need to null check the `row.cells` as row.cells will exist even if the row has no child cells.

## The code

**HTML**

```html
<html>
  <table id="my-table">
    <tr>
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <td>A</td>
      <td>B</td>
      <td>C</td>
    </tr>
    <tr>
    </tr>
</html>
```

**JavaScript**

```javascript
getTableCellCount = (id) => {
  const table = document.getElementById(id)

  let count = 0
  for (let row of table.rows) {
    count += row.cells.length
  }

  return count
}
```

That's it! The algorithm is straightforward, the primary thing is to watch for that `HtmlNodeCollection`, it is not the same thing as an array in JavaScript so it won't have your typical iterators. 
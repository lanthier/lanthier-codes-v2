---
title: Counting Table Cells in JavaScript
description: How to count cells in HTML tables using JavaScript
---

I came across a cool problem on a recent coding assessment: find the table in your HTML document that has the highest count of table cells. I will start by showing my algorithmic thought process, then I will get into some code for the algorithm. I will not yet publish the complete code solution in the unlikely event that someone finds this post and uses it in the same coding assessment. So the method I will show you is how to count all of the cells of a single table.

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
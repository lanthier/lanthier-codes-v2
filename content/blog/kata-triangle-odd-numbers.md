---
title: Kata Triangle Odd Numbers
description: Solving the triangle of odd numbers kata with different approaches
date: 2020-09-02T05:00:00.000-05:00
seo:
  title: "Triangle of Odd Numbers Kata - Programming Challenge Solutions"
  description: "Solve the triangle of odd numbers programming kata with multiple approaches. Learn different algorithms and problem-solving techniques for this mathematical challenge."
  keywords: ["programming", "kata", "algorithms", "mathematics", "problem solving", "coding challenges"]
  author: "Alex Lanthier"
  image: "/triangle-odd-numbers.jpg"
  url: "/kata-triangle-odd-numbers"
---

## Problem

Given a triangle of consecutive odd numbers, such as this below:

![Odd Number Triangle](/odd-number-triangle.png)

Write a function that finds the sums of the odd numbers in an entire row from the row index. In example:

```python
row_sum_odd_numbers(1) # 1
row_sum_odd_numbers(3) # 7 + 9 + 11 = return 27
```

## Solution

```python
def row_sum_odd_numbers(n):
    sum = 0
    start = (n * n) - (n - 1)
    end = start + n * 2
    for i in range(start, end, 2):
        sum += i
    return sum
```

## Explanation

**1.** Calculate the starting number of each row.

**2.** Calculate the end of each row.

**3.** Iterate from "start" to "end" and increment by two, only counting the odd numbers.

**4.** In the iterated loop, add the index to the sum that will eventually be returned

### Step 1

```python
start = (n * n) - (n - 1)
```

`start` signifies the beginning number of the row `n`. To figure out this number, write the beginning of each row and the corresponding n to see if you can figure out the pattern. This is how I was able to calculate the start.

| n | start |
|---|-------|
| 1 | 1     |
| 2 | 3     |
| 3 | 7     |
| 4 | 13    |
| 5 | 21    |

![Odd Number Triangle Start Highlight](/odd-number-triangle-start-highlight.png)

### Step 2

```python
end = start + n * 2
```

`end` signifies the ending number of the row. We want this number so we know when to stop the loop from iterating. Luckily we already have our starting number, so all we need to do is add n * 2. We use n because n is equal to the amount of numbers in the row. We double it because we need to skip even numbers.

### Step 3 and Step 4

```python
for i in range(start, end, 2):
  sum += i
```

Now we utilize our `start` and `end` variables in our range. Remember, `range` takes in parameters as such: `range(start, end, incrementor)`. So do not forget the 2 to skip your even numbers, otherwise you will add them all! 
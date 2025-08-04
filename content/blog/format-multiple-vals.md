---
title: Format Multiple Values
description: Techniques for formatting multiple values in different programming languages
date: 2020-08-20T04:20:00.000-05:00
seo:
  title: "Format Multiple Values - String Formatting Techniques"
  description: "Learn various techniques for formatting multiple values across different programming languages. Master string interpolation, template literals, and formatting best practices."
  keywords: ["programming", "string formatting", "javascript", "python", "csharp", "code examples"]
  author: "Alex Lanthier"
  image: "/format-multiple-values.jpg"
  url: "/format-multiple-vals"
---

As a tutor one of the most common beginner Python tasks I come across is formatting strings. In this post, I will show you a few different ways you can go about formatting your code and also how to support multiple values in your string formats. We will start with the `%` method and then move to the `.format()` function.

**Single format using `%`**

```python
name = 'Alex'
welcome_message = 'Welcome, %s' % name
print(welcome_message)
```

The variables to the right of the `%` symbol represent the variables that will replace the `%s` in the string on the left. The `s` in `%s` represents the data type of your variable. In this case, it is a string.

**Multi format using `%`**

```python
name = 'Alex'
birthday = 'January 10th'
birthday_message = 'My name is %s and I was born on %s' % (name, birthday)
print(birthday_message)
```

This time on the right-hand side of the expression, you see `(name, birthday)`. This is a tuple. The `%` operator can take in a single value or a tuple of multiple values. Then, it will apply the variables inside of the tuple in order from left to right to your string you wish to be formatted.

Before I show you the `.format()` method, here are some useful data types you can use:

| Format | Description |
|--------|-------------|
| `%s`   | String (can also use other data types that handle strings) |
| `%d`   | Integer |
| `%f`   | Float (A decimal number) |
| `%f`   | Float (A decimal number) |
| `%.2f` | Float that only have two decimal places, common for currency. You can replace 2 with another number. |

**Single format using `.format()`**

```python
name = 'Alex'
welcome_message = 'Welcome, {0}'.format(name)
print(welcome_message)
```

Here I am using `{0}` to indicate the 0th parameter in my format function. You can also use `{:}` to indicate the "next" parameter.

**Multi format using `.format()`**

```python
name = 'Alex'
birthday = 'January 10th'
birthday_message = 'My name is {0} and I was born on {1}'.format(name, birthday)
print(birthday_message)
```

In terms of using single and multiple formats, that's all there really is to it. These can get pretty complex based on the data types you are using and how exactly you need them formatted. I will be releasing a cheat sheet shortly along with my first interactive blog post in how to deal with these. 
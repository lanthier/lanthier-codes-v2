---
title: 4 Interesting HTML Elements You Might Not Know
description: Exploring bdi, mark, meter, and ruby HTML elements with examples
---

While I was working through my blog post on semantic HTML elements, I learned there were a few elements that have interesting functionality that I've never used before. Some of these are because I have never had a use case for them, while others were just a surprise for me.

## `<bdi>`

---

BDI stands for Bi-Directional Isolation. The browser treats `<bdi>` tags to treat its text content separately from its surrounding text and sends the text through its [bidirectional algorithm](https://www.w3.org/International/articles/inline-bidi-markup/uba-basics).

If you have text that reads right to left, such as an arabic quotation, and that text is surrounded by other texts that reads left to right, such as English, we need to use this element to tell the browser which direction to render the text.

**Example:**

```html
<p><span>عبد الرحمٰن</span>: 5 points</p>
<p><bdi>عبد الرحمٰن</bdi>: 5 points</p>
```

**Result:**

<div class="result">
  <p><span>عبد الرحمٰن</span>: 5 points</p>
  <p><bdi>عبد الرحمٰن</bdi>: 5 points</p>
</div>

While in this particular example we need to use the `<bdi>` element, the browser's bidirectional algorithm can usually figure out how to render the letters in proper order.

**Further reading on this element:** [MDN reference for bdi](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi)

## `<mark>`

---

`<mark>` applies to text that is highlighted or marked due to the text's relevance.

**Example:**

```html
<p>
Did you ever hear the tragedy of Darth Plagueis the Wise? I thought
not. It's not a story the Jedi would tell you. It's a Sith legend.
<mark>Darth Plagueis was a Dark Lord of the Sith</mark>, so powerful
and so wise he could use the Force to influence the midichlorians to
create life. He had such a knowledge of the dark side that he could even
keep the ones he cared about from dying. The dark side of the Force is a
pathway to many abilities some consider to be unnatural. He became so powerful,
the only thing he was afraid of was losing his power, which eventually,
of course, he did. Unfortunately, he taught his apprentice everything he
knew, then his apprentice killed him in his sleep. It's ironic 
he could save others from death, but not himself.
</p>
```

**Result:**

<div class="result">
  <p>
    Did you ever hear the tragedy of Darth Plagueis the Wise? I thought
    not. It's not a story the Jedi would tell you. It's a Sith legend.
    <mark>Darth Plagueis was a Dark Lord of the Sith</mark>, so powerful
    and so wise he could use the Force to influence the midichlorians to
    create life. He had such a knowledge of the dark side that he could even
    keep the ones he cared about from dying. The dark side of the Force is a
    pathway to many abilities some consider to be unnatural. He became so powerful,
    the only thing he was afraid of was losing his power, which eventually,
    of course, he did. Unfortunately, he taught his apprentice everything he
    knew, then his apprentice killed him in his sleep. It's ironic
    he could save others from death, but not himself.
  </p>
</div>

The functional difference of this text is native-applied CSS that sets two properties: `color: black` and `background-color: yellow`. There may be some implied SEO benefits by using this tag as a best practice, though I haven't found evidence of that.

The primary difference between `<mark>` and `<strong>`, from a semantic perspective, is that the `<mark>` element signifies *relevance*, whereas the `<strong>` element signifies the *importance*. It's because of of this that you should not use the `<mark>` to highlight syntax.

Use cases for the `<mark>` element includes identifying context-sensitive passages and marking text of interest. Google search also uses this tag to highlight useful information on a website.

**Further reading:** [MDN reference for mark](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark)

## `<meter>`

---

The `<meter>` tag is used to signify a value within a known range or a fraction. Another element that comes close to this functionality is the `<progress>` element. Use the `<progress>` element to measure progress, such as form completion progress or loading. Use the `<meter>` element for other fractional or scalar representations.

**Attributes**

What I find most interesting about this element is the way it's attributes are used. Let's examine some attributes of interest with the `<meter>` element: `min`, `max`, `low`, `high`, `optimum` and `value`.

`value` is the actual value or number in the range. This is what the `<meter>` element will represent on the bar.

`min` and `max` are the minimum and maximum that the `value` attribute can be.

`low` and `high` affect the color of the bar that represents the `value` attribute. The `low` will turn the bar yellow (by default) if `value < low`. The bar will turn green by default if `value > high`.

The `optimum` attribute changes which range, `min - low` or `high - max`, sets the bar the "optimal" color. By default, the middle range is the optimum color. If you set `optimum` to a number between `min` and `low`, the low triggers the optimum color. If you set the `optimum` to the high ranger, it'll trigger the optimum color for a `value` between the `high` and `max` range.

**Examples**

I prefer a visual representation of `<meter>` and its attributes to learn it.

*Note: I increased the size of the element using CSS for accessibility purposes.*

**Middle Value, Default Optimal Range**

<div class="example-group">
  ```html
  <meter min="0" max="10" low="3" high="7" value="5" />
  ```
  <meter min="0" max="10" low="3" high="7" value="5" />
</div>

**Low value, Default Optimal Range**

<div class="example-group">
  ```html
  <meter min="0" max="10" low="3" high="7" value="2" />
  ```
  <meter min="0" max="10" low="3" high="7" value="2" />
</div>

**High Value, Default Optimal Range**

<div class="example-group">
  ```html
  <meter min="0" max="10" low="3" high="7" value="9" />
  ```
  <meter min="0" max="10" low="3" high="7" value="9" />
</div>

**High Value, High Optimum Range**

<div class="example-group">
  ```html
  <meter min="0" max="10" low="3" high="7" optimum="8" value="9" />
  ```
  <meter min="0" max="10" low="3" high="7" optimum="8" value="9" />
</div>

**Low Value, Low Optimum Range**

<div class="example-group">
  ```html
  <meter min="0" max="10" low="3" high="7" optimum="2" value="1" />
  ```
  <meter min="0" max="10" low="3" high="7" optimum="2" value="1" />
</div>

**Value Far Outside Optimal Range**

<div class="example-group">
  ```html
  <meter min="0" max="10" low="3" high="7" optimum="2" value="9" />
  ```
  <meter min="0" max="10" low="3" high="7" optimum="2" value="9" />
</div>

**Learn by doing? Try it yourself:**

<section class="do-it-meter">
  <div>
    <label for="min-value">min: </label>
    <input v-model="min" />
  </div>
  <div>
    <label for="max-value">max: </label>
    <input v-model="max" />
  </div>
  <div>
    <label for="max-value">low: </label>
    <input v-model="low" />
  </div>
  <div>
    <label for="max-value">high: </label>
    <input v-model="high" />
  </div>
  <div>
    <label for="max-value">optimum: </label>
    <input v-model="optimum" />
  </div>
  <div>
    <label for="max-value">value: </label>
    <input v-model="meterValue" />
  </div>
</section>

<meter :low="low" :high="high" :value="meterValue" :min="min" :max="max" :optimum="optimum" />

**Change bar color on `<meter>` element**

<div class="table-container">
  <table class="table">
    <thead>
      <tr>
        <th>Psuedo Class</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>`-webkit-meter-optimum-value`</td>
        <td>Color of the bar when `value` is in optimum range.</td>
      </tr>
      <tr>
        <td>`-webkit-meter-suboptimum-value`</td>
        <td>Color of the bar when `value` is outside optimum range.</td>
      </tr>
      <tr>
        <td>`-webkit-meter-even-less-good-value`</td>
        <td>The terrible name for the color of bar when `value` is far outside optimum range.</td>
      </tr>
    </tbody>
  </table>
  
  **Further reading:** [CSS Tricks Meter Element](https://css-tricks.com/html5-meter-element/)
</div>

## `<ruby>`, `<rt>`, `<rp>`

`<ruby>` represents a [ruby annotation](https://www.w3.org/TR/2001/REC-ruby-20010531/Overview.html.utf-8). A ruby is a short run of text that supplements some base text, typically used with Asian characters to provide annotations or pronunciations. While we typically use ruby with Asian texts, ruby can be any supplemental text.

`<ruby>` wraps the `<rt>` and `<rp>` elements. In order to use the The `<rt>` and `<rp>` elements, they must be wrapped in `<ruby>` along with the base text.

The `<rt>` element specifies the subtext component of the ruby annotation. This can provide supplemental information such as pronunciation, transliteration or translation for East Asian typography.

The `<rp>` element stands for ruby parenthesis (HTML Ruby Fallback Parenthesis). If a browser does not support the `<ruby>` element, they will fallback to use parenthesis instead. Note that most browsers support `<ruby>`, I just thought this was cool.

**Example**

```html
<ruby>
  漢<rp>(</rp><rt>かん</rt><rp>)</rp>
</ruby>
```

**Result:**

<div class="result">
  <ruby>
    漢<rp>(</rp><rt>かん</rt><rp>)</rp>
  </ruby>
</div>

**Further reading:** [MDN reference for ruby](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby), [MDN reference for rt](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rt) 
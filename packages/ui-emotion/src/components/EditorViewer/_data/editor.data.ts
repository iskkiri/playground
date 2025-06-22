export const mockEditorData = `
<h1>Heading1</h1>
<h2>Heading2</h2>
<h3>Heading3</h3>
<h4>Heading4</h4>
<h5>Heading5</h5>
<h6>Heading6</h6>

<p>
  This is a <strong>strong</strong> paragraph with some <i>italic</i> text, 
  <u>underlined</u> text, and <s>strikethrough</s> text.
</p>

<p>
  Here is a link: <a href="https://google.com" target="_blank">Visit Example</a>.
</p>

<ul>
  <li>Unordered List Item 1</li>
  <li>Unordered List Item 2
    <ul>
      <li>Nested Unordered Item 1</li>
      <li>Nested Unordered Item 2
        <ul>
          <li>Deep Nested Unordered Item 1</li>
          <li>Deep Nested Unordered Item 2
            <ul>
              <li>Deepest Unordered Item 1</li>
              <li>Deepest Unordered Item 2</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

<ol>
  <li>Ordered List Item 1</li>
  <li>Ordered List Item 2
    <ol>
      <li>Nested Ordered Item 1</li>
      <li>Nested Ordered Item 2
        <ol>
          <li>Deep Nested Ordered Item 1</li>
          <li>Deep Nested Ordered Item 2
            <ol>
              <li>Deepest Ordered Item 1</li>
              <li>Deepest Ordered Item 2</li>
            </ol>
          </li>
        </ol>
      </li>
    </ol>
  </li>
</ol>

<p style="text-align: left;">This text is aligned to the left.</p>
<p style="text-align: center;">This text is aligned to the center.</p>
<p style="text-align: right;">This text is aligned to the right.</p>

<figure class="image image-style-block-align-left">
  <img src="https://placehold.co/150" alt="Left Aligned Image" />
  <figcaption>Left aligned image</figcaption>
</figure>

<figure class="image">
  <img src="https://placehold.co/150" alt="Center Aligned Image" />
  <figcaption>Center aligned image</figcaption>
</figure>

<figure class="image image-style-block-align-right">
  <img src="https://placehold.co/150" alt="Right Aligned Image" />
  <figcaption>Right aligned image</figcaption>
</figure>
`;

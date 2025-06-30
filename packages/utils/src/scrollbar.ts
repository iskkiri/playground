export function getScrollbarWidth() {
  // Outer element
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // force scrollbars
  document.body.appendChild(outer);

  // Inner element
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculate the width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Remove the elements
  document.body.removeChild(outer);

  return { scrollbarWidth };
}

export function updateScrollbarWidth() {
  const hasScrollbar = document.body.scrollHeight > window.innerHeight;

  if (hasScrollbar) {
    const { scrollbarWidth } = getScrollbarWidth();
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  } else {
    document.documentElement.style.setProperty('--scrollbar-width', '0px');
  }
}

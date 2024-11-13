//initial setup for MathJax
window.MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']]
    },
    options: {
      skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
      ignoreHtmlClass: 'tex2jax_ignore'
    }
  };
  
  (function() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.async = true;
    document.head.appendChild(script);
  })();
  
  function reprocessMathJax() {
    if (window.MathJax) {
      window.MathJax.typesetPromise().catch((err) => console.log("MathJax reprocess error: ", err.message));
    }
  }
  
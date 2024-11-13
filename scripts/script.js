async function loadMarkdown(filePath, elementId, isStudentProfile = false) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        console.error("Failed to load file:", filePath);
        return;
      }
      const markdown = await response.text();
      const converter = new showdown.Converter();
  
      if (isStudentProfile) {
        const metadata = extractMetadata(markdown);
        const htmlContent = converter.makeHtml(markdown.replace(/---([\s\S]*?)---/, '')); 
  
        const targetElement = document.getElementById(elementId);
        if (targetElement && metadata) {
          const studentProfile = `
            <div class="student-profile">
              ${metadata.image ? `<img src="${metadata.image}" alt="${metadata.name}" class="student-image">` : ""}
              <h3>${metadata.name || ""}</h3>
              <p><strong>Project:</strong> ${metadata.project || ""}</p>
              <p><strong>Specialty:</strong> ${metadata.specialty || ""}</p>
              <div>${htmlContent}</div>
            </div>
          `;
          targetElement.innerHTML += studentProfile;
        } else {
          console.error("Element with ID", elementId, "not found or metadata extraction failed.");
        }
      } else {
        const htmlContent = converter.makeHtml(markdown);
        const targetElement = document.getElementById(elementId);
        if (targetElement) {
          targetElement.innerHTML += htmlContent;
        }
      }
      //reprocess MathJax to render formulas after content is loaded
      reprocessMathJax();
    } catch (error) {
      console.error("Error loading markdown:", error);
    }
  }
  
  function extractMetadata(markdown) {
    const metadata = {};
    const metadataRegex = /---([\s\S]*?)---/;
    const match = markdown.match(metadataRegex);
    if (match && match[1]) {
      const lines = match[1].trim().split('\n');
      lines.forEach(line => {
        const [key, value] = line.split(':').map(part => part.trim());
        metadata[key] = value;
      });
    }
    return metadata;
  }
  
  function loadContentBasedOnPage() {
    const page = window.location.pathname;
  
    if (page.includes("index.html")) {
      document.getElementById("content").innerHTML = "<h2>Welcome to Neuro Lab!</h2><p>Explore the latest in neuroinformatics research conducted at our lab.</p>";
      
      // in homepage
      const latestNewsFiles = ['content/news/news1.md', 'content/news/news2.md'];
      for (const file of latestNewsFiles) {
        loadMarkdown(file, "news-preview");
      }
  
    } else if (page.includes("news.html")) {
      // for news.html
      const newsFiles = ['content/news/news1.md', 'content/news/news2.md'];
      for (const file of newsFiles) {
        loadMarkdown(file, "content");
      }
  
    } else if (page.includes("students.html")) {
      // students.html
      const studentFiles = [
        'content/students/mahsa-zand.md',
        'content/students/hanna-wilkomen.md'
      ];
      for (const file of studentFiles) {
        loadMarkdown(file, "content", true); 
      }
    }
  }
  
  document.addEventListener("DOMContentLoaded", loadContentBasedOnPage);
  
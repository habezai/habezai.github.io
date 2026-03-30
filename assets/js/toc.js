document.addEventListener('DOMContentLoaded', function() {
  // 获取内容区域的所有标题
  const content = document.querySelector('.content');
  const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const tocContainer = document.querySelector('.toc-content');
  
  if (headings.length === 0 || !tocContainer) return;
  
  // 生成目录
  const tocList = document.createElement('ul');
  let currentLevel = 0;
  
  headings.forEach((heading, index) => {
    // 确保标题有ID
    if (!heading.id) {
      heading.id = 'heading-' + index;
    }
    
    const level = parseInt(heading.tagName.charAt(1));
    const li = document.createElement('li');
    li.className = `toc-level-${level}`;
    
    const a = document.createElement('a');
    a.href = `#${heading.id}`;
    a.textContent = heading.textContent;
    
    li.appendChild(a);
    
    // 处理层级缩进
    if (level > currentLevel) {
      const ul = document.createElement('ul');
      li.appendChild(ul);
      tocList.lastChild?.appendChild(ul);
    }
    
    tocList.appendChild(li);
    currentLevel = level;
  });
  
  tocContainer.appendChild(tocList);
  
  // 滚动高亮当前章节
  const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -50% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const tocLink = tocContainer.querySelector(`a[href="#${id}"]`);
      
      if (entry.isIntersecting) {
        tocLink?.parentElement.classList.add('active');
      } else {
        tocLink?.parentElement.classList.remove('active');
      }
    });
  }, observerOptions);
  
  headings.forEach(heading => observer.observe(heading));
});
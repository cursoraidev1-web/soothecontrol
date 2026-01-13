"use client";

import { useEffect } from "react";

export default function TailwindChecker() {
  useEffect(() => {
    // #region agent log
    // Check if CSS is loaded
    const stylesheets = Array.from(document.styleSheets);
    let tailwindRulesFound = 0;
    let sampleTailwindClasses: string[] = [];
    
    stylesheets.forEach((sheet, sheetIndex) => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach((rule) => {
          const cssText = rule.cssText || '';
          // Check for common Tailwind patterns
          if (cssText.includes('.bg-') || cssText.includes('.text-') || 
              cssText.includes('.flex') || cssText.includes('.grid') ||
              cssText.includes('.sticky') || cssText.includes('tailwind')) {
            tailwindRulesFound++;
            // Extract a sample class name
            const classMatch = cssText.match(/\.([a-z-]+)\s*\{/);
            if (classMatch && sampleTailwindClasses.length < 5) {
              sampleTailwindClasses.push(classMatch[1]);
            }
          }
        });
      } catch (e) {
        // CORS or other errors accessing stylesheet
      }
    });

    // Check computed styles on a test element
    const testDiv = document.createElement('div');
    testDiv.className = 'bg-white text-gray-900';
    testDiv.style.display = 'none';
    document.body.appendChild(testDiv);
    const computed = window.getComputedStyle(testDiv);
    const bgColor = computed.backgroundColor;
    const color = computed.color;
    document.body.removeChild(testDiv);

    // Check if @source directives might be the issue
    const linkTags = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    const cssFilePaths = linkTags.map(link => (link as HTMLLinkElement).href);

    fetch('http://127.0.0.1:7242/ingest/964fc30c-b698-4731-8f08-53848077e169',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'TailwindChecker.tsx:45',message:'Comprehensive Tailwind CSS check',data:{stylesheetsCount:stylesheets.length,tailwindRulesFound,sampleTailwindClasses,cssFilePaths:cssFilePaths.slice(0,5),testBgColor:bgColor,testColor:color,hasGlobalsCSS:cssFilePaths.some(p=>p.includes('globals')||p.includes('_app'))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
  }, []);

  return null; // This component doesn't render anything
}

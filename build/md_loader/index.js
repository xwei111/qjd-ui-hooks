const markdown = require('markdown-it');
const hljs = require('highlight.js');
const containers = require('./container');
const pug = require('pug')
const { yamlJson, scriptRe, styleRe, pugRe } = require('./consts');

module.exports = function (src) {
  let yamlContent = '', scriptContent = '', styleContent = '', pugContent = '';

  const md = markdown({
    html: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs" v-pre>
            <code>
              ${hljs.highlight(lang, str, true).value}
            </code>
          </pre>`
        } catch (error) {
          console.log('error:' + error)
        }
      }
      return `<pre class="hljs">
        <code>${md.utils.escapeHtml(str)}</code>
      </pre>`
    }
  })
    .use(containers)
    .use(require('markdown-it-front-matter'), function (fm) {
      const data = fm.split('\n')
      data.forEach(item => {
        item = item.split(':')
        yamlContent += `<span>${yamlJson[item[0]]}: ${item[1] ? item[1] : '--'}</span>`
      })
    });

  md.renderer.rules.html_block = (tokens, idx) => {
    const content = tokens[idx].content
    if (scriptRe.test(content.trim())) {
      scriptContent = content;
      return ''
    } if (styleRe.test(content.trim())) {
      styleContent = content;
      return ''
    } if (pugRe.test(content.trim())) {
      pugContent = content.replace('<pug>', '<template>').replace('</pug>', '</template>')
      pugContent = pug.compile(pugContent)()
      return pugContent
    } else {
      return content
    }
  }

  const html = md.render(src)

  return (
    `<template>\n
        <div class="markdown">
          <div class="demo-info">
            ${yamlContent}
          </div>
          ${html}
        </div>\n
    </template>\n
    ${scriptContent}
    ${styleContent}
    `
  )
}
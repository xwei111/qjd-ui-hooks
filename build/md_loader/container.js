const container = require('markdown-it-container')

module.exports = md => {
  md.use(...createDemo('demo'))
}

function createDemo(kclass) {
  return [container, kclass, {
    validate: params => params.trim().match(/^demo\s*(.*)$/),
    render: function (tokens, idx) {
      const token = tokens[idx]
      const info = token.info.replace('demo', '').trim()
      let desc = info ? `<div class="demo_desc" slot="desc" >${info}</div>` : null
      if (token.nesting === 1) {
        return `<demo-block>
          ${desc}
          <div slot="code">
        `
      }
      return '</div></demo-block>\n'
    }
  }]
}
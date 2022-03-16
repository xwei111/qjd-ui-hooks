import sliderData from '@/consts/slider';

let childRoutes = []

function getRoutes(data) {
  data.map(e => {
    if (e && !e.children) {
      childRoutes.push({
        path: `/main/${e.key}`,
        name: e.key,
        component: resolve => e.key == 'CHANGELOG' ? require([`../../CHANGELOG.md`], resolve) : require([`@/docs/${e.key}.md`], resolve)
      })
    } else {
      getRoutes(e.children)
    }
  })
}
getRoutes(sliderData)

export default childRoutes;

// 无需手动配置，新建测试文件即可：${name}.vue
// 测试代码访问路径： /test/${name}
const getRoutes = () => {
	const componentsContext = require.context('../pages/test', true, /\.vue$/).keys();
	const routes = [];
	componentsContext.forEach(item => {
		const keys = item ? item.split('/') : [];
		const key = keys[keys.length - 1] ? keys[keys.length - 1].split('.')[0] : ''
		routes.push({
			path: `/test/${key}`,
			name: `${key}Test`,
			component: resolve => require([`@/pages/test/${key}.vue`], resolve),
		})
	});
	return routes
}

export default process.env.NODE_ENV === 'development' ? getRoutes() ? getRoutes() : [] : []
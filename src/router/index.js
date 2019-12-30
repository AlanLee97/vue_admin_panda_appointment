import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');

//数据管理
const appointmentManage = r => require.ensure([], () => r(require('@/page/manage/appointmentManage')), 'appointmentManage');
const appointmentTypeManage = r => require.ensure([], () => r(require('@/page/manage/appointmentTypeManage')), 'appointmentTypeManage');
const userManage = r => require.ensure([], () => r(require('@/page/manage/userManage')), 'userManage');
const worksManage = r => require.ensure([], () => r(require('@/page/manage/worksManage')), 'worksManage');
const carouselManage = r => require.ensure([], () => r(require('@/page/manage/carouselManage')), 'carouselManage');


//添加数据
const addAppointmentType = r => require.ensure([], () => r(require('@/page/add/addAppointmentType')), 'addAppointmentType');
const addAdmin = r => require.ensure([], () => r(require('@/page/add/addAdmin')), 'addAdmin');

//图表
const userCount = r => require.ensure([], () => r(require('@/page/chart/userCount')), 'userCount');
const appointmentCount = r => require.ensure([], () => r(require('@/page/chart/appointmentCount')), 'appointmentCount');
const worksCount = r => require.ensure([], () => r(require('@/page/chart/worksCount')), 'worksCount');

//其他
const vueEdit = r => require.ensure([], () => r(require('@/page/add/vueEdit')), 'vueEdit');
const about = r => require.ensure([], () => r(require('@/page/about')), 'about');



const routes = [
    {
        path: '/',
        component: login
    },
	{
		path: '/login',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
            path: '/appointmentManage',
            component: appointmentManage,
            meta: ['数据管理', '约拍管理'],
        },{
            path: '/appointmentTypeManage',
            component: appointmentTypeManage,
            meta: ['数据管理', '约拍类型管理'],
        },{
            path: '/userManage',
            component: userManage,
            meta: ['数据管理', '用户管理'],
        },{
            path: '/worksManage',
            component: worksManage,
            meta: ['数据管理', '作品管理'],
        },{
            path: '/carouselManage',
            component: carouselManage,
            meta: ['数据管理', '轮播图管理'],
        },{
            path: '/addAppointmentType',
            component: addAppointmentType,
            meta: ['添加数据', '添加约拍类型'],
        },{
            path: '/addAdmin',
            component: addAdmin,
            meta: ['添加数据', '添加管理员'],
        },{
            path: '/userCount',
            component: userCount,
            meta: ['图表', '用户统计'],
        },{
            path: '/appointmentCount',
            component: appointmentCount,
            meta: ['图表', '约拍统计'],
        },{
            path: '/worksCount',
            component: worksCount,
            meta: ['图表', '作品统计'],
        },{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['编辑', '文本编辑'],
		},{
			path: '/about',
			component: about,
			meta: ['关于', '关于我们'],
		}

		]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})

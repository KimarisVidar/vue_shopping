// 官方元件
import Vue from 'vue';
import VueRouter from 'vue-router';
// 自訂
// import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import Product from '@/components/pages/Product';
import CustomerOrder from '@/components/pages/CustomerOrder';

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        /*
            防止用戶在往後方隨意輸入，進入空白頁面
            所以這邊預設path = * 
            並把頁面導回去登入頁面
        */
        {
            path: '*',
            redirect: 'login',
        },
        // {
        //     path:'/',        //虛擬路徑
        //     name: 'HelloWorld', //名稱
        //     component: HelloWorld, //對應的元件
        //     meta: {
        //         requiresAuth: true
        //     }
        // },
        {
            path:'/login',
            name:'登入', 
            component: Login, 
        },
        {
            path: '/admin',
            name: 'Dashboard',
            component: Dashboard,
            children: [
                {
                    path: 'product',
                    name: 'Product',
                    component: Product,
                    meta: {
                        requiresAuth: true
                    },
                },
            ]
        },
        {
            path: '/', 
            name: 'Dashboard', 
            component: Dashboard, 
            children: [
                {
                    path: 'customer_order', 
                    name: 'CustomerOrder',
                    component: CustomerOrder,
                }, 
            ]
        },
    ],
});
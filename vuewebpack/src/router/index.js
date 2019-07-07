// 官方元件
import Vue from 'vue';
import VueRouter from 'vue-router';
// 自訂
// import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import Product from '@/components/pages/Product';

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
            path:'/login',        //虛擬路徑
            name:'登入',        //名稱
            component: Login, //對應的元件
        },
        {
            path: '/admin', //虛擬路徑
            name: 'Dashboard', //名稱
            component: Dashboard, //對應的元件
            children: [
                {
                    path: 'product', //虛擬路徑
                    name: 'Product', //名稱
                    component: Product, //對應的元件
                    meta: {
                        requiresAuth: true
                    },
                },
            ]
        },
    ],
});
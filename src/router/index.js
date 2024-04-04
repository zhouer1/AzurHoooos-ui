import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
//引入vuex
import store from "../store/index";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login',
  },
  {
    path: '/login',
    name: 'login',
    meta: {access: ['001','002','003','004','005','006','007']},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path:'/home',
    name:'home',
    component: HomeView,
    meta: {access: ['001','002','003','004','005','006','007']}
  },
  {
    path:'/doctor',
    name:'doctor',
    meta:{access:['001','004']},
    component: () => import(/* webpackChunkName: "about" */ '../views/DoctorView.vue'),
    children:[
      {
        path:'diagnose',
        name:'diagnose',
        meta:{access:['001','004']},
        component:() => import('../views/DoctorDiagnose.vue'),
      },
      {
        path:'formalities',
        name:'formalities',
        meta:{access:['001','004']},
        // component:() => import('../views/DoctorDiagnose.vue'),
      },
      {
        path:'diagnoserecord',
        name:'diagnoserecord',
        meta:{access:['001','004']},
        component:() => import('../views/DiagnoseRecord.vue'),
      },
      {
        path:'formalitiesrecord',
        name:'formalitiesrecord',
        meta:{access:['001','004']},
        // component:() => import('../views/.vue'),
      },
      {
        path:'sickroom',
        name:'sickroom',
        meta:{access:['001','004']},
        // component:() => import('../views/DoctorDiagnose.vue'),
      }
    ]
  },
  {
    path: '/chargeroom',
    name:'chargeroom',
    meta: {access: ['001','003']},
    component:()=>import('../views/ChargeroomView.vue'),
    children: [
      {
        path:'chargeroombusiness',
        name:'chargeroombusiness',
        meta: {access: ['001','003']},
        component:()=>import('../views/ChargeroomBusiness.vue')
      },
      {
        path: 'registrationrecord',
        name:'registrationrecord',
        meta: {access: ['001','003']},
        component:()=>import('../views/RegistrationRecord.vue')
      }
    ]
  },
  {
    path: '/pharmacy',
    name:'pharmacy',
    meta:{access: ['001','007']},
    component:()=>import('../views/PharmacyView'),
    children: [
      {
        path: 'dispense',
        name:'dispense',
        meta:{access: ['001','007']},
        component:()=>import('../views/PharmacyDispense'),
      },
      {
        path: 'record',
        name:'record',
        meta:{access: ['001','007']},
        // component:import()
      },
      {
        path: 'quantity',
        name:'quantity',
        meta:{access: ['001','007']},
        // component:import()
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next)=>{
  if(to.path=='/login'){
    next();
  }else{
    // 先判定是否存在token
    let token=sessionStorage.getItem('token');
    if(token){
      if(store.state.token==token){
        console.log('token匹配成功')
        let my_access=store.state.access;
        let canGo= my_access.some(function (item){
          return to.meta.access.includes(item);
        })
        if(canGo){
          next();
        }else{
          alert("没有权限！");
        }

      }else{
        console.log('token不匹配');
      }
    }else{
      alert('token不存在,请登录');
      next('/login');
    }
  }
})
export default router

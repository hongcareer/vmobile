import Home from '../page/home'
import Other from '../page/other'
import Video from '../page/video'

const Routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/video',
    component: Video,
  },

]

export default Routes

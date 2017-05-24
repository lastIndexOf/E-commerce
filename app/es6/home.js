import Vue from 'vue/dist/vue.js'
import ScrollReveal from 'scrollreveal'

window.sr = ScrollReveal({ reset: true })

new Vue({
  data () {
    return {
      data: {
        types: ['前端开发', '后端开发', '移动开发', '数据库', '云计算&大数据', '运维&计算', 'UI设计']
      },
      tabs: [
        {},
        {}
      ],
      navBottom: [
        '/static/images/path_1.png',
        '/static/images/path_1.png',
        '/static/images/path_1.png',
        '/static/images/path_1.png',
        '/static/images/path_1.png'
      ],
      details: [
        {
          title: '前端开发工程师',
          children: [
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            }
          ]
        },
        {
          title: '前端开发工程师',
          children: [
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            }
          ]
        },
        {
          title: '前端开发工程师',
          children: [
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            }
          ]
        },
        {
          title: '前端开发工程师',
          children: [
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            }
          ]
        },
        {
          title: '前端开发工程师',
          children: [
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            },
            {
              title: '从H5网页开发到移动响应式开发',
              src: '#',
              instruction: 'test instruction',
              diff: '1'
            }
          ]
        }
      ]
    }
  },
  methods: {
    test() {
      console.log(1)
    }
  },
  filters: {
    diffFilt(val) {
      switch(val) {
        case '2':
          return '高级'
        case '1':
          return '中级'
        case '0':
          return '初级'
      }
    }
  },
  mounted() {
    sr.reveal('.detail')
  }
}).$mount('#root')

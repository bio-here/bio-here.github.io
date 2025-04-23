import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Bio-Here",
  titleTemplate: "Bio-Here",
  description: "A series of bioinformatics toolkits",
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    i18nRouting: true,
    logo: "/icon_text.png",
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索',
              },
              modal: {
                noResultsText: '没有结果',
                resetButtonTitle: '重置',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                }
              }
            }
          }
        }
      }
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Project', link: '/project' },
      { text: 'Document', link: '/document' }
    ],

    sidebar: [
      {
        text: 'Projects',
        items: [
          { text: 'Project', link: '/project' },
          { text: 'Bio-Here', link: '/project/bio-here' },
          { text: 'Seq-Here', link: '/project/seq-here' },
        ]
      },
      {
        text: 'Documents',
        items: [
          { text: 'Document', link: '/document' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bio-here' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present bio-here'
    }

  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      link: '/zh/',
    }
  }

})

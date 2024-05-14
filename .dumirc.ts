import { defineConfig } from 'dumi';

export default defineConfig({
  favicons: [
    'https://mdn.alipayobjects.com/huamei_v98cj4/afts/img/A*EfwQTpYQfq4AAAAAAAAAAAAADo6VAQ/original',
  ],
  locales: [
    { id: 'en-US', name: 'EN' },
    { id: 'zh-CN', name: '中文' },
  ],
  themeConfig: {
    logo: 'https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*_pzERpyma84AAAAAAAAAAAAADlHYAQ/original',
    footer: false,
    //   'Copyright © 支付宝（中国）网络技术有限公司 ｜ 备案号：沪ICP备15027489号',
    socialLinks: {
      github: 'https://github.com/codefuse-ai',
    },
    editLink: true,
  },

  mfsu: false,
  resolve: {
    forceKebabCaseRouting: false,
  }
});

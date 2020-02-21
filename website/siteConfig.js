const siteConfig = {
  title: 'Weave SDK Documentations',
  tagline: 'Welcome to Weave SDK docs!',

  url: "https://weave.iov.one",
  baseUrl: "/",

  cname: 'weave.iov.one',
  projectName: 'docs-weave-sdk',
  organizationName: 'iov-one',

// TODO uncomment when algolia integration is done
/*  algolia: {
    apiKey: '8dc8128a9091306e7bbd0effdaa5241a',
    indexName: 'iov',
  },
*/
  headerLinks: [
    { href: "https://github.com/iov-one", label: "GitHub" },
    { search: true },
  ],

  disableHeaderTitle: true,

  headerIcon: 'img/logo.png',
  footerIcon: false,
  favicon: 'img/favicon.ico',

  colors: {
    primaryColor: '#35c1b3',
    secondaryColor: 'grey',
  },
  

  fonts: {
    myFont: [
      "din",
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },

  copyright: `Copyright © ${new Date().getFullYear()} IOV`,

  highlight: {
    theme: 'atom-one-light',
  },

  scripts: ['https://buttons.github.io/buttons.js'],

  onPageNav: 'separate',

  docsSideNavCollapsible: true,

  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  // Show documentation's last contributor's name.
  enableUpdateBy: true,
};

module.exports = siteConfig;

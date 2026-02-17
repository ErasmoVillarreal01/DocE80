// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PC SW Developer',
  tagline: 'Documentation',
  favicon: 'img/e80icon.ico',

  // =========================================================
  // IMPORTANT: GitHub Pages URL config
  // =========================================================
  url: 'https://erasmovillarreal01.github.io', // Your GitHub Pages URL
  baseUrl: '/DocE80/',                          // Your repo name (with leading AND trailing slash)

  organizationName: 'ErasmoVillarreal01',       // GitHub username
  projectName: 'DocE80',                        // GitHub repo name
  deploymentBranch: 'gh-pages',                 // Docusaurus deploy branch
  trailingSlash: false,

  // GitHub pages often needs this to avoid broken links
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // =========================================================
  // Internationalization
  // =========================================================
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // =========================================================
  // Presets
  // =========================================================
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false, // disable blog if not used
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'queries',
        path: 'queries',
        routeBasePath: 'queries', // URL will be /DocE80/queries/
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'techStack',
        path: 'techStack',
        routeBasePath: 'techStack', // URL will be /DocE80/tech-stack/
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
  ],


  // =========================================================
  // Theme Config
  // =========================================================
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'PC',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },          
          {
            type: 'docSidebar',
            sidebarId: 'queries',
            docsPluginId: 'queries',
            position: 'left',
            label: 'Queries',
          },
          {
            type: 'docSidebar',
            sidebarId: 'techStack',
            docsPluginId: 'techStack',
            position: 'left',
            label: 'Tech Stack',
          },
          {
            href: 'https://github.com/ErasmoVillarreal01/DocE80',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} E80Group PC SW Developer.`,
      },
      prism: {
        additionalLanguages: ['csharp'],
      },
    }),
};

module.exports = config;
``
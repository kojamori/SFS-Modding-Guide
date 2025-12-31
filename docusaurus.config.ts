import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

import site_config from "./config/site-config";

const config: Config = {
  title: site_config.projectName,
  tagline: site_config.projectTagline,
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://kojamori.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/SFS-Modding-Guide/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "kojamori", // Usually your GitHub org/user name.
  projectName: "SFS-Modding-Guide", // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  headTags: site_config.headTags,

  presets: [
    [
      "classic",
      {
        docs: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "default", // Default ID
        path: "instances/docs", // Source folder
        routeBasePath: "docs", // URL route (e.g., /docs/intro)
        sidebarPath: "./sidebars.ts",
        editUrl: "https://github.com/kojamori/SFS-Modding-Guide/edit/main",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "internal", // Unique ID for the second instance
        path: "instances/internal-docs", // Source folder
        routeBasePath: "internal", // URL route (e.g., /api/intro)
        sidebarPath: "./sidebars.ts",
        editUrl: "https://github.com/kojamori/SFS-Modding-Guide/edit/main",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "api", // Unique ID for the second instance
        path: "instances/api", // Source folder
        routeBasePath: "api", // URL route (e.g., /api/intro)
        sidebarPath: "./sidebars.ts",
        editUrl: "https://github.com/kojamori/SFS-Modding-Guide/edit/main",
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/sfsbanner.png",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "SFS Modding Guide",
      logo: {
        alt: "SFS Modding Guide Logo",
        src: "img/logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Guide",
        },
        {
          type: "docSidebar",
          sidebarId: "apiSidebar",
          docsPluginId: "api",
          position: "left",
          label: "API Reference",
        },
        {
          type: "docSidebar",
          sidebarId: "internalSidebar",
          docsPluginId: "internal",
          position: "right",
          label: "Internal Documentation",
        },
        {
          href: site_config.projectRepo,
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "docs/getting-started/introduction",
            },
            {
              label: "Conventions and Style Guide",
              to: "docs/category/conventions-and-style-guide/",
            },
            {
              label: "Installing Mods",
              to: "docs/getting-started/installation/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "SFS Forums",
              href: site_config.socials.sfsForums,
            },
            {
              label: "SFS Official Discord",
              href: site_config.socials.sfsOfficialDiscord,
            },
            {
              label: "SFS Reddit",
              href: site_config.socials.sfsReddit,
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: site_config.socials.github,
            },
            {
              label: "Modding Discord",
              href: site_config.socials.discord,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ${
        site_config.projectName
      }. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["csharp"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

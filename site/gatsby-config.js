let siteMetadata = {
  title: `Ana Beatriz( );`,
  capitalizeTitleOnHome: true,
  logo: `/images/logo.png`,
  icon: `/images/icon.png`,
  titleImage: `/images/wall.jpg`,
  introTag: ` Software Engineer • Java Full Stack Developer • Tech Speaker • Community Co-Organizer • Writer of some Articles `,
  description: `Java developer, curious about the world and how things work, here you have articles, projects for the community, talk in events and contact ... Code your future ( );`,
  author: `@anabneri`,
  blogItemsPerPage: 20,
  portfolioItemsPerPage: 20,
  darkmode: true,
  switchTheme: true,
  navLinks: [
    {
      name: "HOME",
      url: "/",
    },
    {
      name: "ABOUT",
      url: "/about",
    },
    {
      name: "BLOG",
      url: "/blog",
    },
    {
      name: "PROJECTS",
      url: "/portfolio",
    },
    {
      name: "CONTACT",
      url: "/contact",
    },
  ],
  footerLinks: [
    {
      name: "PRIVACY POLICY",
      url: "/privacy-policy",
    },
  ],
  social: [
    {
      name: "Facebook",
      icon: "/images/Facebook.svg",
      url: "#",
    },
    {
      name: "Twitter",
      icon: "/images/Twitter.svg",
      url: "#",
    },
    {
      name: "Instagram",
      icon: "/images/Instagram.svg",
      url: "#",
    },
    {
      name: "Youtube",
      icon: "/images/Youtube.svg",
      url: "#",
    },
  ],
  contact: {
    api_url: "./test.json",
    /* Leave this completely empty (no space either) if you don't want a contact form. */
    description: `Hey, let's be virtual friends! If you want to contact me for work purposes or if you have any questions send me an email or add me on social networks! `,
    mail: "neribia7@gmail.com",
    phone: "+55 11 989288004",
    address: "011 \nSão Paulo \nBrazil",
  },
};

module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
    {
      resolve: "gatsby-theme-elemental",
      options: {
        contentPath: "contents",
      },
    },
  ],
};

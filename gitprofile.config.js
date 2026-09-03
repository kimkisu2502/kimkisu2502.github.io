// gitprofile.config.js

const config = {
  github: {
    username: 'kimkisu2502', // Your GitHub org/user name. (Required)
    sortBy: 'stars', // stars | updated
    limit: 12, // How many projects to display.
    exclude: {
      forks: true, // Forked projects will not be displayed if set to true.
      projects: [
        'assignment_week10',
        'assignment_week8',
        'git_advanced_1',
        'OSSP_week4',
        'two-sum',
        'mypy',
        'netsys-note',
      ], // These projects will not be displayed. example: ['my-project1', 'my-project2']
    },
  },
  social: {
    linkedin: 'kisu-kim-99624933b',
    twitter: '',
    mastodon: '',
    facebook: '',
    instagram: 'kim11347',
    dribbble: '',
    behance: '',
    medium: '',
    dev: '',
    stackoverflow: '', // format: userid/username
    skype: '',
    telegram: '',
    website: 'https://kimkisu2502.github.io',
    phone: '+82 (10) 24**-**37',
    email: 'kimkisu2502@g.skku.edu',
  },
  resume: {
    fileUrl: '', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'Linux Kernel',
    'Networking',
    'Zero-Copy TCP',
    'CPU Scheduling',
    'RDMA',
    'DPU Architecture',
    'AI Infra Architecture',
    'MLOps',
    'C',
    'C++',
    'Git',
  ],

  // Empty array will hide the experience section.
  experiences: [],

   certifications: [],

  awards: [
    {
      name: 'Magna Cum Laude',
      body: 'Bachelor Graduation Honor, SungKyunKwan Univ.',
      year: 'Feb 2026',
    },
    {
      name: "Dean's List",
      body: 'Sophomore Fall, SungKyunKwan Univ.',
      year: '2023',
    },
  ],

  achievements: [
    {
      title: 'ZeroSock: Revisiting TCP Zero-Copy Receive in Linux',
      authors: 'Kisu Kim, Sihoon Seong, KyoungSoo Park, and Jaehyun Hwang',
      venue: 'To appear in USENIX NSDI 2027',
      links: [
        { label: 'pdf', url: '' },
        { label: 'github', url: 'https://github.com/skku-syslab/zerosock' },
      ],
      repo: 'skku-syslab/zerosock',
    },
    {
      title: 'Toward Practical Remapping-based TCP Zero-copy Receive',
      authors: 'Kisu Kim, Sihoon Seong, KyoungSoo Park, and Jaehyun Hwang',
      venue: 'USENIX OSDI 2026 Poster',
      links: [
        {
          label: 'link',
          url: 'https://www.usenix.org/conference/osdi26/poster-session',
        },
      ],
    },
    {
      title:
        '사용자 가상주소 관리 및 페이지 재매핑을 이용한 네트워크 수신 데이터의 제로카피 전달 방법',
      authors: 'Jaehyun Hwang, Kisu Kim, and Sihoon Seong',
      venue:
        'Korean Patent Application No. 10-2026-0129970 (Filed 2026-07-14, Pending)',
      links: [],
    },
  ],

  education: [
    {
      institution: 'SungKyunKwan Univ.',
      degree: 'M.S., Electrical and Computer Engineering — System Software Lab, advised by Prof. Jaehyun Hwang',
      from: 'March 2026',
      to: 'Present',
    },
    {
      institution: 'SungKyunKwan Univ.',
      degree: 'Bachelor, Computer Science and Engineering — GPA 4.12 (Major 4.11)',
      from: '2020',
      to: 'Feb 2026',
    },
  ],

  // To hide the `My Projects` section, keep it empty.
  externalProjects: [
    {
      title: 'ZeroSock',
      description:
        "[NSDI'27] ZeroSock: Revisiting TCP Zero-Copy Receive in Linux. Research project at the System Software Lab, SungKyunKwan Univ.",
      imageUrl: 'https://github.com/skku-syslab.png',
      link: 'https://github.com/skku-syslab/zerosock',
    },
  ],
  // Display blog posts from your medium or dev account. (Optional)
  blog: {
    source: '', // medium | dev
    username: '', // to hide blog section, keep it empty
    limit: 2, // How many posts to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'winter',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Hide the ring in Profile picture
    hideAvatarRing: false,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'procyon',
    ],

    // Custom theme
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `Made with <a 
      class="text-primary" href="https://github.com/arifszn/gitprofile"
      target="_blank"
      rel="noreferrer"
    >GitProfile</a> and ❤️`,
};

export default config;

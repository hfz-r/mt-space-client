export const data = [
  {
    label: 'Finance',
    baseHref: '/finance',
    children: [
      {
        label: 'CIMB Split',
        description: 'CIMB split maintenance screen',
        tags: ['Maintenance'],
        href: '$/cimb-split',
        filename: '',
      },
      {
        label: 'Fee Rebate',
        description: 'COA blank fee rebate management',
        tags: ['Setup', 'SunSystem'],
        href: '$/sunsys-coa-setup',
        filename: 'FeeRebate',
      },
      {
        label: 'Coming soon',
        description: 'Coming soon',
        tags: ['TBA'],
        href: '$',
        filename: '',
      },
    ],
  },
  // {
  //   label: 'Investor',
  //   baseHref: '/investor',
  //   children: [
  //     {
  //       label: 'Coming soon',
  //       description: 'Coming soon',
  //       tags: ['TBA'],
  //       href: '$',
  //       filename: ''
  //     },
  //   ],
  // },
  {
    label: 'Utilities',
    baseHref: '/utils',
    children: [
      {
        label: 'Query Builder',
        description: 'Build rules and run SQL query on the fly',
        tags: ['Utils'],
        href: '$/qbuilder',
        filename: '',
      },
    ],
  },
];

export const data = [
  {
    label: 'Finance',
    baseHref: '/finance',
    children: [
      {
        label: 'COA Group',
        description: 'Chart of account',
        tags: ['Setup'],
        href: '$/coa-group',
        filename: ''
      },
      {
        label: 'Fee Rebate',
        description: 'COA blank fee rebate management',
        tags: ['Setup', 'SunSystem'],
        href: '$/sunsys-coa-setup',
        filename: 'FeeRebate'
      },
    ],
  },
  {
    label: 'Investor',
    baseHref: '/investor',
    children: [
      {
        label: 'Coming soon',
        description: 'Coming soon',
        tags: ['TBA'],
        href: '$',
        filename: ''
      },
    ],
  },
];

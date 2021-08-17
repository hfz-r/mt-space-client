import FeeRebate from './Forms/FeeRebate'

const config = [
  {
    Type: 'Setup',
    Name: 'COA Group',
    Description: 'Chart of account',
    Image: 'https://dl.airtable.com/.attachmentThumbnails/0f84e8cda62599e54c3a6a7f44c61c9b/186c6a74',
    Link: '/finance/coa-group',
    Content: props => <div {...props} />,
  },
  {
    Type: 'SunSystem',
    Name: 'COA Fee Rebate',
    Description: 'COA fee rebate',
    Image: 'https://dl.airtable.com/.attachmentThumbnails/f4d5a40a568b29292af76854240458f8/6bed6ff0',
    Link: '/finance/sunsys-coa-setup',
    Content: props => <FeeRebate {...props} />,
  },
];

export default config;

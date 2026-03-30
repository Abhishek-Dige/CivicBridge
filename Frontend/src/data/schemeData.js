/**
 * Shared scheme data for frontend use.
 * iconName strings are mapped to Lucide components where needed.
 */

const schemeCategories = [
  {
    id: 'education',
    title: 'Education Schemes',
    schemes: [
      { name: 'National Scholarship Portal', description: 'Centralized platform for various government scholarships for students.', tags: ['Central Government', 'Scholarship'], iconName: 'BookOpen' },
      { name: 'PM YASASVI Scheme', description: 'Pre-matric and Post-matric scholarships for OBC, EBC, and DNT students.', tags: ['Central Government', 'Scholarship'], iconName: 'BookOpen' },
      { name: 'Pragati Scholarship', description: 'Scholarship specifically supporting girl children for technical education.', tags: ['AICTE', 'Scholarship'], iconName: 'BookOpen' },
      { name: 'State Vidya Scheme', description: 'Financial assistance to state students pursuing higher education.', tags: ['State Government'], iconName: 'BookOpen' },
    ]
  },
  {
    id: 'healthcare',
    title: 'Healthcare Schemes',
    schemes: [
      { name: 'Ayushman Bharat', description: 'Health insurance scheme providing up to ₹5 lakh per family per year.', tags: ['Central Government', 'Insurance'], iconName: 'Stethoscope' },
      { name: 'Janani Suraksha Yojana', description: 'Safe motherhood intervention for pregnant women to reduce mortality.', tags: ['Central Government'], iconName: 'Stethoscope' },
      { name: 'PM Jan Arogya Yojana', description: 'Secondary and tertiary care hospitalization coverage.', tags: ['Insurance', 'Subsidy'], iconName: 'Stethoscope' },
      { name: 'State Health Card', description: 'Free diagnostic services at impaneled state hospitals.', tags: ['State Government'], iconName: 'Stethoscope' },
    ]
  },
  {
    id: 'agriculture',
    title: 'Agriculture Schemes',
    schemes: [
      { name: 'PM Kisan Samman Nidhi', description: 'Income support of ₹6,000 per year to all landholding farmer families.', tags: ['Central Government', 'Subsidy'], iconName: 'Tractor' },
      { name: 'Fasal Bima Yojana', description: 'Crop insurance for farmers against natural calamities.', tags: ['Central Government'], iconName: 'Tractor' },
      { name: 'Kisan Credit Card', description: 'Adequate and timely credit support under a single window.', tags: ['Loan'], iconName: 'Tractor' },
      { name: 'Krishi Sinchayee Yojana', description: 'Improving farm water use efficiency and expanding irrigation.', tags: ['Subsidy'], iconName: 'Tractor' },
    ]
  },
  {
    id: 'employment',
    title: 'Employment Schemes',
    schemes: [
      { name: 'MGNREGA', description: 'Guarantees 100 days of wage employment in a financial year to rural households.', tags: ['Central Government', 'Employment'], iconName: 'Briefcase' },
      { name: 'PM Employment Gen Prog', description: 'Credit-linked subsidy to generate employment in micro-enterprises.', tags: ['Central Government', 'Subsidy'], iconName: 'Briefcase' },
      { name: 'Skill India Mission', description: 'Vocational training and certification programs for youth.', tags: ['Training'], iconName: 'Briefcase' },
    ]
  },
  {
    id: 'women-child',
    title: 'Women & Child Welfare',
    schemes: [
      { name: 'Beti Bachao Beti Padhao', description: 'Campaign to generate awareness and improve welfare for girls.', tags: ['Central Government', 'Awareness'], iconName: 'Baby' },
      { name: 'Sukanya Samriddhi', description: 'Small deposit scheme for the girl child to secure her future.', tags: ['Saving', 'Tax Benefit'], iconName: 'Baby' },
      { name: 'PM Matru Vandana', description: 'Maternity benefit program providing cash incentives.', tags: ['Subsidy'], iconName: 'Baby' },
    ]
  },
  {
    id: 'senior-citizens',
    title: 'Senior Citizen Schemes',
    schemes: [
      { name: 'Vaya Vandana Yojana', description: 'Pension scheme exclusively for senior citizens aged 60 and above.', tags: ['Pension'], iconName: 'User' },
      { name: 'National Social Assist', description: 'Pension for elderly, widows, and persons with disabilities.', tags: ['Central Government', 'Pension'], iconName: 'User' },
    ]
  },
  {
    id: 'housing',
    title: 'Housing Schemes',
    schemes: [
      { name: 'PM Awas Yojana (Urban)', description: 'Housing for all in urban areas with credit-linked subsidies.', tags: ['Central Government', 'Subsidy'], iconName: 'Home' },
      { name: 'PM Awas Yojana (Gramin)', description: 'Financial assistance for rural poor to construct pucca houses.', tags: ['Central Government', 'Subsidy'], iconName: 'Home' },
    ]
  },
  {
    id: 'finance',
    title: 'Financial Assistance',
    schemes: [
      { name: 'Mudra Yojana', description: 'Loans up to ₹10 lakh to non-corporate, non-farm small enterprises.', tags: ['Central Government', 'Loan'], iconName: 'IndianRupee' },
      { name: 'Stand-Up India', description: 'Bank loans between ₹10 lakh and ₹1 crore for SC/ST or women borrowers.', tags: ['Loan'], iconName: 'IndianRupee' },
    ]
  }
];

export default schemeCategories;

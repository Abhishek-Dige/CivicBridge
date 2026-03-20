import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SchemeCard from '../components/SchemeCard';
import { 
  BookOpen, Stethoscope, Tractor, Briefcase, 
  Baby, User, Home, IndianRupee, ChevronRight, ChevronLeft
} from 'lucide-react';

const schemeCategories = [
  {
    id: 'education',
    title: 'Education Schemes',
    schemes: [
      { name: 'National Scholarship Portal', description: 'Centralized platform for various government scholarships for students.', tags: ['Central Government', 'Scholarship'], icon: BookOpen },
      { name: 'PM YASASVI Scheme', description: 'Pre-matric and Post-matric scholarships for OBC, EBC, and DNT students.', tags: ['Central Government', 'Scholarship'], icon: BookOpen },
      { name: 'Pragati Scholarship', description: 'Scholarship specifically supporting girl children for technical education.', tags: ['AICTE', 'Scholarship'], icon: BookOpen },
      { name: 'State Vidya Scheme', description: 'Financial assistance to state students pursuing higher education.', tags: ['State Government'], icon: BookOpen },
    ]
  },
  {
    id: 'healthcare',
    title: 'Healthcare Schemes',
    schemes: [
      { name: 'Ayushman Bharat', description: 'Health insurance scheme providing up to ₹5 lakh per family per year.', tags: ['Central Government', 'Insurance'], icon: Stethoscope },
      { name: 'Janani Suraksha Yojana', description: 'Safe motherhood intervention for pregnant women to reduce mortality.', tags: ['Central Government'], icon: Stethoscope },
      { name: 'PM Jan Arogya Yojana', description: 'Secondary and tertiary care hospitalization coverage.', tags: ['Insurance', 'Subsidy'], icon: Stethoscope },
      { name: 'State Health Card', description: 'Free diagnostic services at impaneled state hospitals.', tags: ['State Government'], icon: Stethoscope },
    ]
  },
  {
    id: 'agriculture',
    title: 'Agriculture Schemes',
    schemes: [
      { name: 'PM Kisan Samman Nidhi', description: 'Income support of ₹6,000 per year to all landholding farmer families.', tags: ['Central Government', 'Subsidy'], icon: Tractor },
      { name: 'Fasal Bima Yojana', description: 'Crop insurance for farmers against natural calamities.', tags: ['Central Government'], icon: Tractor },
      { name: 'Kisan Credit Card', description: 'Adequate and timely credit support under a single window.', tags: ['Loan'], icon: Tractor },
      { name: 'Krishi Sinchayee Yojana', description: 'Improving farm water use efficiency and expanding irrigation.', tags: ['Subsidy'], icon: Tractor },
    ]
  },
  {
    id: 'employment',
    title: 'Employment Schemes',
    schemes: [
      { name: 'MGNREGA', description: 'Guarantees 100 days of wage employment in a financial year to rural households.', tags: ['Central Government', 'Employment'], icon: Briefcase },
      { name: 'PM Employment Gen Prog', description: 'Credit-linked subsidy to generate employment in micro-enterprises.', tags: ['Central Government', 'Subsidy'], icon: Briefcase },
      { name: 'Skill India Mission', description: 'Vocational training and certification programs for youth.', tags: ['Training'], icon: Briefcase },
    ]
  },
  {
    id: 'women-child',
    title: 'Women & Child Welfare',
    schemes: [
      { name: 'Beti Bachao Beti Padhao', description: 'Campaign to generate awareness and improve welfare for girls.', tags: ['Central Government', 'Awareness'], icon: Baby },
      { name: 'Sukanya Samriddhi', description: 'Small deposit scheme for the girl child to secure her future.', tags: ['Saving', 'Tax Benefit'], icon: Baby },
      { name: 'PM Matru Vandana', description: 'Maternity benefit program providing cash incentives.', tags: ['Subsidy'], icon: Baby },
    ]
  },
  {
    id: 'senior-citizens',
    title: 'Senior Citizen Schemes',
    schemes: [
      { name: 'Vaya Vandana Yojana', description: 'Pension scheme exclusively for senior citizens aged 60 and above.', tags: ['Pension'], icon: User },
      { name: 'National Social Assist', description: 'Pension for elderly, widows, and persons with disabilities.', tags: ['Central Government', 'Pension'], icon: User },
    ]
  },
  {
    id: 'housing',
    title: 'Housing Schemes',
    schemes: [
      { name: 'PM Awas Yojana (Urban)', description: 'Housing for all in urban areas with credit-linked subsidies.', tags: ['Central Government', 'Subsidy'], icon: Home },
      { name: 'PM Awas Yojana (Gramin)', description: 'Financial assistance for rural poor to construct pucca houses.', tags: ['Central Government', 'Subsidy'], icon: Home },
    ]
  },
  {
    id: 'finance',
    title: 'Financial Assistance',
    schemes: [
      { name: 'Mudra Yojana', description: 'Loans up to ₹10 lakh to non-corporate, non-farm small enterprises.', tags: ['Central Government', 'Loan'], icon: IndianRupee },
      { name: 'Stand-Up India', description: 'Bank loans between ₹10 lakh and ₹1 crore for SC/ST or women borrowers.', tags: ['Loan'], icon: IndianRupee },
    ]
  }
];

const SchemeRow = ({ category }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="scheme-section">
      <div className="scheme-section-header">
        <h2 className="scheme-section-title">{category.title}</h2>
        <div className="scroll-buttons">
          <button className="scroll-btn" onClick={scrollLeft}><ChevronLeft size={20} /></button>
          <button className="scroll-btn" onClick={scrollRight}><ChevronRight size={20} /></button>
        </div>
      </div>
      
      <div className="scheme-row-container" ref={scrollRef}>
        {category.schemes.map((scheme, idx) => (
          <SchemeCard key={idx} scheme={scheme} />
        ))}
      </div>
    </div>
  );
};

const SchemeNavigatorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="scheme-navigator-layout">
      <Navbar />
      <div className="scheme-navigator-page">
        <div className="scheme-hero">
          <h1 className="scheme-hero-title">Scheme Navigator</h1>
          <p className="scheme-hero-subtitle">
            Discover, explore, and access hundreds of government schemes all in one unified platform.
          </p>
        </div>

        <div className="scheme-content">
          {schemeCategories.map((category) => (
            <SchemeRow key={category.id} category={category} />
          ))}
        </div>

        <div className="scheme-cta-section">
          <div className="cta-box">
            <h3>Not sure which schemes you qualify for?</h3>
            <p>Let our intelligent matching engine find the perfect schemes for you based on your unique profile.</p>
            <button 
              className="btn btn-primary btn-cta-large"
              onClick={() => navigate('/eligibility')}
            >
              Check My Eligibility
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SchemeNavigatorPage;

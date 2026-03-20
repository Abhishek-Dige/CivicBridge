import React from 'react';
import { ArrowRight } from 'lucide-react';

const SchemeCard = ({ scheme }) => {
  const { name, description, tags, icon: Icon } = scheme;

  return (
    <div className="scheme-card">
      <div className="scheme-card-header">
        <div className="scheme-icon">
          <Icon size={24} />
        </div>
        <div className="scheme-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="scheme-card-body">
        <h3 className="scheme-title">{name}</h3>
        <p className="scheme-desc">{description}</p>
      </div>

      <div className="scheme-card-footer">
        <button className="btn-view-details">
          View Details <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default SchemeCard;

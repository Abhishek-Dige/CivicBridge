import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SchemeCard = ({ scheme }) => {
  const navigate = useNavigate();
  const { id, name, description, tags, icon: Icon } = scheme;

  // Fallback to simple icon if Icon wasn't passed or resolving properly
  const IconComponent = Icon || (() => <ArrowRight size={24} />);

  return (
    <div className="scheme-card">
      <div className="scheme-card-header">
        <div className="scheme-icon">
          <IconComponent size={24} />
        </div>
        <div className="scheme-tags">
          {tags && tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag.trim()}
            </span>
          ))}
        </div>
      </div>
      
      <div className="scheme-card-body">
        <h3 className="scheme-title">{name}</h3>
        <p className="scheme-desc">{description}</p>
      </div>

      <div className="scheme-card-footer">
        <button className="btn-view-details" onClick={() => navigate(`/scheme/${id}`)}>
          View Details <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default SchemeCard;

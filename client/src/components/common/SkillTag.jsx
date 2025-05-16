import React from 'react';

function SkillTag({ label }) {
    return (
      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 inline-block">
        {label}
      </span>
    );
}

export default SkillTag;
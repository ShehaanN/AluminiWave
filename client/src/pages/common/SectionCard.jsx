import React from 'react';

function SectionCard({ title, children }) {
    return (
      <div className="bg-white rounded-md shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        {children}
      </div>
    );
}

export default SectionCard;
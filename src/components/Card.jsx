import React from 'react'

const Card = ({title, description, borderclass}) => {
  return (
    <div className={"p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border-t-4 border-indigo-500 bg-white " + borderclass}>
      <h3 className="font-semibold text-xl mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Card
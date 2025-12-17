import React from 'react';
import { useTranslation } from 'react-i18next';
import { benefits } from '../../data/mockData';

const Benefits: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-fredoka">
            Why Choose Kids'Trésor?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best toy shopping experience with quality, safety, and fun in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t(`home.benefits.${benefit.title.toLowerCase().replace(' ', '')}`)}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
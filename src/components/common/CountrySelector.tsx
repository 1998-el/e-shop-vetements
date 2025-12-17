import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  nativeName: string;
}

const countries: Country[] = [
  { code: 'FR', name: 'France', nativeName: 'France' },
  { code: 'BE', name: 'Belgium', nativeName: 'Belgique' },
  { code: 'CH', name: 'Switzerland', nativeName: 'Suisse' },
  { code: 'DE', name: 'Germany', nativeName: 'Allemagne' },
  { code: 'IT', name: 'Italy', nativeName: 'Italie' },
  { code: 'ES', name: 'Spain', nativeName: 'Espagne' },
  { code: 'NL', name: 'Netherlands', nativeName: 'Pays-Bas' },
  { code: 'AT', name: 'Austria', nativeName: 'Autriche' },
  { code: 'PL', name: 'Poland', nativeName: 'Pologne' },
  { code: 'PT', name: 'Portugal', nativeName: 'Portugal' },
  { code: 'CZ', name: 'Czech Republic', nativeName: 'République tchèque' },
  { code: 'HU', name: 'Hungary', nativeName: 'Hongrie' },
  { code: 'SE', name: 'Sweden', nativeName: 'Suède' },
  { code: 'NO', name: 'Norway', nativeName: 'Norvège' },
  { code: 'DK', name: 'Denmark', nativeName: 'Danemark' },
  { code: 'FI', name: 'Finland', nativeName: 'Finlande' },
  { code: 'IE', name: 'Ireland', nativeName: 'Irlande' },
  { code: 'LU', nativeName: 'Luxembourg', name: 'Luxembourg' },
  { code: 'SK', name: 'Slovakia', nativeName: 'Slovaquie' },
  { code: 'SI', name: 'Slovenia', nativeName: 'Slovénie' },
  { code: 'HR', name: 'Croatia', nativeName: 'Croatie' },
  { code: 'EE', name: 'Estonia', nativeName: 'Estonie' },
  { code: 'LV', name: 'Latvia', nativeName: 'Lettonie' },
  { code: 'LT', name: 'Lithuania', nativeName: 'Lituanie' },
  { code: 'RO', name: 'Romania', nativeName: 'Roumanie' },
  { code: 'BG', name: 'Bulgaria', nativeName: 'Bulgarie' },
  { code: 'GR', name: 'Greece', nativeName: 'Grèce' },
  { code: 'CY', name: 'Cyprus', nativeName: 'Chypre' },
  { code: 'MT', name: 'Malta', nativeName: 'Malte' },
  { code: 'IS', name: 'Iceland', nativeName: 'Islande' },
  { code: 'LI', name: 'Liechtenstein', nativeName: 'Liechtenstein' },
  { code: 'MC', name: 'Monaco', nativeName: 'Monaco' },
  { code: 'AD', name: 'Andorra', nativeName: 'Andorre' },
  { code: 'SM', name: 'San Marino', nativeName: 'Saint-Marin' },
  { code: 'VA', name: 'Vatican City', nativeName: 'Vatican' },
  { code: 'BA', name: 'Bosnia and Herzegovina', nativeName: 'Bosnie-Herzégovine' },
  { code: 'MK', name: 'North Macedonia', nativeName: 'Macédoine du Nord' },
  { code: 'AL', name: 'Albania', nativeName: 'Albanie' },
  { code: 'RS', name: 'Serbia', nativeName: 'Serbie' },
  { code: 'ME', name: 'Montenegro', nativeName: 'Monténégro' },
  { code: 'XK', name: 'Kosovo', nativeName: 'Kosovo' },
  { code: 'MD', name: 'Moldova', nativeName: 'Moldavie' },
  { code: 'UA', name: 'Ukraine', nativeName: 'Ukraine' },
  { code: 'BY', name: 'Belarus', nativeName: 'Biélorussie' },
  { code: 'RU', name: 'Russia', nativeName: 'Russie' },
  { code: 'GB', name: 'United Kingdom', nativeName: 'Royaume-Uni' },
];

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  value,
  onChange,
  error,
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCountry = countries.find(country => country.name === value || country.nativeName === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (countryName: string) => {
    onChange(countryName);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Pays {required && '*'}
      </label>
      
      <div
        className={`relative w-full border rounded-lg px-3 py-2 bg-white cursor-pointer focus-within:ring-2 focus-within:ring-[#0464de] transition-colors ${
          error ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span className={selectedCountry ? 'text-gray-900' : 'text-gray-500'}>
            {selectedCountry ? selectedCountry.nativeName : 'Sélectionner un pays'}
          </span>
          <ChevronDown 
            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Rechercher un pays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0464de] text-sm"
              />
            </div>
          </div>

          {/* Country List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <div
                  key={country.code}
                  onClick={() => handleSelect(country.name)}
                  className="px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900">
                    {country.nativeName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {country.name}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-gray-500 text-center">
                Aucun pays trouvé
              </div>
            )}
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CountrySelector;
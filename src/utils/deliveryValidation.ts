// Validations correspondantes aux DTOs NestJS (IsString, IsOptional, IsDate, etc.)
import { DeliveryStatus } from '../types/delivery';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface DeliveryValidationRules {
  required: string[];
  optional: string[];
  patterns: Record<string, RegExp>;
  ranges: Record<string, { min?: number; max?: number }>;
}

// Règles de validation pour CreateDeliveryDto
export const createDeliveryValidationRules: DeliveryValidationRules = {
  required: ['orderId', 'carrier', 'shippingAddress', 'recipientName', 'estimatedDeliveryDate'],
  optional: ['userId', 'trackingNumber', 'notes', 'location'],
  patterns: {
    orderId: /^[a-zA-Z0-9-_]+$/,
    carrier: /^[a-zA-ZÀ-ÿ\s-]+$/,
    trackingNumber: /^LK\d{6}[A-Z0-9]{6}$/,
    recipientName: /^[a-zA-ZÀ-ÿ\s-]{2,50}$/
  },
  ranges: {
    orderId: { min: 1, max: 100 },
    carrier: { min: 2, max: 50 },
    recipientName: { min: 2, max: 50 }
  }
};

// Règles de validation pour ShippingAddress
export const shippingAddressValidationRules: DeliveryValidationRules = {
  required: ['street', 'city', 'postalCode', 'country'],
  optional: ['additionalInfo'],
  patterns: {
    street: /^[\w\sÀ-ÿ.,#-]{5,100}$/,
    city: /^[a-zA-ZÀ-ÿ\s-]{2,50}$/,
    postalCode: /^[0-9]{5}$/,
    country: /^[a-zA-ZÀ-ÿ\s-]{2,50}$/,
    additionalInfo: /^[\w\sÀ-ÿ.,#-]{0,200}$/
  },
  ranges: {
    street: { min: 5, max: 100 },
    city: { min: 2, max: 50 },
    postalCode: { min: 5, max: 5 },
    country: { min: 2, max: 50 }
  }
};

export const deliveryValidator = {
  // Validation de CreateDeliveryDto
  validateCreateDeliveryDto(data: any): ValidationResult {
    const errors: Record<string, string> = {};
    const rules = createDeliveryValidationRules;

    // Validation des champs requis
    rules.required.forEach(field => {
      if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
        errors[field] = `${field} est requis`;
      }
    });

    // Validation des patterns
    Object.entries(rules.patterns).forEach(([field, pattern]) => {
      if (data[field] && !pattern.test(data[field])) {
        errors[field] = `${field} a un format invalide`;
      }
    });

    // Validation des ranges
    Object.entries(rules.ranges).forEach(([field, range]) => {
      if (data[field]) {
        const value = data[field].toString();
        if (range.min && value.length < range.min) {
          errors[field] = `${field} doit contenir au moins ${range.min} caractères`;
        }
        if (range.max && value.length > range.max) {
          errors[field] = `${field} ne peut pas dépasser ${range.max} caractères`;
        }
      }
    });

    // Validation spécifique pour estimatedDeliveryDate
    if (data.estimatedDeliveryDate) {
      const date = new Date(data.estimatedDeliveryDate);
      const now = new Date();
      if (date <= now) {
        errors.estimatedDeliveryDate = 'La date de livraison estimée doit être dans le futur';
      }
    }

    // Validation de l'adresse de livraison
    if (data.shippingAddress) {
      const addressValidation = this.validateShippingAddress(data.shippingAddress);
      if (!addressValidation.isValid) {
        Object.assign(errors, addressValidation.errors);
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Validation de ShippingAddress
  validateShippingAddress(address: any): ValidationResult {
    const errors: Record<string, string> = {};
    const rules = shippingAddressValidationRules;

    // Validation des champs requis
    rules.required.forEach(field => {
      if (!address[field] || (typeof address[field] === 'string' && address[field].trim() === '')) {
        errors[`shippingAddress.${field}`] = `Adresse - ${field} est requis`;
      }
    });

    // Validation du code postal français
    if (address.postalCode && !/^[0-9]{5}$/.test(address.postalCode)) {
      errors['shippingAddress.postalCode'] = 'Le code postal doit contenir 5 chiffres';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Validation de UpdateDeliveryStatusDto
  validateUpdateStatusDto(data: any): ValidationResult {
    const errors: Record<string, string> = {};

    // Validation du statut
    if (!data.status) {
      errors.status = 'Le statut est requis';
    } else if (!Object.values(DeliveryStatus).includes(data.status)) {
      errors.status = 'Le statut n\'est pas valide';
    }

    // Validation de la date de livraison effective (si fournie)
    if (data.actualDeliveryDate) {
      const date = new Date(data.actualDeliveryDate);
      const now = new Date();
      if (date > now) {
        errors.actualDeliveryDate = 'La date de livraison effective ne peut pas être dans le futur';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Validation d'un numéro de suivi
  validateTrackingNumber(trackingNumber: string): ValidationResult {
    const errors: Record<string, string> = {};

    if (!trackingNumber || trackingNumber.trim() === '') {
      errors.trackingNumber = 'Le numéro de suivi est requis';
    } else if (!/^LK\d{6}[A-Z0-9]{6}$/.test(trackingNumber)) {
      errors.trackingNumber = 'Le format du numéro de suivi est invalide (ex: LK123456789)';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Validation des filtres de recherche
  validateFilters(filters: any): ValidationResult {
    const errors: Record<string, string> = {};

    // Validation du statut si fourni
    if (filters.status && !Object.values(DeliveryStatus).includes(filters.status)) {
      errors.status = 'Le statut de filtre n\'est pas valide';
    }

    // Validation de l'ID utilisateur si fourni
    if (filters.userId && !/^[a-zA-Z0-9-_]+$/.test(filters.userId)) {
      errors.userId = 'L\'ID utilisateur a un format invalide';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Sanitisation des données (équivalent aux transformers NestJS)
  sanitizeCreateDeliveryDto(data: any): any {
    return {
      orderId: data.orderId?.trim(),
      userId: data.userId?.trim(),
      carrier: data.carrier?.trim(),
      trackingNumber: data.trackingNumber?.trim(),
      shippingAddress: {
        street: data.shippingAddress?.street?.trim(),
        city: data.shippingAddress?.city?.trim(),
        postalCode: data.shippingAddress?.postalCode?.trim(),
        country: data.shippingAddress?.country?.trim(),
        additionalInfo: data.shippingAddress?.additionalInfo?.trim()
      },
      recipientName: data.recipientName?.trim(),
      estimatedDeliveryDate: data.estimatedDeliveryDate ? new Date(data.estimatedDeliveryDate) : null,
      notes: data.notes?.trim(),
      location: data.location?.trim()
    };
  },

  // Validation en temps réel pour les formulaires
  validateField(fieldName: string, value: any, rules: DeliveryValidationRules): string | null {
    // Vérifier si le champ est requis
    if (rules.required.includes(fieldName) && (!value || value.toString().trim() === '')) {
      return `${fieldName} est requis`;
    }

    // Vérifier les patterns
    if (rules.patterns[fieldName] && value && !rules.patterns[fieldName].test(value)) {
      return `${fieldName} a un format invalide`;
    }

    // Vérifier les ranges
    if (rules.ranges[fieldName] && value) {
      const range = rules.ranges[fieldName];
      const strValue = value.toString();
      
      if (range.min && strValue.length < range.min) {
        return `${fieldName} doit contenir au moins ${range.min} caractères`;
      }
      if (range.max && strValue.length > range.max) {
        return `${fieldName} ne peut pas dépasser ${range.max} caractères`;
      }
    }

    return null;
  }
};

export default deliveryValidator;
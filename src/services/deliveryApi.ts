import api from './api';
import type {
  Delivery,
  CreateDeliveryDto,
  UpdateDeliveryDto,
  UpdateDeliveryStatusDto,
  DeliveryTracking,
  DeliveryStats,
  DeliveryFilters
} from '../types/delivery';

// Service API pour les livraisons - correspond exactement aux endpoints NestJS
export const deliveryApi = {
  // POST /deliveries - Créer une nouvelle livraison
  create: async (createDeliveryDto: CreateDeliveryDto): Promise<Delivery> => {
    try {
      const response = await api.post('/deliveries', createDeliveryDto);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la livraison:', error);
      throw error;
    }
  },

  // GET /deliveries - Récupérer toutes les livraisons avec filtres
  findAll: async (filters: DeliveryFilters = {}): Promise<Delivery[]> => {
    try {
      const params = new URLSearchParams();
      
      // Ajout des filtres selon les query params NestJS
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });

      const response = await api.get(`/deliveries?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des livraisons:', error);
      throw error;
    }
  },

  // GET /deliveries/:id - Récupérer une livraison par ID
  findOne: async (id: string): Promise<Delivery> => {
    try {
      const response = await api.get(`/deliveries/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la livraison ${id}:`, error);
      throw error;
    }
  },

  // GET /deliveries/order/:orderId - Récupérer la livraison d'une commande
  findByOrder: async (orderId: string): Promise<Delivery | null> => {
    try {
      const response = await api.get(`/deliveries/order/${orderId}`);
      return response.data;
    } catch (error) {
      // Gestion 404 pour "livraison non trouvée pour cette commande"
      if (error && typeof error === 'object' && 'response' in error && (error as any).response?.status === 404) {
        return null;
      }
      console.error(`Erreur lors de la récupération de la livraison pour la commande ${orderId}:`, error);
      throw error;
    }
  },

  // PUT /deliveries/:id - Mettre à jour une livraison
  update: async (id: string, updateDeliveryDto: UpdateDeliveryDto): Promise<Delivery> => {
    try {
      const response = await api.put(`/deliveries/${id}`, updateDeliveryDto);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la livraison ${id}:`, error);
      throw error;
    }
  },

  // PUT /deliveries/:id/status - Mettre à jour le statut d'une livraison
  updateStatus: async (id: string, updateStatusDto: UpdateDeliveryStatusDto): Promise<Delivery> => {
    try {
      const response = await api.put(`/deliveries/${id}/status`, updateStatusDto);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du statut de la livraison ${id}:`, error);
      throw error;
    }
  },

  // DELETE /deliveries/:id - Supprimer une livraison
  remove: async (id: string): Promise<void> => {
    try {
      await api.delete(`/deliveries/${id}`);
    } catch (error) {
      console.error(`Erreur lors de la suppression de la livraison ${id}:`, error);
      throw error;
    }
  },

  // GET /deliveries/tracking/:trackingNumber - Suivre un colis par numéro de suivi
  trackPackage: async (trackingNumber: string): Promise<DeliveryTracking> => {
    try {
      const response = await api.get(`/deliveries/tracking/${trackingNumber}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors du suivi du colis ${trackingNumber}:`, error);
      throw error;
    }
  },

  // Méthodes utilitaires additionnelles (non présentes dans le backend NestJS original mais utiles)

  // Obtenir les statistiques des livraisons
  getStats: async (): Promise<DeliveryStats> => {
    try {
      // Cette méthode pourrait être ajoutée au backend si nécessaire
      const response = await api.get('/deliveries/stats');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  },

  // Obtenir les livraisons dans une plage de dates
  getByDateRange: async (startDate: Date, endDate: Date): Promise<Delivery[]> => {
    try {
      const params = new URLSearchParams({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });
      
      const response = await api.get(`/deliveries/date-range?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des livraisons par date:', error);
      throw error;
    }
  },

  // ===== MÉTHODES UTILITAIRES =====

  // Helper pour obtenir le libellé du statut (localisé)
  getStatusLabel: (status: string): string => {
    const statusLabels: Record<string, string> = {
      PENDING: 'En attente',
      PROCESSING: 'En traitement',
      SHIPPED: 'Expédié',
      IN_TRANSIT: 'En transit',
      OUT_FOR_DELIVERY: 'En cours de livraison',
      DELIVERED: 'Livré',
      FAILED: 'Échec',
      RETURNED: 'Retourné'
    };
    
    return statusLabels[status] || status;
  },

  // Helper pour obtenir la couleur du statut (classes Tailwind)
  getStatusColor: (status: string): string => {
    const statusColors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PROCESSING: 'bg-blue-100 text-blue-800',
      SHIPPED: 'bg-purple-100 text-purple-800',
      IN_TRANSIT: 'bg-indigo-100 text-indigo-800',
      OUT_FOR_DELIVERY: 'bg-green-100 text-green-800',
      DELIVERED: 'bg-green-100 text-green-800',
      FAILED: 'bg-red-100 text-red-800',
      RETURNED: 'bg-gray-100 text-gray-800'
    };
    
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  },

  // Helper pour obtenir l'icône du statut
  getStatusIcon: (status: string): string => {
    const statusIcons: Record<string, string> = {
      PENDING: '⏳',
      PROCESSING: '⚙️',
      SHIPPED: '📦',
      IN_TRANSIT: '🚛',
      OUT_FOR_DELIVERY: '🏠',
      DELIVERED: '✅',
      FAILED: '❌',
      RETURNED: '↩️'
    };
    
    return statusIcons[status] || '📦';
  },

  // Helper pour valider un numéro de suivi
  validateTrackingNumber: (trackingNumber: string): boolean => {
    // Pattern pour les numéros de suivi LK générés
    const pattern = /^LK\d{6}[A-Z0-9]{6}$/;
    return pattern.test(trackingNumber);
  },

  // Helper pour formater un numéro de suivi
  formatTrackingNumber: (trackingNumber: string): string => {
    // Formatage pour l'affichage (ex: LK123456789 -> LK 123456 789)
    return trackingNumber.replace(/^LK/, 'LK ').replace(/(\d{6})(\w{6})$/, '$1 $2');
  }
};

export default deliveryApi;
export type UserRole = 'citizen' | 'collector' | 'facility' | 'admin';

export type EcoLevel = 'Eco Beginner' | 'Eco Explorer' | 'Eco Champion' | 'Eco Hero';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  ecoCoins: number;
  ecoLevel: EcoLevel;
  totalWasteRecycledKg: number;
  recyclingEventsCount: number;
  location: string;
  ecoId: string;
  avatarUrl?: string;
  isSuspended?: boolean;
  createdAt: string;
}

export type BinStatus = 'available' | 'almost_full' | 'collection_required' | 'offline';

export type WasteCategoryKey = 'plastic' | 'paper' | 'cardboard' | 'metal' | 'glass' | 'ewaste' | 'organic';

export interface SmartBin {
  id: string;
  binCode: string;
  name: string;
  location: string;
  address: string;
  latitude: number;
  longitude: number;
  capacityLiters: number;
  currentFillPercent: number;
  status: BinStatus;
  primaryWasteType: WasteCategoryKey;
  batteryPercent: number;
  lastCollectionAt: string;
  lastUpdated: string;
  thresholdPercent: number;
  temperatureCelsius?: number;
}

export interface WasteCategory {
  id: string;
  key: WasteCategoryKey;
  name: string;
  description: string;
  recyclingInfo: string;
  rewardRateCoinsPerKg: number;
  co2SavedPerKg: number;
  isAccepting: boolean;
  color: string;
}

export interface WasteRecord {
  id: string;
  userId: string;
  userName: string;
  binId: string;
  binCode: string;
  wasteType: WasteCategoryKey;
  weightKg: number;
  coinsEarned: number;
  timestamp: string;
  verifiedStatus: 'verified' | 'pending' | 'flagged';
  classificationConfidence?: number;
}

export interface CoinTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earned' | 'redeemed' | 'bonus' | 'donation';
  description: string;
  timestamp: string;
  status: 'approved' | 'pending' | 'flagged';
}

export type CollectionPriority = 'normal' | 'high' | 'urgent';
export type CollectionStatus = 'pending' | 'accepted' | 'in_transit' | 'collected';

export interface CollectionRequest {
  id: string;
  binId: string;
  binCode: string;
  location: string;
  fillLevelAtRequest: number;
  priority: CollectionPriority;
  status: CollectionStatus;
  requestedAt: string;
  assignedCollectorId?: string;
  assignedCollectorName?: string;
  collectedAt?: string;
  collectedWeightKg?: number;
}

export type ProcessingStage = 'received' | 'sorted' | 'processed' | 'recycled' | 'reused';

export interface RecyclingRecord {
  id: string;
  batchCode: string;
  facilityId: string;
  facilityName: string;
  wasteType: WasteCategoryKey;
  collectedWeightKg: number;
  sortedWeightKg: number;
  processedWeightKg: number;
  recycledMaterialYieldKg: number;
  processingStatus: ProcessingStage;
  collectedDate: string;
  updatedAt: string;
  sourceCollector: string;
  intendedOutput: string;
}

export interface RecyclingFacility {
  id: string;
  name: string;
  location: string;
  contact: string;
  facilityType: string;
  dailyCapacityKg: number;
}

export interface RewardItem {
  id: string;
  name: string;
  description: string;
  category: 'voucher' | 'product' | 'donation' | 'community';
  coinCost: number;
  partner: string;
  availableCount: number;
  imageUrl?: string;
  terms: string;
}

export interface AppNotification {
  id: string;
  recipientRole?: UserRole | 'all';
  recipientUserId?: string;
  title: string;
  message: string;
  type: 'coin' | 'bin_alert' | 'collection' | 'milestone' | 'admin';
  timestamp: string;
  read: boolean;
}

export interface ConversionFactors {
  co2SavedPerKg: number;
  treesSavedFactor: number;
  waterSavedLitersPerKg: number;
  energySavedKwhPerKg: number;
}

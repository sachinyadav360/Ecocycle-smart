import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  SmartBin,
  BinStatus,
  WasteCategory,
  WasteCategoryKey,
  CollectionRequest,
  RecyclingRecord,
  RecyclingFacility,
  RewardItem,
  AppNotification,
  ConversionFactors,
  ProcessingStage,
  WasteRecord,
  CoinTransaction,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_BINS,
  INITIAL_CATEGORIES,
  INITIAL_REQUESTS,
  INITIAL_RECYCLING_RECORDS,
  INITIAL_FACILITIES,
  INITIAL_REWARDS,
  INITIAL_NOTIFICATIONS,
  DEFAULT_CONVERSION_FACTORS,
} from '../data/initialData';

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface EcoCycleContextType {
  currentUser: User;
  users: User[];
  bins: SmartBin[];
  categories: WasteCategory[];
  requests: CollectionRequest[];
  recyclingRecords: RecyclingRecord[];
  facilities: RecyclingFacility[];
  rewards: RewardItem[];
  notifications: AppNotification[];
  conversionFactors: ConversionFactors;
  wasteRecords: WasteRecord[];
  coinTransactions: CoinTransaction[];
  activeTab: string;
  isDepositModalOpen: boolean;
  selectedBinForDeposit: SmartBin | null;
  isIoTSimulatorOpen: boolean;
  isAuthModalOpen: boolean;
  isDocsModalOpen: boolean;
  selectedBinDetail: SmartBin | null;
  toast: ToastState;
  
  // Navigation & Modals
  setActiveTab: (tab: string) => void;
  switchRole: (role: UserRole) => void;
  openDepositModal: (bin?: SmartBin) => void;
  closeDepositModal: () => void;
  openIoTSimulator: () => void;
  closeIoTSimulator: () => void;
  openBinDetail: (bin: SmartBin) => void;
  closeBinDetail: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openDocsModal: () => void;
  closeDocsModal: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;

  // Domain Actions
  depositWaste: (data: {
    binId: string;
    wasteType: WasteCategoryKey;
    weightKg: number;
    photoProof?: string;
  }) => { coinsEarned: number; newFillPercent: number; collectionTriggered: boolean };
  
  acceptCollectionRequest: (requestId: string) => void;
  completeCollection: (requestId: string, collectedWeightKg: number, targetFacilityId: string) => void;
  updateRecyclingStage: (
    recordId: string,
    newStage: ProcessingStage,
    details?: { sortedWeightKg?: number; processedWeightKg?: number; recycledMaterialYieldKg?: number }
  ) => void;
  redeemReward: (rewardId: string) => { success: boolean; message: string; voucherCode?: string };
  
  // Admin & Management
  addSmartBin: (bin: Omit<SmartBin, 'id'>) => void;
  updateSmartBin: (id: string, updates: Partial<SmartBin>) => void;
  deleteSmartBin: (id: string) => void;
  updateCategoryRewardRate: (categoryId: string, newRate: number) => void;
  toggleCategoryStatus: (categoryId: string) => void;
  updateConversionFactors: (factors: Partial<ConversionFactors>) => void;
  toggleUserSuspension: (userId: string) => void;
  simulateIoTPayload: (binId: string, fillLevel: number, battery: number) => void;
  
  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  resetToDemoDefaults: () => void;
}

const EcoCycleContext = createContext<EcoCycleContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'ecocycle_smart_data_v1';

export const EcoCycleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load stored state or initialize with defaults
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_users`);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    return 'usr-101'; // Default: Maya Lin (Citizen)
  });

  const [bins, setBins] = useState<SmartBin[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_bins`);
    return saved ? JSON.parse(saved) : INITIAL_BINS;
  });

  const [categories, setCategories] = useState<WasteCategory[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_categories`);
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [requests, setRequests] = useState<CollectionRequest[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_requests`);
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [recyclingRecords, setRecyclingRecords] = useState<RecyclingRecord[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_recycling`);
    return saved ? JSON.parse(saved) : INITIAL_RECYCLING_RECORDS;
  });

  const [facilities] = useState<RecyclingFacility[]>(INITIAL_FACILITIES);

  const [rewards, setRewards] = useState<RewardItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_rewards`);
    return saved ? JSON.parse(saved) : INITIAL_REWARDS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [conversionFactors, setConversionFactors] = useState<ConversionFactors>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_factors`);
    return saved ? JSON.parse(saved) : DEFAULT_CONVERSION_FACTORS;
  });

  const [wasteRecords, setWasteRecords] = useState<WasteRecord[]>([
    {
      id: 'wr-1',
      userId: 'usr-101',
      userName: 'Maya Lin',
      binId: 'bin-101',
      binCode: 'EC-101',
      wasteType: 'plastic',
      weightKg: 2.5,
      coinsEarned: 38,
      timestamp: '2026-09-24T21:10:00Z',
      verifiedStatus: 'verified',
    },
    {
      id: 'wr-2',
      userId: 'usr-101',
      userName: 'Maya Lin',
      binId: 'bin-103',
      binCode: 'EC-103',
      wasteType: 'paper',
      weightKg: 4.0,
      coinsEarned: 40,
      timestamp: '2026-09-23T15:20:00Z',
      verifiedStatus: 'verified',
    },
    {
      id: 'wr-3',
      userId: 'usr-101',
      userName: 'Maya Lin',
      binId: 'bin-104',
      binCode: 'EC-104',
      wasteType: 'metal',
      weightKg: 1.2,
      coinsEarned: 30,
      timestamp: '2026-09-21T18:45:00Z',
      verifiedStatus: 'verified',
    },
  ]);

  const [coinTransactions, setCoinTransactions] = useState<CoinTransaction[]>([
    {
      id: 'tx-1',
      userId: 'usr-101',
      amount: 38,
      type: 'earned',
      description: 'Recycled 2.5kg Plastic at EC-101',
      timestamp: '2026-09-24T21:10:00Z',
      status: 'approved',
    },
    {
      id: 'tx-2',
      userId: 'usr-101',
      amount: 40,
      type: 'earned',
      description: 'Recycled 4.0kg Paper at EC-103',
      timestamp: '2026-09-23T15:20:00Z',
      status: 'approved',
    },
    {
      id: 'tx-3',
      userId: 'usr-101',
      amount: -50,
      type: 'redeemed',
      description: 'Redeemed $5 Off Zero-Waste Grocery Store',
      timestamp: '2026-09-22T13:00:00Z',
      status: 'approved',
    },
  ]);

  // UI state
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [selectedBinForDeposit, setSelectedBinForDeposit] = useState<SmartBin | null>(null);
  const [isIoTSimulatorOpen, setIsIoTSimulatorOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  const [selectedBinDetail, setSelectedBinDetail] = useState<SmartBin | null>(null);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'info' });

  // Current user object
  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_users`, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_bins`, JSON.stringify(bins));
  }, [bins]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_categories`, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_requests`, JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_recycling`, JSON.stringify(recyclingRecords));
  }, [recyclingRecords]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_rewards`, JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_notifications`, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_factors`, JSON.stringify(conversionFactors));
  }, [conversionFactors]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4500);
  };

  const switchRole = (role: UserRole) => {
    const targetUser = users.find(u => u.role === role);
    if (targetUser) {
      setCurrentUserId(targetUser.id);
      showToast(`Switched perspective to ${targetUser.name} (${role.toUpperCase()})`, 'info');
      // If currently on a dashboard, navigate to appropriate dashboard view
      if (activeTab === 'dashboard' || activeTab === 'home') {
        setActiveTab('dashboard');
      }
    }
  };

  const openDepositModal = (bin?: SmartBin) => {
    if (bin) {
      setSelectedBinForDeposit(bin);
    } else {
      // Pick first available bin
      const firstAvailable = bins.find(b => b.status !== 'offline') || bins[0];
      setSelectedBinForDeposit(firstAvailable);
    }
    setIsDepositModalOpen(true);
  };

  const closeDepositModal = () => {
    setIsDepositModalOpen(false);
    setSelectedBinForDeposit(null);
  };

  const openIoTSimulator = () => setIsIoTSimulatorOpen(true);
  const closeIoTSimulator = () => setIsIoTSimulatorOpen(false);
  const openBinDetail = (bin: SmartBin) => setSelectedBinDetail(bin);
  const closeBinDetail = () => setSelectedBinDetail(null);
  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const openDocsModal = () => setIsDocsModalOpen(true);
  const closeDocsModal = () => setIsDocsModalOpen(false);

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Business Logic: Deposit waste into smart bin
  const depositWaste = ({
    binId,
    wasteType,
    weightKg,
  }: {
    binId: string;
    wasteType: WasteCategoryKey;
    weightKg: number;
    photoProof?: string;
  }) => {
    const targetBin = bins.find(b => b.id === binId);
    if (!targetBin) throw new Error('Smart bin not found');

    const category = categories.find(c => c.key === wasteType) || categories[0];
    const coinsEarned = Math.round(weightKg * category.rewardRateCoinsPerKg);

    // Approximate volumetric fill level increase based on capacity
    // Rule of thumb: 1kg of recyclable ~ 6-8 liters of uncompressed volume
    const estimatedVolumeLiters = weightKg * 6;
    const additionalFillPercent = Math.min(60, Math.round((estimatedVolumeLiters / targetBin.capacityLiters) * 100));
    const newFillPercent = Math.min(100, targetBin.currentFillPercent + additionalFillPercent);

    let newStatus = targetBin.status;
    let collectionTriggered = false;

    if (newFillPercent >= targetBin.thresholdPercent) {
      newStatus = 'collection_required';
      collectionTriggered = true;
    } else if (newFillPercent >= 70) {
      newStatus = 'almost_full';
    }

    // Update bin
    setBins(prev =>
      prev.map(b =>
        b.id === binId
          ? {
              ...b,
              currentFillPercent: newFillPercent,
              status: newStatus,
              lastUpdated: new Date().toISOString(),
            }
          : b
      )
    );

    // Create waste record
    const newRecord: WasteRecord = {
      id: `wr-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      binId: targetBin.id,
      binCode: targetBin.binCode,
      wasteType,
      weightKg,
      coinsEarned,
      timestamp: new Date().toISOString(),
      verifiedStatus: 'verified',
    };
    setWasteRecords(prev => [newRecord, ...prev]);

    // Update user balance & stats
    setUsers(prev =>
      prev.map(u => {
        if (u.id === currentUser.id) {
          const newTotalKg = Number((u.totalWasteRecycledKg + weightKg).toFixed(1));
          const newEventsCount = u.recyclingEventsCount + 1;
          const newCoins = u.ecoCoins + coinsEarned;
          
          let newLevel = u.ecoLevel;
          if (newTotalKg >= 80) newLevel = 'Eco Hero';
          else if (newTotalKg >= 40) newLevel = 'Eco Champion';
          else if (newTotalKg >= 15) newLevel = 'Eco Explorer';

          return {
            ...u,
            ecoCoins: newCoins,
            totalWasteRecycledKg: newTotalKg,
            recyclingEventsCount: newEventsCount,
            ecoLevel: newLevel,
          };
        }
        return u;
      })
    );

    // Record coin transaction
    const newTx: CoinTransaction = {
      id: `tx-${Date.now()}`,
      userId: currentUser.id,
      amount: coinsEarned,
      type: 'earned',
      description: `Deposited ${weightKg}kg ${category.name} at ${targetBin.binCode}`,
      timestamp: new Date().toISOString(),
      status: 'approved',
    };
    setCoinTransactions(prev => [newTx, ...prev]);

    // Push notification to user
    addNotification({
      recipientRole: 'citizen',
      recipientUserId: currentUser.id,
      title: `+${coinsEarned} EcoCoins Earned!`,
      message: `You recycled ${weightKg}kg of ${category.name} at ${targetBin.name}. Keep it up!`,
      type: 'coin',
    });

    // If threshold crossed, create automatic collection request
    if (collectionTriggered) {
      const existingReq = requests.find(r => r.binId === targetBin.id && r.status !== 'collected');
      if (!existingReq) {
        const newReq: CollectionRequest = {
          id: `req-${Date.now()}`,
          binId: targetBin.id,
          binCode: targetBin.binCode,
          location: targetBin.location,
          fillLevelAtRequest: newFillPercent,
          priority: 'urgent',
          status: 'pending',
          requestedAt: new Date().toISOString(),
        };
        setRequests(prev => [newReq, ...prev]);

        // Push alert to collectors and admin
        addNotification({
          recipientRole: 'collector',
          title: `URGENT: ${targetBin.binCode} Fill Level at ${newFillPercent}%`,
          message: `Collection required at ${targetBin.name} (${targetBin.location}).`,
          type: 'bin_alert',
        });
        addNotification({
          recipientRole: 'admin',
          title: `Capacity Alert: ${targetBin.binCode}`,
          message: `Bin in ${targetBin.location} exceeded ${targetBin.thresholdPercent}% threshold.`,
          type: 'admin',
        });
      }
    }

    showToast(`Deposited ${weightKg}kg ${category.name}! You earned +${coinsEarned} EcoCoins.`, 'success');

    return { coinsEarned, newFillPercent, collectionTriggered };
  };

  // Collector accepts a request
  const acceptCollectionRequest = (requestId: string) => {
    setRequests(prev =>
      prev.map(r =>
        r.id === requestId
          ? {
              ...r,
              status: 'accepted',
              assignedCollectorId: currentUser.id,
              assignedCollectorName: currentUser.name,
            }
          : r
      )
    );
    showToast('Collection request assigned to your route!', 'info');
    addNotification({
      recipientRole: 'admin',
      title: 'Collection Route Updated',
      message: `${currentUser.name} accepted collection for request #${requestId.slice(-4)}.`,
      type: 'collection',
    });
  };

  // Collector marks a bin as collected
  const completeCollection = (requestId: string, collectedWeightKg: number, targetFacilityId: string) => {
    const req = requests.find(r => r.id === requestId);
    if (!req) return;

    const bin = bins.find(b => b.id === req.binId);
    const facility = facilities.find(f => f.id === targetFacilityId) || facilities[0];

    // Mark request as collected
    setRequests(prev =>
      prev.map(r =>
        r.id === requestId
          ? {
              ...r,
              status: 'collected',
              collectedAt: new Date().toISOString(),
              collectedWeightKg,
            }
          : r
      )
    );

    // Reset bin fill level to 0% and status to available
    if (bin) {
      setBins(prev =>
        prev.map(b =>
          b.id === bin.id
            ? {
                ...b,
                currentFillPercent: 0,
                status: 'available',
                lastCollectionAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
              }
            : b
        )
      );
    }

    // Create incoming recycling shipment record at facility
    const newRecyclingRecord: RecyclingRecord = {
      id: `rec-${Date.now()}`,
      batchCode: `REC-${(bin?.primaryWasteType || 'MIX').toUpperCase().slice(0, 2)}-${Math.floor(100 + Math.random() * 900)}`,
      facilityId: facility.id,
      facilityName: facility.name,
      wasteType: bin?.primaryWasteType || 'plastic',
      collectedWeightKg,
      sortedWeightKg: 0,
      processedWeightKg: 0,
      recycledMaterialYieldKg: 0,
      processingStatus: 'received',
      collectedDate: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString(),
      sourceCollector: `${currentUser.name} (${bin?.binCode || 'Route'})`,
      intendedOutput: `Reprocessed ${bin?.primaryWasteType || 'materials'} pellets / raw stock`,
    };

    setRecyclingRecords(prev => [newRecyclingRecord, ...prev]);

    // Give collector activity credits
    setUsers(prev =>
      prev.map(u =>
        u.id === currentUser.id
          ? {
              ...u,
              totalWasteRecycledKg: Number((u.totalWasteRecycledKg + collectedWeightKg).toFixed(1)),
              recyclingEventsCount: u.recyclingEventsCount + 1,
            }
          : u
      )
    );

    showToast(`Bin ${bin?.binCode} collected! ${collectedWeightKg}kg dispatched to ${facility.name}.`, 'success');

    addNotification({
      recipientRole: 'facility',
      title: 'New Shipment Received',
      message: `${collectedWeightKg}kg of ${bin?.primaryWasteType} received from ${bin?.binCode}.`,
      type: 'collection',
    });
  };

  // Facility advances recycling stage
  const updateRecyclingStage = (
    recordId: string,
    newStage: ProcessingStage,
    details?: { sortedWeightKg?: number; processedWeightKg?: number; recycledMaterialYieldKg?: number }
  ) => {
    setRecyclingRecords(prev =>
      prev.map(rec => {
        if (rec.id === recordId) {
          const sorted = details?.sortedWeightKg ?? (newStage !== 'received' ? Math.round(rec.collectedWeightKg * 0.94) : 0);
          const processed = details?.processedWeightKg ?? (newStage === 'processed' || newStage === 'recycled' || newStage === 'reused' ? Math.round(sorted * 0.92) : 0);
          const yieldKg = details?.recycledMaterialYieldKg ?? (newStage === 'recycled' || newStage === 'reused' ? Math.round(processed * 0.90) : 0);

          return {
            ...rec,
            processingStatus: newStage,
            sortedWeightKg: sorted,
            processedWeightKg: processed,
            recycledMaterialYieldKg: yieldKg,
            updatedAt: new Date().toISOString(),
          };
        }
        return rec;
      })
    );
    showToast(`Batch updated to stage: ${newStage.toUpperCase()}`, 'info');
  };

  // User redeems reward
  const redeemReward = (rewardId: string) => {
    const item = rewards.find(r => r.id === rewardId);
    if (!item) return { success: false, message: 'Reward not found' };

    if (currentUser.ecoCoins < item.coinCost) {
      showToast(`Insufficient EcoCoins! You have ${currentUser.ecoCoins}, need ${item.coinCost}.`, 'warning');
      return { success: false, message: 'Insufficient coins' };
    }

    if (item.availableCount <= 0) {
      showToast('This reward is currently out of stock.', 'warning');
      return { success: false, message: 'Out of stock' };
    }

    // Deduct coins & stock
    setUsers(prev =>
      prev.map(u =>
        u.id === currentUser.id
          ? { ...u, ecoCoins: u.ecoCoins - item.coinCost }
          : u
      )
    );

    setRewards(prev =>
      prev.map(r => (r.id === rewardId ? { ...r, availableCount: r.availableCount - 1 } : r))
    );

    const voucherCode = `ECO-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const newTx: CoinTransaction = {
      id: `tx-${Date.now()}`,
      userId: currentUser.id,
      amount: -item.coinCost,
      type: 'redeemed',
      description: `Redeemed ${item.name} (${voucherCode})`,
      timestamp: new Date().toISOString(),
      status: 'approved',
    };
    setCoinTransactions(prev => [newTx, ...prev]);

    addNotification({
      recipientRole: 'citizen',
      recipientUserId: currentUser.id,
      title: 'Reward Redeemed Successfully!',
      message: `Your voucher code: ${voucherCode} for ${item.name}.`,
      type: 'milestone',
    });

    showToast(`Redeemed ${item.name}! Voucher Code: ${voucherCode}`, 'success');
    return { success: true, message: 'Redeemed successfully', voucherCode };
  };

  // Admin: Smart Bin Management
  const addSmartBin = (binData: Omit<SmartBin, 'id'>) => {
    const newBin: SmartBin = {
      ...binData,
      id: `bin-${Date.now()}`,
      lastUpdated: new Date().toISOString(),
    };
    setBins(prev => [newBin, ...prev]);
    showToast(`New Smart Bin ${newBin.binCode} added to network`, 'success');
  };

  const updateSmartBin = (id: string, updates: Partial<SmartBin>) => {
    setBins(prev =>
      prev.map(b => (b.id === id ? { ...b, ...updates, lastUpdated: new Date().toISOString() } : b))
    );
    showToast('Smart bin configuration updated', 'info');
  };

  const deleteSmartBin = (id: string) => {
    setBins(prev => prev.filter(b => b.id !== id));
    showToast('Smart bin removed from network', 'info');
  };

  const updateCategoryRewardRate = (categoryId: string, newRate: number) => {
    setCategories(prev =>
      prev.map(c => (c.id === categoryId ? { ...c, rewardRateCoinsPerKg: Math.max(1, newRate) } : c))
    );
    showToast('Reward rules updated', 'info');
  };

  const toggleCategoryStatus = (categoryId: string) => {
    setCategories(prev =>
      prev.map(c => (c.id === categoryId ? { ...c, isAccepting: !c.isAccepting } : c))
    );
    showToast('Category intake status toggled', 'info');
  };

  const updateConversionFactors = (factors: Partial<ConversionFactors>) => {
    setConversionFactors(prev => ({ ...prev, ...factors }));
    showToast('Impact conversion metrics updated', 'info');
  };

  const toggleUserSuspension = (userId: string) => {
    setUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, isSuspended: !u.isSuspended } : u))
    );
    showToast('User account status updated', 'info');
  };

  // IoT Hardware Simulation (e.g. from ESP32 or test panel)
  const simulateIoTPayload = (binId: string, fillLevel: number, battery: number) => {
    const bin = bins.find(b => b.id === binId);
    if (!bin) return;

    let status: BinStatus = 'available';
    if (fillLevel >= bin.thresholdPercent) status = 'collection_required';
    else if (fillLevel >= 70) status = 'almost_full';
    if (battery <= 5) status = 'offline';

    setBins(prev =>
      prev.map(b =>
        b.id === binId
          ? {
              ...b,
              currentFillPercent: fillLevel,
              batteryPercent: battery,
              status,
              lastUpdated: new Date().toISOString(),
            }
          : b
      )
    );

    if (fillLevel >= bin.thresholdPercent) {
      const existingReq = requests.find(r => r.binId === bin.id && r.status !== 'collected');
      if (!existingReq) {
        const newReq: CollectionRequest = {
          id: `req-${Date.now()}`,
          binId: bin.id,
          binCode: bin.binCode,
          location: bin.location,
          fillLevelAtRequest: fillLevel,
          priority: 'urgent',
          status: 'pending',
          requestedAt: new Date().toISOString(),
        };
        setRequests(prev => [newReq, ...prev]);
        addNotification({
          recipientRole: 'collector',
          title: `Sensor Alert: ${bin.binCode} at ${fillLevel}%`,
          message: `Automated collection trigger activated for ${bin.location}.`,
          type: 'bin_alert',
        });
      }
    }

    showToast(`IoT Sensor telemetry processed for ${bin.binCode}: ${fillLevel}% fill, ${battery}% battery.`, 'info');
  };

  const resetToDemoDefaults = () => {
    localStorage.clear();
    setUsers(INITIAL_USERS);
    setCurrentUserId('usr-101');
    setBins(INITIAL_BINS);
    setCategories(INITIAL_CATEGORIES);
    setRequests(INITIAL_REQUESTS);
    setRecyclingRecords(INITIAL_RECYCLING_RECORDS);
    setRewards(INITIAL_REWARDS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setConversionFactors(DEFAULT_CONVERSION_FACTORS);
    showToast('Reset system to pristine demo dataset', 'info');
  };

  return (
    <EcoCycleContext.Provider
      value={{
        currentUser,
        users,
        bins,
        categories,
        requests,
        recyclingRecords,
        facilities,
        rewards,
        notifications,
        conversionFactors,
        wasteRecords,
        coinTransactions,
        activeTab,
        isDepositModalOpen,
        selectedBinForDeposit,
        isIoTSimulatorOpen,
        isAuthModalOpen,
        isDocsModalOpen,
        selectedBinDetail,
        toast,
        setActiveTab,
        switchRole,
        openDepositModal,
        closeDepositModal,
        openIoTSimulator,
        closeIoTSimulator,
        openBinDetail,
        closeBinDetail,
        openAuthModal,
        closeAuthModal,
        openDocsModal,
        closeDocsModal,
        showToast,
        depositWaste,
        acceptCollectionRequest,
        completeCollection,
        updateRecyclingStage,
        redeemReward,
        addSmartBin,
        updateSmartBin,
        deleteSmartBin,
        updateCategoryRewardRate,
        toggleCategoryStatus,
        updateConversionFactors,
        toggleUserSuspension,
        simulateIoTPayload,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
        resetToDemoDefaults,
      }}
    >
      {children}
    </EcoCycleContext.Provider>
  );
};

export const useEcoCycle = () => {
  const context = useContext(EcoCycleContext);
  if (!context) {
    throw new Error('useEcoCycle must be used within an EcoCycleProvider');
  }
  return context;
};

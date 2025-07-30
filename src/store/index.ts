import { create } from 'zustand';
import { Product, CartItem, User, Address } from '../types';

// 购物车状态管理
interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product, size, color, quantity = 1) => {
    const existingItem = get().items.find(
      item => item.product.id === product.id && item.size === size && item.color === color
    );
    
    if (existingItem) {
      set(state => ({
        items: state.items.map(item =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }));
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${size}-${color}-${Date.now()}`,
        product,
        size,
        color,
        quantity
      };
      set(state => ({ items: [...state.items, newItem] }));
    }
  },
  removeItem: (id) => {
    set(state => ({
      items: state.items.filter(item => item.id !== id)
    }));
  },
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    set(state => ({
      items: state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    }));
  },
  clearCart: () => set({ items: [] }),
  getTotalPrice: () => {
    return get().items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  },
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  }
}));

// 用户状态管理
interface UserStore {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
  updateUser: (userData) => set(state => ({
    user: state.user ? { ...state.user, ...userData } : null
  }))
}));

// 地址状态管理
interface AddressStore {
  addresses: Address[];
  selectedAddressId: string | null;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  selectAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

export const useAddressStore = create<AddressStore>((set) => ({
  addresses: [],
  selectedAddressId: null,
  addAddress: (addressData) => {
    const newAddress: Address = {
      ...addressData,
      id: Date.now().toString()
    };
    set(state => ({ addresses: [...state.addresses, newAddress] }));
  },
  updateAddress: (id, addressData) => {
    set(state => ({
      addresses: state.addresses.map(addr =>
        addr.id === id ? { ...addr, ...addressData } : addr
      )
    }));
  },
  deleteAddress: (id) => {
    set(state => ({
      addresses: state.addresses.filter(addr => addr.id !== id),
      selectedAddressId: state.selectedAddressId === id ? null : state.selectedAddressId
    }));
  },
  selectAddress: (id) => set({ selectedAddressId: id }),
  setDefaultAddress: (id) => {
    set(state => ({
      addresses: state.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    }));
  }
}));

// 应用全局状态
interface AppStore {
  showWelcomeModal: boolean;
  setShowWelcomeModal: (show: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  showWelcomeModal: true,
  setShowWelcomeModal: (show) => set({ showWelcomeModal: show }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query })
}));
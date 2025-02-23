
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderService } from './order_service';




export const getOrder = createAsyncThunk(
  'order/getOrder',
  async (orderId: string) => {
    const response = await orderService.getOrder(orderId);
    return response.data;
  }
);


export const initiatePayment = createAsyncThunk(
  'order/initiatePayment',
  async ({ orderId, quantity }: { orderId: string; quantity: number }) => {
    const response = await orderService.initiatePayment(orderId, quantity);
    return response.data;
  }
);



export interface CartItem {
    id: string;
    title: string;
    color: string;
    price: number;
    quantity: number;
    coverImage: string;
  }



export interface Order {
  id: string;
  items: CartItem[];
  status: string;
  totalAmount: number;
  totalItems: number;
  loading: boolean;
  error?: string;
  currentOrder: any;
  couponCode: string;
}



const initialState: Order = { 
    id: '',
    items: [],
    status: '',
    totalAmount: 0,
    totalItems: 0,
    loading: false,
    error: '',
    currentOrder: null,
    couponCode: '',
}




const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCouponCode: (state, action) => {
      state.couponCode = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
        
        // Update totals
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
  
      removeFromCart: (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        
        // Update totals
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
  
      updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
        const item = state.items.find(item => item.id === action.payload.id);
        
        if (item) {
          item.quantity = Math.max(0, action.payload.quantity);
          if (item.quantity === 0) {
            state.items = state.items.filter(i => i.id !== action.payload.id);
          }
        }
        
        // Update totals
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
  
      clearCart: (state) => {
        state.items = [];
        state.totalItems = 0;
        state.totalAmount = 0;
      }
  },

  extraReducers: (builder) => {
    builder

    .addCase(getOrder.pending, (state) => {
    state.loading = true;
    })
    .addCase(getOrder.fulfilled, (state, action) => {
    state.currentOrder = action.payload;
    state.loading = false;
    })
    .addCase(getOrder.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message || 'Failed to get order';
    })


    // initiatePayment section
    .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
    })
    .addCase(initiatePayment.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
    })
    .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to initiate payment';
    })

    },
});

export const { setCouponCode, addToCart, removeFromCart, updateQuantity } = orderSlice.actions;
export default orderSlice.reducer;
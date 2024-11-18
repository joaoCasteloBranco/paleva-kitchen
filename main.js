const { createApp } = Vue;

createApp({
  data() {
    return {
      orders: [], 
      searchQuery: '', 
      selectedOrder: null, 
      restaurantCode: null,
      restaurantCodeInput: null, 
      isLoading: false,
    };
  },
  computed: {
    filteredOrders() {
      const query = this.searchQuery.toLowerCase();
      return this.orders
        .filter(order =>
          order.order.customer_name.toLowerCase().includes(query) ||
          order.order.order_code.toLowerCase().includes(query) ||
          this.translateStatus(order.order.status).toLowerCase().includes(query)
        )
        .sort((a, b) => new Date(a.order.created_at) - new Date(b.order.created_at));
    },   
  },
  methods: {
    async apiRequest(endpoint, method = 'GET', data = null) {
      if (!this.restaurantCode) {
          return
      }
      this.isLoading = true;
      try {
        const url = `http://127.0.0.1:3000/api/v1/restaurants/${this.restaurantCode}/${endpoint}`;
        const options = { method, url };
        if (data) options.data = data;
        const response = await axios(options);
        return response.data;
      } catch (error) {
        console.error(`Erro ao realizar a requisição: ${endpoint}`, error);
        alert('Não foi possível. Tente novamente.');
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchOrders() {
      const responseData = await this.apiRequest('orders');
      this.orders = responseData.orders.sort((a, b) => 
        new Date(a.order.created_at) - new Date(b.order.created_at)
      );
    },
    async showOrder(code) {
      this.selectedOrder = await this.apiRequest(`orders/${code}`);
      this.fetchOrders()
    },
    async start_preparation(code) {
      this.selectedOrder = await this.apiRequest(`orders/${code}/in_preparation`, 'POST');
      this.fetchOrders()
    },
    async set_order_ready(code) {
      this.selectedOrder = await this.apiRequest(`orders/${code}/ready`, 'POST');
    },
    updateRestaurantCode() {
      this.restaurantCode = this.restaurantCodeInput.trim();
      this.fetchOrders(); 
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('pt-BR')
    },

    translateStatus(status) {
      const statusTranslations = {
        awaiting_confirmation: 'Aguardando Confirmação',
        in_preparation: 'Em Preparação',
        ready: 'Pronto',
        delivered: 'Entregue',
        canceled: 'Cancelado'
      };
  
      return statusTranslations[status] || 'Status Desconhecido';
    },
  },
  mounted() {
    this.fetchOrders();
  },
}).mount('#app');

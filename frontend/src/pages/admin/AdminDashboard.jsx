import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Package, ShoppingBag, FolderOpen, TrendingUp } from 'lucide-react';
import { products, orders, categories } from '../../mockData';

const AdminDashboard = () => {
  const stats = [
    {
      icon: Package,
      label: 'Total Products',
      value: products.length,
      color: 'bg-blue-500'
    },
    {
      icon: ShoppingBag,
      label: 'Total Orders',
      value: orders.length,
      color: 'bg-green-500'
    },
    {
      icon: FolderOpen,
      label: 'Categories',
      value: categories.length,
      color: 'bg-purple-500'
    },
    {
      icon: TrendingUp,
      label: 'In Stock',
      value: products.filter(p => p.inStock).length,
      color: 'bg-orange-500'
    }
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <AdminLayout>
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Order ID</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Customer</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Phone</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">#{order.id}</td>
                      <td className="py-3 px-4">{order.customerName}</td>
                      <td className="py-3 px-4">{order.phone}</td>
                      <td className="py-3 px-4">₹{order.totalAmount}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-500">
                      No orders yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
'use client';

import { useEffect, useState } from 'react';
import { isAuthenticated } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/config';
import { getToken } from '@/utils/auth';
import { removeToken } from '@/utils/auth';
import AddItemForm from '@/components/AddItemForm';
import DraggableList from '@/components/DraggableList';
import EditModal from '@/components/EditModal';



interface Order {
  id: number;
  position: number;
  nama: string;
  product: string;
  alamat: string;
}

interface ApiResponse {
  message: string;
  data: Order[];
}



const OrderPage: React.FC = () => {
  const router = useRouter();

  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Order | null>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      fetchData();
    } else {
      router.push('/');
    }
  }, [router]);


  const fetchData = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.ORDER_GET, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
      });


      if (response.status === 401) {
        removeToken();
        router.push('/');
        return;
      }

      const result: ApiResponse = await response.json();
      setData(result.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }

  };


  interface OrderUpdate {
    id: number;
    position: number;
  }



  const updateOrderPosition = async (items: OrderUpdate[]) => {
    try {
      const response = await fetch(API_ENDPOINTS.ORDER_UPDATE_POSITION, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ items }),
      });

      if (response.ok) {
        console.log('Order positions updated successfully');
      } else {
        console.error('Failed to update order positions');
      }
    } catch (error) {
      console.error('Error updating order positions:', error);
    }
  };

  const handleReorder = (newItems: Order[]) => {


    const updatedItems = newItems.map((item, index) => ({
      ...item,
      position: index + 1,
    }));
    setData(updatedItems);

    const parsedItems = updatedItems.map((item) => ({
      id: item.id, position: item.position
    }));
    updateOrderPosition(parsedItems);
  };

  // Fungsi untuk menyimpan perubahan
  const handleSave = (updatedItem: Order) => {

    const updatedData = data.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );

    setData(updatedData); // Update state dengan data yang sudah diubah
    setEditingItem(null); // Tutup modal


    updateOrder(updatedItem);
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setEditingItem(null);
  };

  // Callback function untuk memanggil fetchData setelah item baru ditambahkan
  const handleItemAdded = () => {
    fetchData();
  };

  const deleteOrder = async (id: number) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.ORDER_DELETE}/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
      });
  
      if (response.ok) {
        console.log('Order deleted successfully');
        // Fetch data ulang setelah menghapus
        fetchData();
      } else {
        console.error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };
  
  const handleDelete = (id: number) => {
    // Tampilkan konfirmasi sebelum menghapus
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteOrder(id);
    }
  };


  const updateOrder = async (item: Order) => {
    const filteredItem = {
      id: item.id,
      nama: item.nama,
      alamat: item.alamat,
      product: item.product,
    };
    try {
      const response = await fetch(API_ENDPOINTS.ORDER_UPDATE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify(filteredItem),
      });

      if (response.ok) {
        console.log('Order updated successfully');
      } else {
        console.error('Failed to update order');
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };


  if (loading) {
    return <div className="p-2 sm:ml-64">Loading...</div>;
  }



  if (data.length === 0) {

    return (
      <div className="p-2 sm:ml-64">
        <div className="p-2 rounded-lg">


          <AddItemForm onItemAdded={handleItemAdded} />


          <div className="flex items-center justify-left my-4 rounded-sm bg-gray-50 dark:bg-gray-800">

            <div className="p-2 sm:ml-64">No data available.</div>

          </div>
        </div>

        {editingItem && (
          <EditModal
            item={editingItem}
            onSave={handleSave}
            onClose={handleCloseModal}
          />
        )}
      </div>
    );
  }


  return (
    <div className="p-2 sm:ml-64">
      <div className="p-2 rounded-lg">


        <AddItemForm onItemAdded={handleItemAdded} />


        <div className="my-4 rounded-sm bg-gray-50 dark:bg-gray-800 overflow-x-auto">

          <DraggableList items={data} onReorder={handleReorder} onEditingItem={setEditingItem} onDelete={handleDelete} />

        </div>
      </div>

      {editingItem && (
        <EditModal
          item={editingItem}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
export default OrderPage;

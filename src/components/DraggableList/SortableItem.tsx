'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Order {
  id: number;
  position: number;
  nama: string;
  product: string;
  alamat: string;
}

interface SortableItemProps {
  id: number;
  position: number;
  nama: string;
  alamat: string;
  product: string;
  onEdit: (item: Order) => void;
  onDeleteId: (id: number) => void;
}



export const SortableItem: React.FC<SortableItemProps> = ({ id, position, nama, alamat, product, onEdit, onDeleteId}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,

  };



  return (
    <tr className="hover:bg-gray-200" ref={setNodeRef} style={style}>
      {/* Drag Handle */}
      <td className="py-2 px-4 border text-center text-gray-700 border-gray-300 cursor-grab" style={{ touchAction: 'none' }} {...attributes} {...listeners}>
        ⠿
      </td>

      {/* Other Columns */}
      <td className="py-2 px-4 border text-center text-gray-700 border-gray-300">{position}</td>
      <td className="py-2 px-4 border text-center text-gray-700 border-gray-300">{nama}</td>
      <td className="py-2 px-4 border text-center text-gray-700 border-gray-300">{alamat}</td>
      <td className="py-2 px-4 border text-center text-gray-700 border-gray-300">{product}</td>

      {/* Edit Button (Separate from Drag Listeners) */}
      <td className="py-2 px-4 border text-center text-gray-700 border-gray-300 flex justify-evenly">
        <button
          onClick={() => onEdit({ id, position, nama, product, alamat })}
          className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Edit
        </button>
        <button className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={() => onDeleteId(id)}>Delete</button>
      </td>
    </tr>

  );
};
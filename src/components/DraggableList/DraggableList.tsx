'use client';

import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';


interface Order {
    id: number;
    position: number;
    nama: string;
    product: string;
    alamat: string;
}

interface DraggableListProps {
    items: Order[];
    onReorder: (items: Order[]) => void;
    onEditingItem: (item: Order | null) => void;
    onDelete: (id: number) => void;
}


const DraggableList: React.FC<DraggableListProps> = ({ items, onReorder, onEditingItem, onDelete }) => {

    // Sensor untuk drag-and-drop
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
              distance: 5,
            },
          }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );


    const handleEdit = (item: Order) => {
        onEditingItem(item);
    };

    const handleDelete = (id: number) => {
        onDelete(id);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const newItems = arrayMove(items, items.findIndex((item) => item.id === active.id), items.findIndex((item) => item.id === over.id));
            onReorder(newItems); // Panggil fungsi onReorder untuk mengupdate data di parent component
        }
    };



    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <table className="bg-white border border-gray-300 m-10">
                    <thead>
                        <tr>
                            <th className="w-1/24 px-6 py-3 border-b-2 border-gray-300 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                +
                            </th>
                            <th className="w-1/24 px-6 py-3 border-b-2 border-gray-300 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                No
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Nama
                            </th>
                            <th className="hidden md:table-cell px-6 py-3 border-b-2 border-gray-300 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Alamat
                            </th>
                            <th className="hidden sm:table-cell px-6 py-3 border-b-2 border-gray-300 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Produk
                            </th>
                            <th className="w-1/24 px-6 py-3 border-b-2 border-gray-300 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {items.map((item) => (
                            <SortableItem key={item.id} id={item.id} position={item.position} nama={item.nama} alamat={item.alamat} product={item.product} onEdit={() => handleEdit(item)} onDeleteId={() => handleDelete(item.id)} />

                        ))}
                    </tbody>
                </table>

            </SortableContext>
        </DndContext>

    );
};

export default DraggableList;
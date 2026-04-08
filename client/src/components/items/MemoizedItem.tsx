import React, { useState } from 'react';
import { MemoizedItemProps } from '../../interfaces/items';

export const MemoizedItem = React.memo<MemoizedItemProps>(
   ({ item, isEditing, onUpdate, onCancel, onEdit, onDelete }) => {
      const [name, setName] = useState(item.name);

      return (
         <tr key={item.id}>
            <td>
               {isEditing ? <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> : item.name}
            </td>
            <td>{item.createdAt}</td>
            <td>
               {isEditing ? (
                  <>
                     <button
                        onClick={async () => {
                           await onUpdate(name, item.id);
                        }}
                        style={{ marginRight: '10px' }}
                        className="noselect"
                     >
                        Сохранить
                     </button>
                     <button onClick={onCancel} className="noselect">
                        Отмена
                     </button>
                  </>
               ) : (
                  <>
                     <button onClick={onEdit} style={{ marginRight: '10px' }} className="noselect">
                        Редактировать
                     </button>
                     <button onClick={onDelete} className="noselect">
                        Удалить
                     </button>
                  </>
               )}
            </td>
         </tr>
      );
   },
   (prevProps, nextProps) => {
      return (
         prevProps.item.id === nextProps.item.id &&
         prevProps.item.name === nextProps.item.name &&
         prevProps.item.createdAt === nextProps.item.createdAt &&
         prevProps.isEditing === nextProps.isEditing
      );
   }
);

import React, { useState, useEffect, useMemo } from 'react';
import { getItems, createItem, updateItem, deleteItem } from '../../http/itemsApi';
import { Item, ItemsSort } from '../../interfaces/items';
import { Pagination } from '../../components/items/Pagination';
import './Items.css';
import errorHandling from '../../functions/errorHanding';
import ErrorsBlock from '../../components/ErrorsBlock';
import { useDebounce } from '../../functions/useDebounce';
import { MemoizedItem } from '../../components/items/MemoizedItem';

const Items: React.FC = () => {
   const [items, setItems] = useState<Item[]>([]);
   const [total, setTotal] = useState(0);
   const [loading, setLoading] = useState(true);

   const [searchText, setSearchText] = useState('');
   const debouncedQuery = useDebounce(searchText, 1000);
   const [currentPage, setCurrentPage] = useState(1);
   const [sort, setSort] = useState<ItemsSort>({
      date: 'asc',
      name: 'asc',
   });

   useEffect(() => {
      if (
         !loading &&
         (debouncedQuery || debouncedQuery?.trim()?.length === 0)
      ) {
         setCurrentPage(1);
         fetchItems(debouncedQuery, 1, sort);
      }
   }, [debouncedQuery]);

   const [errorsArray, setErrorsArray] = useState<string[]>([]);
   const [errorsDisplay, setErrorsDisplay] = useState<'none' | 'block'>('none');
   const [editingItem, setEditingItem] = useState<Item | null>(null);
   const [newItemName, setNewItemName] = useState('');
   const [newItemEmptyInputAnim, setNewItemEmptyInputAnim] = useState('');

   const fetchItems = async (this_searchText: string, this_currentPage: number, this_sort: ItemsSort) => {
      setErrorsArray([]);
      setErrorsDisplay('none');
      setLoading(true);
      let errors: string[] = [];
      const response = await getItems(this_searchText, this_currentPage, this_sort);
      if (response?.status === 200) {
         setItems(response?.data?.itemsData);
         setTotal(response?.data?.totalCount);
      } else {
         errorHandling(errors, response, setErrorsArray, setErrorsDisplay);
      }
      setLoading(false);
   };

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
   };

   const handleSort = (field: keyof ItemsSort) => {
      const newSort = { ...sort };
      newSort[field] = sort[field] === 'asc' ? 'desc' : 'asc';
      setSort(newSort);
      setCurrentPage(1);
      fetchItems(searchText, 1, newSort);
   };

   const handlePageChange = (page: number) => {
      setCurrentPage(page);
      fetchItems(searchText, page, sort);
   };

   const handleCreate = async () => {
      let errors: string[] = [];
      setErrorsArray([]);
      setErrorsDisplay('none');
      if (!newItemName?.trim()) {
         setNewItemEmptyInputAnim('input_empty');
         return;
      }
      if (newItemName?.trim()?.length > 100) {
         setErrorsArray(['Название должно быть не больше 100 символов']);
         setErrorsDisplay('block');
         return;
      }
      const response = await createItem(newItemName);
      if (response?.status === 201) {
         setItems((prevState) => [
            {
               createdAt: new Date().toISOString(),
               id: response?.data?.id,
               name: newItemName,
               status: 'active',
            },
            ...prevState,
         ]);
         setNewItemName('');
      } else {
         errorHandling(errors, response, setErrorsArray, setErrorsDisplay);
      }
   };

   const handleUpdate = async (this_name: string, this_item_id: number) => {
      let errors: string[] = [];
      setErrorsArray([]);
      setErrorsDisplay('none');
      if (!this_name?.trim()) {
         setErrorsArray(['Название не указано']);
         setErrorsDisplay('block');
         return;
      }
      if (this_name?.trim()?.length > 100) {
         setErrorsArray(['Название должно быть не больше 100 символов']);
         setErrorsDisplay('block');
         return;
      }
      const response = await updateItem(this_name, this_item_id);
      if (response?.status === 204) {
         setItems((prevState) =>
            prevState?.map((item) =>
               item?.id === this_item_id
                  ? {
                       ...item,
                       name: this_name,
                    }
                  : item
            )
         );
         setEditingItem(null);
      } else {
         errorHandling(errors, response, setErrorsArray, setErrorsDisplay);
      }
   };

   const handleDelete = async (id: number) => {
      let errors: string[] = [];
      setErrorsArray([]);
      setErrorsDisplay('none');
      const response = await deleteItem(id);
      if (response?.status === 204) {
         setItems((prevState) => prevState?.filter((item) => item?.id !== id));
         setEditingItem(null);
      } else {
         errorHandling(errors, response, setErrorsArray, setErrorsDisplay);
      }
   };

   useEffect(() => {
      if (['', 'items']?.includes(window?.location?.pathname?.split('/')?.[1])) {
         fetchItems('', 1, {
            date: 'asc',
            name: 'asc',
         });
      }
   }, [window?.location?.pathname]);

   const renderedItems = useMemo(() => {
      if (!Array.isArray(items) || items.length === 0) return null;

      return items.map((item) => (
         <MemoizedItem
            key={item.id}
            item={item}
            isEditing={editingItem?.id === item.id}
            onUpdate={handleUpdate}
            onCancel={() => setEditingItem(null)}
            onEdit={() => setEditingItem(item)}
            onDelete={() => handleDelete(item.id)}
         />
      ));
   }, [items, editingItem, handleUpdate, handleDelete]);

   return (
      <div className="items-page">
         <h1>Управление записями</h1>

         <ErrorsBlock display={errorsDisplay} errors={errorsArray} />

         <div className="controls">
            <input type="text" placeholder="Поиск по названию..." value={searchText} onChange={handleSearch} />

            <div className="create-form">
               <input
                  type="text"
                  placeholder="Новое название..."
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className={newItemEmptyInputAnim}
                  onAnimationEnd={() => setNewItemEmptyInputAnim('')}
               />
               <button onClick={handleCreate} className="noselect">
                  Создать
               </button>
            </div>
         </div>

         <table className="items-table">
            <thead>
               <tr>
                  <th onClick={() => handleSort('name')}>
                     Название
                     <span className={`sort-arrow ${sort?.name === 'asc' ? 'asc' : 'desc'}`}>
                        {sort?.name === 'asc' ? '↑' : '↓'}
                     </span>
                  </th>
                  <th onClick={() => handleSort('date')}>
                     Дата создания
                     <span className={`sort-arrow ${sort?.date === 'asc' ? 'asc' : 'desc'}`}>
                        {sort?.date === 'asc' ? '↑' : '↓'}
                     </span>
                  </th>
                  <th>Действия</th>
               </tr>
            </thead>
            <tbody>
               {loading ? (
                  <tr>
                     <td colSpan={3}>Загрузка...</td>
                  </tr>
               ) : items.length === 0 ? (
                  <tr>
                     <td colSpan={3}>Записей не найдено</td>
                  </tr>
               ) : (
                  renderedItems
               )}
            </tbody>
         </table>

         <Pagination currentPage={currentPage} totalItems={total} itemsPerPage={30} onPageChange={handlePageChange} />
      </div>
   );
};

export default Items;

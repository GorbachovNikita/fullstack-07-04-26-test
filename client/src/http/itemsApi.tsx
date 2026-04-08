import { $host } from '../http';
import { ItemsSort } from '../interfaces/items';

export const getItems = async (text: string = '', page: number = 1, sort: ItemsSort) => {
   try {
      return $host
         .get('items', {
            params: {
               text,
               page,
               sort,
            },
         })
         .catch((e) => {
            return e;
         });
   } catch (e) {
      return e;
   }
};

export const createItem = async (name: string) => {
   try {
      return $host
         .post('items', {
            name,
         })
         .catch((e) => {
            return e;
         });
   } catch (e) {
      return e;
   }
};

export const updateItem = async (name: string, id: number) => {
   try {
      return $host
         .put(`items/${id}`, {
            name,
         })
         .catch((e) => {
            return e;
         });
   } catch (e) {
      return e;
   }
};

export const deleteItem = async (id: number) => {
   try {
      return $host.delete(`items/${id}`).catch((e) => {
         return e;
      });
   } catch (e) {
      return e;
   }
};

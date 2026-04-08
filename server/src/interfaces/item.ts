export interface ItemsSort {
   date: 'asc' | 'desc';
   name: 'asc' | 'desc';
}

export interface GetItemsQuery {
   text?: string;
   page?: number;
   'sort[date]': 'asc' | 'desc';
   'sort[name]': 'asc' | 'desc';
}

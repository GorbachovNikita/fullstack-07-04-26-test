export interface ItemsSort {
   date: 'asc' | 'desc';
   name: 'asc' | 'desc';
}

export interface PaginationProps {
   currentPage: number;
   totalItems: number;
   itemsPerPage: number;
   onPageChange: (page: number) => void;
}

export interface Item {
   id: number;
   name: string;
   createdAt: string;
}

export interface MemoizedItemProps {
   item: Item;
   isEditing: boolean;
   onUpdate: (name: string, id: number) => void;
   onCancel: () => void;
   onEdit: () => void;
   onDelete: () => void;
}

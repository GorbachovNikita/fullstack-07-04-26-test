import React from 'react';

export const errorHandling = (
   errorsArray: string[],
   data: any,
   setErrorsArray: React.Dispatch<React.SetStateAction<string[]>>,
   setErrorsDisplay: React.Dispatch<React.SetStateAction<'none' | 'block'>>
) => {
   if (data?.status !== undefined) {
      if (data.status !== 500) {
         if (data.status === 401) {
            setErrorsArray([data?.response?.data?.message]);
         } else {
            if (Array.isArray(data?.response?.data?.errors) === false) {
               setErrorsArray([data?.response?.data?.errors]);
            } else {
               if (typeof data?.response?.data?.errors[0] === 'string') {
                  setErrorsArray(data?.response?.data?.errors);
               } else {
                  let errors = data?.response?.data?.errors.map((item: any) => {
                     let result;

                     Object.hasOwn(item, 'msg') ? (result = item['msg']) : (result = item);

                     return result;
                  });
                  setErrorsArray(errors);
               }
            }
         }
      } else {
         setErrorsArray([data?.response?.data?.message]);
      }
   } else {
      setErrorsArray(['Не удалось выполнить запрос']);
   }

   setErrorsDisplay('block');
};

export default errorHandling;

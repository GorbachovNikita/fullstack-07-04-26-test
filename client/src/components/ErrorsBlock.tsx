import React from 'react';
import './ErrorsBlock.css';

const ErrorsBlock = (props: { display: 'none' | 'block'; errors: string[] }) => {
   return (
      <div className={`errors-block`} style={{ display: props?.display }}>
         {Array?.isArray(props?.errors) &&
            props?.errors?.map((element: string, index: number) => {
               return <p key={index}>— {element}</p>;
            })}
      </div>
   );
};

export default ErrorsBlock;
